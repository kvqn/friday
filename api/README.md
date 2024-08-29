# Deploying

Tested on Python 3.11

The API uses a MySQL / MariaDB database. Following environment variables are required.

- `MARIA_HOST`
- `MARIA_PORT`
- `MARIA_USER`
- `MARIA_PASS`
- `MARIA_DATABASE`

## Deploying locally

```
fastapi run api --host 0.0.0.0
```

## Docker

The image is at [kvqn/friday-api](https://hub.docker.com/r/kvqn/friday-api) on dockerhub.

```
docker run \
    -d \
    --name friday-api \
    -e MARIA_HOST="MARIA_HOST" \
    -e MARIA_PORT="MARIA_PORT" \
    -e MARIA_USER="MARIA_USER" \
    -e MARIA_PASS="MARIA_PASS" \
    -e MARIA_DATABASE="MARIA_DATABASE" \
    kvqn/friday-api
```

or using compose

```
services:
  friday-api:
    image: kvqn/friday-api
    restart: always
    environment:
    - MARIA_DATABASE=friday
    - MARIA_USER=kvqn
    - MARIA_PASS=kvqn
    - MARIA_HOST=172.17.0.1
    - MARIA_PORT=3306
```

# API Docs

See the
[Swagger](https://friday-api.guneet-homelab.duckdns.org/docs)

## PUT: `/logs`

Create a log

| Param     | Type                                                     |
| --------- | -------------------------------------------------------- |
| namespace | string                                                   |
| topic     | string                                                   |
| level     | string (`DEBUG`, `INFO`, `WARNING`, `ERROR`, `CRITICAL`) |
| data      | string                                                   |

## POST: `/logs`

Query logs

| Param     | Type                                                             | Default                     | Meaning                              |
| --------- | ---------------------------------------------------------------- | --------------------------- | ------------------------------------ |
| namespace | string                                                           | All namespaces are included | Namespace                            |
| topics    | list of string                                                   | All topics are included     | Topics to include in the results     |
| levels    | list of string (`DEBUG`, `INFO`, `WARNING`, `ERROR`, `CRITICAL`) | All levels are include      | Log levels to include in the results |
| limit     | int                                                              | 1                           | Max number of logs to retrieve       |
| offset    | int                                                              | 0                           | Offset by this number of logs        |
| before    | ISO formatted date                                               | -                           | Maximum log timestamp                |
| after     | ISO formatted date                                               | -                           | Minimum log timestamp                |

## POST: `/logs/count`

Count the logs that match the query. The parametes are same, only without the `limit` and `offset`.

| Param     | Type                                                             | Default                     | Meaning                              |
| --------- | ---------------------------------------------------------------- | --------------------------- | ------------------------------------ |
| namespace | string                                                           | All namespaces are included | Namespace                            |
| topics    | list of string                                                   | All topics are included     | Topics to include in the results     |
| levels    | list of string (`DEBUG`, `INFO`, `WARNING`, `ERROR`, `CRITICAL`) | All levels are include      | Log levels to include in the results |
| before    | ISO formatted date                                               | -                           | Maximum log timestamp                |
| after     | ISO formatted date                                               | -                           | Minimum log timestamp                |

## GET: `/namespaces`

Get the namespaces

## GET: `/topics`

Get topics under a namespace

| Param     | Type   | Default                     | Meaning   |
| --------- | ------ | --------------------------- | --------- |
| namespace | string | All namespaces are included | Namespace |
