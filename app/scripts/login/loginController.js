'use strict';

// var barbod = angular.module('barbod');

barbod.controller('LoginCtrl', ['$scope','LocationService',//$templateRequest',
   function($scope,LocationService){
    $('body').addClass('in-login-bg');
    $scope.go = function(url){
       LocationService.go(url);
    } 
  }
]);
// barbod.service('LocationService', function($location) {
//   this.go = function(url){
//     return $location.path(url);
//   }
// })