{_} = window

class ConfigureSchemaContainer
  constructor: (@scope) ->
    @scope.$watch 'schemas', @setAvailableSchemas
    @scope.$watch 'model.schemas.selected.configure', (theNew, theOld) =>
      @scope.schema  = @schema()
      @scope.formSchema = @formSchema()

  availableSchemas: =>
    _.compact @schemaKeys().map (key) =>
      schema = @scope.schemas?[key]
      return unless schema?

      title  = schema.title ? key
      group  = schema['x-group-name']
      {key,title,group}

  formSchema: =>
    schema = @schema()
    key = schema?['x-form-schema']?.angular
    return ['*'] unless key?
    formSchema = _.get @scope.formSchemas, key
    return formSchema

  schema: =>
    @scope.schemas?[_.get(@scope.model, 'schemas.selected.configure')]

  schemaKeys: =>
    _.keys @scope.schemas

  selectedSchemaKey: =>
    selectedSchemaKey = _.get @scope.model, 'schemas.selected.configure'
    return selectedSchemaKey if selectedSchemaKey
    _.first @schemaKeys()

  setAvailableSchemas: =>
    @scope.availableSchemas = @availableSchemas()
    _.set @scope.model, 'schemas.selected.configure', @selectedSchemaKey()
    @scope.schema = @schema()
    @scope.formSchema = @formSchema()

window
.angular
.module 'angular-meshblu-device-editor'
.controller 'ConfigureSchemaContainer', ['$scope', ConfigureSchemaContainer]
