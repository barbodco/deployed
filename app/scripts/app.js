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
        templateUrl: 'scripts/login/login.tpl.html',
        controller: 'LoginCtrl',
      })
      .when('/dashboard', {
        templateUrl: 'scripts/dashboard/main-dashboard.tpl.html',
        controller: 'mainDashboardCtrl'
      })
      .when('/dashboard/modules', {
        templateUrl: 'scripts/dashboard/dashboard.tpl.html',
        controller: 'DashboardCtrl'
      });
  //     .otherwise({
  //       redirectTo: '/'
  //     });
  });
