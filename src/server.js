const express = require('express')
const config = require('./config')
const miner = require('./services/miner')


const {
  v4: uuidv4
} = require('uuid')
const {
  response
} = require('express')

const app = express()

app.get('/mine', (req, res) => {
  
  let {
    hashes
  } = req.query
  hashes = hashes || [uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4()]

  const reqId = uuidv4()
  console.time(`Time for request: ${reqId}`)


  doAsync(hashes)


  // console.timeEnd(`Time for request: ${reqId}`)

  res.status(200).json({

  })

})

function getPromiseMiner(x) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(miner(x));
    }, 0)
  })
}

async function doAsync(hashes) {
  var start = Date.now(),
    time;
  await Promise.all(
    hashes.map(x =>
      getPromiseMiner(x))
  )

}


module.exports = function () {
  app.listen(config.port, config.host, () => {
    console.log(`Running at http://${config.host}:${config.port}/`)
  })
}