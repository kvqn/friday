# API Docs

See the
[Swagger](https://friday-api.guneet-homelab.duckdns.org/docs)

## PUT: `/logs`

Create a log

| Param     | Type                                                             |
| --------- | ---------------------------------------------------------------- |
| namespace | string                                                           |
| topic    | string|
| level    | string (`DEBUG`, `INFO`, `WARNING`, `ERROR`, `CRITICAL`) |
| data | string |

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

| Param     | Type                                                             | Default                     | Meaning                              |
| --------- | ---------------------------------------------------------------- | --------------------------- | ------------------------------------ |
| namespace | string                                                           | All namespaces are included | Namespace                            |
