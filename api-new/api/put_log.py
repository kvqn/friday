from api.app import app
from pydantic import BaseModel
from api.db import get_cursor


class PutLogsRequest(BaseModel):
    namespace: str
    topic: str
    level: str
    data: str


@app.put("/logs")
def put_log(log: PutLogsRequest):
    cur = get_cursor()
    query = f"INSERT INTO logs (namespace, topic, level, data) VALUES ('{log.namespace}', '{log.topic}', '{log.level}', '{log.data}')"
    cur.execute(query)
