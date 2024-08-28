from api.common import *
from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from api.db import get_cursor


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
        f"namespace = '{req.namespace}'" if req.namespace else None,
        _or(*(f"topic = '{topic}'" for topic in req.topics)),
    )
    query = _join(
        "SELECT * FROM logs",
        f"WHERE {conditions}" if conditions else None,
        f"ORDER BY timestamp {req.order.value}",
        f"LIMIT {req.limit}",
        f"OFFSET {req.offset}",
    )

    print(query)

    assert query is not None

    cur = get_cursor()
    try:
        print("Got cursor")
        print("Running query", query)
        cur.execute(query)
        result = cur.fetchall()

        return Response(
            logs=[
                Log(
                    id=row[0],
                    namespace=row[1],
                    topic=row[2],
                    level=Level(row[3]),
                    data=row[4],
                    timestamp=row[5],
                )
                for row in result
            ]
        )
    finally:
        cur.close()
