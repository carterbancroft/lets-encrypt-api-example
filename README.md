# Interacting with Let's Encrypt in Node.js
Examples of how to work with the Let's Encrypt API (built on the
[ACME Standard](https://tools.ietf.org/html/draft-ietf-acme-acme-18)) are few
and far between and ACME itself is pretty mysterious and hard to decipher so
here's an example to get you started.

I've also written a [companion article](https://carterbancroft.com/the-mysterious-lets-encrypt-api/)
for this repo.

I also need to acknowledge the one real post I could find on this subject.
[This article](https://devhub.io/repos/alexpeattie-letsencrypt-fromscratch) from
Alex Peattie. It was written in 2017 and is outdated at this point but it was
still so valuable in helping me build a mental model around how ACME works. You
should give it a read.

## What This Code Does
This project simply makes a signed request to the Let's Encrypt v2 staging API
to create a new account using a programmatically generated RSA keypair.

It does not make requests for new certs.

## A Caveat
The ACME draft has not been finalized yet. This example is based off of Draft
18 so things may change with later revisions.

## Project Setup
All you gotta do is install dependencies via npm:
```
$ npm install
```

## Running
```
$ npm start
```

When running this code it simply outputs the LE response which is mostly to echo
back the request that was sent to it along with a few extra bits.
