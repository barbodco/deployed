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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'scripts/login/login.tpl.html',
        controller: 'LoginCtrl',
      })
      .when('/dashboard', {
        templateUrl: 'scripts/dashboard/dashboard.tpl.html',
        controller: 'DashboardCtrl'
      });
  //     .otherwise({
  //       redirectTo: '/'
  //     });
  });
