'use strict'

const { SETTINGS, ITEM, ESPER } = require('../constants')

const defaults = {
  debug: ARGS.debug,
  dup: 'prompt',
  template: ITEM.TEMPLATE,
  theme: ARGS.theme,
  overlayToolbars: ARGS.frameless,
  invertScroll: true,
  invertZoom: false,
  zoomMode: ESPER.MODE.FIT
}

module.exports = {
  settings(state = defaults, { type, payload }) {
    switch (type) {
      case SETTINGS.RESTORE:
        return { ...defaults, ...payload, theme: ARGS.theme }
      case SETTINGS.UPDATE:
        return { ...state, ...payload }
      default:
        return state
    }
  }
}
