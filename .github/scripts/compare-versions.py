from argparse import ArgumentParser
from packaging.version import Version

parser = ArgumentParser(
    "compare-versions",
    description="""
    Compares the two versions.
    Returns error code 1 if new version is not newer than old version. 
    Returns error code 2 if new version is not valid. 
    Returns error code 3 if old version is not valid.
    """,
)

parser.add_argument("old")
parser.add_argument("new")

args = parser.parse_args()

try:
    old_version = Version(args.old)
except:
    print("Old version is not a valid version.")
    exit(3)

try:
    new_version = Version(args.new)
except:
    print("New version is not a valid version.")
    exit(2)

if new_version > old_version:
    print("Success. New version is greater than old version.")
    exit(0)
else:
    print("New version is not greater than old version")
    exit(1)
