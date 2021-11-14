var express = require('express');
var router = express.Router();
var apiservice = require('../services/api.service');
router.get('/list', getAll);
router.delete('/imagem/delete/:_id', deleteImage);
router.post('/imagem/deleteAll', deleteAllImage);
router.post('/imagem/pull',pullImage);

module.exports = router;

function getAll(req, res) {
    apiservice.list().then(function (d) {        
        if (d) {
            res.send(d);
        } else {
            res.sendStatus(404);
        }

    }).catch(function (err) {
        res.status(400).send(err);
    });

}

function deleteImage(req,res) {
    var imageId = req.params._id;
  
    apiservice.deleteImage(imageId).then((data)=>{
        if (data) {
            res.send(data);
        } else {
            res.sendStatus(404);
        }

    }).catch(function (err) {
        res.status(400).send(err);
    });    
}

function deleteAllImage(req,res) {
   
    apiservice.deleteAllImages(req.body).then((data)=>{
        if (data) {
            res.send(data);
        } else {
            res.sendStatus(404);
        }

    }).catch(function (err) {
        res.status(400).send(err);
    });    
}

function pullImage(req,res) {
   var name = req.body.name;
    apiservice.pullImage(name).then((data)=>{
        if (data) {
            res.send(data);
        } else {
            res.sendStatus(404);
        }

    }).catch(function (err) {
        res.status(400).send(err);
    });    
}


















