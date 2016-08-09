window
.angular
.module 'angular-meshblu-device-editor'
.directive 'schemaSelector', -> {
  restrict: 'E'
  templateUrl: 'schema-selector/template.html'
  replace: true
  controller: 'SchemaSelectorController'
  scope:
    selectedSchemaKey: '='
    schemas: '='
    confirmSchemaChangeFn: '='
    label: '='
}
