export default class Sample {
  constructor(opts = {}) {
    this.word = opts.word
  }
  say() {
    console.log(`hello, ${this.word}!`)
  }
}
