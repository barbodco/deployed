'use strict';

/**
 * @ngdoc function
 * @name inventoryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inventoryApp
 */
var barbod = angular.module('barbod');

barbod.controller('SchdeulerCtrl',['$scope','$http','$templateRequest','$compile',
  function ($scope,$http,$templateRequest,$compile) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ]; 
    
    $scope.spotlight = function(){
      // need to pass data to dimmer to show data after , dimmer should be a service
      // callDimmer()
      $('.global-spotlight').dimmer('show');

      };
  }]);

barbod.directive('dhxScheduler', function() {
  return {
    restrict: 'A',
    scope: false,
    transclude: true,
    template:'<div class="dhx_cal_navline" ng-transclude></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>',

    link:function ($scope, $element, $attrs, $controller){
      //default state of the scheduler
      if (!$scope.scheduler)
        $scope.scheduler = {};
      $scope.scheduler.mode = $scope.scheduler.mode || "month";
      $scope.scheduler.date = $scope.scheduler.date || new Date();

      //watch data collection, reload on changes
      $scope.$watch($attrs.data, function(collection){
        scheduler.clearAll();
        scheduler.parse(collection, "json");
        console.log(scheduler.parse(collection, "json"));
      }, true);

      //watch mode and date
      $scope.$watch(function(){
        return $scope.scheduler.mode + $scope.scheduler.date.toString();
      }, function(nv, ov) {
        var mode = scheduler.getState();
        if (nv.date != mode.date || nv.mode != mode.mode)
          scheduler.setCurrentView($scope.scheduler.date, $scope.scheduler.mode);
      }, true);

      //size of scheduler
      $scope.$watch(function() {
        return $element[0].offsetWidth + "." + $element[0].offsetHeight;
      }, function() {
        scheduler.setCurrentView();
      });
      $scope.showMinical = function(){
        if (scheduler.isCalendarVisible())
          scheduler.destroyCalendar();
        else
          scheduler.renderCalendar({
            position:"dhx_minical_icon",
            date:scheduler._date,
            navigation:true,
            handler:function(date,calendar){
              scheduler.setCurrentView(date);
              scheduler.destroyCalendar()
            }
          });
      };
      $scope.initScheduler = function(){
        scheduler.config.multi_day = true;
        
        scheduler.config.xml_date="%Y-%m-%d %H:%i";
        scheduler.init('scheduler_here',new Date(2015,0,10),"week");
        scheduler.load("./data/events.xml");

      };
      $scope.dataTransmission = function() {

      };
      $scope.addNewEvent = function() {
        scheduler.addEvent({
            start_date: "16-11-2016 09:00",
            end_date:   "16-11-2016 12:00",
            text:   "Meeting",
            holder: "John", //userdata
            room:   "5"     //userdata
        });
      };
      //styling for dhtmlx scheduler
      $element.addClass("dhx_cal_container");

      //init scheduler
      scheduler.init($element[0], $scope.scheduler.date, $scope.scheduler.mode);
    }
  }
})