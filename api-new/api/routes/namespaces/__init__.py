from fastapi import APIRouter

router = APIRouter(prefix="/namespaces")

from .get import get

router.add_api_route("/", get, methods=["GET"])
