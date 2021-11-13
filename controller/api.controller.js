var express = require('express');
var router = express.Router();
var apiservice = require('../services/api.service');
router.get('/list',getAll)

module.exports = router;

function getAll(req,res){
    // apiservice.list().then(function(data){
    //     res.send(data);
    //  }).catch(function (err) {
    //     res.status(400).send(err);
    // });

    res.send(apiservice.list());
}


















