import Block from '@core/Block'

console.log('Rodou o index !!')

const block = new Block({
  data: {
    msg: 'Sou bloco 1'
  },
  index: 1,
  timestamp: '29/08'
})
// console.log(block.calculateHash())
block.mine(4).then(hash => console.log(hash))
  .catch(e => console.error('error', e))
