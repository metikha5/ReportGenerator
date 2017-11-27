import Curve from '../curve/curve-frame'

export default class Plot {
  constructor(id, title=null, dateBegin=null, dateEnd=null, curves=null, xLabel=null, yLabel=null, group=null, displayLegend=true, legendPosition='best') {
    this.id = id
    this.title = title
    this.dateBegin = typeof dateBegin === 'string' ? new Date(dateBegin) : dateBegin
    this.dateEnd = typeof dateEnd === 'string' ? new Date(dateEnd) : dateEnd
    this.xLabel = xLabel
    this.yLabel = yLabel
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
    const ignoreNull = ['group', 'xLabel', 'yLabel']

    let rtn = {
      title: this.title === null ? '' : this.title.trim(),
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
