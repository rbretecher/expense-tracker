FROM golang:1.15

WORKDIR /app

ENV GO111MODULE on

# Download modd for app hot reloading
RUN go get -u github.com/cortesi/modd/cmd/modd

# Download wait for it tool
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it
RUN chmod +x /wait-for-it
