class MessageSchemaContainer
  constructor: (@scope) ->
    @scope.availabledSchemas = @availabledSchemas()
    @scope.selectedSchemaKey = @selectedSchemaKey()
    @scope.schema = @schema()
    @scope.formSchema = ['*']

    @scope.$watch 'selectedSchemaKey', =>
      @scope.schema  = @schema()
      @scope.message = {}

  availabledSchemas: =>
    @schemaKeys().map (key) =>
      schema = @scope.schemas?[key]
      title  = schema?.title ? key
      {key,title}

  schema: =>
    @scope.schemas?[@scope.selectedSchemaKey]

  schemaKeys: =>
    Object.keys(@scope.schemas) ? []

  selectedSchemaKey: =>
    @schemaKeys()[0]

window
.angular
.module 'angular-meshblu-device-editor'
.controller 'MessageSchemaContainer', ['$scope', MessageSchemaContainer]
