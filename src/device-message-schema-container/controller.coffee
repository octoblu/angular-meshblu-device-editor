{OctobluDeviceSchemaTransmogrifier} = window

class DeviceMessageSchemaContainer
  constructor: (@scope) ->
    @scope.$watch 'device', @setSchemas

  getMessageFormSchemas: =>
    transmogrified = @getTransmogrified()
    transmogrified.schemas.form

  getMessageSchemas: =>
    transmogrified = @getTransmogrified()
    transmogrified.schemas.message

  getTransmogrified: =>
    transmogrifier = new OctobluDeviceSchemaTransmogrifier @scope.device
    transmogrifier.transmogrify()

  setSchemas: =>
    return unless @scope.device
    @scope.schemas = @getMessageSchemas()
    @scope.formSchemas = @getMessageFormSchemas()

window
.angular
.module 'angular-meshblu-device-editor'
.controller 'DeviceMessageSchemaContainer', ['$scope', DeviceMessageSchemaContainer]
