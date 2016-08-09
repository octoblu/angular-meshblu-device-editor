window
.angular
.module 'angular-meshblu-device-editor'
.directive 'deviceConfigureSchemaContainer', -> {
  restrict: 'E'
  templateUrl: 'device-configure-schema-container/template.html'
  replace: true
  controller: 'DeviceConfigureSchemaContainer'
  scope:
    device: '='
    model: '='
    meshbluConfig: '='
    confirmSchemaChangeFn: '='
    label: '='
}
