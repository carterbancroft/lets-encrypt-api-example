'use strict'

const makeUrlSafe = encoded => {
  const urlSafe = encoded
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')

  return urlSafe
}

const encodeJson = obj => {
  if (typeof obj !== 'object') {
    throw new Error(`Expected an object but found: ${typeof obj}`)
  }

  const stringified = JSON.stringify(obj)
  const encoded = Buffer.from(stringified).toString('base64')
  const urlSafe = makeUrlSafe(encoded)

  return urlSafe
}

module.exports = {
  encodeJson,
  makeUrlSafe,
}
