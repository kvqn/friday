
docker compose -f docker-compose-python.yml down
docker compose -f docker-compose-python.yml up --build --abort-on-container-exit
exit_status=$?
docker compose -f docker-compose-python.yml down

if [ $exit_status -ne 0 ]; then
    echo "Tests failed"
    exit 1
fi

echo "Tests passed"
