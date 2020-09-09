//!对象里都可以用set和get 不是只有类才能

const test = {
  info: { name: 'bang' },
  get name() {
    return this.info.name
  },
}

console.log(test.name)

class Bang {
  info = { name: 'bang' }
  get name() {
    return this.info.name
  }
}

console.log(new Bang().name)
