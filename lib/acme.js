'use strict'

const crypto = require('crypto')
const Keypairs = require('@root/keypairs')
const request = require('request-promise-native')

const base64 = require('./base64')


const generateKeypairs = async () => {
  const options = {kty: 'RSA', modulusLength: 2048}
  const pair = await Keypairs.generate(options)

  const privatePem = await Keypairs.export({jwk: pair.private})
  const publicPem = await Keypairs.export({jwk: pair.public})

  return {
    publicJwk: pair.public,
    publicPem: publicPem,
    privateJwk: pair.private,
    privatePem: privatePem,
  }
}


const getSignature = (privatePem, pro, payload) => {
  const sign = crypto.createSign('SHA256').update(`${pro}.${payload}`)
  const signature = sign.sign(privatePem, 'base64')
  const encodedSignature = base64.makeUrlSafe(signature)

  return encodedSignature
}


const getProtectedHeader = (url, nonce, publicJwk) => {
  const headers = {
    alg: 'RS256',
    nonce,
    url,
    jwk: publicJwk,
  }

  const pro = base64.encodeJson(headers)
  return pro
}


const makeSignedRequest = async (url, payload, nonce, keypairs) => {
  const protectedHeader = getProtectedHeader(url, nonce, keypairs.publicJwk)
  const encodedPayload = base64.encodeJson(payload)
  const signature = getSignature(
    keypairs.privatePem,
    protectedHeader,
    encodedPayload
  )

  const jws = {
    protected: protectedHeader,
    payload: encodedPayload,
    signature,
  }
  
  const options = {
    uri: url,
    json: jws,
    headers: {
      'Content-Type': 'application/jose+json'
    },
  }

  let res
  try {
    res = await request.post(options)
  }
  catch (err) {
    console.log(err.error)
  }
  return res
}


module.exports = {
  makeSignedRequest,
  generateKeypairs,
}
