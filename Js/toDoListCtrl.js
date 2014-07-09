angular.module('mainModule', ['LocalStorageModule','ngAnimate'])
    .controller('toDoListCtrl', ['$scope', '$window', '$timeout', 'localStorageService', function($scope, $window, $timeout, localStorageSvc) {

    $scope.tareas = [];

    $scope.tipos = [{name: 'Programación', value: '0', style: 'color: #ffffff;' + 'background-color: #1e90ff;', checked: false}, 
					{name: 'Biología', value: '1', style: 'color: #3c763d;' + 'background-color: #dff0d8;', checked: false},
					{name: 'Filosofía', value: '2', style: 'color: #31708f;' + 'background-color: #d9edf7;', checked: false},
					{name: 'Historia', value: '3', style: 'color: #8a6d3b;' + 'background-color: #fcf8e3;', checked: false},
					{name: 'Matemática', value: '4', style: 'color: #a94442;' + 'background-color: #f2dede;',checked: false}];

    $scope.init = function() {
        if(localStorageSvc.get('tareas')) {
            $scope.tareas = localStorageSvc.get('tareas');
            for (i = 0; i < $scope.tareas.length; i++) {
                $scope.tareas[i].visible = false;
            }
        }
    }
	
    $scope.check = function(item){
        item.checked = item.checked ? false : true;
    }

    $scope.add = function(){
        if($scope.nombre){
            var tarea = {};
            tarea.id = $scope.tareas.length;
            tarea.name = $scope.nombre;
            tarea.checked = false;
            tarea.style = $scope.selected.style;
            tarea.value = $scope.selected.value;

            for (i = 0; i < $scope.tipos.length; i++) {
                if($scope.tipos[i].value == tarea.value){
                    tarea.visible = $scope.tipos[i].checked;
                }
            }

            $scope.tareas.push(tarea);
            localStorageSvc.set('tareas', $scope.tareas);
        }
    }

    $scope.edit = function() {
        localStorageSvc.set('tareas', $scope.tareas);
    }

    $scope.remove = function(item){
        for (i = 0; i < $scope.tareas.length; i++) {
            if($scope.tareas[i].id == item.id){
                $scope.tareas.splice(i,1);
            }
        }
        localStorageSvc.set('tareas', $scope.tareas);
    }

    $scope.select = function(value){
        for (i = 0; i < $scope.tareas.length; i++) {
            if($scope.tareas[i].value == value){
                $scope.tareas[i].visible = (!$scope.tareas[i].visible) ? true : false;
            }
        }
    }

	$scope.init();
	
}]);