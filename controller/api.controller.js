var express = require('express');
var router = express.Router();
var apiservice = require('../services/api.service');
router.get('/list', getAll)
router.delete("/remove/:id",remove)
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

 async function remove(req, res) {
    const response = await apiservice.deleteContainer(req.params.id)
    res.send(response);
}



















