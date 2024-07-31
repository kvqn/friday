from typing import TypedDict, List, Optional
from datetime import datetime
from enum import Enum


class NamespaceAndTopics(TypedDict):
    namespace: str
    topic: str


class LevelEnum(Enum):
    DEBUG = "DEBUG"
    INFO = "INFO"
    WARNING = "WARNING"
    ERROR = "ERROR"
    CRITICAL = "CRITICAL"


class QueryInput(TypedDict):
    namespace_and_topics: List[NamespaceAndTopics]
    level: Optional[LevelEnum]
    before: Optional[datetime]
    after: Optional[datetime]
    limit: Optional[int]


class FridayLogRecord(TypedDict):
    id: int
    namespace: str
    topic: str
    level: LevelEnum
    data: str
    timestamp: datetime


DATETIME_FORMAT = "%Y-%m-%dT%H:%M:%S.%fZ"
