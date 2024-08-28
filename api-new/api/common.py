from pydantic import BaseModel
from datetime import datetime
from enum import Enum


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


def _and(*conditions: str | None):
    filtered = [i for i in conditions if i]
    if not filtered:
        return None
    return f'( {" AND ".join(filtered)} )'


def _or(*conditions: str | None):
    filtered = [i for i in conditions if i]
    if not filtered:
        return None
    return f'( {" OR ".join(filtered)} )'


def _join(*parts: str | None):
    filtered = [i for i in parts if i]
    if not filtered:
        return None
    return " ".join(filtered)


__all__ = [
    "Level",
    "Order",
    "Log",
    "_and",
    "_or",
    "_join",
]
