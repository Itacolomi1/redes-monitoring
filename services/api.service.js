var Q = require('q');
var service = {};

service.list = getAllContainers;
service.deleteImage = deleteImage;
service.deleteAllImages = deleteAllImages;
service.pullImage =pullImage;
service.listimg= getAllImages;
service.deleteContainers=deleteAllContainers;


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


 function deleteImage(ID){   
    var deferred = Q.defer();
    const options = {        
        hostname: 'localhost',
        port: 2375,        
        path: `/images/${ID}?force=true`,
        headers: {
        },
        method: 'DELETE',
    }

    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', function (chunk) {            
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


function getAllImages() {
    var deferred = Q.defer();

    const options = {        
        hostname: 'localhost',
        port: 2375,        
        path: '/images/json?all=true',
        headers: {
        },
        method: 'GET',
    }

    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', function (chunk) {
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

  function deleteAllImages(){ 
    //let listaImages = [];
    var deferred = Q.defer();

    getAllImages().then((data)=>{
        if(data){
            deferred.resolve(true);
            data.forEach((item,index)=>{

                deleteImage(getID(item.Id)).then((data)=>{
                    if(data){
                        console.log(item.Id + "Foi deletada");
                    }
                })                
            })
        }
        else{deferred.resolve(false);}

    });
    return deferred.promise;
}

function pullImage(name){ 
    
    var deferred = Q.defer();
    const options = {        
        hostname: 'localhost',
        port: 2375,        
        path: `/images/create?fromImage=${name}`,
        headers: {
            'Content-Type': 'application/json',            
        },
        method: 'POST',
    };

    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', function (chunk) {                           
             var resultado  = chunk;             
             deferred.resolve(JSON.parse(resultado));
        })
    });

    req.on('error', error => {
        console.error(error)
    });
    
    req.end();
    return deferred.promise;

}

function deleteAllContainers() {
    var deferred = Q.defer();

    const options = {        
        hostname: 'localhost',
        port: 2375,        
        path: '/containers/prune', 
        headers: {
        },
        method: 'POST',
    }
    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', function (chunk) {

            
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


function getID(quaseID){
    return quaseID.substring(7);

}


