angular.module('HungryJoe').controller('LayoutController',['UsersServices', '$location','$rootScope' ,function(UsersServices,$location,$rootScope){
	var vm = this;
	vm.logout = function () {
	    UsersServices.logout()
	      .then(function () {
	        $location.path('/login');
	      });
	};

	vm.showResBackButton = false;
	$rootScope.$on('$stateChangeStart', function (event, next, current) {
		if($location.path()=='/restaurant/info'||
		   $location.path()=='/restaurant/comment'||
		   $location.path()=='/restaurant/order'){
			
			vm.showResBackButton = true;
		}
		else{
			vm.showResBackButton = false;
		}
	});
	
}]);