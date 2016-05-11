(function() {
  angular.module('angular-meshblu-device-editor', ['schemaForm']);

}).call(this);

(function() {
  var MessageSchemaContainer;

  MessageSchemaContainer = (function() {
    function MessageSchemaContainer($scope) {
      $scope.schema = $scope.schemas[0];
      $scope.form = ['*'];
      $scope.$watch('schema', (function(_this) {
        return function() {
          return $scope.message = {};
        };
      })(this));
    }

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
        schemas: '='
      }
    };
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5jb2ZmZWUiLCJtZXNzYWdlLXNjaGVtYS1jb250YWluZXIvY29udHJvbGxlci5jb2ZmZWUiLCJtZXNzYWdlLXNjaGVtYS1jb250YWluZXIvZGlyZWN0aXZlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUFBLE9BQU8sQ0FBQyxNQUFSLENBQWUsK0JBQWYsRUFBZ0QsQ0FBQyxZQUFELENBQWhEO0FBQUE7OztBQ0FBO0FBQUEsTUFBQTs7RUFBTTtJQUNTLGdDQUFDLE1BQUQ7TUFDWCxNQUFNLENBQUMsTUFBUCxHQUFnQixNQUFNLENBQUMsT0FBUSxDQUFBLENBQUE7TUFDL0IsTUFBTSxDQUFDLElBQVAsR0FBYyxDQUFDLEdBQUQ7TUFFZCxNQUFNLENBQUMsTUFBUCxDQUFjLFFBQWQsRUFBd0IsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFBO2lCQUN0QixNQUFNLENBQUMsT0FBUCxHQUFpQjtRQURLO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF4QjtJQUpXOzs7Ozs7RUFPZixNQUNBLENBQUMsT0FDRCxDQUFDLE1BRkQsQ0FFUSwrQkFGUixDQUdBLENBQUMsVUFIRCxDQUdZLHdCQUhaLEVBR3NDLENBQUMsUUFBRCxFQUFXLHNCQUFYLENBSHRDO0FBUkE7OztBQ0FBO0VBQUEsTUFDQSxDQUFDLE9BQ0QsQ0FBQyxNQUZELENBRVEsK0JBRlIsQ0FHQSxDQUFDLFNBSEQsQ0FHVyx3QkFIWCxFQUdxQyxTQUFBO1dBQUc7TUFDdEMsUUFBQSxFQUFVLEdBRDRCO01BRXRDLFdBQUEsRUFBYSx3Q0FGeUI7TUFHdEMsT0FBQSxFQUFTLElBSDZCO01BSXRDLFVBQUEsRUFBWSx3QkFKMEI7TUFLdEMsS0FBQSxFQUNFO1FBQUEsT0FBQSxFQUFTLEdBQVQ7UUFDQSxPQUFBLEVBQVMsR0FEVDtPQU5vQzs7RUFBSCxDQUhyQztBQUFBIiwiZmlsZSI6ImNvbXBpbGVkLWNvZmZlZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhbmd1bGFyLW1lc2hibHUtZGV2aWNlLWVkaXRvcicsIFsnc2NoZW1hRm9ybSddKVxuIiwiY2xhc3MgTWVzc2FnZVNjaGVtYUNvbnRhaW5lclxuICBjb25zdHJ1Y3RvcjogKCRzY29wZSkgLT5cbiAgICAkc2NvcGUuc2NoZW1hID0gJHNjb3BlLnNjaGVtYXNbMF1cbiAgICAkc2NvcGUuZm9ybSA9IFsnKiddXG5cbiAgICAkc2NvcGUuJHdhdGNoICdzY2hlbWEnLCA9PlxuICAgICAgJHNjb3BlLm1lc3NhZ2UgPSB7fVxuXG53aW5kb3dcbi5hbmd1bGFyXG4ubW9kdWxlICdhbmd1bGFyLW1lc2hibHUtZGV2aWNlLWVkaXRvcidcbi5jb250cm9sbGVyICdNZXNzYWdlU2NoZW1hQ29udGFpbmVyJywgWyckc2NvcGUnLCBNZXNzYWdlU2NoZW1hQ29udGFpbmVyXVxuIiwid2luZG93XG4uYW5ndWxhclxuLm1vZHVsZSAnYW5ndWxhci1tZXNoYmx1LWRldmljZS1lZGl0b3InXG4uZGlyZWN0aXZlICdtZXNzYWdlU2NoZW1hQ29udGFpbmVyJywgLT4ge1xuICByZXN0cmljdDogJ0UnXG4gIHRlbXBsYXRlVXJsOiAnbWVzc2FnZS1zY2hlbWEtY29udGFpbmVyL3RlbXBsYXRlLmh0bWwnXG4gIHJlcGxhY2U6IHRydWVcbiAgY29udHJvbGxlcjogJ01lc3NhZ2VTY2hlbWFDb250YWluZXInXG4gIHNjb3BlOlxuICAgIG1lc3NhZ2U6ICc9J1xuICAgIHNjaGVtYXM6ICc9J1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
