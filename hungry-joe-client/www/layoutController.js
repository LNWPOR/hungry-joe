angular.module('HungryJoe').controller('LayoutController',['UsersServices', '$location','$rootScope' ,function(UsersServices,$location,$rootScope){
	var vm = this;
	vm.logout = function () {
	    UsersServices.logout()
	      .then(function () {
	        $location.path('/login');
	      });
	};

	vm.showBackButton = true;

	$rootScope.$on('$stateChangeStart', function (event, next, current) {
	    
		if($location.path()=='/signup'){
		    vm.showBackButton = false;
		    console.log(vm.showBackButton);
		}
		else
	    {
		    vm.showBackButton = true;
	    }
	    
	});
	
}]);