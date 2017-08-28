import Curve from './curve'

export default class Plot {
  constructor(title=null, dateBegin=null, dateEnd=null, curves=null) {
    this.title = title
    this.dateBegin = dateBegin
    this.dateEnd = dateEnd

    this.curves = []
    if (curves) {
      for (let c of curves) {
        if (c.title === undefined) {
          c.title = `Curve ${this.curves.length + 1}`
        }
        this.curves.push(new Curve(c.title, c.x, c.y, c.aggregate, c.style))
      }
    }

    this.selectedCurve = null
  }

  addCurve() {
    this.curves.push(new Curve(`Curve ${this.curves.length + 1}`))
  }

  toJSON() {
    return {
      title: this.title,
      dateBegin: this.dateBegin,
      dateEnd: this.dateEnd,
      curves: this.curves.map((c) => c.toJSON())
    }
  }
}
