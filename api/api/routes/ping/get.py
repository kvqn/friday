from typing import Literal

from pydantic import BaseModel


class Response(BaseModel):
    ping: Literal["pong"]


def get() -> Response:
    return {"ping": "pong"}
