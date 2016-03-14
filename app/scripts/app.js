'use strict';

/**
 * @ngdoc overview
 * @name inventoryApp
 * @description
 * # inventoryApp
 *
 * Main module of the application.
 */
angular
  .module('barbod', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    /* SERVICES */
    // 'services.ajaxCall'
    // 'genericTablessss'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.tpl.html',
        controller: 'LoginCtrl',
      })
      .when('/dashboard', {
        templateUrl: 'views/main-dashboard.tpl.html',
        controller: 'mainDashboardCtrl'
      })
      .when('/dashboard/modules', {
        templateUrl: 'views/dashboard.tpl.html',
        controller: 'DashboardCtrl'
      });
  //     .otherwise({
  //       redirectTo: '/'
  //     });
  });
