echo 'Building containers locally'
docker build -f services/dockerfile -t yuricampolongo/timezone-tokyo-service .
docker build -f portal/dockerfile -t yuricampolongo/timezone-tokyo-portal .

echo 'starting application'
docker compose up