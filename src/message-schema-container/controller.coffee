{angular, MeshbluJsonSchemaResolver} = window

class MessageSchemaContainer
  constructor: (@scope) ->
    @meshbluJsonSchemaResolver = new MeshbluJsonSchemaResolver {meshbluConfig: @scope.meshbluConfig}
    @scope.formSchemas ?= {}
    @scope.$watch 'schemas', @resolveSchemas
    @scope.$watch 'formSchemas', @resolveFormSchemas

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

window
  .angular
  .module 'angular-meshblu-device-editor'
  .controller 'MessageSchemaContainer', ['$scope', MessageSchemaContainer]
