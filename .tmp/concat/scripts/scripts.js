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
  .module('inventoryApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name inventoryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inventoryApp
 */
angular.module('inventoryApp')
  .controller('MainCtrl', ["$scope", "$http", function ($scope,$http) {
    
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $http({
		  method: 'GET',
		  url: 'http://dvcjson.somee.com/home/saeidjson'
			}).then(function successCallback(response) {
			    // this callback will be called asynchronously
			    // when the response is available
			    console.log(response);
			  }, function errorCallback(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			    console.log(response);
	  });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name inventoryApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the inventoryApp
 */
angular.module('inventoryApp')
  .controller('AboutCtrl', ["$scope", function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
