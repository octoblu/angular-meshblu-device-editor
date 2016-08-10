'use strict';
angular.module('example', ['angular-meshblu-device-editor']);

var DEVICE = {
  schemas: {
    version: '1.0.0',
    form: {
      message: {
        human: {
          angular: ['*']
        },
        robot: {
          angular: ['*']
        }
      }
    },
    message: {
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
        'x-form-schema': {
          angular: 'message.human.angular'
        }
      },
      robot: {
        type: "object",
        title: "Robot",
        properties: {
          name:  {
            title: "Name",
            type: "string"
          },
          gender:  {
            title: "Gender",
            type: "string",
            enum: ["nothing"],
            default: "nothing"
          },
          serialNumber:  {
            title: "Serial Number",
            type: "string"
          },
          parts: {
            type: 'object',
            properties: {
              arm: {
                type: 'string'
              }
            },
            required: ["arm"],
          }
        },
        required: ["name", "serialNumber", "parts"],
        'x-form-schema': {
          angular: 'message.robot.angular'
        }
      },
      nothing: {
        type: "object",
        title: "Nothing",
        properties: {
        }
      }
    }
  }
};

var OLD_DEVICE = {
  messageSchema: {
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

angular.module('example').controller('ExampleMessageSchemaContainerController', function(){
  this.message = { gender:  'other'};
  this.schemas = angular.copy(DEVICE.schemas.message);
  this.selectedSchemaKey = 'human'
});

angular.module('example').controller('ExampleDeviceMessageSchemaContainerController', function(){
  this.message = {};
  this.device = angular.copy(DEVICE);
  this.selectedSchemaKey = 'robot'
});

angular.module('example').controller('ExampleV2DeviceMessageSchemaContainerController', function(){
  var device = angular.copy(DEVICE);
  device.schemas.version = '2.0.0';
  this.message = {};
  this.device = device;
  this.selectedSchemaKey = 'robot'
});

angular.module('example').controller('ExampleOldDeviceMessageSchemaContainerController', ['$timeout', function($timeout){
  var self = this;

  self.message = {name: 'Mom'};
  self.device = {};

  $timeout(function(){
    self.device = angular.copy(OLD_DEVICE);
  }, 100);
}]);

angular.module('example').controller('ExampleEmptyDeviceMessageSchemaContainerController', function(){
  // this.message = {};
  // this.device = {};
});
