'use strict';
yii2AngApp_node.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/node/index', {
        templateUrl: 'views/node/index.html',
        controller: 'NodeIndex'
    })
    .when('/node/create', {
      templateUrl: 'views/node/create.html',
      controller: 'NodeCreate',
      resolve: {
          node: function(nodeServices, $route){
              return nodeServices.getNodes();
          }
      }
    })
    .when('/node/update/:nodeId', {
      templateUrl: 'views/node/update.html',
      controller: 'NodeUpdate',
      resolve: {
          node: function(nodeServices, $route){
              var nodeId = $route.current.params.nodeId;
              return nodeServices.getNode(nodeId);
          }
      }
    })
    .when('/node/delete/:nodeId', {
      templateUrl: 'views/node/index.html',
      controller: 'NodeDelete',
    })
    .otherwise({
        redirectTo: '/node/index'
    });
}]);
yii2AngApp_node.controller('NodeIndex', ['$scope', '$http', 'nodeServices',
    function($scope,$http,nodeServices) {
    $scope.message = 'Здесь вы найдёте все интересующие вас подборки!';
    nodeServices.getNodes().then(function(data){
        $scope.nodes = data.data;
    });
    $scope.deleteNode = function(nodeId) {
        if(confirm("Are you sure to delete node number: " + nodeId)==true && nodeId>0){
            nodeServices.deleteNode(nodeId);
            $route.reload();
        }
    };
}])
.controller('NodeCreate', ['$scope', '$http', 'nodeServices','$location','node',
    function($scope,$http,nodeServices,$location,node) {
    $scope.message = 'Look! I am an about page.';
    $scope.createNode = function(node) {
        var results = nodeServices.createNode(node);
    }
}])
.controller('NodeUpdate', ['$scope', '$http', '$routeParams', 'nodeServices','$location','node',
    function($scope,$http,$routeParams,nodeServices,$location,node) {
    $scope.message = 'Contact us! JK. This is just a demo.';
    var original = node.data;
    $scope.node = angular.copy(original);
    $scope.isClean = function() {
        return angular.equals(original, $scope.node);
    }
    $scope.updateNode = function(node) {
        var results = nodeServices.updateNode(node);
    }
}]);