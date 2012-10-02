;modjewel.define("weinre/target/WiRuntimeImpl", function(require, exports, module) { // Generated by CoffeeScript 1.3.3
var Weinre, WiRuntimeImpl;

Weinre = require('../common/Weinre');

module.exports = WiRuntimeImpl = (function() {

  function WiRuntimeImpl() {}

  WiRuntimeImpl.prototype.evaluate = function(expression, objectGroup, includeCommandLineAPI, callback) {
    var result;
    result = Weinre.injectedScript.evaluate(expression, objectGroup, includeCommandLineAPI);
    if (callback) {
      return Weinre.WeinreTargetCommands.sendClientCallback(callback, [result]);
    }
  };

  WiRuntimeImpl.prototype.getCompletions = function(expression, includeCommandLineAPI, callback) {
    var result;
    result = Weinre.injectedScript.getCompletions(expression, includeCommandLineAPI);
    if (callback) {
      return Weinre.WeinreTargetCommands.sendClientCallback(callback, [result]);
    }
  };

  WiRuntimeImpl.prototype.getProperties = function(objectId, ignoreHasOwnProperty, abbreviate, callback) {
    var result;
    objectId = JSON.stringify(objectId);
    result = Weinre.injectedScript.getProperties(objectId, ignoreHasOwnProperty, abbreviate);
    if (callback) {
      return Weinre.WeinreTargetCommands.sendClientCallback(callback, [result]);
    }
  };

  WiRuntimeImpl.prototype.setPropertyValue = function(objectId, propertyName, expression, callback) {
    var result;
    objectId = JSON.stringify(objectId);
    result = Weinre.injectedScript.setPropertyValue(objectId, propertyName, expression);
    if (callback) {
      return Weinre.WeinreTargetCommands.sendClientCallback(callback, [result]);
    }
  };

  WiRuntimeImpl.prototype.releaseWrapperObjectGroup = function(injectedScriptId, objectGroup, callback) {
    var result;
    result = Weinre.injectedScript.releaseWrapperObjectGroup(objectGroup);
    if (callback) {
      return Weinre.WeinreTargetCommands.sendClientCallback(callback, [result]);
    }
  };

  return WiRuntimeImpl;

})();

require("../common/MethodNamer").setNamesForClass(module.exports);

});
