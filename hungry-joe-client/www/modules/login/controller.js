angular.module('Login',[])
.controller('LoginController', ['UsersServices','$location', function(UsersServices,$location){
	var vm = this;

	vm.getUserStatus = function(){
		return UsersServices.getUserStatus();
	}

	vm.login = function () {
    // initial values
    vm.error = false;
    vm.disabled = true;
    // call login from service
    UsersServices.login(vm.loginForm.username, vm.loginForm.password)
      // handle success
      .then(function () {
        $location.path('/home');
        vm.disabled = false;
        vm.loginForm = {};
      })
      // handle error
      .catch(function () {
        vm.error = true;
        vm.errorMessage = "Invalid username and/or password";
        vm.disabled = false;
        vm.loginForm = {};
      });
  };	
	
	vm.logout = function () {
    UsersServices.logout()
      .then(function () {
        $location.path('/login');
      });
  };
}]);


