# Build the Go API
FROM golang:1.17.3 AS builder
ADD . /app
WORKDIR /app/server
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags "-w" -a -o /main cmd/expense-tracker/main.go

# Build the VueJS application
FROM node:17 AS node_builder
WORKDIR /app/client
COPY --from=builder /app/client .
RUN npm install -g @quasar/cli
RUN npm install
RUN npm run build

# Final stage build, this will be the container
# that we will deploy to production
FROM alpine:latest
RUN apk --no-cache add ca-certificates
COPY --from=builder /main ./
COPY --from=builder /app/server/migrations ./migrations
COPY --from=node_builder /app/client/dist ./web/dist
RUN chmod +x ./main
CMD ./main
