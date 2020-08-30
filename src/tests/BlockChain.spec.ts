import BlockChain from '../core/BlockChain'
import Block, { payloadBlock } from '../core/Block'

describe('BlockChain', () => {
  const blockChain = new BlockChain(4)

  it('Is a BlockChain', () => {
    expect(blockChain).toBeInstanceOf(BlockChain)
  })

  it('Has the Genessis Block', () => {
    expect(blockChain.chain[0]).toEqual(blockChain.createGenesisBlock())
  })

  it('Can add a first Block to', () => {
    const firstBlock = new Block({
      index: 1,
      timestamp: '21/08/2020',
      data: {
        msg: 'Yes! I`m first Block'
      }
    })
    blockChain.addBlock(firstBlock)
    expect(blockChain.chain[1]).toEqual(firstBlock)
  })

  it('Can add a second Block to', () => {
    const secondBlock = new Block({
      index: 2,
      timestamp: '21/08/2020',
      data: {
        msg: 'Yes! I`m second Block'
      }
    })
    blockChain.addBlock(secondBlock)
    expect(blockChain.chain[2]).toEqual(secondBlock)
  })

  describe('Immutable block', () => {
    let block: Block
    let originalPayload: payloadBlock
    let originalHash: String

        interface payloadBlockKeyPair<KEY extends keyof payloadBlock> {
            key: KEY,
            value: payloadBlock[KEY]
        }

        const changePayload = <K extends keyof payloadBlock>(keyPairs: payloadBlockKeyPair<K>[], afterChange?: Function): void => {
          keyPairs.forEach((keyPair) => {
            block.payload[keyPair.key] = keyPair.value
          })
          if (afterChange) afterChange()
          expect(blockChain.isValid()).toBeFalsy()
          Object.assign(block.payload, originalPayload)
          block.hash = originalHash
        }

        beforeAll(() => {
          block = blockChain.chain[1]
          originalPayload = Object.assign({}, block.payload)
          originalHash = block.hash
        })

        it('data', () => {
          changePayload([{
            key: 'data',
            value: {
              msg: 'I was changed'
            }
          }])
        })
        it('data & hash', () => {
          changePayload([{
            key: 'data',
            value: {
              msg: 'Other changes on data'
            }
          }], () => {
            block.hash = block.calculateHash()
          })
        })
        it('index', () => {
          changePayload([{ key: 'index', value: 2 }])
        })
        it('timestamp', () => {
          changePayload([{ key: 'timestamp', value: '28/06/1998' }])
        })
        it('previousHash', () => {
          changePayload([{ key: 'previousHash', value: 'aaa.bbb.ccc' }])
        })
  })

  describe('Finals Tests...', () => {
    it('Is a valid BlockChain', () => {
      expect(blockChain.isValid()).toBeTruthy()
    })
  })

  afterAll(() => {
    // prints BlockChain
    console.log(JSON.stringify(blockChain, null, 4))
  })
})
