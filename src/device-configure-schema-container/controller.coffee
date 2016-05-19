{_, OctobluDeviceSchemaTransmogrifier} = window

class DeviceConfigureSchemaContainer
  constructor: (@scope) ->
    @scope.$watch 'device', @setSchemas

  getConfigureFormSchemas: =>
    transmogrified = @getTransmogrified()
    transmogrified.schemas.form

  getConfigureSchemas: =>
    transmogrified = @getTransmogrified()
    transmogrified.schemas.configure

  getTransmogrified: =>
    transmogrifier = new OctobluDeviceSchemaTransmogrifier @scope.device
    transmogrifier.transmogrify()

  setSchemas: =>
    return unless @scope.device
    @scope.schemas = @getConfigureSchemas()
    @scope.formSchemas = @getConfigureFormSchemas()
    @scope.hasSchemas  = !_.isEmpty @scope.schemas

window
.angular
.module 'angular-meshblu-device-editor'
.controller 'DeviceConfigureSchemaContainer', ['$scope', DeviceConfigureSchemaContainer]
