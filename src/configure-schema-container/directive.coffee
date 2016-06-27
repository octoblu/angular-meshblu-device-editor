window
.angular
.module 'angular-meshblu-device-editor'
.directive 'configureSchemaContainer', -> {
  restrict: 'E'
  templateUrl: 'configure-schema-container/template.html'
  replace: true
  controller: 'ConfigureSchemaContainer'
  scope:
    formSchemas: '=?'
    model: '='
    schemas: '='
}
