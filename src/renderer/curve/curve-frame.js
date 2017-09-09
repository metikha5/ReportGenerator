export default class Curve {
  constructor(title=null, x='date', y=null, aggregate=false, style=null) {
    this.title = title
    this.x = x
    this.y = y
    this.aggregate = aggregate
    this.style = style
  }

  toJSON() {
    return {
      title: this.title,
      x: this.x,
      y: this.y,
      aggregate: this.aggregate,
      style: this.style
    }
  }
}
