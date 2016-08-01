window
  .angular
  .module 'angular-meshblu-device-editor'
  .directive 'meshbluSchemaForm', -> {
    restrict: 'E'
    templateUrl: 'meshblu-schema-form/template.html'
    replace: true
    controller: 'MeshbluSchemaFormController'
    scope:
      selectedSchema: '='
      schemas: '='
      formSchemas: '='
      meshbluConfig: '='
      model: '='
  }
