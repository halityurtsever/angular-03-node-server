var http = require('http');
var formadible = require('formidable');
var util = require('util');

var server = http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method.toLowerCase() == 'post') {
        processForm(req, res);
        return;
    }

    if (req.method.toLowerCase() == 'get') {
        var data = {
            data: {
                languages: [
                    'English',
                    'Turkish',
                    'German',
                    'Bulgarian',
                    'Spanish',
                    'Other'
                ]
            }
        };

        var responseData = JSON.stringify(data);
        res.end(responseData);
        console.log('get: ', responseData);
        return;
    }

    res.end();
});

function processForm(req, res) {
    var form = formadible.IncomingForm();

    form.parse(req, function (err, fields) {

        fields.id = '123BVC';

        res.writeHead(200, { 'content-type': 'text/plain' });

        var data = JSON.stringify({ fields: fields });
        res.end(data);

        console.log('posted fields:\n');
        console.log(data);
    });
}

var port = 3100;
server.listen(port);
console.log('Server listening on port ' + port);