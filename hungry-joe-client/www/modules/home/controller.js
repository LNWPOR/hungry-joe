angular.module('Home',[])
.controller('HomeController', ['$scope',function($scope){
	// var vm = this;

	$scope.mapViewIsShow = true;
	$scope.kmViewIsShow = false;
	$scope.searchViewIsShow = false;

	$scope.showMapView = function(){
		$scope.mapViewIsShow = true;
		$scope.kmViewIsShow = false;
		$scope.searchViewIsShow = false;
	}

	$scope.showKmView = function(){
		$scope.mapViewIsShow = false;
		$scope.kmViewIsShow = true;
		$scope.searchViewIsShow = false;
	}

	$scope.showSearchView = function(){
		$scope.mapViewIsShow = false;
		$scope.kmViewIsShow = false;
		$scope.searchViewIsShow = true;
	}

}]);