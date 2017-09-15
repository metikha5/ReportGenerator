const definition = {
  beginning: ['eval: '],
  firstPart: ['tanks', 'actuators', 'providers'],
  secondPart: {
    tanks: ['is_controlled', 'setppoint', 'volume', 'virtual_volume', 'volume_in',
      'volume_out', 'autonomy', 'vmax', 'vres_min', 'zarea', 'dz_area'],
    actuators: ['counter_id', '_src', 'bz', 'is_controlled', 'is_active',
      'is_provider_actuator', 'QMax', 'QMin', 'VdMax', 'Vdistrib_key',
      'in_command', 'volume_in', 'last_volume_in', 'volume_out', 'vd_today_max',
      'zd', 'kind', 'default_distribution', 'virtual_volume', 'virtual_state',
      'Von', 'Voff', 'fixed_rc', 'penalty'],
    providers: ['total_consumption', 'reserved_capacity']
  }
}

export default {
  getSuggestion(context) {
    // Can not provide suggestions
    if (context === null) {
      return []
    }

    if (context.firstWord === true) {
      return [...definition.beginning, ...definition.firstPart]
    }

    // TODO continue: use firstPart and secondPart, if they are null, use word as firstPart
    // If we only have the second part, we can do nothing
    if (context.firstPart === null && context.secondPart !== null) {
      return []
    }

    if (context.editedPart === 'first') {
      return definition.firstPart
    } else if (context.editedPart === 'second' && context.firstPart !== '') {
      return definition.secondPart[context.firstPart]
    }

    return []
  }
}
