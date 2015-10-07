angular.module('Login',[])
.controller('LoginController', ['UsersServices','$location','MenuListsServices', function(UsersServices,$location,MenuListsServices){
	var vm = this;
  
	// vm.users = UsersServices.getUsers();
	// vm.currentUsername = UsersServices.getCurrentUsername();

	vm.registerFormIsActive = false;
	vm.showRegisterForm = function(){
		vm.registerFormIsActive = true;
	}

	vm.getUserStatus = function(){
		// console.log(UsersServices.getUserStatus());

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

    // console.log(UsersServices.getUserStatus());

    // call logout from service
    UsersServices.logout()
      .then(function () {
        $location.path('/login');
      });
  };

  vm.register = function () {

    // initial values
    vm.error = false;
    vm.disabled = true;

    // call register from service
    UsersServices.register(vm.registerForm.username, vm.registerForm.password)
      // handle success
      .then(function () {
        $location.path('/login');
        vm.disabled = false;
        vm.registerForm = {};
      })
      // handle error
      .catch(function () {
        vm.error = true;
        vm.errorMessage = "Something went wrong!";
        vm.disabled = false;
        vm.registerForm = {};
      });
  };

  vm.res = MenuListsServices.getMenuLists();
}]);