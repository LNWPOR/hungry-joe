angular.module('HungryJoe')
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'modules/login/login.html',
    controller: 'LoginController as LoginCtrl'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'modules/register/register.html',
    controller: 'RegisterController as RegisterCtrl'
  })
  .state('home', {
    url: '/home',
    templateUrl: 'modules/home/home.html',
    controller: 'HomeController as HomeCtrl'
  })
  .state('km', {
    url: '/km',
    templateUrl: 'modules/km/km.html',
    controller: 'KmController as KmCtrl'
  })
  .state('search', {
    url: '/search',
    templateUrl: 'modules/search/search.html',
    controller: 'SearchController as SearchCtrl'
  })
  .state('showmap', {
    url: '/showmap',
    templateUrl: 'modules/showmap/showmap.html',
    controller: 'ShowmapController as ShowmapCtrl'
  })
  .state('restaurant', {
    url: '/restaurant',
    templateUrl: 'modules/restaurant/restaurant.html',
    controller: 'RestaurantController as RestaurantCtrl'
  });

  $urlRouterProvider.otherwise('/login');

});