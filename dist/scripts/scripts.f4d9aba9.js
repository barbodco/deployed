"use strict";angular.module("barbod",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/scheduler.tpl.html",controller:"SchdeulerCtrl"})}]);var barbod=angular.module("barbod");barbod.controller("SchdeulerCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.spotlight=function(){$(".global-spotlight").dimmer("show")}}]),barbod.directive("dhxScheduler",function(){return{restrict:"A",scope:!1,transclude:!0,template:'<div class="dhx_cal_navline" ng-transclude></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>',link:function(a,b,c,d){a.scheduler||(a.scheduler={}),a.scheduler.mode=a.scheduler.mode||"month",a.scheduler.date=a.scheduler.date||new Date,a.$watch(c.data,function(a){scheduler.clearAll(),scheduler.parse(a,"json"),console.log(scheduler.parse(a,"json"))},!0),a.$watch(function(){return a.scheduler.mode+a.scheduler.date.toString()},function(b,c){var d=scheduler.getState();b.date==d.date&&b.mode==d.mode||scheduler.setCurrentView(a.scheduler.date,a.scheduler.mode)},!0),a.$watch(function(){return b[0].offsetWidth+"."+b[0].offsetHeight},function(){scheduler.setCurrentView()}),a.showMinical=function(){scheduler.isCalendarVisible()?scheduler.destroyCalendar():scheduler.renderCalendar({position:"dhx_minical_icon",date:scheduler._date,navigation:!0,handler:function(a,b){scheduler.setCurrentView(a),scheduler.destroyCalendar()}})},a.initScheduler=function(){scheduler.config.multi_day=!0,scheduler.config.xml_date="%Y-%m-%d %H:%i",scheduler.init("scheduler_here",new Date(2015,0,10),"week"),scheduler.load("./data/events.xml")},a.dataTransmission=function(){},a.addNewEvent=function(){},b.addClass("dhx_cal_container"),scheduler.init(b[0],a.scheduler.date,a.scheduler.mode)}}});