'use strict';
angular.module('example', ['angular-meshblu-device-editor']);

var DEVICE = {
  schemas: {
    version: '1.0.0',
    form: {
      message: {
        human: {
          angular: [
            {
              title: 'Name',
              key: 'name'
            },
            {
              title: 'Gender',
              key: 'gender',
              type: 'radios'
            }
          ]
        },
        robot: {
          angular: [
            {
              key: 'name'
            },
            {
              key: 'serialNumber'
            }
          ]
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
            enum: ["male", "other"]
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
          },
          secretMission: {
            title: "Secret Mission",
            type: "string",
            enum: ["DestroyHumans"],
            default: "DestroyHumans"
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
  messageFormSchema: [
    { key: 'name' },
    { key: 'serialNumber' }
  ],
  messageSchema: {
    type: "object",
    title: "Robot",
    properties: {
      name:  {
        title: "Name",
        type: "string"
      },
      serialNumber:  {
        title: "SerialNumber",
        type: "string"
      },
      secretMission:  {
        title: "Secret Mission",
        type: "string",
        enum: ["DestroyHumans"],
        default: 'DestroyHumans'
      }
    },
    required: ["name", "serialNumber", "secretMission"]
  }
}

angular.module('example').controller('ExampleMessageSchemaContainerController', function(){
  this.message = {};
  this.schemas = angular.copy(DEVICE.schemas.message);
  this.formSchemas = angular.copy(DEVICE.schemas.form);
  this.selectedSchemaKey = 'robot';
});

angular.module('example').controller('ExampleDeviceMessageSchemaContainerController', function(){
  this.message = {};
  this.device = angular.copy(DEVICE);
  this.selectedSchemaKey = 'robot';
});

angular.module('example').controller('ExampleOldDeviceMessageSchemaContainerController', function(){
  this.message = {};
  this.device = angular.copy(OLD_DEVICE);
});
