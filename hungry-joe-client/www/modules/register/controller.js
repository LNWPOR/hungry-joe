angular.module('Register',[])
.controller('RegisterController', ['UsersServices','$location', function(UsersServices,$location){

	var vm = this;
  
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
}]);


