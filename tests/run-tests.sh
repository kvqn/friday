
docker compose down
docker compose up --build --abort-on-container-exit
exit_status=$?
docker compose down

if [ $exit_status -ne 0 ]; then
    echo "Tests failed"
    exit 1
fi

echo "Tests passed"
