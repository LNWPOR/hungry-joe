angular.module('HungryJoe').controller('LayoutController',['UsersServices', '$location','$rootScope' ,function(UsersServices,$location,$rootScope){
	var vm = this;
	vm.logout = function () {
	    UsersServices.logout()
	      .then(function () {
	        $location.path('/login');
	      });
	};


	
}]);