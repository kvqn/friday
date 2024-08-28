from fastapi import APIRouter

router = APIRouter()

from api.routes.logs import router as router_logs
from api.routes.ping import router as router_ping
from api.routes.namespaces import router as router_namespaces
from api.routes.topics import router as router_topics

router.include_router(router_logs)
router.include_router(router_ping)
router.include_router(router_namespaces)
router.include_router(router_topics)
