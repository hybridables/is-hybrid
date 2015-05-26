/*!
 * is-hybrid <https://github.com/hybridables/is-hybrid>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('assertit')
var isHybrid = require('./index')
var gotHybrid = require('then-got')
var gotPromise = require('got-promise')

var TEST_URL = 'http://requestb.in/sftqf2sf'

test('is-hybrid:', function () {
  test('should return true for hybrids', function (done) {
    var hybrid = gotHybrid(TEST_URL)

    test.equal(typeof gotHybrid.hybridify, 'function')
    test.equal(typeof hybrid.hybridify, 'function')
    test.equal(isHybrid(gotHybrid), false)
    test.equal(isHybrid(hybrid), true)
    done()
  })

  test('should return false for promises', function (done) {
    var promise = gotPromise(TEST_URL)

    test.ok(!promise.hybridify)
    test.ok(!gotPromise.hybridify)
    test.equal(typeof promise.hybridify, 'undefined')
    test.equal(typeof gotPromise.hybridify, 'undefined')
    test.equal(isHybrid(promise), false)
    test.equal(isHybrid(gotPromise), false)
    done()
  })

  test('should return false for non-hybrids', function () {
    test.equal(isHybrid(null), false)
    test.equal(isHybrid('foo'), false)
    test.equal(isHybrid(123), false)
    test.equal(isHybrid({foo: 'bar'}), false)
    test.equal(isHybrid([1, 2, 3, 4]), false)
    test.equal(isHybrid(undefined), false)
    test.equal(isHybrid(Object), false)
    test.equal(isHybrid(Function), false)
    test.equal(isHybrid(function () {}), false)
  })

  test('should return false for fake hybrids', function (done) {
    function fakeHybrid () {
      function fakefn () {}
      fakefn.hybridify = function _fakeHybridify_ () {}

      return fakefn
    }
    fakeHybrid.hybridify = function fakeHybridify () {}

    test.equal(isHybrid(fakeHybrid), false)
    test.equal(isHybrid(fakeHybrid()), false)
    test.equal(typeof fakeHybrid.hybridify, 'function')
    test.equal(typeof fakeHybrid().hybridify, 'function')
    done()
  })

  test('should return false when .hybridify not a function', function (done) {
    function fakeHybrid () {
      function fakefn () {}
      fakefn.hybridify = true

      return fakefn
    }
    fakeHybrid.hybridify = false

    test.equal(isHybrid(fakeHybrid), false)
    test.equal(isHybrid(fakeHybrid()), false)
    done()
  })
})
