from api.common import Level, _and, _or, _join
from typing import Optional
from datetime import datetime
from api.db import get_connection
from pydantic import BaseModel


class Request(BaseModel):
    namespace: Optional[str] = None
    topics: list[str] = []
    levels: list[Level] = []
    before: Optional[datetime] = None
    after: Optional[datetime] = None


class Response(BaseModel):
    count: int


def post(req: Request) -> Response:
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
        "SELECT count(*) FROM log",
        f"WHERE {conditions}" if conditions else None,
    )

    assert query is not None

    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute(query)
        result = cur.fetchall()

        return {"count": result[0][0]}
    finally:
        cur.close()
        conn.close()
