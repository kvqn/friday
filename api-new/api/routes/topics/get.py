from pydantic import BaseModel
from api.db import get_cursor


class Response(BaseModel):
    topics: list[str]


def get(namespace: str) -> Response:
    cur = get_cursor()
    query = f"SELECT DISTINCT topic from logs where namespace = '{namespace}'"
    try:
        cur.execute(query)
        return Response(topics=[row[0] for row in cur.fetchall()])
    finally:
        cur.close()
