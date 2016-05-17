{_} = window

class MessageSchemaContainer
  constructor: (@scope) ->
    @scope.$watch 'schemas', @setAvailableSchemas
    @scope.$watch 'selectedSchemaKey', =>
      @scope.schema  = @schema()
      @scope.formSchema = @formSchema()
      @scope.message = {}

  availableSchemas: =>
    @schemaKeys().map (key) =>
      schema = @scope.schemas?[key]
      title  = schema?.title ? key
      {key,title}

  formSchema: =>
    schema = @schema()
    key = schema?.formSchema?.angular
    return ['*'] unless key?
    formSchema = _.get @scope.formSchemas, key
    return formSchema

  schema: =>
    @scope.schemas?[@scope.selectedSchemaKey]

  schemaKeys: =>
    _.keys @scope.schemas

  selectedSchemaKey: =>
    return @scope.selectedSchemaKey if @scope.selectedSchemaKey?
    _.first @schemaKeys()

  setAvailableSchemas: =>
    @scope.availableSchemas = @availableSchemas()
    @scope.selectedSchemaKey = @selectedSchemaKey()
    @scope.schema = @schema()
    @scope.formSchema = @formSchema()

window
.angular
.module 'angular-meshblu-device-editor'
.controller 'MessageSchemaContainer', ['$scope', MessageSchemaContainer]
