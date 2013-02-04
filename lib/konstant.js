var Konstant = (function () {

  var TYPE_FUNCTION = 'function'
    , TYPE_STRING = 'string'
    , TYPE_OBJECT = 'object'
    , TYPE_BOOLEAN = 'boolean'
    , TYPE_NUMBER = 'number'
    , TYPE_UNDEFINED = 'undefined';

  var ERR_KEY_TYPE_MISMATCH = 'Key must be of type string'
    , ERR_KEY_UNDEFINED = 'The requested constant is not defined'
    , ERR_KEY_IS_DEFINED = 'The provided key is already defined'
    , ERR_VALUE_TYPE_MISMATCH = 'A value must be defined first';

  var root = (typeof global === 'undefined' ? window : global)
    , constants = {};

  /** 
   * @constructs
   */

  function konstant () {
    this.inGlobal = false;
    this.define({
      'TYPE_FUNCTION' : TYPE_FUNCTION,
      'TYPE_STRING' : TYPE_STRING,
      'TYPE_OBJECT' : TYPE_OBJECT,
      'TYPE_BOOLEAN' : TYPE_BOOLEAN,
      'TYPE_NUMBER' : TYPE_NUMBER,
      'TYPE_UNDEFINED' : TYPE_UNDEFINED,
    }, true);
  };

  /**
   * @function
   */

  konstant.prototype.define = function (key, value, inGlobal) {
    var self = this;

    /**
     * @function
     * @private
     */

    var _define = function(key, value, inGlobal) {
      if (typeof key !== TYPE_STRING) {
        throw new Error(ERR_KEY_TYPE_MISMATCH);
      }

      if (typeof value === TYPE_UNDEFINED) {
        throw new Error(ERR_VALUE_TYPE_MISMATCH);
      }

      if (this.defined(key)) {
        throw new Error(ERR_KEY_IS_DEFINED);
      }

      constants[key] = value;

      inGlobal = this.inGlobal === true || inGlobal;

      if (inGlobal) {
        if (root[key]) {
          throw new Error(ERR_KEY_IS_DEFINED);
        }
        root[key] = value;
      }
    };

    if (typeof key === TYPE_OBJECT) {
      inGlobal = value;
      for (var k in key) {
        value = key[k];
        _define.call(this, k, value, inGlobal);
      }
    } else {
      _define.apply(this, arguments);
    }

  };

  /**
   * @function
   */

  konstant.prototype.defined = function (key) {
    if (typeof key !== TYPE_STRING) {
      throw new Error(ERR_KEY_TYPE_MISMATCH);
    }    
    return key in constants;
  };

  /**
   * @function
   */

  konstant.prototype.get = function (key) {
    if (!this.defined(key)) {
      throw new Error(ERR_KEY_UNDEFINED);
    }
    return constants[key];
  };

  /**
   * @exports
   */

  return new konstant();
})();

if (typeof module === TYPE_OBJECT) {
  module.exports = Konstant;
} 
