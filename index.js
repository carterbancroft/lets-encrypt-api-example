'use strict'

const acme = require('./lib/acme.js')
const le = require('./lib/lets_encrypt.js')


const createLeAccount = async () => {
  const keypairs = await acme.generateKeypairs()

  const payload = {
    contact: ['mailto:test@test.com'],
    termsOfServiceAgreed: true
  }

  const res = await le.makeRequest(le.ACTIONS.newAccount, payload, keypairs)
  console.log(res)
}

createLeAccount().then(() => console.log('Done.'))
