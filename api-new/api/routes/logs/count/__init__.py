from fastapi import APIRouter

router = APIRouter(prefix="/count")

from .post import post

router.add_api_route("/", post, methods=["POST"])
