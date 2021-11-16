const express = require('express')
const router = express.Router()
const apiservice = require('../services/api.service')
router.get('/list', getAll)
router.delete('/imagem/delete/:_id', deleteImage)
router.post('/imagem/deleteAll', deleteAllImage)
router.post('/imagem/pull', pullImage)
router.get('/listimg', getAllImages)
router.post('/containers/delete', deleteAllCont)
router.delete('/remove/:id', remove)
router.post('/create', create)
module.exports = router

async function remove (req, res) {
  const name = req.params.id
  const response = await apiservice.deleteContainer(name)
  res.send(response)
}

function getAll (req, res) {
  apiservice.list().then(function (d) {
    if (d) {
      res.send(d)
    } else {
      res.sendStatus(404)
    }
  }).catch(function (err) {
    res.status(400).send(err)
  })
}

// Método show images
function getAllImages (req, res) {
  apiservice.listimg().then(function (d) {
    if (d) {
      res.send(d)
    } else {
      res.sendStatus(404)
    }
  }).catch(function (err) {
    res.status(400).send(err)
  })
}

function deleteImage (req, res) {
  const imageId = req.params._id

  apiservice.deleteImage(imageId).then((data) => {
    if (data) {
      res.send(data)
    } else {
      res.sendStatus(404)
    }
  }).catch(function (err) {
    res.status(400).send(err)
  })
}

// Método delete all containers
function deleteAllCont (req, res) {
  apiservice.deleteContainers().then(function (d) {
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

async function deleteAllImage (req, res) {
  apiservice.deleteAllImages(req.body).then((data) => {
    if (data) {
      res.send(data)
    } else {
      res.sendStatus(404)
    }
  }).catch(function (err) {
    res.status(400).send(err)
  })
}

function pullImage (req, res) {
  const name = req.body.name
  apiservice.pullImage(name).then((data) => {
    if (data) {
      res.send(data)
    } else {
      res.sendStatus(404)
    }
  }).catch(function (err) {
    res.status(400).send(err)
  })
}

async function create (req, res) {
  const name = req.body.name
  const image = req.body.image
  const port = req.body.port

  const response = await apiservice.createContainer(name, image, port)
  res.send(response)
}
