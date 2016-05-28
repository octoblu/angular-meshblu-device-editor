'use strict';
angular.module('example', ['angular-meshblu-device-editor']);

var DEVICE ={
  "schemas": {
    "version": "1.0.0",
    "message": {
      "$ref": "./message.json"
    },
    "form": {
      "$ref": "./form.json"
    }
  }
};

var ERROR_DEVICE ={
  "schemas": {
    "version": "1.0.0",
    "message": {
      "$ref": "./doesnt-exist.json"
    },
    "form": {
      "$ref": "./doesnt-exist.json"
    }
  }
};

angular.module('example').controller('ExampleDeviceMessageSchemaContainerController', function(){
  this.message = {};
  this.device  = angular.copy(DEVICE);
  this.selectedSchemaKey = "robot"
});

angular.module('example').controller('ExampleErrorDeviceMessageSchemaContainerController', function(){
  this.message = {};
  this.device  = angular.copy(ERROR_DEVICE);
});
