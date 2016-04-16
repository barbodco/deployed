'use strict';

/**
 * @ngdoc function
 * @name inventoryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inventoryApp
 */
// var barbod = angular.module('barbod');	

  barbod.controller('mainDashboardCtrl', function($scope,$location) {
  	$('.shape').shape();
	// $('.shape').shape('flip left');
	$('.dropdown').dropdown({
      // you can use any ui transition
      transition: 'drop'
    });
	$scope.go = function(url){
	//    // $templateRequest("scripts/dashboard/dashboard.tpl.html").then(function(html){
	//       // var template = angular.element(html);
	//       // element.append(template);
	//       // $compile(template)(scope);
	//       // console.log(html);
	    $location.path(url);
	 // });
	};
	$scope.modules = {};
	$scope.dashboardGenerator = function(){
		// ajax call first
		var response = {userId: "2564576577888-3455454-4555", sessionValid: "true", access: "|M(PO-B-IT-DI)|"};
			$scope.accessSeperator(response);
	};
	$scope.accessSeperator = function(data){
		var accessLevel = data.access, // name as aL
			aL_Modes = ((accessLevel.replace('|M(','')).replace(')|','')).split('-'); //clean it up to array FOR MODULES

			angular.forEach(aL_Modes, function(v,k){ 
				// this json needs to get generated in different scope function
				$scope.moduleConstructor(v)
			})
		console.log($scope.modules)
	}
	$scope.moduleConstructor = function(mCode){
		var codes = {
			B : {
				name : 'Brand',
				mainIcon: 'puzzle'
			},
			PO: {
				name: 'Purchase Order',
				mainIcon: 'heartbeat'
			},
			IT:{
				name: 'Item',
				mainIcon: 'alarm'
			},
			DI:{
				name: 'Buy',
				mainIcon: 'find'
			}
		}
		$scope.modules[mCode] = {
			icon: codes[mCode].mainIcon ,
			name: codes[mCode].name,
			subAccess:
				[{
					icon: codes[mCode].mainIcon,
					name: 'add'
				},{
					icon: codes[mCode].mainIcon,
					name: 'edit'
				},{
					icon: codes[mCode].mainIcon,
					name: 'delete'
				}]
			
		};
		console.log(codes[mCode]);
	}
	
      return {
          restrict: 'AE',
          templateUrl: 'scripts/dashboard/main-dashboard.tpl.html'
      };
  });