.PHONY: docker-dev docker-deploy

docker-dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

docker-deploy:
	docker-compose -f docker-compose.yml -f docker-compose.deploy.yml up

docker-deploy-functions:
	docker-compose -f docker-compose.yml -f docker-compose.deploy-functions.yml up
