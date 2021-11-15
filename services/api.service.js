const Q = require('q')
const service = {}

service.list = getAllContainers
service.deleteContainer = deleteContainer
service.createContainer = createContainer
module.exports = service

const https = require('http')
const request = require('request')

const { async } = require('q')

function getAllContainers () {
  const deferred = Q.defer()

  const options = {
    hostname: 'localhost',
    port: 2375,
    path: '/containers/json?all=true',
    headers: {
    },
    method: 'GET'
  }

  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', function (chunk) {
      debugger
      // process.stdout.push(d);
      const resultado = chunk
      deferred.resolve(JSON.parse(resultado))
    })
  })

  req.on('error', error => {
    console.error(error)
  })

  req.end()
  return deferred.promise
}

function deleteContainer (nameOrId) {
  const options = {
    url: 'http://localhost:2375/containers/' + nameOrId + '?force=true',
    json: true
  }

  request.delete(options, (err, res, body) => {
    if (err) {
      return console.log(err)
    }
    console.log(`Status: ${res.statusCode}`)
  })
}

async function createContainer (name, image, port) {
  const data = JSON.stringify({
    Hostname: '',
    Domainname: '',
    User: '',
    AttachStdin: false,
    AttachStdout: true,
    AttachStderr: true,
    Tty: false,
    OpenStdin: false,
    StdinOnce: false,
    Image: image,
    ExposedPorts: { '80/tcp': {} },
    HostConfig: { PortBindings: { '80/tcp': [{ HostPort: port.toString() }] } }
  })

  const options = {
    hostname: 'localhost',
    port: 2375,
    path: '/containers/create?name=' + name,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }

  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
      process.stdout.write(d)
    })
  })

  req.on('error', error => {
    console.error(error)
  })

  req.write(data)
  req.end()
}
