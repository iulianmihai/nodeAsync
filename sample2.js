var http = require('http');
var fs = require('fs');


var getTitles = function (res) {
    fs.readFile('./data.json', function (err, data) {
        if (err) {
            return hadError(err, res);
        }
        getTemplate(JSON.parse(data.toString()), res);
    });
};

var getTemplate = function (titles, res) {
    fs.readFile('./template.html', function (err, data) {
        if (err) {
            return hadError(err, res);
        }
        formatHtml(titles, data.toString(), res);
    });
};

var formatHtml =  function (titles, tmpl, res) {
    var html = tmpl.replace('%', titles.join('</li><li>'));
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
};

var hadError =  function (err, res) {
    console.log(err);
    res.end('Server Error');
};

var server = http.createServer(function (req, res) {
    if (req.url === '/') {
        getTitles(res);
    }
});

server.listen(8000, 'localhost');