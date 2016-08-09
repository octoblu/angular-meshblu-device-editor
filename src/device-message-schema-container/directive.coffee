window
.angular
.module 'angular-meshblu-device-editor'
.directive 'deviceMessageSchemaContainer', -> {
  restrict: 'E'
  templateUrl: 'device-message-schema-container/template.html'
  replace: true
  controller: 'DeviceMessageSchemaContainer'
  scope:
    device: '='
    message: '='
    selectedSchemaKey: '='
    meshbluConfig: '='
    label: '='
}
