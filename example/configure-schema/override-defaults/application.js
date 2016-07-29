'use strict';
angular.module('example', ['angular-meshblu-device-editor']);

var DEVICE = {
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
          angular: ['*']
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

angular.module('example').controller('ExampleConfigureSchemaContainerController', function(){
  this.model = {
    schemas: {
      selected: {
        configure: 'robot'
      }
    }
  }
  this.confirmSchemaChange = function(callback) {
    var confirmed = confirm('This will overwrite your data with the schema defaults. Are you sure you want to continue?');
    callback(confirmed);
  };
  this.schemas = angular.copy(DEVICE.schemas.configure);
});
