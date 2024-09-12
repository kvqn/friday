from fastapi import APIRouter

from .get import get

router = APIRouter(prefix="/topics")

router.add_api_route("/", get, methods=["GET"])
