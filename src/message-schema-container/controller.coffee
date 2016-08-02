{_, angular, MeshbluJsonSchemaResolver} = window

class MessageSchemaContainer
  constructor: (@scope) ->
    @scope.$watch 'selectedSchemaKey', (newSelectedSchemaKey )=>
      console.log {newSelectedSchemaKey}    
window
  .angular
  .module 'angular-meshblu-device-editor'
  .controller 'MessageSchemaContainer', ['$scope', MessageSchemaContainer]
