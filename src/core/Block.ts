
import Crypto from 'crypto'

export interface payloadBlock {
    index: Number,
    timestamp: String,
    data: Object,
    previousHash?: String,
    nonce?: number // https://en.wikipedia.org/wiki/Cryptographic_nonce
}

export default class Block {
    payload: payloadBlock
    hash: String

    constructor (payload: payloadBlock) {
      this.payload = payload
      this.hash = this.calculateHash()
    }

    calculateHash (): String {
      const HashSHA265 = Crypto.createHash('sha256')
      HashSHA265.update(JSON.stringify(this.payload))
      return HashSHA265.digest('base64')
    }

    mine (difficulty: number) {
      if (this.payload.nonce === undefined) this.payload.nonce = 0
      while (this.hash.substring(0, difficulty) !== Array(difficulty).join('0')) {
        console.log('try nonce', this.payload.nonce)
        this.payload.nonce++
        this.hash = this.calculateHash()
      }
      console.log('Block Mined', this.hash)
    }
}
