window
.angular
.module 'angular-meshblu-device-editor'
.directive 'schemaRender', -> {
  restrict: 'E'
  templateUrl: 'schema-render/template.html'
  replace: true
  controller: 'SchemaRenderController'
  scope:
    selectedSchema: '='
    schemas: '='
    formSchemas: '='
    model: '='
}
