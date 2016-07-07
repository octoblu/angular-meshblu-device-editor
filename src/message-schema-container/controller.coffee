{_, angular, MeshbluJsonSchemaResolver} = window

class MessageSchemaContainer
  constructor: (@scope) ->
    @meshbluJsonSchemaResolver = new MeshbluJsonSchemaResolver {meshbluConfig: @scope.meshbluConfig}
    @scope.formSchemas ?= {}
    @scope.$watch 'schemas', @resolveSchemas
    @scope.$watch 'formSchemas', @resolveFormSchemas
    @scope.$watch 'resolvedSchemas', @setAvailableSchemas
    @scope.$watch 'resolvedFormSchemas', @setAvailableSchemas
    @scope.$watch 'selectedSchemaKey', (theNew, theOld) =>
      return unless @scope.resolvedSchemas? && @scope.resolvedFormSchemas?
      @scope.schema = @schema()
      @scope.formSchema = @formSchema()
      @scope.isEmpty = @isEmpty()
      angular.copy({}, @scope.message) unless theNew == theOld

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

    formSchema = _.get @scope.resolvedFormSchemas, key
    return formSchema

  isEmpty: =>
    return true if @scope.schema?.type == 'object' && _.isEmpty @scope.schema?.properties
    return false

  schema: =>
    @scope.resolvedSchemas?[@scope.selectedSchemaKey]

  schemaKeys: =>
    _.keys @scope.resolvedSchemas

  selectedSchemaKey: =>
    return @scope.selectedSchemaKey if @scope.selectedSchemaKey?
    _.first @schemaKeys()

  resolveFormSchemas: =>
    return unless @scope.formSchemas?
    @meshbluJsonSchemaResolver.resolve @scope.formSchemas, (error, formSchemas) =>
      @scope.errorFormSchema = error
      @scope.resolvedFormSchemas = formSchemas
      @scope.$apply()

  resolveSchemas: =>
    return unless @scope.schemas?
    @meshbluJsonSchemaResolver.resolve @scope.schemas, (error, schemas) =>
      @scope.errorSchema = error
      @scope.resolvedSchemas = schemas
      @scope.$apply()

  setAvailableSchemas: =>
    return unless @scope.resolvedSchemas? && @scope.resolvedFormSchemas?
    @scope.availableSchemas  = @availableSchemas()
    @scope.selectedSchemaKey = @selectedSchemaKey()
    @scope.schema = @schema()
    @scope.formSchema = @formSchema()
    @scope.isEmpty = @isEmpty()

window
.angular
.module 'angular-meshblu-device-editor'
.controller 'MessageSchemaContainer', ['$scope', MessageSchemaContainer]
