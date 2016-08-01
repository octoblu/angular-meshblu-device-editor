(function() {
  var angular;

  angular = window.angular;

  angular.module('angular-meshblu-device-editor', ['schemaForm']);

}).call(this);

(function() {
  var ConfigureSchemaContainer, MeshbluJsonSchemaResolver, _, angular, jsonSchemaDefaults,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ = window._, angular = window.angular, MeshbluJsonSchemaResolver = window.MeshbluJsonSchemaResolver, jsonSchemaDefaults = window.jsonSchemaDefaults;

  ConfigureSchemaContainer = (function() {
    function ConfigureSchemaContainer(scope) {
      var base;
      this.scope = scope;
      this._defaultConfirmSchemaChange = bind(this._defaultConfirmSchemaChange, this);
      this.setAvailableSchemas = bind(this.setAvailableSchemas, this);
      this.resolveSchemas = bind(this.resolveSchemas, this);
      this.resolveFormSchemas = bind(this.resolveFormSchemas, this);
      this.selectedSchemaKey = bind(this.selectedSchemaKey, this);
      this.getSelected = bind(this.getSelected, this);
      this.schemaKeys = bind(this.schemaKeys, this);
      this.schema = bind(this.schema, this);
      this.isEmpty = bind(this.isEmpty, this);
      this.formSchema = bind(this.formSchema, this);
      this.availableSchemas = bind(this.availableSchemas, this);
      this.meshbluJsonSchemaResolver = new MeshbluJsonSchemaResolver({
        meshbluConfig: this.scope.meshbluConfig
      });
      if ((base = this.scope).formSchemas == null) {
        base.formSchemas = {};
      }
      this.scope.$watch('schemas', this.resolveSchemas);
      this.scope.$watch('formSchemas', this.resolveFormSchemas);
      this.scope.$watch('resolvedSchemas', this.setAvailableSchemas);
      this.scope.$watch('resolvedFormSchemas', this.setAvailableSchemas);
      this.scope.$watch('selectedSchema', (function(_this) {
        return function(theNew, theOld) {
          var confirmChangeFn, ref, ref1;
          if (((ref = _this.scope.selectedSchema) != null ? ref.key : void 0) === _.get(_this.scope.model, 'schemas.selected.configure')) {
            return;
          }
          if (!((_this.scope.resolvedSchemas != null) && (_this.scope.resolvedFormSchemas != null))) {
            return;
          }
          confirmChangeFn = (ref1 = _this.scope.confirmSchemaChangeFn) != null ? ref1 : _this._defaultConfirmSchemaChange;
          return confirmChangeFn(function(confirmed) {
            var defaults;
            if (!confirmed) {
              _this.scope.selectedSchema = theOld;
              return;
            }
            _.set(_this.scope.model, 'schemas.selected.configure', theNew != null ? theNew.key : void 0);
            _this.scope.schema = _this.schema();
            _this.scope.formSchema = _this.formSchema();
            _this.scope.isEmpty = _this.isEmpty();
            defaults = jsonSchemaDefaults(_this.scope.schema);
            return _.extend(_this.scope.model, defaults);
          });
        };
      })(this));
    }

    ConfigureSchemaContainer.prototype.availableSchemas = function() {
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

    ConfigureSchemaContainer.prototype.formSchema = function() {
      var key, ref, schema;
      schema = this.schema();
      key = schema != null ? (ref = schema['x-form-schema']) != null ? ref.angular : void 0 : void 0;
      if (key == null) {
        return ['*'];
      }
      return _.get(this.scope.resolvedFormSchemas, key);
    };

    ConfigureSchemaContainer.prototype.isEmpty = function() {
      var ref, ref1;
      if (((ref = this.scope.schema) != null ? ref.type : void 0) === 'object' && _.isEmpty((ref1 = this.scope.schema) != null ? ref1.properties : void 0)) {
        return true;
      }
      return false;
    };

    ConfigureSchemaContainer.prototype.schema = function() {
      var ref, selectedSchemaKey;
      selectedSchemaKey = this.getSelected();
      return (ref = this.scope.resolvedSchemas) != null ? ref[selectedSchemaKey] : void 0;
    };

    ConfigureSchemaContainer.prototype.schemaKeys = function() {
      return _.keys(this.scope.resolvedSchemas);
    };

    ConfigureSchemaContainer.prototype.getSelected = function() {
      return _.get(this.scope.model, 'schemas.selected.configure');
    };

    ConfigureSchemaContainer.prototype.selectedSchemaKey = function() {
      var selectedSchemaKey;
      selectedSchemaKey = this.getSelected();
      if (selectedSchemaKey) {
        return selectedSchemaKey;
      }
      return _.first(this.schemaKeys());
    };

    ConfigureSchemaContainer.prototype.resolveFormSchemas = function() {
      if (this.scope.formSchemas == null) {
        return;
      }
      return this.meshbluJsonSchemaResolver.resolve(this.scope.formSchemas, (function(_this) {
        return function(error, formSchemas) {
          _this.scope.errorFormSchema = error;
          _this.scope.resolvedFormSchemas = formSchemas;
          return _this.scope.$apply();
        };
      })(this));
    };

    ConfigureSchemaContainer.prototype.resolveSchemas = function() {
      if (this.scope.schemas == null) {
        return;
      }
      return this.meshbluJsonSchemaResolver.resolve(this.scope.schemas, (function(_this) {
        return function(error, schemas) {
          _this.scope.errorSchema = error;
          _this.scope.resolvedSchemas = schemas;
          return _this.scope.$apply();
        };
      })(this));
    };

    ConfigureSchemaContainer.prototype.setAvailableSchemas = function() {
      if (!((this.scope.resolvedSchemas != null) && (this.scope.resolvedFormSchemas != null))) {
        return;
      }
      this.scope.availableSchemas = this.availableSchemas();
      this.scope.selectedSchema = _.findWhere(this.scope.availableSchemas, {
        key: this.selectedSchemaKey()
      });
      _.set(this.scope.model, 'schemas.selected.configure', this.selectedSchemaKey());
      this.scope.schema = this.schema();
      this.scope.formSchema = this.formSchema();
      return this.scope.isEmpty = this.isEmpty();
    };

    ConfigureSchemaContainer.prototype._defaultConfirmSchemaChange = function(callback) {
      return callback(true);
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
        formSchemas: '=?',
        model: '=',
        schemas: '=',
        meshbluConfig: '=',
        confirmSchemaChangeFn: '='
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
        model: '=',
        meshbluConfig: '=',
        confirmSchemaChangeFn: '='
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
        selectedSchemaKey: '=',
        meshbluConfig: '='
      }
    };
  });

}).call(this);

(function() {
  var MeshbluJsonSchemaResolver, MessageSchemaContainer, _, angular,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ = window._, angular = window.angular, MeshbluJsonSchemaResolver = window.MeshbluJsonSchemaResolver;

  MessageSchemaContainer = (function() {
    function MessageSchemaContainer(scope) {
      var base;
      this.scope = scope;
      this.setAvailableSchemas = bind(this.setAvailableSchemas, this);
      this.resolveSchemas = bind(this.resolveSchemas, this);
      this.resolveFormSchemas = bind(this.resolveFormSchemas, this);
      this.selectedSchemaKey = bind(this.selectedSchemaKey, this);
      this.schemaKeys = bind(this.schemaKeys, this);
      this.schema = bind(this.schema, this);
      this.isEmpty = bind(this.isEmpty, this);
      this.formSchema = bind(this.formSchema, this);
      this.availableSchemas = bind(this.availableSchemas, this);
      this.meshbluJsonSchemaResolver = new MeshbluJsonSchemaResolver({
        meshbluConfig: this.scope.meshbluConfig
      });
      if ((base = this.scope).formSchemas == null) {
        base.formSchemas = {};
      }
      this.scope.$watch('schemas', this.resolveSchemas);
      this.scope.$watch('formSchemas', this.resolveFormSchemas);
      this.scope.$watch('resolvedSchemas', this.setAvailableSchemas);
      this.scope.$watch('resolvedFormSchemas', this.setAvailableSchemas);
      this.scope.$watch('selectedSchemaKey', (function(_this) {
        return function(theNew, theOld) {
          if (!((_this.scope.resolvedSchemas != null) && (_this.scope.resolvedFormSchemas != null))) {
            return;
          }
          _this.scope.schema = _this.schema();
          _this.scope.formSchema = _this.formSchema();
          _this.scope.isEmpty = _this.isEmpty();
          if (theNew !== theOld) {
            return angular.copy({}, _this.scope.message);
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
      formSchema = _.get(this.scope.resolvedFormSchemas, key);
      return formSchema;
    };

    MessageSchemaContainer.prototype.isEmpty = function() {
      var ref, ref1;
      if (((ref = this.scope.schema) != null ? ref.type : void 0) === 'object' && _.isEmpty((ref1 = this.scope.schema) != null ? ref1.properties : void 0)) {
        return true;
      }
      return false;
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

    MessageSchemaContainer.prototype.resolveFormSchemas = function() {
      if (this.scope.formSchemas == null) {
        return;
      }
      return this.meshbluJsonSchemaResolver.resolve(this.scope.formSchemas, (function(_this) {
        return function(error, formSchemas) {
          _this.scope.errorFormSchema = error;
          _this.scope.resolvedFormSchemas = formSchemas;
          return _this.scope.$apply();
        };
      })(this));
    };

    MessageSchemaContainer.prototype.resolveSchemas = function() {
      if (this.scope.schemas == null) {
        return;
      }
      return this.meshbluJsonSchemaResolver.resolve(this.scope.schemas, (function(_this) {
        return function(error, schemas) {
          _this.scope.errorSchema = error;
          _this.scope.resolvedSchemas = schemas;
          return _this.scope.$apply();
        };
      })(this));
    };

    MessageSchemaContainer.prototype.setAvailableSchemas = function() {
      if (!((this.scope.resolvedSchemas != null) && (this.scope.resolvedFormSchemas != null))) {
        return;
      }
      this.scope.availableSchemas = this.availableSchemas();
      this.scope.selectedSchemaKey = this.selectedSchemaKey();
      this.scope.schema = this.schema();
      this.scope.formSchema = this.formSchema();
      return this.scope.isEmpty = this.isEmpty();
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
        formSchemas: '=?',
        message: '=',
        schemas: '=',
        selectedSchemaKey: '=',
        meshbluConfig: '='
      }
    };
  });

}).call(this);

(function() {
  var MeshbluJsonSchemaResolver, SchemaSelectorController, _, angular, jsonSchemaDefaults,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ = window._, angular = window.angular, MeshbluJsonSchemaResolver = window.MeshbluJsonSchemaResolver, jsonSchemaDefaults = window.jsonSchemaDefaults;

  SchemaSelectorController = (function() {
    function SchemaSelectorController(scope) {
      var ref;
      this.scope = scope;
      this._defaultConfirmSchemaChange = bind(this._defaultConfirmSchemaChange, this);
      this.selectedSchemaKey = bind(this.selectedSchemaKey, this);
      this.schemaKeys = bind(this.schemaKeys, this);
      this.availableSchemas = bind(this.availableSchemas, this);
      this.scope.availableSchemas = this.availableSchemas();
      this.scope._selectedSchema = this.selectedSchemaKey();
      if (this.scope.selectedSchema != null) {
        this.scope.selectedSchema = (ref = this.scope._selectedSchema) != null ? ref.key : void 0;
      }
      this.scope.$watch('_selectedSchema', (function(_this) {
        return function(theNew, theOld) {
          var confirmChangeFn, ref1;
          if (theNew.key === _this.scope.selectedSchema) {
            return;
          }
          confirmChangeFn = (ref1 = _this.scope.confirmSchemaChangeFn) != null ? ref1 : _this._defaultConfirmSchemaChange;
          return confirmChangeFn(function(confirmed) {
            var ref2;
            if (!confirmed) {
              _this.scope._selectedSchema = theOld;
            }
            if (_this.scope.selectedSchema != null) {
              return _this.scope.selectedSchema = (ref2 = _this.scope._selectedSchema) != null ? ref2.key : void 0;
            }
          });
        };
      })(this));
    }

    SchemaSelectorController.prototype.availableSchemas = function() {
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

    SchemaSelectorController.prototype.schemaKeys = function() {
      return _.keys(this.scope.schemas);
    };

    SchemaSelectorController.prototype.selectedSchemaKey = function() {
      var schema;
      schema = _.find(this.scope.availableSchemas, {
        key: this.scope.selectedSchema
      });
      if (schema != null) {
        return schema;
      }
      schema = _.find(this.scope.availableSchemas, {
        key: 'Default'
      });
      if (schema != null) {
        return schema;
      }
      return _.first(this.scope.availableSchemas);
    };

    SchemaSelectorController.prototype._defaultConfirmSchemaChange = function(callback) {
      return callback(true);
    };

    return SchemaSelectorController;

  })();

  window.angular.module('angular-meshblu-device-editor').controller('SchemaSelectorController', ['$scope', SchemaSelectorController]);

}).call(this);

(function() {
  window.angular.module('angular-meshblu-device-editor').directive('schemaSelector', function() {
    return {
      restrict: 'E',
      templateUrl: 'schema-selector/template.html',
      replace: true,
      controller: 'SchemaSelectorController',
      scope: {
        selectedSchema: '=',
        schemas: '=',
        confirmSchemaChangeFn: '='
      }
    };
  });

}).call(this);

(function() {
  var SchemaRenderController, _, angular, jsonSchemaDefaults,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ = window._, angular = window.angular, jsonSchemaDefaults = window.jsonSchemaDefaults;

  SchemaRenderController = (function() {
    function SchemaRenderController(scope) {
      var base, base1;
      this.scope = scope;
      this.setSchema = bind(this.setSchema, this);
      this.schema = bind(this.schema, this);
      this.formSchema = bind(this.formSchema, this);
      if ((base = this.scope).formSchemas == null) {
        base.formSchemas = {};
      }
      if ((base1 = this.scope).model == null) {
        base1.model = {};
      }
      this.setSchema();
    }

    SchemaRenderController.prototype.formSchema = function() {
      var key, ref, schema;
      schema = this.schema();
      key = schema != null ? (ref = schema['x-form-schema']) != null ? ref.angular : void 0 : void 0;
      if (key == null) {
        return ['*'];
      }
      return _.get(this.scope.formSchemas, key);
    };

    SchemaRenderController.prototype.schema = function() {
      var ref;
      return (ref = this.scope.schemas) != null ? ref[this.scope.selectedSchema] : void 0;
    };

    SchemaRenderController.prototype.setSchema = function() {
      this.scope.schema = this.schema();
      return this.scope.formSchema = this.formSchema();
    };

    return SchemaRenderController;

  })();

  window.angular.module('angular-meshblu-device-editor').controller('SchemaRenderController', ['$scope', SchemaRenderController]);

}).call(this);

(function() {
  window.angular.module('angular-meshblu-device-editor').directive('schemaRender', function() {
    return {
      restrict: 'E',
      templateUrl: 'schema-render/template.html',
      replace: true,
      controller: 'SchemaRenderController',
      scope: {
        selectedSchema: '=',
        schemas: '=',
        formSchemas: '=',
        model: '='
      }
    };
  });

}).call(this);

(function() {
  var OctobluDeviceSchemaTransmogrifier, SchemaTransmogrifyController, _, angular;

  _ = window._, angular = window.angular, OctobluDeviceSchemaTransmogrifier = window.OctobluDeviceSchemaTransmogrifier;

  SchemaTransmogrifyController = (function() {
    function SchemaTransmogrifyController(scope) {
      this.scope = scope;
      ({
        constructor: function(scope1) {
          this.scope = scope1;
          return this.scope.$watch('device', this.setSchemas);
        },
        getConfigureFormSchemas: (function(_this) {
          return function() {
            var transmogrified;
            transmogrified = _this.getTransmogrified();
            return transmogrified.schemas.form;
          };
        })(this),
        getConfigureSchemas: (function(_this) {
          return function() {
            var transmogrified;
            transmogrified = _this.getTransmogrified();
            return transmogrified.schemas.configure;
          };
        })(this),
        getTransmogrified: (function(_this) {
          return function() {
            var transmogrifier;
            transmogrifier = new OctobluDeviceSchemaTransmogrifier(_this.scope.device);
            return transmogrifier.transmogrify();
          };
        })(this),
        setSchemas: (function(_this) {
          return function() {
            if (!_this.scope.device) {
              return;
            }
            _this.scope.schemas = _this.getConfigureSchemas();
            _this.scope.formSchemas = _this.getConfigureFormSchemas();
            return _this.scope.hasSchemas = !_.isEmpty(_this.scope.schemas);
          };
        })(this)
      });
    }

    return SchemaTransmogrifyController;

  })();

  window.angular.module('angular-meshblu-device-editor').controller('SchemaTransmogrifyController', ['$scope', SchemaTransmogrifyController]);

}).call(this);

(function() {
  window.angular.module('angular-meshblu-device-editor').directive('schemaTransmogrify', function() {
    return {
      restrict: 'E',
      templateUrl: 'schema-transmogrify/template.html',
      replace: true,
      controller: 'SchemaTransmogrifyController',
      scope: {
        device: '=',
        model: '='
      }
    };
  });

}).call(this);
