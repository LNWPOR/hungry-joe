angular.module('HungryJoe').controller('LayoutController',['UsersServices', '$location', function(UsersServices,$location){
	var vm = this;
	vm.logout = function () {
	    UsersServices.logout()
	      .then(function () {
	        $location.path('/login');
	      });
	};
}]);