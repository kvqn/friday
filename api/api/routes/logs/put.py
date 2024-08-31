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
        queries = [
            f"INSERT INTO namespace (name) VALUES ('{log.namespace}') on duplicate key update id=id",
            f"INSERT INTO topic (name) VALUES ('{log.topic}') on duplicate key update id=id",
            f"INSERT INTO namespace_topic (namespace_id, topic_id) VALUES ((SELECT id FROM namespace WHERE name='{log.namespace}'), (SELECT id FROM topic WHERE name='{log.topic}')) on duplicate key update id=id",
            f"INSERT INTO log (namespace_topic_id, level, data) VALUES ((SELECT id FROM namespace_topic WHERE namespace_id=(SELECT id FROM namespace WHERE name='{log.namespace}') AND topic_id=(SELECT id FROM topic WHERE name='{log.topic}')), '{log.level}', '{log.data}')",
        ]
        query = " ; ".join(queries)
        cur.execute(query)
    finally:
        cur.close()
    return "success"
