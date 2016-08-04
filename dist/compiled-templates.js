angular.module("angular-meshblu-device-editor").run(["$templateCache", function($templateCache) {$templateCache.put("configure-schema-container/template.html","<div>\n  <div class=\"alert alert-danger\" ng-show=\"errorFormSchema\">Error resolving form schema</div>\n  <div class=\"alert alert-danger\" ng-show=\"errorSchema\">Error resolving configure schema</div>\n\n  <div ng-hide=\"isEmpty\">\n    <schema-selector\n      schemas=\"resolvedSchemas\"\n      selected-schema-key=\"selectedSchemaKey\"\n      confirm-schema-change-fn=\"confirmSchemaChangeFn\"\n    >\n    </schema-selector>\n    <meshblu-schema-form\n      schemas=\"resolvedSchemas\"\n      form-schemas=\"resolvedFormSchemas\"\n      selected-schema-key=\"selectedSchemaKey\"\n      meshblu-config=\"meshbluConfig\"\n      model=\"model\" >\n    </meshblu-schema-form>\n  </div>\n</div>\n");
$templateCache.put("device-configure-schema-container/template.html","<div>\n  <h4 ng-hide=\"hasSchemas\"><small>Device does not contain a configure schema.</small></h4>\n\n  <configure-schema-container\n    ng-show=\"hasSchemas\"\n    model=\"model\"\n    schemas=\"schemas\"\n    meshblu-config=\"meshbluConfig\"\n    form-schemas=\"formSchemas\"\n    confirm-schema-change-fn=\"confirmSchemaChangeFn\"></configure-schema-container>\n</div>\n");
$templateCache.put("device-message-schema-container/template.html","<div>\n  <h4 ng-hide=\"hasSchemas\"><small>Device does not contain a message schema.</small></h4>\n\n  <message-schema-container\n    ng-show=\"hasSchemas\"\n    message=\"message\"\n    schemas=\"schemas\"\n    form-schemas=\"formSchemas\"\n    meshblu-config=\"meshbluConfig\"\n    selected-schema-key=\"selectedSchemaKey\" ></message-schema-container>\n</div>\n");
$templateCache.put("meshblu-schema-form/template.html","<div>\n  <form ng-hide=\"isEmpty\" sf-schema=\"schema\" sf-form=\"formSchema\" sf-model=\"model\"></form>\n</div>\n");
$templateCache.put("message-schema-container/template.html","<div>\n  <div class=\"alert alert-danger\" ng-show=\"errorFormSchema\">Error resolving form schema</div>\n  <div class=\"alert alert-danger\" ng-show=\"errorSchema\">Error resolving configure schema</div>\n\n  <div ng-hide=\"isEmpty\">\n    <schema-selector\n      schemas=\"resolvedSchemas\"\n      selected-schema-key=\"selectedSchemaKey\"\n    >\n    </schema-selector>\n    <meshblu-schema-form\n      schemas=\"resolvedSchemas\"\n      form-schemas=\"resolvedFormSchemas\"\n      selected-schema-key=\"selectedSchemaKey\"\n      meshblu-config=\"meshbluConfig\"\n      clear-on-change=\"true\"\n      model=\"message\">\n    </meshblu-schema-form>\n  </div>\n</div>\n");
$templateCache.put("schema-selector/template.html","<div>\n  <div class=\"form-group\" ng-hide=\"availableSchemas.length == 1\">\n    <label class=\"control-label\" for=\"selected-schema-key\">Configure Type</label>    \n    <select\n      ng-options=\"option.title group by option.group for option in availableSchemas track by option.key\"\n      ng-model=\"selectedSchema\"\n      name=\"selected-schema-key\"\n      class=\"form-control\"></select>\n  </div>\n</div>\n");
$templateCache.put("schema-transmogrify/template.html","<div>\n  <schema-form\n    schemas=\"schemas\"\n    form-schemas=\"formSchemas\"\n    selected-schema=\"selectedSchema\"\n    model=\"model\">\n  </schema-form>\n</div>\n");}]);