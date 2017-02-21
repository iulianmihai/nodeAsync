var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
    if (req.url === '/') {
        fs.readFile('./data.json', function (err, data) {
            if (err) {
                console.log(err);
                res.end('Server Error');
            } else {
                var titles = JSON.parse(data.toString());

                fs.readFile('./template.html', function (err, htmlData) {
                    if (err) {
                        console.log(err);
                        res.end('Server Error');
                    } else {
                        var tmpl = htmlData.toString();
                        var html = tmpl.replace('%', titles.join('</li><li>'));
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end(html);
                    }
                });
            }
        });
    }
}).listen(8000, 'localhost');

