rootdir=$(pwd)

# Check Formatting
cd ./sdks/python/friday-logger
source .venv/bin/activate
black --check .
python_formatting_status=$?
if [ $python_formatting_status -ne 0 ]; then
    echo "Python formatting failed"
else
    echo "Python formatting passed"
fi
cd $rootdir

# Starting the API server

cd ./api
docker compose down
docker compose up -d --build
api_container=$(docker compose ps --all --format json | jq -r 'select(.Image == "api-api") | .ID')
api_ip=$(docker inspect $api_container | jq -r '.[0] | .NetworkSettings.Networks.[] | .IPAddress')
cd $rootdir

# Running tests for Python SDK

cd ./sdks/python/friday-logger
echo Running python tests
source .venv/bin/activate
FRIDAY_ENDPOINT="http://$api_ip:8000" hatch test
python_test_status=$?
if [ $python_test_status -ne 0 ]; then
    echo "Python tests failed"
else
    echo "Python tests passed"
fi
cd $rootdir

echo "Stopping services"

# Stopping the API server

cd api
docker compose down

cd ..

if [ $python_test_status -ne 0 ]; then
    exit 1
fi
