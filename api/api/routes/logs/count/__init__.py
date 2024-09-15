from fastapi import APIRouter

from .post import post

router = APIRouter(prefix="/count")


router.add_api_route("/", post, methods=["POST"])
