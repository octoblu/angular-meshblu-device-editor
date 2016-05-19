{_} = window

class MessageSchemaContainer
  constructor: (@scope) ->
    @scope.$watch 'schemas', @setAvailableSchemas
    @scope.$watch 'selectedSchemaKey', (theNew, theOld) =>
      @scope.schema  = @schema()
      @scope.formSchema = @formSchema()
      @scope.message = {} unless theNew == theOld

  availableSchemas: =>
    _.compact @schemaKeys().map (key) =>
      schema = @scope.schemas?[key]
      return unless schema?

      title  = schema.title ? key
      group  = schema['x-group-name']
      {key,title,group}

  formSchema: =>
    schema = @schema()
    key = schema?['x-form-schema']?.angular
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
