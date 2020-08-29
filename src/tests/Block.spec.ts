import Block from '../core/Block'

describe('Block', () => {
  const block = new Block({
    index: 0,
    timestamp: '16/08/2020',
    data: {
      msg: 'One Lorem Block'
    }
  })

  test('', () => {

  })

  it('Is a Block', () => {
    expect(block).toBeInstanceOf(Block)
  })

  it('Create correct hash', () => {
    expect(block.hash).toEqual(block.calculateHash())
  })
})
