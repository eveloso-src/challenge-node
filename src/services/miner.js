const SHA256 = require('crypto-js/sha256')

module.exports = function (data) {
  let hash = data
  const difficulty = 5
  let nonce = 0

  while (hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
    nonce++
    hash = SHA256(hash + nonce).toString()
  }

  console.log(`Done mining hash: ${data}`)

  return hash
}
