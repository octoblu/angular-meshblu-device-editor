'use strict';
(function(){
angular.module('example', ['angular-meshblu-device-editor']);
var DEVICE = {
  schemas: {
    version: '1.0.0',
    form: {
      message: {
        Human: {
          angular: ['*']
        },
        Robot: {
          angular: ['*']
        }
      }
    },
    message: {
      Human: {
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
            enum: ["male", "other"]
          },
        },
        required: ["name", "gender"],
        formSchema: {
          angular: 'message.Human.angular'
        }
      },
      Robot: {
        type: "object",
        title: "Human",
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
          angular: 'message.Robot.angular'
        }
      }
    }
  }
};



angular.module('example').controller('MessageSchemaExampleController', function(){
  this.message = {}
  this.schemas = [{
    "type": "object",
    "title": "Human",
    "properties": {
      "name":  {
        "title": "Name",
        "type": "string"
      },
      "gender":  {
        "title": "Gender",
        "type": "string"
      }
    },
    "required": ["name"]
  },{
    "type": "object",
    "title": "Robot",
    "properties": {
      "serialNumber":  {
        "title": "Serial Number",
        "type": "string"
      },
      "gender":  {
        "title": "Gender",
        "type": "string"
      }
    },
    "required": ["serialNumber"]
  }]
});

});
