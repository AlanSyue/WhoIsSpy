export default class Card {
  constructor ({ question, src, type }) {
    this.question = question
    this.type = type
    this.src = src
  }

  setSrc (src) {
    this.src = src
  }
}