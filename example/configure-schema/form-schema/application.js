'use strict';
angular.module('example', ['angular-meshblu-device-editor']);

var DEVICE = {
  schemas: {
    version: '1.0.0',
    form: {
      configure: {
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
            enum: ["male", "other"]
          },
        },
        required: ["name", "gender"],
        'x-form-schema': {
          angular: 'configure.human.angular'
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
        'x-form-schema': {
          angular: 'configure.robot.angular'
        }
      }
    }
  }
};

var OLD_DEVICE = {
  configureFormSchema: [
    { key: 'name' },
    { key: 'serialNumber' }
  ],
  configureSchema: {
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

angular.module('example').controller('ExampleConfigureSchemaContainerController', function(){
  this.configure = {};
  this.schemas = angular.copy(DEVICE.schemas.configure);
  this.formSchemas = angular.copy(DEVICE.schemas.form);
  this.selectedSchemaKey = 'robot';
});

angular.module('example').controller('ExampleDeviceConfigureSchemaContainerController', function(){
  this.configure = {};
  this.model = angular.copy(DEVICE);
  this.selectedSchemaKey = 'robot';
});

angular.module('example').controller('ExampleOldDeviceConfigureSchemaContainerController', function(){
  this.configure = {};
  this.model = angular.copy(OLD_DEVICE);
});
