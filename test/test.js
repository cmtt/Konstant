var assert = require('assert')
  , Konstant = require('../index.js');

assert.equal(typeof Konstant, 'object');
assert.equal(typeof Konstant.define, 'function');
assert.equal(typeof Konstant.defined, 'function');
assert.equal(typeof Konstant.get, 'function');

/** Type declarations */

assert.equal(typeof TYPE_STRING, 'string');
assert.equal(typeof TYPE_FUNCTION, 'string');
assert.equal(typeof TYPE_NUMBER, 'string');
assert.equal(typeof TYPE_BOOLEAN, 'string');
assert.equal(typeof TYPE_OBJECT, 'string');
assert.equal(typeof TYPE_UNDEFINED, 'string');

assert.equal(TYPE_STRING, 'string');
assert.equal(TYPE_FUNCTION, 'function');
assert.equal(TYPE_NUMBER, 'number');
assert.equal(TYPE_BOOLEAN, 'boolean');
assert.equal(TYPE_OBJECT, 'object');
assert.equal(TYPE_UNDEFINED, 'undefined');

/** Error handling */

assert.throws(function () {
  Konstant.define(34,56);
}, /type\ string/);

assert.throws(function () {
  var a = Konstant.get(33);
}, /type\ string/);

assert.throws(function () {
  var a = Konstant.get('44');
}, /not\ defined/);

Konstant.inGlobal = false;

assert.equal(Konstant.defined('test'), false);

/** Defining a local constant */

Konstant.define('test','testing string');
assert.equal(true, typeof test === TYPE_UNDEFINED);
assert.equal(Konstant.get('test'), 'testing string');
assert.equal(Konstant.defined('test'), true);

/** Constants must not be defined twice */

assert.throws(function () {
  Konstant.define('test','mailman');
}, /already\ defined/);

/** Defining a global constant when inGlobal === false */

assert.equal(Konstant.defined('globalTest'), false);
Konstant.define('globalTest',null, true);
assert.equal(Konstant.defined('globalTest'), true);
assert.equal(true, typeof globalTest !== TYPE_UNDEFINED);
assert.equal(true, globalTest === null);
assert.equal(Konstant.get('globalTest'), null);

/** Defining global constants when inGlobal === true */

Konstant.inGlobal = true;

Konstant.define('constant',1848);
assert.equal(constant, 1848);
assert.equal(Konstant.get('constant'), 1848);