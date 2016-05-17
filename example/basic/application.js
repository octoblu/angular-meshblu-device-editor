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
        formSchema: {
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
          serialNumber:  {
            title: "Serial Number",
            type: "string"
          }
        },
        required: ["name", "serialNumber"],
        formSchema: {
          angular: 'message.robot.angular'
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
  this.message = {};
  this.schemas = angular.copy(DEVICE.schemas.message);
  this.selectedSchemaKey = 'robot'
});

angular.module('example').controller('ExampleDeviceMessageSchemaContainerController', function(){
  this.message = {};
  this.device = angular.copy(DEVICE);
  this.selectedSchemaKey = 'robot'
});

angular.module('example').controller('ExampleOldDeviceMessageSchemaContainerController', ['$timeout', function($timeout){
  var self = this;

  self.message = {};
  self.device = {};

  $timeout(function(){
    self.device = angular.copy(OLD_DEVICE);
  }, 100);
}]);

angular.module('example').controller('ExampleEmptyDeviceMessageSchemaContainerController', function(){
  this.message = {};
  this.device = {};
});
