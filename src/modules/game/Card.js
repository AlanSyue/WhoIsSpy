export default class Card {
  constructor ({ question, src, type }) {
    this.question = question
    this.type = type
    this.src = src
    this.revealed = false
  }

  reveal () {
    this.revealed = true
  }

  setSrc (src) {
    this.src = src
  }
}