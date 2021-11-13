var Q = require('q');
var service = {};

service.list = getAllContainers;

module.exports = service;


const https = require('http');

function getAllContainers() {
    var deferred = Q.defer();

    const options = {        
        hostname: 'localhost',
        port: 2375,        
        path: '/containers/json?all=true',
        headers: {
        },
        method: 'GET',
    }

    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', function (chunk) {
            debugger;
             //process.stdout.push(d);
             var resultado  = chunk;             
             deferred.resolve(JSON.parse(resultado));
        })
    })

    req.on('error', error => {
        console.error(error)
    })

    req.end();
    return deferred.promise;
}

