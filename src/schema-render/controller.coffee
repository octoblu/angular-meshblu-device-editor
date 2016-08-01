{_, angular, jsonSchemaDefaults} = window

class SchemaRenderController
  constructor: (@scope) ->
    @scope.formSchemas ?= {}
    @scope.model ?= {}

    @setSchema()

  formSchema: =>
    schema = @schema()
    key = schema?['x-form-schema']?.angular
    return ['*'] unless key?
    return _.get @scope.formSchemas, key

  schema: =>
    return @scope.schemas?[@scope.selectedSchema]

  setSchema: =>
    @scope.schema = @schema()
    @scope.formSchema = @formSchema()

window
  .angular
  .module 'angular-meshblu-device-editor'
  .controller 'SchemaRenderController', ['$scope', SchemaRenderController]
