var express = require('express');
var router = express.Router();
var apiservice = require('../services/api.service');
router.get('/list', getAll)
router.get('/listimg', getAllImages)

module.exports = router;

function getAll(req, res) {
    apiservice.list().then(function (d) {
        debugger;
        if (d) {
            res.send(d);
        } else {
            res.sendStatus(404);
        }

    }).catch(function (err) {
        res.status(400).send(err);
    });

}

//Método show images
function getAllImages(req, res) {
    apiservice.listimg().then(function (d) {
        debugger;
        if (d) {
            res.send(d);
        } else {
            res.sendStatus(404);
        }

    }).catch(function (err) {
        res.status(400).send(err);
    });

}

// comentarios aleatorios 2 alteração muito maneira


















