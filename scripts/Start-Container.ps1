docker build -t task-webapps ..
docker run --rm --detach --name task-webapps -d -p 4000:80 task-webapps
