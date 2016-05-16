class MessageSchemaContainer
  constructor: (@scope) ->
    @scope.$watch 'schemas', @setAvailableSchemas
    @scope.$watch 'selectedSchemaKey', @reset

  availableSchemas: =>
    @schemaKeys().map (key) =>
      schema = @scope.schemas?[key]
      title  = schema?.title ? key
      {key,title}

  reset: =>
    @scope.schema  = @schema()
    @scope.message = {}

  schema: =>
    @scope.schemas?[@scope.selectedSchemaKey]

  schemaKeys: =>
    return [] unless @scope.schemas
    return Object.keys @scope.schemas

  selectedSchemaKey: =>
    return @scope.selectedSchemaKey if @scope.selectedSchemaKey?
    @schemaKeys()[0]

  setAvailableSchemas: =>
    @scope.availableSchemas = @availableSchemas()
    @scope.selectedSchemaKey = @selectedSchemaKey()
    @scope.schema = @schema()
    @scope.formSchema = ['*']

window
.angular
.module 'angular-meshblu-device-editor'
.controller 'MessageSchemaContainer', ['$scope', MessageSchemaContainer]
