from pydantic import BaseModel
from typing import Literal
from api.db import get_cursor


class Request(BaseModel):
    namespace: str
    topic: str
    level: str
    data: str


def put(log: Request) -> Literal["success"]:
    cur = get_cursor()
    try:
        query = f"INSERT INTO logs (namespace, topic, level, data) VALUES ('{log.namespace}', '{log.topic}', '{log.level}', '{log.data}')"
        cur.execute(query)
    finally:
        cur.close()
    return "success"
