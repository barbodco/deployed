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
        templateUrl: 'views/scheduler.tpl.html',
        controller: 'SchdeulerCtrl',
      })
  //     .otherwise({
  //       redirectTo: '/'
  //     });
  });
