var myTodoList = angular.module('TodoListApp',[]).controller('toDoListCtrl', function($scope, $timeout) {
    $scope.idTodo = 1;
    $scope.searchTodo = "";
    $scope.todos = [{id: $scope.idTodo++, name: "Aprender angular", categorie: "Proyecto 3", done: true},
                    {id: $scope.idTodo++, name: "Cocinar el almuerzo", categorie: "Cocina", done: false},
                    {id: $scope.idTodo++, name: 'Tarea de mate', categorie: "Colegio", done: false}];

	$scope.categories = [{
        name: 'Tarea',
        value: '0',
        style: 'color: #ffffff;' + 'background-color: #1e90ff;',
        checked: false
    }, {
        name: 'Cocina',
        value: '1',
        style: 'color: #3c763d;' + 'background-color: #dff0d8;',
        checked: false
    },{
        name: 'Colegio',
        value: '2',
        style: 'color: #31708f;' + 'background-color: #d9edf7;',
        checked: false
    },{
        name: 'Casa',
        value: '3',
        style: 'color: #8a6d3b;' + 'background-color: #fcf8e3;',
        checked: false
    },{
        name: 'Proyecto 3',
        value: '4',
        style: 'color: #a94442;' + 'background-color: #f2dede;',
        checked: false
    }];
	
	
    $scope.isActive = true;
	$scope.isActiveDone = true;
	
	$scope.select = function(value){
        //for es más rápido que angular.forEach()
        for (i = 0; i < $scope.todos.length; i++) {
            if($scope.todos[i].value == value){
                $scope.todos[i].visible = (!$scope.todos[i].visible) ? true : false;
            }
        }
    }
	
	$scope.check = function(item){
        item.checked = item.checked ? false : true;
    }
	
    $scope.addTodo = function() {
        if ($scope.todoName === "") {
            return false;
        }else if($scope.todoName === undefined && $scope.todoCategorie === undefined) {
            return false;
        }else if($scope.todoCategorie === undefined)
        {
            return false;
        }

        $scope.todos.push({
            id: $scope.idTodo++,
            name: $scope.todoName,
            categorie: $scope.todoCategorie,
            done: false
        });
		/*debugger;
		var t = JSON.stringify($scope.todos);
		localStorage.setItem("todos", t);
		var personaGuardada = localStorage.getItem("todos");
		console.log(typeof personaGuardada); //string
 
		var personaGuardada = JSON.parse(personaGuardada);
		/*localStorageSvc.set('todos', $scope.todos);*/

        $scope.todoName = '';
        $scope.todoCategorie = 0;
    }

    $scope.remove = function(todo)
    {
        $scope.isActive = !$scope.isActive;

        var deleteTodo = function() {
            var index = $scope.todos.indexOf(todo);

            if (index > -1) {
                $scope.todos.splice(index, 1);
            }
			$scope.isActive = true;
        }

        $timeout(deleteTodo, 3000);
    }
	
	/*$scope.init = function() {
        if(localStorageSvc.get('todos')) {

            $scope.todos = localStorageSvc.get('todos');

            //resetea la visibilidad de las tareas;
            for (i = 0; i < $scope.todos.length; i++) {
                $scope.todos[i].visible = false;
            }
        }
    }
	
	$scope.init();*/
});

myTodoList.controller('toDoListEditCtrl', function($scope, $timeout) {
    $scope.editorEnabled = false;

    $scope.enableEditor = function(todo)
    {
        $scope.editorEnabled = true;

        $scope.todoNameEdit = todo.name;
        $scope.todoCategorieEdit = todo.categorie;
    };

    $scope.disableEditor = function()
    {
        $scope.editorEnabled = false;
    };

    $scope.save = function()
    {
        if ($scope.todoNameEdit=== "") {
            return false;
        }

        $scope.todo.name = $scope.todoNameEdit;
        $scope.todo.categorie = $scope.todoCategorieEdit;

        $scope.disableEditor();
    };

    $scope.removeDone = function(todo)
    {
        $scope.isActiveDone = !$scope.isActiveDone;

        var deleteTodo = function() {
            var index = $scope.todos.indexOf(todo);

            if (index > -1) {
                $scope.todos.splice(index, 1);
            }
			$scope.isActiveDone = true;
        }

        $timeout(deleteTodo, 3000);
    }
});