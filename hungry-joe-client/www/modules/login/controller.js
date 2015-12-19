angular.module('Login',[])
.controller('LoginController', ['UsersServices','$location','MenuListsServices', function(UsersServices,$location,MenuListsServices){

  var vm = this;
  
  // vm.registerFormIsActive = false;
  vm.spinnerIsActive = false;
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

  vm.login = function () {
    // initial values
    vm.error = false;
    vm.disabled = true;
    vm.spinnerIsActive = true;
    vm.errorMessage = false;
    // call login from service
    UsersServices.login(vm.loginForm.username, vm.loginForm.password)
      // handle success
      .then(function () {
        $location.path('/home');
        vm.disabled = false;
        vm.loginForm = {};
        vm.spinnerIsActive = false;
      })
      // handle error
      .catch(function () {
        vm.error = true;
        vm.errorMessage = "Invalid username and/or password";
        vm.disabled = false;
        vm.loginForm = {};
        vm.spinnerIsActive = false;
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

  vm.res = MenuListsServices.getMenuLists();
}]);