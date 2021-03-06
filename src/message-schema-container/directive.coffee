window
.angular
.module 'angular-meshblu-device-editor'
.directive 'messageSchemaContainer', -> {
  restrict: 'E'
  templateUrl: 'message-schema-container/template.html'
  replace: true
  controller: 'MessageSchemaContainer'
  scope:
    formSchemas: '=?'
    message: '='
    schemas: '='
    meshbluConfig: '='
    selectedSchemaKey: '='
    confirmSchemaChangeFn: '='
}
