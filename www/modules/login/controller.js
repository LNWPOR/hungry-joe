angular.module('Login',[])
.controller('LoginController', ['UsersServices', function(UsersServices){
	var vm = this;
	
  	
  	vm.users = UsersServices.getUsers();

}]);