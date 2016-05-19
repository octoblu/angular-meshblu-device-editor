'use strict';
angular.module('example', ['angular-meshblu-device-editor']);

var DEVICE = {
  schemas: {
    version: '1.0.0',
    form: {
      configure: {
        human: {
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
  optionsSchema: {
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

angular.module('example').controller('ExampleConfigureSchemaContainerController', function(){
  this.model = {
    schemas: {
      selected: {
        configure: 'robot'
      }
    }
  };
  this.schemas = angular.copy(DEVICE.schemas.configure);
});

angular.module('example').controller('ExampleDeviceConfigureSchemaContainerController', function(){
  this.model = {
    schemas: {
      selected: {
        configure: 'robot'
      }
    }
  };
  this.device = angular.copy(DEVICE);
});

angular.module('example').controller('ExampleOldDeviceConfigureSchemaContainerController', ['$timeout', function($timeout){
  var self = this;

  self.model = {};
  self.device = {};

  $timeout(function(){
    self.device = angular.copy(OLD_DEVICE);
  }, 100);
}]);

angular.module('example').controller('ExampleEmptyDeviceConfigureSchemaContainerController', function(){
  this.model = {};
  this.device = {};
});
