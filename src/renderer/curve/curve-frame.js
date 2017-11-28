export default class Curve {
  constructor(id, {title=null, x='date', y=null, aggregate=false, style=null, resample=null, resampleHow=null} = {}) {
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
    const ignoreNull = ['style', 'resample', 'resampleHow']
    let rtn = {
      title: this.title.trim(),
      x: this.x.trim(),
      y: this.y.trim(),
      aggregate: this.aggregate
    }

    for (let item of ignoreNull) {
      if (this[item] !== undefined && this[item] !== null && this[item] !== '') {
        rtn[item] = typeof this[item] === 'string' ? this[item].trim() : this[item]
      }
    }
    return rtn
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
