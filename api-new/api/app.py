from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi import Request, status
import logging
from fastapi import FastAPI
from api.db import get_cursor


app = FastAPI()


@app.get("/ping")
async def ping():
    cur = get_cursor()
    cur.execute("SELECT * FROM logs limit 1")
    result = cur.fetchall()
    return {"ping": result}


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    exc_str = f"{exc}".replace("\n", " ").replace("   ", " ")
    logging.error(f"{request}: {exc_str}")
    content = {"status_code": 10422, "message": exc_str, "data": None}
    return JSONResponse(
        content=content, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY
    )


import api.put_log
import api.get_logs
