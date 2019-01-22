// DEPENDENCIES
var handlebars = require('handlebars')
var fs = require('fs')

// DATA
var data = {
    title: 'Task Web App - HTML - Handlebars',
    author: 'LPT'
}

// COMPILE un fichier
fs.readFile(__dirname + '/../src/pages/index.html', 'utf-8', (err, content) => {
    if(err){
        console.log('Error during file read', err)
        return;
    }
    var template = handlebars.compile(content)
    var html = template(data)
    fs.writeFile(__dirname + '/../dist/index.html', html, 'utf-8', (err) => {
        if(err){
            console.log('Error during file write', err)
            return;
        }
    })
});
