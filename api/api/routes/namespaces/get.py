from pydantic import BaseModel
from api.db import get_connection


class Response(BaseModel):
    namespaces: list[str]


def get() -> Response:
    conn = get_connection()
    cur = conn.cursor()

    try:
        cur.execute("SELECT name from namespace")
        return Response(namespaces=[row[0] for row in cur.fetchall()])
    finally:
        cur.close()
        conn.close()
