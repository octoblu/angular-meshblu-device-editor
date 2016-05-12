(function() {
  angular.module('angular-meshblu-device-editor', ['schemaForm', 'ngLodash']);

}).call(this);

(function() {


}).call(this);

(function() {


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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5jb2ZmZWUiLCJkZXZpY2UtbWVzc2FnZS1zY2hlbWEtY29udGFpbmVyL2NvbnRyb2xsZXIuY29mZmVlIiwiZGV2aWNlLW1lc3NhZ2Utc2NoZW1hLWNvbnRhaW5lci9kaXJlY3RpdmUuY29mZmVlIiwibWVzc2FnZS1zY2hlbWEtY29udGFpbmVyL2NvbnRyb2xsZXIuY29mZmVlIiwibWVzc2FnZS1zY2hlbWEtY29udGFpbmVyL2RpcmVjdGl2ZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxPQUFPLENBQUMsTUFBUixDQUFlLCtCQUFmLEVBQWdELENBQUMsWUFBRCxFQUFlLFVBQWYsQ0FBaEQ7QUFBQTs7O0FDQUE7O0FBQUE7OztBQ0FBOztBQUFBOzs7QUNBQTtBQUFBLE1BQUEsc0JBQUE7SUFBQTs7RUFBTTtJQUNTLGdDQUFDLEtBQUQ7TUFBQyxJQUFDLENBQUEsUUFBRDs7Ozs7TUFDWixJQUFDLENBQUEsS0FBSyxDQUFDLGlCQUFQLEdBQTJCLElBQUMsQ0FBQSxpQkFBRCxDQUFBO01BQzNCLElBQUMsQ0FBQSxLQUFLLENBQUMsaUJBQVAsR0FBMkIsSUFBQyxDQUFBLGlCQUFELENBQUE7TUFDM0IsSUFBQyxDQUFBLEtBQUssQ0FBQyxNQUFQLEdBQWdCLElBQUMsQ0FBQSxNQUFELENBQUE7TUFDaEIsSUFBQyxDQUFBLEtBQUssQ0FBQyxVQUFQLEdBQW9CLENBQUMsR0FBRDtNQUVwQixJQUFDLENBQUEsS0FBSyxDQUFDLE1BQVAsQ0FBYyxtQkFBZCxFQUFtQyxDQUFBLFNBQUEsS0FBQTtlQUFBLFNBQUE7VUFDakMsS0FBQyxDQUFBLEtBQUssQ0FBQyxNQUFQLEdBQWlCLEtBQUMsQ0FBQSxNQUFELENBQUE7aUJBQ2pCLEtBQUMsQ0FBQSxLQUFLLENBQUMsT0FBUCxHQUFpQjtRQUZnQjtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbkM7SUFOVzs7cUNBVWIsaUJBQUEsR0FBbUIsU0FBQTthQUNqQixJQUFDLENBQUEsVUFBRCxDQUFBLENBQWEsQ0FBQyxHQUFkLENBQWtCLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQyxHQUFEO0FBQ2hCLGNBQUE7VUFBQSxNQUFBLDRDQUF5QixDQUFBLEdBQUE7VUFDekIsS0FBQSxvRUFBeUI7aUJBQ3pCO1lBQUMsS0FBQSxHQUFEO1lBQUssT0FBQSxLQUFMOztRQUhnQjtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbEI7SUFEaUI7O3FDQU1uQixNQUFBLEdBQVEsU0FBQTtBQUNOLFVBQUE7cURBQWdCLENBQUEsSUFBQyxDQUFBLEtBQUssQ0FBQyxpQkFBUDtJQURWOztxQ0FHUixVQUFBLEdBQVksU0FBQTtBQUNWLFVBQUE7cUVBQThCO0lBRHBCOztxQ0FHWixpQkFBQSxHQUFtQixTQUFBO01BQ2pCLElBQW1DLG9DQUFuQztBQUFBLGVBQU8sSUFBQyxDQUFBLEtBQUssQ0FBQyxrQkFBZDs7YUFDQSxJQUFDLENBQUEsVUFBRCxDQUFBLENBQWMsQ0FBQSxDQUFBO0lBRkc7Ozs7OztFQUlyQixNQUNBLENBQUMsT0FDRCxDQUFDLE1BRkQsQ0FFUSwrQkFGUixDQUdBLENBQUMsVUFIRCxDQUdZLHdCQUhaLEVBR3NDLENBQUMsUUFBRCxFQUFXLHNCQUFYLENBSHRDO0FBM0JBOzs7QUNBQTtFQUFBLE1BQ0EsQ0FBQyxPQUNELENBQUMsTUFGRCxDQUVRLCtCQUZSLENBR0EsQ0FBQyxTQUhELENBR1csd0JBSFgsRUFHcUMsU0FBQTtXQUFHO01BQ3RDLFFBQUEsRUFBVSxHQUQ0QjtNQUV0QyxXQUFBLEVBQWEsd0NBRnlCO01BR3RDLE9BQUEsRUFBUyxJQUg2QjtNQUl0QyxVQUFBLEVBQVksd0JBSjBCO01BS3RDLEtBQUEsRUFDRTtRQUFBLE9BQUEsRUFBUyxHQUFUO1FBQ0EsT0FBQSxFQUFTLEdBRFQ7UUFFQSxpQkFBQSxFQUFtQixHQUZuQjtPQU5vQzs7RUFBSCxDQUhyQztBQUFBIiwiZmlsZSI6ImNvbXBpbGVkLWNvZmZlZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhbmd1bGFyLW1lc2hibHUtZGV2aWNlLWVkaXRvcicsIFsnc2NoZW1hRm9ybScsICduZ0xvZGFzaCddKVxuIiwiIiwiIiwiY2xhc3MgTWVzc2FnZVNjaGVtYUNvbnRhaW5lclxuICBjb25zdHJ1Y3RvcjogKEBzY29wZSkgLT5cbiAgICBAc2NvcGUuYXZhaWxhYmxlZFNjaGVtYXMgPSBAYXZhaWxhYmxlZFNjaGVtYXMoKVxuICAgIEBzY29wZS5zZWxlY3RlZFNjaGVtYUtleSA9IEBzZWxlY3RlZFNjaGVtYUtleSgpXG4gICAgQHNjb3BlLnNjaGVtYSA9IEBzY2hlbWEoKVxuICAgIEBzY29wZS5mb3JtU2NoZW1hID0gWycqJ11cblxuICAgIEBzY29wZS4kd2F0Y2ggJ3NlbGVjdGVkU2NoZW1hS2V5JywgPT5cbiAgICAgIEBzY29wZS5zY2hlbWEgID0gQHNjaGVtYSgpXG4gICAgICBAc2NvcGUubWVzc2FnZSA9IHt9XG5cbiAgYXZhaWxhYmxlZFNjaGVtYXM6ID0+XG4gICAgQHNjaGVtYUtleXMoKS5tYXAgKGtleSkgPT5cbiAgICAgIHNjaGVtYSA9IEBzY29wZS5zY2hlbWFzP1trZXldXG4gICAgICB0aXRsZSAgPSBzY2hlbWE/LnRpdGxlID8ga2V5XG4gICAgICB7a2V5LHRpdGxlfVxuXG4gIHNjaGVtYTogPT5cbiAgICBAc2NvcGUuc2NoZW1hcz9bQHNjb3BlLnNlbGVjdGVkU2NoZW1hS2V5XVxuXG4gIHNjaGVtYUtleXM6ID0+XG4gICAgT2JqZWN0LmtleXMoQHNjb3BlLnNjaGVtYXMpID8gW11cblxuICBzZWxlY3RlZFNjaGVtYUtleTogPT5cbiAgICByZXR1cm4gQHNjb3BlLnNlbGVjdGVkU2NoZW1hS2V5IGlmIEBzY29wZS5zZWxlY3RlZFNjaGVtYUtleT9cbiAgICBAc2NoZW1hS2V5cygpWzBdXG5cbndpbmRvd1xuLmFuZ3VsYXJcbi5tb2R1bGUgJ2FuZ3VsYXItbWVzaGJsdS1kZXZpY2UtZWRpdG9yJ1xuLmNvbnRyb2xsZXIgJ01lc3NhZ2VTY2hlbWFDb250YWluZXInLCBbJyRzY29wZScsIE1lc3NhZ2VTY2hlbWFDb250YWluZXJdXG4iLCJ3aW5kb3dcbi5hbmd1bGFyXG4ubW9kdWxlICdhbmd1bGFyLW1lc2hibHUtZGV2aWNlLWVkaXRvcidcbi5kaXJlY3RpdmUgJ21lc3NhZ2VTY2hlbWFDb250YWluZXInLCAtPiB7XG4gIHJlc3RyaWN0OiAnRSdcbiAgdGVtcGxhdGVVcmw6ICdtZXNzYWdlLXNjaGVtYS1jb250YWluZXIvdGVtcGxhdGUuaHRtbCdcbiAgcmVwbGFjZTogdHJ1ZVxuICBjb250cm9sbGVyOiAnTWVzc2FnZVNjaGVtYUNvbnRhaW5lcidcbiAgc2NvcGU6XG4gICAgbWVzc2FnZTogJz0nXG4gICAgc2NoZW1hczogJz0nXG4gICAgc2VsZWN0ZWRTY2hlbWFLZXk6ICc9J1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
