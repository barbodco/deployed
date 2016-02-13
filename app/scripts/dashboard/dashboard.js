'use strict';

/**
 * @ngdoc function
 * @name inventoryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inventoryApp
 */
var dashboard = angular.module('dashboard');

  dashboard.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl:'dashboard/dashboard.tpl.html',
      controller:'MainCtrl'
      });
    }]);

  dashboard.controller('MainCtrl', function ($scope,$http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var content = [
      { title: 'Module1' },
      { title: 'Module2' },
      { title: 'Module3' },
      { title: 'Module4' }
    ];    
    $('.ui.page.dimmer.global-spotlight .ui.search')
      .search({
        source: content
    });
    $scope.mainData = '';
    $scope.showColumn = {};
    $scope.limitation = 10;
    $scope.typeControl = {};
    $http.get('table.json')
      .then(function(response){
        $scope.mainData = response.data.GD;
        $scope.limitation = $scope.mainData.rowsperpage;
      });
    $scope.closeOverSlider = function(){
        $('.over-slider').addClass('hide-over-slider');
    };
    $scope.showItems = function(index){
        $('.items-list-'+index).toggleClass('hide');
    };
    $scope.spotlight = function(){
      // need to pass data to dimmer to show data after , dimmer should be a service
      // callDimmer()
      $('.global-spotlight').dimmer('show');

      };
    $scope.moduleSlider = function(mIndex){
      var mWidth = $('.module-container').outerWidth();//1000
          $('.slide-buttons li').removeClass('current');
          $('.slide-buttons li:eq('+mIndex+')').addClass('current');
          $('.scroller').animate({scrollLeft: mIndex*mWidth }, 1000);
    };
    });
