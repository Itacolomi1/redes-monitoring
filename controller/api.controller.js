var express = require('express');
var router = express.Router();
var apiservice = require('../services/api.service');
router.get('/list', getAll);
router.delete('/imagem/delete/:_id', deleteImage);

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



















