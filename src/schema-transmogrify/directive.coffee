window
.angular
.module 'angular-meshblu-device-editor'
.directive 'schemaTransmogrify', -> {
  restrict: 'E'
  templateUrl: 'schema-transmogrify/template.html'
  replace: true
  controller: 'SchemaTransmogrifyController'
  scope:
    device: '='
    model: '='
}
