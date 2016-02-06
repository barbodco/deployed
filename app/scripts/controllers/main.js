'use strict';

/**
 * @ngdoc function
 * @name inventoryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inventoryApp
 */
angular.module('inventoryApp')
  .controller('MainCtrl', function ($scope,$http) {
    
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
  });
