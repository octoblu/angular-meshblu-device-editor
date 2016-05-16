{OctobluDeviceSchemaTransmogrifier} = window

class DeviceMessageSchemaContainer
  constructor: (@scope) ->
    @scope.schemas = @getSchemas()

  getSchemas: =>
    transmogrified = @getTransmogrified()
    transmogrified.schemas.message

  getTransmogrified: =>
    transmogrifier = new OctobluDeviceSchemaTransmogrifier @scope.device
    transmogrifier.transmogrify()

window
.angular
.module 'angular-meshblu-device-editor'
.controller 'DeviceMessageSchemaContainer', ['$scope', DeviceMessageSchemaContainer]
