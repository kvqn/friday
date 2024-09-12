from fastapi import APIRouter

from .get import get

router = APIRouter(prefix="/ping")

router.add_api_route("/", get, methods=["GET"])
