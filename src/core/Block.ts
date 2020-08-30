
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
      return HashSHA265.digest('hex')
    }

    mine (difficulty: number) : Promise<String> {
      return new Promise((resolve, reject) => {
        if (this.payload.nonce === undefined) this.payload.nonce = 0
        const difficultyString = new Array(difficulty + 1).join('0')
        while (this.hash.substring(0, difficulty) !== difficultyString) {
          this.payload.nonce++
          this.hash = this.calculateHash()
        }
        resolve(this.hash)
      })
    }
}
