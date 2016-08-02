{angular, MeshbluJsonSchemaResolver} = window

class ConfigureSchemaContainer
  constructor: (@scope) ->
    @meshbluJsonSchemaResolver = new MeshbluJsonSchemaResolver {meshbluConfig: @scope.meshbluConfig}
    @scope.formSchemas ?= {}

    @initialSchemaKey = _.get @scope.model, 'schemas.selected.configure'
    @scope.$watch 'schemas', @resolveSchemas
    @scope.$watch 'formSchemas', @resolveFormSchemas
    @scope.$watch 'selectedSchemaKey', (selectedSchemaKey) =>
      return unless selectedSchemaKey?
      _.set @scope.model, 'schemas.selected.configure', selectedSchemaKey


  resolveFormSchemas: =>
    return unless @scope.formSchemas?
    @meshbluJsonSchemaResolver.resolve @scope.formSchemas, (error, formSchemas) =>
      @scope.errorFormSchema = error
      @scope.resolvedFormSchemas = formSchemas
      @scope.$apply()

  resolveSchemas: =>
    return unless @scope.schemas?
    @meshbluJsonSchemaResolver.resolve @scope.schemas, (error, schemas) =>      
      @scope.selectedSchemaKey = @initialSchemaKey
      @scope.errorSchema = error
      @scope.resolvedSchemas = schemas
      @scope.$apply()

window
  .angular
  .module 'angular-meshblu-device-editor'
  .controller 'ConfigureSchemaContainer', ['$scope', ConfigureSchemaContainer]
