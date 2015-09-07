(function(){
  angular.module('app', [
    'app.navbar',
    'app.createEvent',
    'app.signupLogin',
    'ui.router',
    'ui.bootstrap',
    'app.eventsDisplay',
    'eventList',
    'homepage',
    'app.eventManager',
    'app.userProfile',
    'app.eventDetail',
    'app.dataservice',
    'app.profilePage',
    'app.stripeForm',
    'uiGmapgoogle-maps',
    'app.maps',
    'angularPayments',
    'ngAnimate'
    ])
  .config(router)
  .run(requireUserSignin)

  router.$inject = ['$urlRouterProvider', '$stateProvider', '$httpProvider', '$windowProvider'];

  requireUserSignin.$inject = ['$rootScope','$state', 'Auth'];

  function router($urlRouterProvider, $stateProvider, $httpProvider, $windowProvider) {
    $urlRouterProvider.otherwise("/");

    // paths
    $stateProvider
      .state('homepage',{
        url: '/',
        templateUrl: './homepage/homepageTemplate.html',
        controller: 'homepageController',
        controllerAs: 'home'
      })
      .state('createEvent', {
        url: '/createEvent',
        templateUrl: './createEventPage/createEventTemplate.html',
        controller: 'createEventController',
        controllerAs: 'event'
      })
      .state('eventsDisplay', {
        url: '/eventsDisplay/:city',
        templateUrl: './eventsDisplayPage/eventsDisplayTemplate.html'
      })
      .state('eventsDisplay.eventList', {
        url:'/eventList/:city',
        templateUrl: './eventsDisplayPage/eventListTemplate.html',
        controller: 'eventListController',
        controllerAs: 'eventList',
        resolve: {
          getEventList: getEventList
        }
      })
      .state('eventsDisplay.map', {
        url: '/map/:city',
        templateUrl: './eventsDisplayPage/mapsTemplate.html',
        controller: 'mapsController',
        controllerAs: 'map',
        resolve: {
          getMaps: getMaps,
          getCity: getCity,
          getEventList: getEventList
        }
      })
      .state('signup',{
        url: '/signup',
        templateUrl: './signupLogin/signupTemplate.html',
        controller: 'signupLoginController',
        controllerAs: 'signupLogin'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: './signupLogin/signinTemplate.html',
        controller: 'signupLoginController',
        controllerAs: 'signupLogin'
      })
      ///////////////////////////////////////////////////////
      .state('requireSignin', {
        url: '/require',
        templateUrl: './signupLogin/requireTemplate.html',
        controller: 'signupLoginController',
        controllerAs: 'signupLogin'
      })
      ///////////////////////////////////////////////////////
      .state('eventManager', {
        url: '/events/eventManager',
        templateUrl: './eventManager/eventManagerTemplate.html'
      })
      .state('eventManager.joinedEvents', {
        url: '/joinedEvents',
        templateUrl: './eventManager/eventManagerJoinedTemplate.html',
        controller: 'eventManagerJoinedController',
        controllerAs: 'event',
        resolve: {
          getJoinedEventsPrep: getJoinedEventsService
        }
      })
      .state('eventManager.hostedEvents', {
        url: '/hostedEvents',
        templateUrl: './eventManager/eventManagerHostedTemplate.html',
        controller: 'eventManagerHostedController',
        controllerAs: 'event',
        resolve: {
          getHostedEventsPrep: getHostedEventsService
        }
      })
      .state('userProfile', {
        url:'/user/userProfile/:username',
        templateUrl: './userProfile/userProfileTemplate.html',
        controller: 'userProfileController',
        controllerAs: 'user',
        resolve: {
          getProfilePrep: getProfileService
        }
      })
      .state('eventDetail', {
        url: '/eventDetail/:eventId',
        templateUrl: './eventDetailPage/eventDetailTemplate.html',
        controller: 'eventDetailController',
        controllerAs: 'event',
        resolve: {
          getEvent: getEvent
        }
      })
      .state('profilePage', {
        url: '/profilePage',
        templateUrl: './profilePage/profilePageTemplate.html',
        controller: 'profilePageController',
        controllerAs: 'user',
        resolve: {
          getUserProfilePrep: getUserProfileService
        }
      })
      .state('paymentForm', {
        url: '/paymentForm',
        templateUrl: './components/stripeForm/stripeFormTemplate.html',
        controller: 'stripeController'
      })

    // resolve functions
    function getEventList($http, $stateParams, eventsService) {
      return eventsService.getEventList($stateParams.city);
    }
    function getEventsService ($http, usersService) {
      return usersService.getUserEvents();
    }
    function getProfileService ($http, $stateParams, usersService) {
      return usersService.getUserProfile($stateParams.username);
    }
    function getEvent($http, $stateParams, eventsService){
      return eventsService.getEvent($stateParams.eventId);
    }
    function getJoinedEventsService ($http, usersService) {
      return usersService.getJoinedEvents();
    }
    function getHostedEventsService ($http, usersService) {
      return usersService.getHostedEvents();
    }
    function getUserProfileService ($http, usersService) {
      return usersService.getProfile();
    }
    function getMaps (googleMap){
      return googleMap.getMapApi();
    }
    function getCity($stateParams){
      return $stateParams.city;
    }

    // stripe key config
    var $window = $windowProvider.$get();
    $window.Stripe.setPublishableKey('pk_test_5YUv9kMpgpOkFzEsvbDb7kf0');

    // token authentication
    $httpProvider.interceptors.push('AttachTokens');
  
  }

    // for .run() module, ask user to sign in if user is not signed in
    function requireUserSignin($rootScope, $state, Auth) {
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if(toState.url === '/eventDetail/:eventId' && !Auth.isAuth()) {
          event.preventDefault();
          $state.go('signin');
        }
        if(toState.url === '/profilePage' && !Auth.isAuth()) {
          event.preventDefault();
          $state.go('signin');
        }
        if(toState.url === '/events/eventManager' && !Auth.isAuth()) {
          event.preventDefault();
          $state.go('signin');
        }
      });
    }

})();



