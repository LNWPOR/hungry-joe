angular.module('HungryJoe', 
[ 'ionic',
  'Login',
  'Home',
  'Search',
  'Showmap',
  'Restaurant',
  'Km',
  'Users',
  'MenuLists',
  'Comments',
  'ngResource'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});