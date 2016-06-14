'use strict';
angular.module('example', ['angular-meshblu-device-editor']);

var DEVICE = {
  schemas: {
    version: '2.0.0',
    form: {
      message: {
        human: {
          angular: ['data.name', 'data.gender']
        },
        robot: {
          angular: ['data.serialNumber']
        }
      }
    },
    message: {
      human: {
        type: 'object',
        title: 'Human',
        properties: {
          metadata: {
            type: 'object',
            properties: {
              jobType: {
                type: 'string',
                enum: ['human'],
                default: 'human'
              },
              respondTo: {}
            }
          },
          data: {
            type: 'object',
            properties: {
              name: {
                title: "Name",
                type: "string"
              },
              gender:  {
                title: "Gender",
                type: "string",
                enum: ["male", "other"],
                default: "male"
              }
            }
          }
        },
        required: ["metadata", "data"],
        'x-form-schema': {
          angular: 'message.human.angular'
        }
      },
      robot: {
        type: 'object',
        title: 'Robot',
        properties: {
          metadata: {
            type: 'object',
            properties: {
              jobType: {
                type: 'string',
                enum: ['robot'],
                default: 'robot'
              },
              respondTo: {}
            }
          },
          data: {
            type: 'object',
            properties: {
              serialNumber: {
                title: "Serial Number",
                type: "string"
              }
            }
          }
        },
        required: ["metadata", "data"],
        'x-form-schema': {
          angular: 'message.robot.angular'
        }
      }
    }
  }
};

angular.module('example').controller('ExampleMessageSchemaContainerController', function($scope){
  $scope.message = this.message = {};
  this.schemas = angular.copy(DEVICE.schemas.message);
  this.formSchemas = angular.copy(DEVICE.schemas.form);
  this.selectedSchemaKey = 'robot';

  $scope.$watch('message', function(oldMessage){
    _.set($scope.message, 'metadata.respondTo', {
      flowId: '374aa95a-b532-4270-9a96-8dcb767daaf2',
      nodeId: 'a0b78e8e-59cd-41f4-ac14-e76bcf915856'
    });
  }, true);
});

angular.module('example').controller('ExampleDeviceMessageSchemaContainerController', function(){
  this.message = {};
  this.device = angular.copy(DEVICE);
  this.selectedSchemaKey = 'robot'
});
