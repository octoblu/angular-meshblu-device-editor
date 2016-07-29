{_, angular, MeshbluJsonSchemaResolver, jsonSchemaDefaults} = window

class ConfigureSchemaContainer
  constructor: (@scope) ->
    @meshbluJsonSchemaResolver = new MeshbluJsonSchemaResolver {meshbluConfig: @scope.meshbluConfig}
    @scope.formSchemas ?= {}
    @scope.draft = _.cloneDeep @scope.model
    @scope.$watch 'schemas', @resolveSchemas
    @scope.$watch 'formSchemas', @resolveFormSchemas
    @scope.$watch 'resolvedSchemas', @setAvailableSchemas
    @scope.$watch 'resolvedFormSchemas', @setAvailableSchemas
    @scope.$watch 'draft.schemas.selected.configure', (theNew, theOld) =>
      return if _.get(@scope.draft, 'schemas.selected.configure') == _.get(@scope.model, 'schemas.selected.configure')
      return unless @scope.resolvedSchemas? && @scope.resolvedFormSchemas?
      confirmChangeFn = @scope.confirmSchemaChangeFn ? @_defaultConfirmSchemaChange
      confirmChangeFn (confirmed) =>
        unless confirmed
          _.set @scope.draft, 'schemas.selected.configure', theOld
          return
        _.set @scope.model, 'schemas.selected.configure', theNew
        @scope.schema = @schema()
        @scope.formSchema = @formSchema()
        @scope.isEmpty = @isEmpty()
        defaults = jsonSchemaDefaults @scope.schema
        _.extend @scope.model, defaults

  availableSchemas: =>
    _.compact @schemaKeys().map (key) =>
      schema = @scope.resolvedSchemas?[key]
      return unless schema?

      title  = schema.title ? key
      group  = schema['x-group-name']
      {key,title,group}

  formSchema: =>
    schema = @schema()
    key = schema?['x-form-schema']?.angular
    return ['*'] unless key?
    return _.get @scope.resolvedFormSchemas, key

  isEmpty: =>
    return true if @scope.schema?.type == 'object' && _.isEmpty @scope.schema?.properties
    return false

  schema: =>
    selectedSchemaKey = @getSelected()
    return @scope.resolvedSchemas?[selectedSchemaKey]

  schemaKeys: =>
    _.keys @scope.resolvedSchemas

  getSelected: =>
    _.get @scope.model, 'schemas.selected.configure'

  selectedSchemaKey: =>
    selectedSchemaKey = @getSelected()
    return selectedSchemaKey if selectedSchemaKey
    _.first @schemaKeys()

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

  setAvailableSchemas: =>
    return unless @scope.resolvedSchemas? && @scope.resolvedFormSchemas?
    @scope.availableSchemas  = @availableSchemas()
    _.set @scope.model, 'schemas.selected.configure', @selectedSchemaKey()
    @scope.schema = @schema()
    @scope.formSchema = @formSchema()
    @scope.isEmpty = @isEmpty()

  _defaultConfirmSchemaChange: (callback) =>
    callback true

window
.angular
.module 'angular-meshblu-device-editor'
.controller 'ConfigureSchemaContainer', ['$scope', ConfigureSchemaContainer]
