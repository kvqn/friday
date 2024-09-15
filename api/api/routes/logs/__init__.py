from fastapi import APIRouter

from .count import router as router_count
from .post import post
from .put import put

router = APIRouter(prefix="/logs")

router.add_api_route("/", put, methods=["PUT"])
router.add_api_route("/", post, methods=["POST"])

router.include_router(router_count)
