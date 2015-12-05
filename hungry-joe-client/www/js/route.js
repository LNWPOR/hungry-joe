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
  })
  .state('restaurant.info', {
    url: '/info',
    views: {
      'tab-info': {
        templateUrl: 'modules/restaurant-info/restaurant-info.html'
      }
    }
  })
  .state('restaurant.comment', {
    url: '/comment',
    views: {
      'tab-comment': {
        templateUrl: 'modules/restaurant-comment/restaurant-comment.html'
      }
    }
  })
  .state('restaurant.order', {
    url: '/order',
    views: {
      'tab-order': {
        templateUrl: 'modules/restaurant-order/restaurant-order.html'
      }
    }
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'modules/regis/signup.html',
    controller: 'SignupController as SignupCtrl'
  })


  $urlRouterProvider.otherwise('/login');

});