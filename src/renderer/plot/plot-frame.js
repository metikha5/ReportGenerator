import Curve from '../curve/curve-frame'

export default class Plot {
  constructor(id, title=null, dateBegin=null, dateEnd=null, curves=null, group=null, displayLegend=true, legendPosition='best') {
    this.id = id
    this.title = title
    this.dateBegin = dateBegin
    this.dateEnd = dateEnd
    this.group = group
    this.displayLegend = displayLegend
    this.legendPosition = legendPosition

    this.curves = []
    if (curves) {
      for (let c of curves) {
        const curveId = Curve.defineId(this.curves)
        this.curves.push(new Curve(curveId, c.title, c.x, c.y, c.aggregate, c.style, c.resample, c.resampleHow))
      }
    }

    this.selectedCurve = null
  }

  toJSON() {
    const ignoreNull = ['group']

    let rtn = {
      title: this.title,
      dateBegin: this.dateBegin,
      dateEnd: this.dateEnd,
      curves: this.curves.map((c) => c.toJSON()),
      displayLegend: this.displayLegend,
      legendPosition: this.legendPosition
    }

    for (let item of ignoreNull) {
      if (this[item] !== undefined && this[item] !== null && this[item] !== '') {
        rtn[item] = this[item]
      }
    }
    return rtn
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
