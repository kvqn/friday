from datetime import datetime
from friday.types import (
    Log,
    Level,
    GetLogsRequest,
    Order,
    LogsResponse,
)
from typing import List, Optional
from friday._utils import request_with_retry


def urljoin(*args):
    return "/".join(map(lambda x: str(x).strip("/"), args))


class Aggregator:
    def __init__(self, endpoint: str):
        self.endpoint = endpoint

    # TODO: infer these types from QueryInput
    def query(
        self,
        limit: int = 1,
        offset: int = 0,
        namespace: Optional[str] = None,
        topics: list[str] = [],
        levels: list[Level] = [],
        before: Optional[datetime] = None,
        after: Optional[datetime] = None,
        order: Order = Order.DESC,
    ) -> List[Log]:
        req_body = GetLogsRequest(
            limit=limit,
            offset=offset,
            namespace=namespace,
            topics=topics,
            levels=levels,
            before=before,
            after=after,
            order=order,
        )

        resp = request_with_retry(
            "POST", urljoin(self.endpoint, "logs"), json=dict(req_body)
        )

        json = resp.json()
        data = LogsResponse(**json)
        parsed_data = [log for log in data.logs]
        return parsed_data

    def count(
        self,
        namespace: Optional[str] = None,
        topics: list[str] = [],
        levels: list[Level] = [],
        before: Optional[datetime] = None,
        after: Optional[datetime] = None,
    ) -> List[Log]:
        req_body = {
            "namespace": namespace,
            "topics": topics,
            "levels": levels,
            "before": before,
            "after": after,
        }

        resp = request_with_retry(
            "POST", urljoin(self.endpoint, "logs", "count"), json=req_body
        )

        json = resp.json()
        return json["count"]
