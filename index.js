/*!
 * is-hybrid <https://github.com/hybridables/is-hybrid>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict'

var isPromise = require('is-promise')

module.exports = function isHybrid (obj) {
  if (!obj || !obj.hybridify) return false
  if (typeof obj.hybridify !== 'function') return false
  if (!isPromise(obj)) return false
  return true
}
