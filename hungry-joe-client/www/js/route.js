angular.module('HungryJoe')
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'modules/login/login.html',
    controller: 'LoginController as LoginCtrl'
  })
  .state('home', {
    url: '/home',
    templateUrl: 'modules/home/home.html',
    controller: 'HomeController as HomeCtrl'
  })
  .state('restaurant', {
    url: '/restaurant',
    templateUrl: 'modules/restaurant/restaurant.html',
    controller: 'RestaurantController as RestaurantCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'modules/regis/signup.html',
    controller: 'SignupController as SignupCtrl'
  })

  $urlRouterProvider.otherwise('/login');

});