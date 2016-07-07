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

var meshbluConfig = {
  "uuid": "4d20c5f4-6ec6-4fce-86fe-b5b321ffc7f0",
  "token": "9e89f1c96071b81dfb0e65f92514df2145b6d637",
  "hostname": "meshblu.octoblu.com",
  "port": 443
}

angular.module('example').controller('ExampleDeviceConfigureSchemaContainerController', function(){
  this.model = {
    schemas: {
      selected: {
        configure: 'robot'
      }
    }
  }

  this.meshbluConfig = meshbluConfig;
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
  this.meshbluConfig = meshbluConfig;
  this.device  = angular.copy(ERROR_DEVICE);
});
