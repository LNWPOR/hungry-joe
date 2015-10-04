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
  'RestaurantLists',
  'ngResource',
  'Kmradius'
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
})
// .run(function ($rootScope, $location, UsersServices) {
//   $rootScope.$on('$stateChangeStart', function (event, next, current) {
//     if (UsersServices.isLoggedIn() === false) {
//       $location.path('/login');
//     }
//   });
// });
