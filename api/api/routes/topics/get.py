from pydantic import BaseModel
from api.db import get_cursor


class Response(BaseModel):
    topics: list[str]


def get(namespace: str) -> Response:
    cur = get_cursor()
    query = f"SELECT name from topic where id in (select topic_id from namespace_topic where namespace_id = (select id from namespace where name = '{namespace}'))"
    try:
        cur.execute(query)
        return Response(topics=[row[0] for row in cur.fetchall()])
    finally:
        cur.close()
