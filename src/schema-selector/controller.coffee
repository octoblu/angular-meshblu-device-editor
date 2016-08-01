{_, angular, MeshbluJsonSchemaResolver, jsonSchemaDefaults} = window

class SchemaSelectorController
  constructor: (@scope) ->
    @scope.availableSchemas = @availableSchemas()
    @scope._selectedSchema = @selectedSchemaKey()
    @scope.selectedSchema = @scope._selectedSchema?.key if @scope.selectedSchema?
    @scope.$watch '_selectedSchema', (theNew, theOld) =>
      return if theNew.key == @scope.selectedSchema
      confirmChangeFn = @scope.confirmSchemaChangeFn ? @_defaultConfirmSchemaChange
      confirmChangeFn (confirmed) =>
        @scope._selectedSchema = theOld unless confirmed
        @scope.selectedSchema = @scope._selectedSchema?.key if @scope.selectedSchema?

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
    schema = _.find @scope.availableSchemas, key: @scope.selectedSchema
    return schema if schema?
    schema = _.find @scope.availableSchemas, key: 'Default'
    return schema if schema?
    return _.first @scope.availableSchemas

  _defaultConfirmSchemaChange: (callback) =>
    callback true

window
  .angular
  .module 'angular-meshblu-device-editor'
  .controller 'SchemaSelectorController', ['$scope', SchemaSelectorController]
