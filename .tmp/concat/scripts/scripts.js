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

  $scope.mainData = '';
  $scope.showColumn = {};
  $scope.limitation = 10;
  $scope.typeControl = {};

  var brandAddress = 'https://barbod.cloudant.com/brand/bb5717d66f3099b6c717f2c548278ca1';
  $http.get(brandAddress)
  	.then(function(response){
  		$scope.mainData = response.data.GD;
  		$scope.limitation = $scope.mainData.rowsperpage;
  	});
  $scope.insertRow = function(){
  	console.log('ss');
  };
  $scope.closeOverSlider = function(){
  		$('.over-slider').addClass('hide-over-slider');
  };
  $scope.showItems = function(index){
  		$('.items-list-'+index).toggleClass('hide');
  };
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
