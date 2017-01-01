'use strict';
yii2AngApp_node.factory("nodeServices", ['$http','$location','$route',
    function($http,$location,$route) {
    var obj = {};
    obj.getNodes = function(){
        return $http.get(serviceBase + 'nodes');
    }    
    obj.createNode = function (node) {
        return $http.post( serviceBase + 'nodes', node )
            .then( successHandler )
            .catch( errorHandler );
        function successHandler( result ) {
            $location.path('/node/index');
        }
        function errorHandler( result ){
            alert("Error data")
            $location.path('/node/create')
        }
    };    
    obj.getNode = function(nodeId){
        return $http.get(serviceBase + 'nodes/' + nodeId);
    }
 
    obj.updateNode = function (node) {
        return $http.put(serviceBase + 'nodes/' + node.id, node )
            .then( successHandler )
            .catch( errorHandler );
        function successHandler( result ) {
            $location.path('/node/index');
        }
        function errorHandler( result ){
            alert("Error data")
            $location.path('/node/update/' + node.id)
        }    
    };    
    obj.deleteNode = function (nodeId) {
        return $http.delete(serviceBase + 'nodes/' + nodeId)
            .then( successHandler )
            .catch( errorHandler );
        function successHandler( result ) {
            $route.reload();
        }
        function errorHandler( result ){
            alert("Error data")
            $route.reload();
        }    
    };    
    return obj;   
}]);