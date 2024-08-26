
build:
	docker build -t friday-api .

compose: build
	docker compose up -d

dev:
	fastapi dev api --host 0.0.0.0 --port 5000
	
