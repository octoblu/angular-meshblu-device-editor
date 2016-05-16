{OctobluDeviceSchemaTransmogrifier} = window

class DeviceMessageSchemaContainer
  constructor: (@scope) ->
    @scope.$watch 'device', @setSchemas
    @setSchemas()

  getSchemas: =>
    transmogrified = @getTransmogrified()
    transmogrified.schemas.message

  getTransmogrified: =>
    transmogrifier = new OctobluDeviceSchemaTransmogrifier @scope.device
    transmogrifier.transmogrify()

  setSchemas: =>
    return unless @scope.device
    @scope.schemas = @getSchemas()

window
.angular
.module 'angular-meshblu-device-editor'
.controller 'DeviceMessageSchemaContainer', ['$scope', DeviceMessageSchemaContainer]
