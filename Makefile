.PHONY: start db

start:
	docker-compose up

db:
	docker exec -it expensetracker_db psql -U postgres --dbname=expense-tracker
