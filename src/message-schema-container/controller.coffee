{_, $RefParser} = window

class MessageSchemaContainer
  constructor: (@scope) ->
    @scope.$watch 'schemas', @resolveSchemas
    @scope.$watch 'resolvedSchemas', @setAvailableSchemas
    @scope.$watch 'selectedSchemaKey', (theNew, theOld) =>
      @scope.schema  = @schema()
      @scope.formSchema = @formSchema()
      @scope.message = {} unless theNew == theOld

  availableSchemas: =>
    _.compact @schemaKeys().map (key) =>
      schema = @scope.resolvedSchemas?[key]
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
    @scope.resolvedSchemas?[@scope.selectedSchemaKey]

  schemaKeys: =>
    _.keys @scope.resolvedSchemas

  selectedSchemaKey: =>
    return @scope.selectedSchemaKey if @scope.selectedSchemaKey?
    _.first @schemaKeys()

  resolveSchemas: =>
    $RefParser.dereference @scope.schemas, (error, schemas) =>
      @scope.error = error
      @scope.resolvedSchemas = schemas
      @scope.$apply()

  setAvailableSchemas: =>
    @scope.availableSchemas  = @availableSchemas()
    @scope.selectedSchemaKey = @selectedSchemaKey()
    @scope.schema = @schema()
    @scope.formSchema = @formSchema()

window
.angular
.module 'angular-meshblu-device-editor'
.controller 'MessageSchemaContainer', ['$scope', MessageSchemaContainer]
