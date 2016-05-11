class MessageSchemaContainer
  constructor: ($scope) ->
    $scope.schema = $scope.schemas[0]
    $scope.form = ['*']

    $scope.$watch 'schema', =>
      $scope.message = {}

window
.angular
.module 'angular-meshblu-device-editor'
.controller 'MessageSchemaContainer', ['$scope', MessageSchemaContainer]
