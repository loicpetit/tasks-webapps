docker build -t task-webapps ..
docker run `
    --rm `
    --detach `
    --name task-webapps `
    --publish 4000:80 `
    -v $pwd\..\src\html\:/usr/share/nginx/html/html/ `
    -v $pwd\..\src\html-handlebars\dist\:/usr/share/nginx/html/html-handlebars/dist/ `
    task-webapps
