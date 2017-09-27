import Curve from '../curve/curve-frame'

export default class Plot {
  constructor(id, title=null, dateBegin=null, dateEnd=null, curves=null) {
    this.id = id
    this.title = title
    this.dateBegin = dateBegin
    this.dateEnd = dateEnd

    this.curves = []
    if (curves) {
      for (let c of curves) {
        const curveId = Curve.defineId(this.curves)
        this.curves.push(new Curve(curveId, c.title, c.x, c.y, c.aggregate, c.style))
      }
    }

    this.selectedCurve = null
  }

  addCurve() {
    this.curves.push(new Curve(Curve.defineId(this.curves)))
  }

  toJSON() {
    return {
      title: this.title,
      dateBegin: this.dateBegin,
      dateEnd: this.dateEnd,
      curves: this.curves.map((c) => c.toJSON())
    }
  }

  static defineId(allPlots) {
    let id = allPlots.length
    while (true) {
      if (allPlots.findIndex(p => p.id === id) === -1) {
        return id
      }
      id++
    }
  }
}
