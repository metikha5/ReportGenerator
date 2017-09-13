const definition = {
  beginning: ['eval:'],
  firstPart: ['tanks', 'actuators', 'providers'],
  secondPart: {
    tanks: ['is_controlled', 'setppoint', 'volume', 'virtual_volume', 'volume_in',
      'volume_out', 'autonomy', 'vmax', 'vres_min', 'zarea', 'dz_area'],
    actuators: [],
    providers: ['total_consumption', 'reserved_capacity']
  }
}

export default {
  getSuggestion(context) {
    // Can not provide suggestions
    if (context === null) {
      return []
    }
    console.log('---->', context.firstWord)
    if (context.firstWord === true) {
      return [...definition.beginning, ...definition.firstPart]
    }

    // TODO continue: use firstPart and secondPart, if they are null, use word as firstPart
    // If we only have the second part, we can do nothing
    if (context.firstPart === null && context.secondPart !== null) {
      return null
    }
    console.log('HEY OH')
    console.log(context.editedPart === 'second' && context.firstPart !== '')
    if (context.editedPart === 'first') {
      return definition.firstPart
    } else if (context.editedPart === 'second' && context.firstPart !== '') {
      console.log(definition.secondPart[context.firstPart])
      return definition.secondPart[context.firstPart]
    }

    return []
  }
}
