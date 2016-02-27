'use strict';

var barbod = angular.module('barbod');

barbod.controller('LoginCtrl', ['$scope','$location','$templateRequest',
   function($scope,$location,$templateRequest){
    $('body').addClass('in-login-bg');
    $scope.go = function(url){
      //    // $templateRequest("scripts/dashboard/dashboard.tpl.html").then(function(html){
      //       // var template = angular.element(html);
      //       // element.append(template);
      //       // $compile(template)(scope);
      //       // console.log(html);
            $location.path(url);
         // });
      };
  }
]);