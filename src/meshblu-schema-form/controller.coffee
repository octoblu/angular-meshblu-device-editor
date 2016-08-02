{_, angular, MeshbluJsonSchemaResolver, jsonSchemaDefaults} = window

class MeshbluSchemaFormController
  constructor: (@scope) ->
    @meshbluJsonSchemaResolver = new MeshbluJsonSchemaResolver {meshbluConfig: @scope.meshbluConfig}
    @scope.formSchemas ?= {}
    @scope.$watch 'schemas', @resolveSchemas
    @scope.$watch 'formSchemas', @resolveFormSchemas
    @scope.$watch 'resolvedSchemas', @setAvailableSchemas
    @scope.$watch 'resolvedFormSchemas', @setAvailableSchemas
    @scope.$watch 'selectedSchemaKey', @selectSchema

  selectSchema: (newSchema) =>
    return unless @scope.resolvedSchemas? && @scope.resolvedFormSchemas?
    return unless newSchema?
    @scope.schema = @scope.resolvedSchemas?[newSchema]
    @scope.formSchema = @formSchema()
    @scope.isEmpty = @isEmpty()    
    defaults = jsonSchemaDefaults @scope.schema
    @scope.model = _.cloneDeep defaults
    @scope.selectedSchemaKey = newSchema

  formSchema: =>
    schema = @scope.resolvedSchemas?[@scope.selectedSchemaKey]
    key = schema?['x-form-schema']?.angular
    return ['*'] unless key?
    return _.get @scope.resolvedFormSchemas, key

  isEmpty: =>
    return true if @scope.schema?.type == 'object' && _.isEmpty @scope.schema?.properties
    return false

  resolveFormSchemas: =>
    return unless @scope.formSchemas?
    @meshbluJsonSchemaResolver.resolve @scope.formSchemas, (error, formSchemas) =>
      @scope.errorFormSchema = error
      @scope.resolvedFormSchemas = formSchemas
      @selectSchema @scope.selectedSchemaKey
      @scope.$apply()

  resolveSchemas: =>
    return unless @scope.schemas?
    @meshbluJsonSchemaResolver.resolve @scope.schemas, (error, schemas) =>
      @scope.errorSchema = error
      @scope.resolvedSchemas = schemas
      @selectSchema @scope.selectedSchemaKey
      @scope.$apply()

window
  .angular
  .module 'angular-meshblu-device-editor'
  .controller 'MeshbluSchemaFormController', ['$scope', MeshbluSchemaFormController]
