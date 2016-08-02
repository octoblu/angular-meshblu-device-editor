{_, angular, MeshbluJsonSchemaResolver} = window

class MessageSchemaContainer
  constructor: (@scope) ->
    @scope.isEmpty = @isEmpty()
    @scope.$watch 'selectedSchemaKey', (newSelectedSchemaKey )=>
      console.log {newSelectedSchemaKey}

  isEmpty: =>
    return true if @scope.schema?.type == 'object' && _.isEmpty @scope.schema?.properties
    return false
    
window
  .angular
  .module 'angular-meshblu-device-editor'
  .controller 'MessageSchemaContainer', ['$scope', MessageSchemaContainer]
