from pydantic import BaseModel
from api.db import get_cursor


class Response(BaseModel):
    namespaces: list[str]


def get() -> Response:
    cur = get_cursor()
    try:
        cur.execute("SELECT name from namespace")
        return Response(namespaces=[row[0] for row in cur.fetchall()])
    finally:
        cur.close()
