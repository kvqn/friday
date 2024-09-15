from random import randint

import pytest

from friday import Aggregator, Logger
from tests.env import FRIDAY_ENDPOINT

print("FRIDAY_ENDPOINT", FRIDAY_ENDPOINT)


def randomString(length=None):
    letters = "abcdefghijklmnopqrstuvwxyz"
    if not length:
        length = randint(10, 100)
    return "".join([letters[randint(0, 25)] for i in range(length)])


def _test(namespace, topic, level):
    @pytest.mark.timeout(5)
    def func():
        logger = Logger(
            name="test", endpoint=FRIDAY_ENDPOINT, namespace=namespace, topic=topic
        )
        aggregator = Aggregator(endpoint=FRIDAY_ENDPOINT)

        message = randomString()
        match level:
            case "DEBUG":
                logger.debug(message)
            case "INFO":
                logger.info(message)
            case "WARNING":
                logger.warning(message)
            case "ERROR":
                logger.error(message)
            case "CRITICAL":
                logger.critical(message)

        assert (
            aggregator.query(
                namespace=namespace,
                topics=[topic] if topic else [],
                limit=1,
                levels=[level],
            )[0].data
            == message
        )

    return func


test_default_debug = _test(None, None, "DEBUG")
test_default_info = _test(None, None, "INFO")
test_default_warning = _test(None, None, "WARNING")
test_default_error = _test(None, None, "ERROR")
test_default_critical = _test(None, None, "CRITICAL")


test_namespace_debug = _test(randomString(), None, "DEBUG")
test_namespace_info = _test(randomString(), None, "INFO")
test_namespace_warning = _test(randomString(), None, "WARNING")
test_namespace_error = _test(randomString(), None, "ERROR")
test_namespace_critical = _test(randomString(), None, "CRITICAL")

test_topic_debug = _test(None, randomString(), "DEBUG")
test_topic_info = _test(None, randomString(), "INFO")
test_topic_warning = _test(None, randomString(), "WARNING")
test_topic_error = _test(None, randomString(), "ERROR")
test_topic_critical = _test(None, randomString(), "CRITICAL")

test_namespace_topic_debug = _test(randomString(), randomString(), "DEBUG")
test_namespace_topic_info = _test(randomString(), randomString(), "INFO")
test_namespace_topic_warning = _test(randomString(), randomString(), "WARNING")
test_namespace_topic_error = _test(randomString(), randomString(), "ERROR")
test_namespace_topic_critical = _test(randomString(), randomString(), "CRITICAL")
