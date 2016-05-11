angular.module('example', ['angular-meshblu-device-editor'])

angular.module('example').controller('ExampleController', function(){
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
