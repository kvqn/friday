from fastapi import APIRouter

router = APIRouter(prefix="/logs")

from .put import put
from .post import post

# router.put("/")(put)
# router.post("/")(post)
router.add_api_route("/", put, methods=["PUT"])
router.add_api_route("/", post, methods=["POST"])

from .count import router as router_count

router.include_router(router_count)
