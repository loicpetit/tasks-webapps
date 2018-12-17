docker build -t task-webapps ..
docker run --rm --detach --name task-webapps --publish 4000:80 -v $pwd\..\src\html\:/usr/share/nginx/html/html/ task-webapps
