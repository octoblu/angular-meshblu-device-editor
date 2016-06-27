'use strict';
angular.module('example', ['angular-meshblu-device-editor']);

var DEVICE ={
  "schemas": {
    "version": "1.0.0",
    "configure": {
      "$ref": "./configure.json"
    },
    "form": {
      "$ref": "./form.json"
    }
  }
};

var ERROR_DEVICE ={
  "schemas": {
    "version": "1.0.0",
    "configure": {
      "$ref": "./doesnt-exist.json"
    },
    "form": {
      "$ref": "./doesnt-exist.json"
    }
  }
};

angular.module('example').controller('ExampleDeviceConfigureSchemaContainerController', function(){
  this.model = {
    schemas: {
      selected: {
        configure: 'robot'
      }
    }
  }

  this.device  = angular.copy(DEVICE);
});

angular.module('example').controller('ExampleErrorDeviceConfigureSchemaContainerController', function(){
  this.model = {
    schemas: {
      selected: {
        configure: 'robot'
      }
    }
  }

  this.device  = angular.copy(ERROR_DEVICE);
});
