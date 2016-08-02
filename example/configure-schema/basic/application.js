'use strict';
angular.module('example', ['angular-meshblu-device-editor']);

angular.module('example').controller('ExampleConfigureSchemaContainerController', function($timeout){
  this.schemas = {
    "default": {
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
              type: "string",
              default: 'Bob'
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
  this.formSchemas = {
    "configure": {
      "advanced-config": {
        angular: ['*']
      },
      "default": {
        angular: ['*']
      }
    }
  };
  this.model = {
    schemas: {
      selected: {
        configure: 'advanced-config'
      }
    },
    "human": {
      "name": "Yo"
    }
  }
});

angular.module('example').controller('ExampleEmptyConfigureSchemaContainerController', function(){
  this.model = {};
  this.device = {};
  this.formSchemas = {};
});
