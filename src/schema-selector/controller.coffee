{_, angular, MeshbluJsonSchemaResolver, jsonSchemaDefaults} = window

class SchemaSelectorController
  constructor: (@scope) ->
    @updateAvailableSchemas()

    @scope.selectedSchemaKey ?= @scope.selectedSchema?.key

    @scope.$watch 'schemas', @updateAvailableSchemas

    @scope.$watch 'selectedSchema', (theNew, theOld) =>
      return unless theNew?
      return @scope.selectedSchemaKey = theNew.key unless @scope.selectedSchemaKey?
      return if theNew.key == @scope.selectedSchemaKey
      confirmChangeFn = @scope.confirmSchemaChangeFn ? @_defaultConfirmSchemaChange
      confirmChangeFn (confirmed) =>
        @scope.selectedSchema = theOld unless confirmed
        @scope.selectedSchemaKey = @scope.selectedSchema?.key


  updateAvailableSchemas: =>
    @scope.availableSchemas = @availableSchemas()
    @scope.selectedSchema = @getSelectedSchema()

  availableSchemas: =>
    _.compact @schemaKeys().map (key) =>
      schema = @scope.schemas?[key]
      return unless schema?
      title  = schema.title ? key
      group  = schema['x-group-name']
      {key,title,group}

  schemaKeys: =>
    _.keys @scope.schemas

  getSelectedSchema: =>
    schema = _.find @scope.availableSchemas, key: @scope.selectedSchemaKey
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
