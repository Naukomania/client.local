'use strict';
yii2AngApp_node.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/node/index', {
        templateUrl: 'views/node/index.html',
        controller: 'NodeIndex'
    })
    .otherwise({
        redirectTo: '/site/index'
    });
}]);
yii2AngApp_node.controller('NodeIndex', ['$scope', '$http', function($scope,$http) {
    // Сообщение для отображения представлением
    $scope.message = 'Вы читаете страницу с подборками.';
}]);