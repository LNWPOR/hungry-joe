angular.module('Signup',[])
.controller('SignupController', ['UsersServices','$location', function(UsersServices,$location){
  var vm = this;

  vm.spinnerIsActive = false;
  vm.errorMessage = false;
  // vm.showRegisterForm = function(){
  //   vm.registerFormIsActive = true;
  //   vm.errorMessage = false;
  // }
  // vm.hideRegisterForm = function(){
  //   vm.registerFormIsActive = false;
  //   vm.errorMessage = false;
  // }

  vm.getUserStatus = function(){
    return UsersServices.getUserStatus();
  }

  vm.cancle = function () {

    // console.log(UsersServices.getUserStatus());

    // call logout from service
    $location.path('/login');
  };

  vm.register = function () {

    // initial values
    vm.error = false;
    vm.disabled = false;
    vm.spinnerIsActive = true;
    vm.errorMessage = false;
    // call register from service
    UsersServices.register(vm.registerForm.username, vm.registerForm.password)
      // handle success
      .then(function () {
        $location.path('/login');
        vm.disabled = false;
        vm.registerForm = {};
        // vm.hideRegisterForm();
        vm.spinnerIsActive = false;
      })
      // handle error
      .catch(function () {
        vm.error = true;
        vm.errorMessage = "Username already exists.";
        // vm.errorMessage = "Something went wrong!";
        vm.disabled = false;
        vm.registerForm = {};
        vm.spinnerIsActive = false;
      });
  };
}]);
