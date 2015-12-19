angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('login', {
      url: '/',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
        
      
    
      
        
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'homeCtrl'
    })
        
      
    
      
        
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'signupCtrl'
    })
        
      
    
      
        
    .state('km', {
      url: '/home/km',
      templateUrl: 'templates/km.html',
      controller: 'kmCtrl'
    })
        
      
    
      
        
    .state('menu', {
      url: '/home/menu',
      templateUrl: 'templates/menu.html',
      controller: 'menuCtrl'
    })
        
      
    
      
        
    .state('map', {
      url: '/home/map',
      templateUrl: 'templates/map.html',
      controller: 'mapCtrl'
    })
        
      
    
      
        
    .state('restaurant-Info', {
      url: '/home/map/restaurant/info',
      templateUrl: 'templates/restaurant-Info.html',
      controller: 'restaurant-InfoCtrl'
    })
        
      
    
      
        
    .state('restaurant-Comment', {
      url: '/map/restaurant/comment',
      templateUrl: 'templates/restaurant-Comment.html',
      controller: 'restaurant-CommentCtrl'
    })
        
      
    
      
        
    .state('restaurant-Order', {
      url: '/map/restaurant/order',
      templateUrl: 'templates/restaurant-Order.html',
      controller: 'restaurant-OrderCtrl'
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});