from api.common import *
from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from api.db import get_connection


class Request(BaseModel):
    limit: int = 1
    offset: int = 0
    namespace: Optional[str] = None
    topics: list[str] = []
    levels: list[Level] = []
    before: Optional[datetime] = None
    after: Optional[datetime] = None
    order: Order = Order.DESC


class Response(BaseModel):
    logs: list[Log]


def post(
    req: Request,
) -> Response:
    print("levels", req.levels)
    conditions = _and(
        _or(*(f"level = '{level.value}'" for level in req.levels)),
        (
            f"timestamp < '{req.before.strftime('%Y-%m-%d %H:%M:%S')}'"
            if req.before
            else None
        ),
        (
            f"timestamp > '{req.after.strftime('%Y-%m-%d %H:%M:%S')}'"
            if req.after
            else None
        ),
        (
            "namespace_topic_id in (select id from namespace_topic where {})".format(
                _and(
                    "namespace_id in (select id from namespace where name = {})".format(
                        "'" + req.namespace + "'"
                    ),
                    (
                        "topic_id in (select id from topic where name in ({}))".format(
                            ", ".join("'" + topic + "'" for topic in req.topics)
                        )
                        if req.topics
                        else None
                    ),
                )
            )
            if req.namespace
            else None
        ),
    )
    query = _join(
        "SELECT * FROM log",
        f"WHERE {conditions}" if conditions else None,
        f"ORDER BY id {req.order.value}",
        f"LIMIT {req.limit}",
        f"OFFSET {req.offset}",
    )

    query = f"""
    with logs as ({query}) select logs.id as id, logs.timestamp as timestamp, namespace.name as namespace, topic.name as topic, logs.level as level, logs.data as data from logs inner join namespace_topic on logs.namespace_topic_id = namespace_topic.id inner join namespace on namespace_topic.namespace_id = namespace.id inner join topic on namespace_topic.topic_id = topic.id;
    """

    print(query)

    assert query is not None

    conn = get_connection()
    cur = conn.cursor()
    try:
        print("Got cursor")
        print("Running query", query)
        cur.execute(query)
        result = cur.fetchall()

        return Response(
            logs=[
                Log(
                    id=row[0],
                    timestamp=row[1],
                    namespace=row[2],
                    topic=row[3],
                    level=Level(row[4]),
                    data=row[5],
                )
                for row in result
            ]
        )
    finally:
        cur.close()
        conn.close()
