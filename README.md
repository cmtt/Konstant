# Konstant

This is a JavaScript module which provides constants for browser and server environments. Its main purpose is to define the six available types in the global context (TYPE_FUNCTION, TYPE_STRING, TYPE_OBJECT, TYPE_BOOLEAN, 
TYPE_NUMBER, TYPE_UNDEFINED).

## Installation 

  npm install konstant

## Usage

On the server, a simple

 require('konstant');

is sufficient for defining the type declarations. In a browser environment, the script just needs to be included in your DOM. 

When additional constants are needed, the module should be initialized on the server as follows:

  // Server environment

  var Konstant = require('konstant');

## Functions

### Konstant.define (key, value, inGlobal)
### Konstant.define (object, inGlobal)

With define, a new constant can be defined. You can provide either a hashmap or key-value-pairs. When inGlobal is set to true, the constant will be made available in the global context (which is the window object in a browser environment).

### Konstant.defined (key)

Returns true or false, depending on whether a constant has been defined or not.

### Konstant.get (key)

Returns the given constant or throws an error if it hasn't been defined.