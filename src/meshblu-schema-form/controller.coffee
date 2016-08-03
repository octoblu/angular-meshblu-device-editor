{_, angular, jsen} = window

class MeshbluSchemaFormController
  constructor: (@scope) ->
    @scope.formSchemas ?= {}
    @scope.$watch 'schemas', @selectSchema
    @scope.$watch 'formSchemas', @selectSchema
    @scope.$watch 'selectedSchemaKey', @selectSchema

  selectSchema: =>
    return unless @scope.schemas? && @scope.formSchemas? && @scope.selectedSchemaKey?

    @scope.schema = @scope.schemas[@scope.selectedSchemaKey]
    @scope.formSchema = @formSchema()

    @scope.isEmpty = @isEmpty()

    return if @scope.isEmpty
    validator = jsen @scope.schema
    validatorOptions = {}
    validatorOptions = {additionalProperties: false} if @scope.clearOnChange
    @scope.model = validator.build @scope.model, validatorOptions

  formSchema: =>
    schema = @scope.schemas?[@scope.selectedSchemaKey]
    key = schema?['x-form-schema']?.angular
    return ['*'] unless key?
    return _.get @scope.formSchemas, key

  isEmpty: =>
    return true unless @scope.schema
    return true if @scope.schema?.type == 'object' && _.isEmpty @scope.schema?.properties
    return false

window
  .angular
  .module 'angular-meshblu-device-editor'
  .controller 'MeshbluSchemaFormController', ['$scope', MeshbluSchemaFormController]
