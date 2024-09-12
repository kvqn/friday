import mariadb
from api.env import MARIA_HOST, MARIA_PORT, MARIA_USER, MARIA_PASS, MARIA_DATABASE
from time import sleep

pool = mariadb.ConnectionPool(
    host=MARIA_HOST,
    port=MARIA_PORT,
    user=MARIA_USER,
    password=MARIA_PASS,
    database=MARIA_DATABASE,
    pool_name="friday_api_pool",
    pool_size=5,
)


def get_connection():
    attempt = 0
    while True:
        try:
            conn = pool.get_connection()
        except mariadb.PoolError:
            attempt += 1
            sleep(0.1 * attempt)
        else:
            break

    conn.auto_reconnect = True
    conn.autocommit = True
    return conn
