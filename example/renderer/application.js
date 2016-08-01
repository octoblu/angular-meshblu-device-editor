'use strict';
angular.module('example', ['angular-meshblu-device-editor']);

angular.module('example').controller('ExampleSchemaRenderController', function($scope, $timeout){

  this.device = {
    schemas: {
      version: '2.0.0',
      form: {
        configure: {
          human: {
            angular: ['*']
          },
          squirrel: {
            angular: ['*']
          },
          robot: {
            angular: ['serialNumber', 'name', 'gender']
          }
        }
      },
      configure: {
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
            angular: '.human.angular'
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
            gender: {
              title: "Gender",
              type: "string",
              enum: ["squirrely"],
              default: "squirrely"
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
            angular: '.squirrel.angular'
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
            },
            gender: {
              title: "Gender",
              type: "string",
              enum: ["neither"],
              default: "neither"
            }
          },
          required: ["name", "serialNumber"],
          'x-form-schema': {
            angular: 'configure.robot.angular'
          },
          'x-group-name': 'Artificial'
        }
      }
    }
  };
  this.schemas = angular.copy(this.device.schemas.configure);
  this.formSchemas = angular.copy(this.device.schemas.form);
  this.selectedSchema = 'robot';
  this.model = {};

  $scope.$watch('model', function(theNew, theOld){
    console.log(theNew);
  });
});
