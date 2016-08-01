'use strict';
angular.module('example', ['angular-meshblu-device-editor']);

angular.module('example').controller('ExampleSchemaSelectorController', function($scope, $timeout){
  this.schemas = {
    "Default": {
      title: "Default",
      type: "object",
      properties: {
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
        }
      }
    }
  }
  this.selectedSchema = '';
  this.confirmSchemaChangeFn = function(callback){
    callback(confirm('Do you want to change this?'));
  };
});
