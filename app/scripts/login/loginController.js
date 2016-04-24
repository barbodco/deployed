'use strict';

// var barbod = angular.module('barbod');

barbod.controller('LoginCtrl', ['$scope','LocationService','APIService','$http',//$templateRequest',
   function($scope,LocationService,APIService,$http){
    $('body').addClass('in-login-bg');
    // callsConfigs
    	$http.get('calls.json').success(function(data) {
		   $scope.callConfig = data;
		   console.log($scope.callConfig)
		});
    $scope.go = function(url){
       LocationService.go(url);
    }
    $scope.validation = function(){
    	 // ng-click="go('/dashboard')"
			var url = $scope.callConfig.endpoint.main + $scope.callConfig.endpoint.userLogin,
				method = $scope.callConfig.endpoint.methods[1],
				params = $scope.auth;


    	 APIService.doApiCall(params,url, method, function(data) {
	        if (data.sessionValid === "true") {
	        	$scope.go('/dashboard');
	        };
	    });
    } 
  }
]);
// barbod.service('LocationService', function($location) {
//   this.go = function(url){
//     return $location.path(url);
//   }
// })
