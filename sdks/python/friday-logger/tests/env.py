from os import getenv

_FRIDAY_ENDPOINT = getenv("FRIDAY_ENDPOINT")
assert _FRIDAY_ENDPOINT, "Missing environment variable: FRIDAY_ENDPOINT"
FRIDAY_ENDPOINT = _FRIDAY_ENDPOINT
