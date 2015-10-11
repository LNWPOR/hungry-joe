angular.module('Socket',[]).factory('SocketServices',['socketFactory',function(socketFactory){
	return socketFactory({
		ioSocket: io.connect('https://hungry-joe-lnwpor-5.c9.io:8080')
	});
}]);