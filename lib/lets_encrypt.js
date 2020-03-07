'use strict'

const request = require('request-promise-native')

const acme = require('./acme')

const directoryUrl = 'https://acme-staging-v02.api.letsencrypt.org/directory'


const ACTIONS = {
  keyChange: 'keyChange',
  newAccount: 'newAccount',
  newNonce: 'newNonce',
  newOrder: 'newOrder',
  revokeCert: 'revokeCert',
}

const getDirectory = async () => {
  const options = {
    uri: directoryUrl,
  }

  const res = await request.get(options)
  let parsed

  try {
    parsed = JSON.parse(res)
  }
  catch (err) {
    console.log(`Error parsing JSON from directory response: ${res}`)
    throw err
  }

  return parsed
}

const getNonce = async url => {

  const options = {
    uri: url,
  }

  const res = await request.head(options)
  return res['replay-nonce']
}


const makeRequest = async (action, payload, keypairs) => {
  const directory = await getDirectory(action)

  const actionUrl = directory[action]
  const nonceUrl = directory[ACTIONS.newNonce]

  const nonce = await getNonce(nonceUrl)

  const res = await acme.makeSignedRequest(actionUrl, payload, nonce, keypairs)
  return res
}


module.exports = {
  ACTIONS,
  makeRequest,
}
