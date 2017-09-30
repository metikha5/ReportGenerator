export default class Curve {
  constructor(id, title=null, x='date', y=null, aggregate=false, style=null, resample=null, resampleHow=null) {
    this.title = title || 'Unnamed curve'
    this.x = x
    this.y = y || ''
    this.aggregate = aggregate
    this.style = style || ''
    this.id = id
    this.resample = resample
    this.resampleHow = resampleHow
  }

  toJSON() {
    return {
      title: this.title,
      x: this.x,
      y: this.y,
      aggregate: this.aggregate,
      style: this.style,
      resample: this.resample,
      resampleHow: this.resampleHow
    }
  }

  static defineId(allCurves) {
    let id = allCurves.length
    while (true) {
      if (allCurves.findIndex(c => c.id === id) === -1) {
        return id
      }
      id++
    }
  }
}
