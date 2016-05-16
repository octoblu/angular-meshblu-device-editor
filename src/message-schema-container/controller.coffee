class MessageSchemaContainer
  constructor: (@scope) ->
    @scope.availableSchemas = @availableSchemas()
    @scope.selectedSchemaKey = @selectedSchemaKey()
    @scope.schema = @schema()
    @scope.formSchema = ['*']

    @scope.$watch 'selectedSchemaKey', =>
      @scope.schema  = @schema()
      @scope.message = {}

  availableSchemas: =>
    @schemaKeys().map (key) =>
      schema = @scope.schemas?[key]
      title  = schema?.title ? key
      {key,title}

  schema: =>
    @scope.schemas?[@scope.selectedSchemaKey]

  schemaKeys: =>
    Object.keys(@scope.schemas) ? []

  selectedSchemaKey: =>
    return @scope.selectedSchemaKey if @scope.selectedSchemaKey?
    @schemaKeys()[0]

window
.angular
.module 'angular-meshblu-device-editor'
.controller 'MessageSchemaContainer', ['$scope', MessageSchemaContainer]
