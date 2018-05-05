export default class Card {
  constructor ({ question, src, type }) {
    this.drawn = false
    this.question = question
    this.revealed = false
    this.src = src
    this.type = type
  }

  draw () {
    this.drawn = true
  }

  reveal () {
    this.revealed = true
  }

  setSrc (src) {
    this.src = src
  }
}