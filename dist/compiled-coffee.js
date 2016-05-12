(function() {
  angular.module('angular-meshblu-device-editor', ['schemaForm', 'ngLodash']);

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
      this.availabledSchemas = bind(this.availabledSchemas, this);
      this.scope.availabledSchemas = this.availabledSchemas();
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

    MessageSchemaContainer.prototype.availabledSchemas = function() {
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
      var ref;
      return (ref = Object.keys(this.scope.schemas)) != null ? ref : [];
    };

    MessageSchemaContainer.prototype.selectedSchemaKey = function() {
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
        selectedSchema: '='
      }
    };
  });

}).call(this);

(function() {


}).call(this);

(function() {


}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5jb2ZmZWUiLCJtZXNzYWdlLXNjaGVtYS1jb250YWluZXIvY29udHJvbGxlci5jb2ZmZWUiLCJtZXNzYWdlLXNjaGVtYS1jb250YWluZXIvZGlyZWN0aXZlLmNvZmZlZSIsImRldmljZS1tZXNzYWdlLXNjaGVtYS1jb250YWluZXIvY29udHJvbGxlci5jb2ZmZWUiLCJkZXZpY2UtbWVzc2FnZS1zY2hlbWEtY29udGFpbmVyL2RpcmVjdGl2ZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxPQUFPLENBQUMsTUFBUixDQUFlLCtCQUFmLEVBQWdELENBQUMsWUFBRCxFQUFlLFVBQWYsQ0FBaEQ7QUFBQTs7O0FDQUE7QUFBQSxNQUFBLHNCQUFBO0lBQUE7O0VBQU07SUFDUyxnQ0FBQyxLQUFEO01BQUMsSUFBQyxDQUFBLFFBQUQ7Ozs7O01BQ1osSUFBQyxDQUFBLEtBQUssQ0FBQyxpQkFBUCxHQUEyQixJQUFDLENBQUEsaUJBQUQsQ0FBQTtNQUMzQixJQUFDLENBQUEsS0FBSyxDQUFDLGlCQUFQLEdBQTJCLElBQUMsQ0FBQSxpQkFBRCxDQUFBO01BQzNCLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBUCxHQUFnQixJQUFDLENBQUEsTUFBRCxDQUFBO01BQ2hCLElBQUMsQ0FBQSxLQUFLLENBQUMsVUFBUCxHQUFvQixDQUFDLEdBQUQ7TUFFcEIsSUFBQyxDQUFBLEtBQUssQ0FBQyxNQUFQLENBQWMsbUJBQWQsRUFBbUMsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFBO1VBQ2pDLEtBQUMsQ0FBQSxLQUFLLENBQUMsTUFBUCxHQUFpQixLQUFDLENBQUEsTUFBRCxDQUFBO2lCQUNqQixLQUFDLENBQUEsS0FBSyxDQUFDLE9BQVAsR0FBaUI7UUFGZ0I7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQW5DO0lBTlc7O3FDQVViLGlCQUFBLEdBQW1CLFNBQUE7YUFDakIsSUFBQyxDQUFBLFVBQUQsQ0FBQSxDQUFhLENBQUMsR0FBZCxDQUFrQixDQUFBLFNBQUEsS0FBQTtlQUFBLFNBQUMsR0FBRDtBQUNoQixjQUFBO1VBQUEsTUFBQSw0Q0FBeUIsQ0FBQSxHQUFBO1VBQ3pCLEtBQUEsb0VBQXlCO2lCQUN6QjtZQUFDLEtBQUEsR0FBRDtZQUFLLE9BQUEsS0FBTDs7UUFIZ0I7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWxCO0lBRGlCOztxQ0FNbkIsTUFBQSxHQUFRLFNBQUE7QUFDTixVQUFBO3FEQUFnQixDQUFBLElBQUMsQ0FBQSxLQUFLLENBQUMsaUJBQVA7SUFEVjs7cUNBR1IsVUFBQSxHQUFZLFNBQUE7QUFDVixVQUFBO3FFQUE4QjtJQURwQjs7cUNBR1osaUJBQUEsR0FBbUIsU0FBQTthQUNqQixJQUFDLENBQUEsVUFBRCxDQUFBLENBQWMsQ0FBQSxDQUFBO0lBREc7Ozs7OztFQUdyQixNQUNBLENBQUMsT0FDRCxDQUFDLE1BRkQsQ0FFUSwrQkFGUixDQUdBLENBQUMsVUFIRCxDQUdZLHdCQUhaLEVBR3NDLENBQUMsUUFBRCxFQUFXLHNCQUFYLENBSHRDO0FBMUJBOzs7QUNBQTtFQUFBLE1BQ0EsQ0FBQyxPQUNELENBQUMsTUFGRCxDQUVRLCtCQUZSLENBR0EsQ0FBQyxTQUhELENBR1csd0JBSFgsRUFHcUMsU0FBQTtXQUFHO01BQ3RDLFFBQUEsRUFBVSxHQUQ0QjtNQUV0QyxXQUFBLEVBQWEsd0NBRnlCO01BR3RDLE9BQUEsRUFBUyxJQUg2QjtNQUl0QyxVQUFBLEVBQVksd0JBSjBCO01BS3RDLEtBQUEsRUFDRTtRQUFBLE9BQUEsRUFBUyxHQUFUO1FBQ0EsT0FBQSxFQUFTLEdBRFQ7UUFFQSxjQUFBLEVBQWdCLEdBRmhCO09BTm9DOztFQUFILENBSHJDO0FBQUE7OztBQ0FBOztBQUFBOzs7QUNBQTs7QUFBQSIsImZpbGUiOiJjb21waWxlZC1jb2ZmZWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYW5ndWxhci1tZXNoYmx1LWRldmljZS1lZGl0b3InLCBbJ3NjaGVtYUZvcm0nLCAnbmdMb2Rhc2gnXSlcbiIsImNsYXNzIE1lc3NhZ2VTY2hlbWFDb250YWluZXJcbiAgY29uc3RydWN0b3I6IChAc2NvcGUpIC0+XG4gICAgQHNjb3BlLmF2YWlsYWJsZWRTY2hlbWFzID0gQGF2YWlsYWJsZWRTY2hlbWFzKClcbiAgICBAc2NvcGUuc2VsZWN0ZWRTY2hlbWFLZXkgPSBAc2VsZWN0ZWRTY2hlbWFLZXkoKVxuICAgIEBzY29wZS5zY2hlbWEgPSBAc2NoZW1hKClcbiAgICBAc2NvcGUuZm9ybVNjaGVtYSA9IFsnKiddXG5cbiAgICBAc2NvcGUuJHdhdGNoICdzZWxlY3RlZFNjaGVtYUtleScsID0+XG4gICAgICBAc2NvcGUuc2NoZW1hICA9IEBzY2hlbWEoKVxuICAgICAgQHNjb3BlLm1lc3NhZ2UgPSB7fVxuXG4gIGF2YWlsYWJsZWRTY2hlbWFzOiA9PlxuICAgIEBzY2hlbWFLZXlzKCkubWFwIChrZXkpID0+XG4gICAgICBzY2hlbWEgPSBAc2NvcGUuc2NoZW1hcz9ba2V5XVxuICAgICAgdGl0bGUgID0gc2NoZW1hPy50aXRsZSA/IGtleVxuICAgICAge2tleSx0aXRsZX1cblxuICBzY2hlbWE6ID0+XG4gICAgQHNjb3BlLnNjaGVtYXM/W0BzY29wZS5zZWxlY3RlZFNjaGVtYUtleV1cblxuICBzY2hlbWFLZXlzOiA9PlxuICAgIE9iamVjdC5rZXlzKEBzY29wZS5zY2hlbWFzKSA/IFtdXG5cbiAgc2VsZWN0ZWRTY2hlbWFLZXk6ID0+XG4gICAgQHNjaGVtYUtleXMoKVswXVxuXG53aW5kb3dcbi5hbmd1bGFyXG4ubW9kdWxlICdhbmd1bGFyLW1lc2hibHUtZGV2aWNlLWVkaXRvcidcbi5jb250cm9sbGVyICdNZXNzYWdlU2NoZW1hQ29udGFpbmVyJywgWyckc2NvcGUnLCBNZXNzYWdlU2NoZW1hQ29udGFpbmVyXVxuIiwid2luZG93XG4uYW5ndWxhclxuLm1vZHVsZSAnYW5ndWxhci1tZXNoYmx1LWRldmljZS1lZGl0b3InXG4uZGlyZWN0aXZlICdtZXNzYWdlU2NoZW1hQ29udGFpbmVyJywgLT4ge1xuICByZXN0cmljdDogJ0UnXG4gIHRlbXBsYXRlVXJsOiAnbWVzc2FnZS1zY2hlbWEtY29udGFpbmVyL3RlbXBsYXRlLmh0bWwnXG4gIHJlcGxhY2U6IHRydWVcbiAgY29udHJvbGxlcjogJ01lc3NhZ2VTY2hlbWFDb250YWluZXInXG4gIHNjb3BlOlxuICAgIG1lc3NhZ2U6ICc9J1xuICAgIHNjaGVtYXM6ICc9J1xuICAgIHNlbGVjdGVkU2NoZW1hOiAnPSdcbn1cbiIsIiIsIiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
