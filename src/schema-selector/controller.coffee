{_, angular, MeshbluJsonSchemaResolver, jsonSchemaDefaults} = window

class SchemaSelectorController
  constructor: (@scope) ->
    @scope.availableSchemas = @availableSchemas()
    @scope._selectedSchema = @selectedSchemaKey()
    console.log @scope._selectedSchema
    @scope.$watch '_selectedSchema', (theNew, theOld) =>

      return if theNew == theOld || !theNew?
      confirmChangeFn = @scope.confirmSchemaChangeFn ? @_defaultConfirmSchemaChange
      confirmChangeFn (confirmed) =>
        console.log confirmed, @scope._selectedSchema
        @scope._selectedSchema = theOld unless confirmed
        @scope.selectedSchema = @scope._selectedSchema if @scope.selectedSchema?

  availableSchemas: =>
    _.compact @schemaKeys().map (key) =>
      schema = @scope.schemas?[key]
      return unless schema?
      title  = schema.title ? key
      group  = schema['x-group-name']
      {key,title,group}

  schemaKeys: =>
    _.keys @scope.schemas

  selectedSchemaKey: =>
    return @scope.selectedSchema || _.first @scope.availableSchemas

  _defaultConfirmSchemaChange: (callback) =>
    callback true

window
  .angular
  .module 'angular-meshblu-device-editor'
  .controller 'SchemaSelectorController', ['$scope', SchemaSelectorController]
