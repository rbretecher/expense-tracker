.PHONY: start

start:
	docker-compose up

db:
	docker exec -it expense-tracker-postgres psql -U postgres --dbname=expense-tracker
