const express = require('express')
const router = express.Router()
const apiservice = require('../services/api.service')
router.get('/list', getAll)
router.delete('/remove/:id', remove)
router.post('/create', create)
module.exports = router

function getAll (req, res) {
  apiservice.list().then(function (d) {
    debugger
    if (d) {
      res.send(d)
    } else {
      res.sendStatus(404)
    }
  }).catch(function (err) {
    res.status(400).send(err)
  })
}

async function remove (req, res) {
  const name = req.params.id
  const response = await apiservice.deleteContainer(name)
  res.send(response)
}

async function create (req, res) {
  const name = req.body.name
  const image = req.body.image
  const port = req.body.port

  const response = await apiservice.createContainer(name, image, port)
  res.send(response)
}
