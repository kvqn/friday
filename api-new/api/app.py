from fastapi import FastAPI
from api.db import get_cursor


app = FastAPI()


@app.get("/ping")
async def ping():
    cur = get_cursor()
    cur.execute("SELECT * FROM logs limit 1")
    result = cur.fetchall()
    return {"ping": result}


import api.get_logs
import api.put_log
