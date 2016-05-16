(function() {
  var angular;

  angular = window.angular;

  angular.module('angular-meshblu-device-editor', ['schemaForm']);

}).call(this);

(function() {
  var DeviceMessageSchemaContainer, OctobluDeviceSchemaTransmogrifier,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  OctobluDeviceSchemaTransmogrifier = window.OctobluDeviceSchemaTransmogrifier;

  DeviceMessageSchemaContainer = (function() {
    function DeviceMessageSchemaContainer(scope) {
      this.scope = scope;
      this.setSchemas = bind(this.setSchemas, this);
      this.getTransmogrified = bind(this.getTransmogrified, this);
      this.getSchemas = bind(this.getSchemas, this);
      this.scope.$watch('device', this.setSchemas);
      this.setSchemas();
    }

    DeviceMessageSchemaContainer.prototype.getSchemas = function() {
      var transmogrified;
      transmogrified = this.getTransmogrified();
      return transmogrified.schemas.message;
    };

    DeviceMessageSchemaContainer.prototype.getTransmogrified = function() {
      var transmogrifier;
      transmogrifier = new OctobluDeviceSchemaTransmogrifier(this.scope.device);
      return transmogrifier.transmogrify();
    };

    DeviceMessageSchemaContainer.prototype.setSchemas = function() {
      if (!this.scope.device) {
        return;
      }
      this.scope.schemas = this.getSchemas();
      return console.log('@scope.schemas', this.scope.schemas);
    };

    return DeviceMessageSchemaContainer;

  })();

  window.angular.module('angular-meshblu-device-editor').controller('DeviceMessageSchemaContainer', ['$scope', DeviceMessageSchemaContainer]);

}).call(this);

(function() {
  window.angular.module('angular-meshblu-device-editor').directive('deviceMessageSchemaContainer', function() {
    return {
      restrict: 'E',
      templateUrl: 'device-message-schema-container/template.html',
      replace: true,
      controller: 'DeviceMessageSchemaContainer',
      scope: {
        device: '=',
        message: '=',
        selectedSchemaKey: '='
      }
    };
  });

}).call(this);

(function() {
  var MessageSchemaContainer,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  MessageSchemaContainer = (function() {
    function MessageSchemaContainer(scope) {
      this.scope = scope;
      this.selectedSchemaKey = bind(this.selectedSchemaKey, this);
      this.schemaKeys = bind(this.schemaKeys, this);
      this.schema = bind(this.schema, this);
      this.availableSchemas = bind(this.availableSchemas, this);
      this.scope.availableSchemas = this.availableSchemas();
      this.scope.selectedSchemaKey = this.selectedSchemaKey();
      this.scope.schema = this.schema();
      this.scope.formSchema = ['*'];
      this.scope.$watch('selectedSchemaKey', (function(_this) {
        return function() {
          _this.scope.schema = _this.schema();
          return _this.scope.message = {};
        };
      })(this));
    }

    MessageSchemaContainer.prototype.availableSchemas = function() {
      return this.schemaKeys().map((function(_this) {
        return function(key) {
          var ref, ref1, schema, title;
          schema = (ref = _this.scope.schemas) != null ? ref[key] : void 0;
          title = (ref1 = schema != null ? schema.title : void 0) != null ? ref1 : key;
          return {
            key: key,
            title: title
          };
        };
      })(this));
    };

    MessageSchemaContainer.prototype.schema = function() {
      var ref;
      return (ref = this.scope.schemas) != null ? ref[this.scope.selectedSchemaKey] : void 0;
    };

    MessageSchemaContainer.prototype.schemaKeys = function() {
      if (!this.scope.schemas) {
        return [];
      }
      return Object.keys(this.scope.schemas);
    };

    MessageSchemaContainer.prototype.selectedSchemaKey = function() {
      if (this.scope.selectedSchemaKey != null) {
        return this.scope.selectedSchemaKey;
      }
      return this.schemaKeys()[0];
    };

    return MessageSchemaContainer;

  })();

  window.angular.module('angular-meshblu-device-editor').controller('MessageSchemaContainer', ['$scope', MessageSchemaContainer]);

}).call(this);

(function() {
  window.angular.module('angular-meshblu-device-editor').directive('messageSchemaContainer', function() {
    return {
      restrict: 'E',
      templateUrl: 'message-schema-container/template.html',
      replace: true,
      controller: 'MessageSchemaContainer',
      scope: {
        message: '=',
        schemas: '=',
        selectedSchemaKey: '='
      }
    };
  });

}).call(this);
