'use strict';
angular.module('example', ['angular-meshblu-device-editor']);

var DEVICE = {
  schemas: {
    version: '2.0.0',
    form: {
      configure: {
        "advanced-config": {
          angular: ['*']
        },
        "default": {
          angular: ['*']
        }
      }
    },
    configure: {
      "default": {
        title: "Default",
        type: "object",
        properties: {
        },
        'x-form-schema': {
          angular: 'configure.default.angular'
        }
      },
      "advanced-config": {
        title: "Advanced Config",
        type: "object",
        properties: {
          human: {
            type: "object",
            title: "Human",
            properties: {
              name:  {
                title: "Name",
                type: "string"
              },
              gender:  {
                title: "Gender",
                type: "string",
                enum: ["male", "other"],
                default: "male"
              },
            },
            required: ["name", "gender"],
          },
          robot: {
            type: "object",
            title: "Robot",
            properties: {
              name:  {
                title: "Name",
                type: "string"
              },
              serialNumber:  {
                title: "Serial Number",
                type: "string"
              }
            },
            required: ["name", "serialNumber"]
          }
        },
        'x-form-schema': {
          angular: 'configure.advanced-config.angular'
        }
      }
    }
  }
};

var OLD_DEVICE = {
  optionsSchema: {
    type: "object",
    title: "Human",
    properties: {
      name:  {
        title: "Name",
        type: "string"
      },
      gender:  {
        title: "Gender",
        type: "string",
        enum: ["male", "other"],
        default: "male"
      },
    },
    required: ["name", "gender"]
  }
}

angular.module('example').controller('ExampleConfigureSchemaContainerController', function($timeout){
  var self = this;
  self.model = {
    schemas: {
      selected: {
        configure: 'advanced-config'
      }
    }
  };
  self.device = angular.copy(DEVICE);
});

angular.module('example').controller('ExampleOldDeviceConfigureSchemaContainerController', ['$timeout', function($timeout){
  var self = this;

  self.model = {};
  self.device = {};

  $timeout(function(){
    self.device = angular.copy(OLD_DEVICE);
  }, 100);
}]);

angular.module('example').controller('ExampleEmptyDeviceConfigureSchemaContainerController', function(){
  this.model = {};
  this.device = {};
});
