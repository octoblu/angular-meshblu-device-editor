{_, angular, MeshbluJsonSchemaResolver, jsonSchemaDefaults} = window

class MeshbluSchemaFormController
  constructor: (@scope) ->
    @meshbluJsonSchemaResolver = new MeshbluJsonSchemaResolver {meshbluConfig: @scope.meshbluConfig}
    @scope.formSchemas ?= {}
    @selectSchema()

    @scope.$watch 'schemas', @resolveSchemas
    @scope.$watch 'formSchemas', @resolveFormSchemas
    @scope.$watch 'resolvedSchemas', @setAvailableSchemas
    @scope.$watch 'resolvedFormSchemas', @setAvailableSchemas
    @scope.$watch 'selectedSchema', @selectSchema

  selectSchema: =>
    return unless @scope.resolvedSchemas? && @scope.resolvedFormSchemas?
    @scope.schema = @schema()
    @scope.formSchema = @formSchema()
    @scope.isEmpty = @isEmpty()
    defaults = jsonSchemaDefaults @scope.schema
    _.extend @scope.model, defaults

  formSchema: =>
    schema = @schema()
    key = schema?['x-form-schema']?.angular
    return ['*'] unless key?
    return _.get @scope.resolvedFormSchemas, key

  isEmpty: =>
    return true if @scope.schema?.type == 'object' && _.isEmpty @scope.schema?.properties
    return false

  schema: =>
    return @scope.resolvedSchemas?[@scope.selectedSchema]

  schemaKeys: =>
    _.keys @scope.resolvedSchemas

  getSelected: =>
    _.get @scope.model, 'schemas.selected.configure'

  resolveFormSchemas: =>
    return unless @scope.formSchemas?
    @meshbluJsonSchemaResolver.resolve @scope.formSchemas, (error, formSchemas) =>
      @scope.errorFormSchema = error
      @scope.resolvedFormSchemas = formSchemas
      @selectSchema()
      @scope.$apply()

  resolveSchemas: =>
    return unless @scope.schemas?
    @meshbluJsonSchemaResolver.resolve @scope.schemas, (error, schemas) =>
      @scope.errorSchema = error
      @scope.resolvedSchemas = schemas
      @selectSchema()
      @scope.$apply()

window
  .angular
  .module 'angular-meshblu-device-editor'
  .controller 'MeshbluSchemaFormController', ['$scope', MeshbluSchemaFormController]
