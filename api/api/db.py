import mariadb
from api.env import MARIA_HOST, MARIA_PORT, MARIA_USER, MARIA_PASS, MARIA_DATABASE

_conn = mariadb.connect(
    host=MARIA_HOST,
    port=MARIA_PORT,
    user=MARIA_USER,
    password=MARIA_PASS,
    database=MARIA_DATABASE,
)

_conn.auto_reconnect = True
_conn.autocommit = True


def get_cursor():
    return _conn.cursor()
