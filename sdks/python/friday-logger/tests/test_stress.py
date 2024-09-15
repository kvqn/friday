import concurrent.futures

from friday import Aggregator, Logger
from tests.env import FRIDAY_ENDPOINT

aggregator = Aggregator(endpoint=FRIDAY_ENDPOINT)


def _test(logs: int, workers: int):
    def func():
        logger = Logger(
            name="stress-test",
            endpoint=FRIDAY_ENDPOINT,
            namespace="stress-test",
            topic=f"{logs}_{workers}",
        )
        with concurrent.futures.ThreadPoolExecutor(max_workers=workers) as executor:
            executor.map(
                lambda i: logger.debug(f"test_{logs}_{workers}: {i}"),
                range(logs),
                timeout=1,
            )
            executor.shutdown()
        assert (
            aggregator.count(namespace="stress-test", topics=[f"{logs}_{workers}"])
            == logs
        )

    return func


test_1k_10 = _test(1000, 10)
test_1k_100 = _test(1000, 100)

# def test_1k_10():
#     logger = Logger(name="stress-test", endpoint=FRIDAY_ENDPOINT,
#                     namespace="stress-test", topic="1k_10")
#     with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
#         executor.map(
#             lambda i: logger.debug(f"test_1k_10: {i}"),
#             range(1000),
#             timeout=5
#         )
#         executor.shutdown()
#     assert len(aggregator.query(namespace="stress-test",
#                topics=["1k_10"], limit=1000)) == 1000
#
#
# def test_1k_100():
#     logger = Logger(name="stress-test", endpoint=FRIDAY_ENDPOINT,
#                     namespace="stress-test", topic="1k_100")
#     with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
#         executor.map(
#             lambda i: logger.debug(f"test_1k_100: {i}"),
#             range(1000),
#             timeout=5
#         )
#         executor.shutdown()
#     assert len(aggregator.query(namespace="stress-test",
#                topics=["1k_100"], limit=1000)) == 1000
