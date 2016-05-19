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
        squirrel: {
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
        },
        'x-group-name': 'Organic'
      },
      squirrel: {
        type: "object",
        title: "Squirrel",
        properties: {
          name:  {
            title: "Name",
            type: "string"
          },
          favoriteNut:  {
            title: "Favorite Nut",
            type: "string",
            enum: ["acorn", "aaron"],
            default: "acorn"
          },
        },
        required: ["name", "favoriteNut"],
        'x-form-schema': {
          angular: 'message.squirrel.angular'
        },
        'x-group-name': 'Organic'
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
        'x-form-schema': {
          angular: 'message.robot.angular'
        },
        'x-group-name': 'Artificial'
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
