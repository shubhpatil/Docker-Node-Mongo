# Docker-Node-Mongo

```bash
# Run in Docker
docker-compose up -d
# use -d flag to run in background

# Docker Tear down
docker-compose down

# Docker re-build
docker-compose build
```

- Remove dangling images

```
$ docker rmi $(docker images -f "dangling=true" -q)
```
