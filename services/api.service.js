
var service = {};

service.list = getAllContainers;

module.exports = service;


// private url ='localhost:2375/containers/json';
const url = "viacep.com.br/ws/01001000/json/";


function getAllContainers() {
    try {
        var XMLHttpRequest = require('xhr2');
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, false);
        xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor

        return xhttp.responseText;

    } catch (e) {
        console.log(e);
    }


}


