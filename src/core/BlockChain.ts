import Block from './Block'

export default class BlockChain {
    chain: Block[]
    difficulty: number
    constructor () {
      this.chain = [this.createGenesisBlock()]
      this.difficulty = 2
    }

    createGenesisBlock () {
      return new Block({
        index: 0,
        timestamp: '16/08/2020',
        data: 'Genesis Block',
        previousHash: '0'
      })
    }

    getLatestBlock (): Block {
      return this.chain[this.chain.length - 1]
    }

    addBlock (newBlock: Block) {
      newBlock.payload.previousHash = this.getLatestBlock().hash
      // newBlock.hash = newBlock.calculateHash()
      newBlock.mine(this.difficulty)
      this.chain.push(newBlock)
    }

    isValid (): Boolean {
      for (let i = 1; i < this.chain.length; i++) {
        const currentBlock = this.chain[i]
        const previousBlock = this.chain[i - 1]

        // verify if hash is correct
        if (currentBlock.hash !== currentBlock.calculateHash()) {
          console.error(`Hash isn't correct. Is: ${currentBlock.hash}. Must be ${currentBlock.calculateHash()}`)
          return false
        }

        // verify is previous current block hash is equal to previous block  hash
        if (currentBlock.payload.previousHash !== previousBlock.hash) {
          console.error(`Previous Hash isn't correct. Is: ${currentBlock.payload.previousHash}. Must be ${previousBlock.hash}`)
          return false
        }
      }

      return true
    }
}
