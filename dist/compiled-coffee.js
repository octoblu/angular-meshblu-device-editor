(function() {
  var angular;

  angular = window.angular;

  angular.module('angular-meshblu-device-editor', ['schemaForm']);

}).call(this);

(function() {
  var ConfigureSchemaContainer, _,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ = window._;

  ConfigureSchemaContainer = (function() {
    function ConfigureSchemaContainer(scope) {
      this.scope = scope;
      this.setAvailableSchemas = bind(this.setAvailableSchemas, this);
      this.selectedSchemaKey = bind(this.selectedSchemaKey, this);
      this.schemaKeys = bind(this.schemaKeys, this);
      this.schema = bind(this.schema, this);
      this.formSchema = bind(this.formSchema, this);
      this.availableSchemas = bind(this.availableSchemas, this);
      this.scope.$watch('schemas', this.setAvailableSchemas);
      this.scope.$watch('model.schemas.selected.configure', (function(_this) {
        return function(theNew, theOld) {
          _this.scope.schema = _this.schema();
          return _this.scope.formSchema = _this.formSchema();
        };
      })(this));
    }

    ConfigureSchemaContainer.prototype.availableSchemas = function() {
      return _.compact(this.schemaKeys().map((function(_this) {
        return function(key) {
          var group, ref, ref1, schema, title;
          schema = (ref = _this.scope.schemas) != null ? ref[key] : void 0;
          if (schema == null) {
            return;
          }
          title = (ref1 = schema.title) != null ? ref1 : key;
          group = schema['x-group-name'];
          return {
            key: key,
            title: title,
            group: group
          };
        };
      })(this)));
    };

    ConfigureSchemaContainer.prototype.formSchema = function() {
      var formSchema, key, ref, schema;
      schema = this.schema();
      key = schema != null ? (ref = schema['x-form-schema']) != null ? ref.angular : void 0 : void 0;
      if (key == null) {
        return ['*'];
      }
      formSchema = _.get(this.scope.formSchemas, key);
      return formSchema;
    };

    ConfigureSchemaContainer.prototype.schema = function() {
      var ref;
      return (ref = this.scope.schemas) != null ? ref[_.get(this.scope.model, 'schemas.selected.configure')] : void 0;
    };

    ConfigureSchemaContainer.prototype.schemaKeys = function() {
      return _.keys(this.scope.schemas);
    };

    ConfigureSchemaContainer.prototype.selectedSchemaKey = function() {
      var selectedSchemaKey;
      selectedSchemaKey = _.get(this.scope.model, 'schemas.selected.configure');
      if (selectedSchemaKey) {
        return selectedSchemaKey;
      }
      return _.first(this.schemaKeys());
    };

    ConfigureSchemaContainer.prototype.setAvailableSchemas = function() {
      this.scope.availableSchemas = this.availableSchemas();
      _.set(this.scope.model, 'schemas.selected.configure', this.selectedSchemaKey());
      this.scope.schema = this.schema();
      return this.scope.formSchema = this.formSchema();
    };

    return ConfigureSchemaContainer;

  })();

  window.angular.module('angular-meshblu-device-editor').controller('ConfigureSchemaContainer', ['$scope', ConfigureSchemaContainer]);

}).call(this);

(function() {
  window.angular.module('angular-meshblu-device-editor').directive('configureSchemaContainer', function() {
    return {
      restrict: 'E',
      templateUrl: 'configure-schema-container/template.html',
      replace: true,
      controller: 'ConfigureSchemaContainer',
      scope: {
        formSchemas: '=',
        model: '=',
        schemas: '='
      }
    };
  });

}).call(this);

(function() {
  var DeviceConfigureSchemaContainer, OctobluDeviceSchemaTransmogrifier, _,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ = window._, OctobluDeviceSchemaTransmogrifier = window.OctobluDeviceSchemaTransmogrifier;

  DeviceConfigureSchemaContainer = (function() {
    function DeviceConfigureSchemaContainer(scope) {
      this.scope = scope;
      this.setSchemas = bind(this.setSchemas, this);
      this.getTransmogrified = bind(this.getTransmogrified, this);
      this.getConfigureSchemas = bind(this.getConfigureSchemas, this);
      this.getConfigureFormSchemas = bind(this.getConfigureFormSchemas, this);
      this.scope.$watch('device', this.setSchemas);
    }

    DeviceConfigureSchemaContainer.prototype.getConfigureFormSchemas = function() {
      var transmogrified;
      transmogrified = this.getTransmogrified();
      return transmogrified.schemas.form;
    };

    DeviceConfigureSchemaContainer.prototype.getConfigureSchemas = function() {
      var transmogrified;
      transmogrified = this.getTransmogrified();
      return transmogrified.schemas.configure;
    };

    DeviceConfigureSchemaContainer.prototype.getTransmogrified = function() {
      var transmogrifier;
      transmogrifier = new OctobluDeviceSchemaTransmogrifier(this.scope.device);
      return transmogrifier.transmogrify();
    };

    DeviceConfigureSchemaContainer.prototype.setSchemas = function() {
      if (!this.scope.device) {
        return;
      }
      this.scope.schemas = this.getConfigureSchemas();
      this.scope.formSchemas = this.getConfigureFormSchemas();
      return this.scope.hasSchemas = !_.isEmpty(this.scope.schemas);
    };

    return DeviceConfigureSchemaContainer;

  })();

  window.angular.module('angular-meshblu-device-editor').controller('DeviceConfigureSchemaContainer', ['$scope', DeviceConfigureSchemaContainer]);

}).call(this);

(function() {
  window.angular.module('angular-meshblu-device-editor').directive('deviceConfigureSchemaContainer', function() {
    return {
      restrict: 'E',
      templateUrl: 'device-configure-schema-container/template.html',
      replace: true,
      controller: 'DeviceConfigureSchemaContainer',
      scope: {
        device: '=',
        model: '='
      }
    };
  });

}).call(this);

(function() {
  var DeviceMessageSchemaContainer, OctobluDeviceSchemaTransmogrifier, _,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ = window._, OctobluDeviceSchemaTransmogrifier = window.OctobluDeviceSchemaTransmogrifier;

  DeviceMessageSchemaContainer = (function() {
    function DeviceMessageSchemaContainer(scope) {
      this.scope = scope;
      this.setSchemas = bind(this.setSchemas, this);
      this.getTransmogrified = bind(this.getTransmogrified, this);
      this.getMessageSchemas = bind(this.getMessageSchemas, this);
      this.getMessageFormSchemas = bind(this.getMessageFormSchemas, this);
      this.scope.$watch('device', this.setSchemas);
    }

    DeviceMessageSchemaContainer.prototype.getMessageFormSchemas = function() {
      var transmogrified;
      transmogrified = this.getTransmogrified();
      return transmogrified.schemas.form;
    };

    DeviceMessageSchemaContainer.prototype.getMessageSchemas = function() {
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
      this.scope.schemas = this.getMessageSchemas();
      this.scope.formSchemas = this.getMessageFormSchemas();
      return this.scope.hasSchemas = !_.isEmpty(this.scope.schemas);
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
  var $RefParser, MessageSchemaContainer, _,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ = window._, $RefParser = window.$RefParser;

  MessageSchemaContainer = (function() {
    function MessageSchemaContainer(scope) {
      this.scope = scope;
      this.setAvailableSchemas = bind(this.setAvailableSchemas, this);
      this.resolveSchemas = bind(this.resolveSchemas, this);
      this.selectedSchemaKey = bind(this.selectedSchemaKey, this);
      this.schemaKeys = bind(this.schemaKeys, this);
      this.schema = bind(this.schema, this);
      this.formSchema = bind(this.formSchema, this);
      this.availableSchemas = bind(this.availableSchemas, this);
      this.scope.$watch('schemas', this.resolveSchemas);
      this.scope.$watch('resolvedSchemas', this.setAvailableSchemas);
      this.scope.$watch('selectedSchemaKey', (function(_this) {
        return function(theNew, theOld) {
          _this.scope.schema = _this.schema();
          _this.scope.formSchema = _this.formSchema();
          if (theNew !== theOld) {
            return _this.scope.message = {};
          }
        };
      })(this));
    }

    MessageSchemaContainer.prototype.availableSchemas = function() {
      return _.compact(this.schemaKeys().map((function(_this) {
        return function(key) {
          var group, ref, ref1, schema, title;
          schema = (ref = _this.scope.resolvedSchemas) != null ? ref[key] : void 0;
          if (schema == null) {
            return;
          }
          title = (ref1 = schema.title) != null ? ref1 : key;
          group = schema['x-group-name'];
          return {
            key: key,
            title: title,
            group: group
          };
        };
      })(this)));
    };

    MessageSchemaContainer.prototype.formSchema = function() {
      var formSchema, key, ref, schema;
      schema = this.schema();
      key = schema != null ? (ref = schema['x-form-schema']) != null ? ref.angular : void 0 : void 0;
      if (key == null) {
        return ['*'];
      }
      formSchema = _.get(this.scope.formSchemas, key);
      return formSchema;
    };

    MessageSchemaContainer.prototype.schema = function() {
      var ref;
      return (ref = this.scope.resolvedSchemas) != null ? ref[this.scope.selectedSchemaKey] : void 0;
    };

    MessageSchemaContainer.prototype.schemaKeys = function() {
      return _.keys(this.scope.resolvedSchemas);
    };

    MessageSchemaContainer.prototype.selectedSchemaKey = function() {
      if (this.scope.selectedSchemaKey != null) {
        return this.scope.selectedSchemaKey;
      }
      return _.first(this.schemaKeys());
    };

    MessageSchemaContainer.prototype.resolveSchemas = function() {
      return $RefParser.dereference(this.scope.schemas, (function(_this) {
        return function(error, schemas) {
          _this.scope.error = error;
          _this.scope.resolvedSchemas = schemas;
          return _this.scope.$apply();
        };
      })(this));
    };

    MessageSchemaContainer.prototype.setAvailableSchemas = function() {
      this.scope.availableSchemas = this.availableSchemas();
      this.scope.selectedSchemaKey = this.selectedSchemaKey();
      this.scope.schema = this.schema();
      return this.scope.formSchema = this.formSchema();
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
        formSchemas: '=',
        message: '=',
        schemas: '=',
        selectedSchemaKey: '='
      }
    };
  });

}).call(this);
