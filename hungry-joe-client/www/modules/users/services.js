angular.module('Users',[]).factory('UsersServices', ['$resource','$q', '$timeout', '$http', function ($resource, $q, $timeout, $http) {
    var UsersServices = {};

    var base = "https://hungry-joe-lnwpor-1.c9.io:8080"
	var Users = $resource(base+'/api/users');
  	var user = null;
    var currentUsername = null;

    UsersServices.getUsers = function(){
        return Users.query();
    }

    UsersServices.getCurrentUsername = function(){
        return currentUsername;
    }


    UsersServices.isLoggedIn = function() {
	  if(user) {
	    return true;
	  } else {
	    return false;
	  }
	}

	UsersServices.getUserStatus = function(){
	  return user;
	}

	UsersServices.login = function(username, password) {
	  // create a new instance of deferred
		  var deferred = $q.defer();

		  // send a post request to the server
		  $http.post(base+'/api/users/login', {username: username, password: password})
		    // handle success
		    .success(function (data, status) {
		      if(status === 200 && data.status){
		        user = true;
		        currentUsername = username;
		        deferred.resolve();
		      } else {
		        user = false;
		        deferred.reject();
		      }
		    })
		    // handle error
		    .error(function (data) {
		      user = false;
		      deferred.reject();
		    });

		  // return promise object
		  return deferred.promise;
	}

	UsersServices.logout = function(){
	  // create a new instance of deferred
	  var deferred = $q.defer();

	  // send a get request to the server
	  $http.get(base+'/api/users/logout')
	    // handle success
	    .success(function (data) {
	      user = false;
	      currentUsername = null;
	      deferred.resolve();
	    })
	    // handle error
	    .error(function (data) {
	      user = false;
	      deferred.reject();
	    });

	  // return promise object
	  return deferred.promise;
	}

	UsersServices.register = function(username, password) {
	  // create a new instance of deferred
	  var deferred = $q.defer();

	  // send a post request to the server
	  $http.post(base + '/api/users/register', {username: username, password: password})
	    // handle success
	    .success(function (data, status) {
	      if(status === 200 && data.status){
	        deferred.resolve();
	      } else {
	        deferred.reject();
	      }
	    })
	    // handle error
	    .error(function (data) {
	      deferred.reject();
	    });

	  // return promise object
	  return deferred.promise;
	}

    return UsersServices;
}]);