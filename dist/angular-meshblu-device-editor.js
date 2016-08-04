(function() {
  var angular;

  angular = window.angular;

  angular.module('angular-meshblu-device-editor', ['schemaForm']);

}).call(this);

(function() {
  var ConfigureSchemaContainer, MeshbluJsonSchemaResolver, angular,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  angular = window.angular, MeshbluJsonSchemaResolver = window.MeshbluJsonSchemaResolver;

  ConfigureSchemaContainer = (function() {
    function ConfigureSchemaContainer(scope) {
      var base;
      this.scope = scope;
      this.resolveSchemas = bind(this.resolveSchemas, this);
      this.resolveFormSchemas = bind(this.resolveFormSchemas, this);
      this.meshbluJsonSchemaResolver = new MeshbluJsonSchemaResolver({
        meshbluConfig: this.scope.meshbluConfig
      });
      if ((base = this.scope).formSchemas == null) {
        base.formSchemas = {};
      }
      this.initialSchemaKey = _.get(this.scope.model, 'schemas.selected.configure');
      this.scope.$watch('schemas', this.resolveSchemas);
      this.scope.$watch('formSchemas', this.resolveFormSchemas);
      this.scope.$watch('selectedSchemaKey', (function(_this) {
        return function(selectedSchemaKey) {
          if (selectedSchemaKey == null) {
            return;
          }
          return _.set(_this.scope.model, 'schemas.selected.configure', selectedSchemaKey);
        };
      })(this));
    }

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
          _this.scope.selectedSchemaKey = _this.initialSchemaKey;
          _this.scope.errorSchema = error;
          _this.scope.resolvedSchemas = schemas;
          return _this.scope.$apply();
        };
      })(this));
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
  var MeshbluSchemaFormController, _, angular, jsen,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ = window._, angular = window.angular, jsen = window.jsen;

  MeshbluSchemaFormController = (function() {
    function MeshbluSchemaFormController(scope) {
      var base;
      this.scope = scope;
      this.isEmpty = bind(this.isEmpty, this);
      this.formSchema = bind(this.formSchema, this);
      this.selectSchema = bind(this.selectSchema, this);
      if ((base = this.scope).formSchemas == null) {
        base.formSchemas = {};
      }
      this.scope.$watch('schemas', this.selectSchema);
      this.scope.$watch('formSchemas', this.selectSchema);
      this.scope.$watch('selectedSchemaKey', this.selectSchema);
    }

    MeshbluSchemaFormController.prototype.selectSchema = function() {
      var newModel, validator, validatorOptions;
      if (!((this.scope.schemas != null) && (this.scope.formSchemas != null) && (this.scope.selectedSchemaKey != null))) {
        return;
      }
      this.scope.schema = this.scope.schemas[this.scope.selectedSchemaKey];
      this.scope.formSchema = this.formSchema();
      this.scope.isEmpty = this.isEmpty();
      if (this.scope.isEmpty) {
        return;
      }
      validator = jsen(this.scope.schema);
      validatorOptions = {};
      if (this.scope.clearOnChange) {
        validatorOptions = {
          additionalProperties: false
        };
      }
      newModel = validator.build(this.scope.model, validatorOptions);
      return angular.copy(newModel, this.scope.model);
    };

    MeshbluSchemaFormController.prototype.formSchema = function() {
      var key, ref, ref1, schema;
      schema = (ref = this.scope.schemas) != null ? ref[this.scope.selectedSchemaKey] : void 0;
      key = schema != null ? (ref1 = schema['x-form-schema']) != null ? ref1.angular : void 0 : void 0;
      if (key == null) {
        return ['*'];
      }
      return _.get(this.scope.formSchemas, key);
    };

    MeshbluSchemaFormController.prototype.isEmpty = function() {
      var ref, ref1;
      if (!this.scope.schema) {
        return true;
      }
      if (((ref = this.scope.schema) != null ? ref.type : void 0) === 'object' && _.isEmpty((ref1 = this.scope.schema) != null ? ref1.properties : void 0)) {
        return true;
      }
      return false;
    };

    return MeshbluSchemaFormController;

  })();

  window.angular.module('angular-meshblu-device-editor').controller('MeshbluSchemaFormController', ['$scope', MeshbluSchemaFormController]);

}).call(this);

(function() {
  window.angular.module('angular-meshblu-device-editor').directive('meshbluSchemaForm', function() {
    return {
      restrict: 'E',
      templateUrl: 'meshblu-schema-form/template.html',
      replace: true,
      controller: 'MeshbluSchemaFormController',
      scope: {
        selectedSchemaKey: '=',
        schemas: '=',
        formSchemas: '=',
        meshbluConfig: '=',
        model: '=',
        clearOnChange: '='
      }
    };
  });

}).call(this);

(function() {
  var MeshbluJsonSchemaResolver, MessageSchemaContainer, angular,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  angular = window.angular, MeshbluJsonSchemaResolver = window.MeshbluJsonSchemaResolver;

  MessageSchemaContainer = (function() {
    function MessageSchemaContainer(scope) {
      var base;
      this.scope = scope;
      this.resolveSchemas = bind(this.resolveSchemas, this);
      this.resolveFormSchemas = bind(this.resolveFormSchemas, this);
      this.meshbluJsonSchemaResolver = new MeshbluJsonSchemaResolver({
        meshbluConfig: this.scope.meshbluConfig
      });
      if ((base = this.scope).formSchemas == null) {
        base.formSchemas = {};
      }
      this.scope.$watch('schemas', this.resolveSchemas);
      this.scope.$watch('formSchemas', this.resolveFormSchemas);
    }

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
        meshbluConfig: '=',
        selectedSchemaKey: '=',
        confirmSchemaChangeFn: '='
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
      var base, ref;
      this.scope = scope;
      this._defaultConfirmSchemaChange = bind(this._defaultConfirmSchemaChange, this);
      this.getSelectedSchema = bind(this.getSelectedSchema, this);
      this.schemaKeys = bind(this.schemaKeys, this);
      this.availableSchemas = bind(this.availableSchemas, this);
      this.updateAvailableSchemas = bind(this.updateAvailableSchemas, this);
      this.updateAvailableSchemas();
      if ((base = this.scope).selectedSchemaKey == null) {
        base.selectedSchemaKey = (ref = this.scope.selectedSchema) != null ? ref.key : void 0;
      }
      this.scope.$watch('schemas', this.updateAvailableSchemas);
      this.scope.$watch('selectedSchema', (function(_this) {
        return function(theNew, theOld) {
          var confirmChangeFn, ref1;
          if (theNew == null) {
            return;
          }
          if (_this.scope.selectedSchemaKey == null) {
            return _this.scope.selectedSchemaKey = theNew.key;
          }
          if (theNew.key === _this.scope.selectedSchemaKey) {
            return;
          }
          confirmChangeFn = (ref1 = _this.scope.confirmSchemaChangeFn) != null ? ref1 : _this._defaultConfirmSchemaChange;
          return confirmChangeFn(function(confirmed) {
            var ref2;
            if (!confirmed) {
              _this.scope.selectedSchema = theOld;
            }
            return _this.scope.selectedSchemaKey = (ref2 = _this.scope.selectedSchema) != null ? ref2.key : void 0;
          });
        };
      })(this));
    }

    SchemaSelectorController.prototype.updateAvailableSchemas = function() {
      this.scope.availableSchemas = this.availableSchemas();
      return this.scope.selectedSchema = this.getSelectedSchema();
    };

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

    SchemaSelectorController.prototype.getSelectedSchema = function() {
      var schema;
      schema = _.find(this.scope.availableSchemas, {
        key: this.scope.selectedSchemaKey
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
        selectedSchemaKey: '=',
        schemas: '=',
        confirmSchemaChangeFn: '='
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

angular.module("angular-meshblu-device-editor").run(["$templateCache", function($templateCache) {$templateCache.put("configure-schema-container/template.html","<div>\n  <div class=\"alert alert-danger\" ng-show=\"errorFormSchema\">Error resolving form schema</div>\n  <div class=\"alert alert-danger\" ng-show=\"errorSchema\">Error resolving configure schema</div>\n\n  <div ng-hide=\"isEmpty\">\n    <schema-selector\n      schemas=\"resolvedSchemas\"\n      selected-schema-key=\"selectedSchemaKey\"\n      confirm-schema-change-fn=\"confirmSchemaChangeFn\"\n    >\n    </schema-selector>\n    <meshblu-schema-form\n      schemas=\"resolvedSchemas\"\n      form-schemas=\"resolvedFormSchemas\"\n      selected-schema-key=\"selectedSchemaKey\"\n      meshblu-config=\"meshbluConfig\"\n      model=\"model\" >\n    </meshblu-schema-form>\n  </div>\n</div>\n");
$templateCache.put("device-configure-schema-container/template.html","<div>\n  <h4 ng-hide=\"hasSchemas\"><small>Device does not contain a configure schema.</small></h4>\n\n  <configure-schema-container\n    ng-show=\"hasSchemas\"\n    model=\"model\"\n    schemas=\"schemas\"\n    meshblu-config=\"meshbluConfig\"\n    form-schemas=\"formSchemas\"\n    confirm-schema-change-fn=\"confirmSchemaChangeFn\"></configure-schema-container>\n</div>\n");
$templateCache.put("device-message-schema-container/template.html","<div>\n  <h4 ng-hide=\"hasSchemas\"><small>Device does not contain a message schema.</small></h4>\n\n  <message-schema-container\n    ng-show=\"hasSchemas\"\n    message=\"message\"\n    schemas=\"schemas\"\n    form-schemas=\"formSchemas\"\n    meshblu-config=\"meshbluConfig\"\n    selected-schema-key=\"selectedSchemaKey\" ></message-schema-container>\n</div>\n");
$templateCache.put("meshblu-schema-form/template.html","<div>\n  <form ng-hide=\"isEmpty\" sf-schema=\"schema\" sf-form=\"formSchema\" sf-model=\"model\"></form>\n</div>\n");
$templateCache.put("message-schema-container/template.html","<div>\n  <div class=\"alert alert-danger\" ng-show=\"errorFormSchema\">Error resolving form schema</div>\n  <div class=\"alert alert-danger\" ng-show=\"errorSchema\">Error resolving configure schema</div>\n\n  <div ng-hide=\"isEmpty\">\n    <schema-selector\n      schemas=\"resolvedSchemas\"\n      selected-schema-key=\"selectedSchemaKey\"\n    >\n    </schema-selector>\n    <meshblu-schema-form\n      schemas=\"resolvedSchemas\"\n      form-schemas=\"resolvedFormSchemas\"\n      selected-schema-key=\"selectedSchemaKey\"\n      meshblu-config=\"meshbluConfig\"\n      clear-on-change=\"true\"\n      model=\"message\">\n    </meshblu-schema-form>\n  </div>\n</div>\n");
$templateCache.put("schema-selector/template.html","<div>\n  <div class=\"form-group\" ng-hide=\"availableSchemas.length == 1\">\n    <label class=\"control-label\" for=\"selected-schema-key\">Configure Type</label>    \n    <select\n      ng-options=\"option.title group by option.group for option in availableSchemas track by option.key\"\n      ng-model=\"selectedSchema\"\n      name=\"selected-schema-key\"\n      class=\"form-control\"></select>\n  </div>\n</div>\n");
$templateCache.put("schema-transmogrify/template.html","<div>\n  <schema-form\n    schemas=\"schemas\"\n    form-schemas=\"formSchemas\"\n    selected-schema=\"selectedSchema\"\n    model=\"model\">\n  </schema-form>\n</div>\n");}]);