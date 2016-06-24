{_} = window

class ConfigureSchemaContainer
  constructor: (@scope) ->
    @scope.$watch 'schemas', @resolveSchemas
    @scope.$watch 'formSchemas', @resolveFormSchemas
    @scope.$watch 'resolvedSchemas', @setAvailableSchemas
    @scope.$watch 'resolvedFormSchemas', @setAvailableSchemas
    @scope.$watch 'model.schemas.selected.configure', (theNew, theOld) =>
      return unless @scope.resolvedSchemas? && @scope.resolvedFormSchemas?
      @scope.schema = @schema()
      @scope.formSchema = @formSchema()
      @scope.isEmpty = @isEmpty()

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
    console.log 'formSchemas', @scope.formSchemas
    return unless @scope.formSchemas?
    $RefParser.dereference @scope.formSchemas, (error, formSchemas) =>
      console.log 'formSchemas', formSchemas
      @scope.errorFormSchema = error
      @scope.resolvedFormSchemas = formSchemas
      @scope.$apply()

  resolveSchemas: =>
    return unless @scope.schemas?
    $RefParser.dereference @scope.schemas, (error, schemas) =>
      console.log 'schemas', schemas
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

window
.angular
.module 'angular-meshblu-device-editor'
.controller 'ConfigureSchemaContainer', ['$scope', ConfigureSchemaContainer]
