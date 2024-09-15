FROM python:3.11-bookworm

EXPOSE 8000

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY api api

HEALTHCHECK --interval=5s --timeout=3s --retries=3 \
  CMD test $(curl http://localhost:8000/ping/) = '{"ping":"pong"}'

ENTRYPOINT ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]

