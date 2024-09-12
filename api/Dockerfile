FROM python:3.11-bookworm

EXPOSE 8000

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY api api

ENTRYPOINT ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000", "--log-level", "error"]

