from api.app import app
from pydantic import BaseModel
from typing import Optional
from enum import Enum
from datetime import datetime
from api.db import get_cursor


class NamespaceAndTopic(BaseModel):
    namespace: str
    topic: str


class Level(str, Enum):
    DEBUG = "DEBUG"
    INFO = "INFO"
    WARNING = "WARNING"
    ERROR = "ERROR"
    CRITICAL = "CRITICAL"


class Order(str, Enum):
    ASC = "ASC"
    DESC = "DESC"


class Log(BaseModel):
    id: int
    timestamp: datetime
    namespace: str
    topic: str
    level: Level
    data: str


class LogsResponse(BaseModel):
    logs: list[Log]


class GetLogsRequest(BaseModel):
    limit: int = 1
    offset: int = 0
    namespaces: list[str] = []
    topics: list[str] = []
    namespaces_and_topics: list[NamespaceAndTopic] = []
    level: Optional[Level] = None
    before: Optional[datetime] = None
    after: Optional[datetime] = None
    order: Order = Order.DESC


def _and(*conditions: str | None):
    filtered = [i for i in conditions if i]
    if not filtered:
        return None
    return " AND ".join(filtered)


def _or(*conditions: str | None):
    filtered = [i for i in conditions if i]
    if not filtered:
        return None
    return " OR ".join(filtered)


def _join(*parts: str | None):
    filtered = [i for i in parts if i]
    if not filtered:
        return None
    return " ".join(filtered)


@app.get("/logs")
def get_logs(request: GetLogsRequest):
    conditions = _and(
        f"level = '{request.level.value}'" if request.level else None,
        _or(*(f"namespace = '{namespace}'" for namespace in request.namespaces)),
        _or(*(f"topic = '{topic}'" for topic in request.topics)),
        _or(
            *(
                _and(
                    f"namespace = '{nt.namespace}'",
                    f"topic = '{nt.topic}'",
                )
                for nt in request.namespaces_and_topics
            )
        ),
        (
            f"timestamp < '{request.before.strftime('%Y-%m-%d %H:%M:%S')}'"
            if request.before
            else None
        ),
        (
            f"timestamp > '{request.after.strftime('%Y-%m-%d %H:%M:%S')}'"
            if request.after
            else None
        ),
    )
    query = _join(
        "SELECT * FROM logs",
        f"WHERE {conditions}" if conditions else None,
        f"ORDER BY timestamp {request.order.value}",
        f"LIMIT {request.limit}",
        f"OFFSET {request.offset}",
    )

    assert query is not None

    cur = get_cursor()
    try:
        print("Got cursor")
        print("Running query", query)
        cur.execute(query)
        result = cur.fetchall()

        return LogsResponse(
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
