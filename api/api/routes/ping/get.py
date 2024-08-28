from pydantic import BaseModel
from typing import Literal


class Response(BaseModel):
    ping: Literal["pong"]


def get() -> Response:
    return {"ping": "pong"}
