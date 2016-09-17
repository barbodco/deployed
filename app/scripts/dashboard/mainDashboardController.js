'use strict';

/**
 * @ngdoc function
 * @name inventoryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inventoryApp
 */	

  barbod.controller('mainDashboardCtrl', function($scope,$location) {
  	$('.shape').shape();
	// $('.shape').shape('flip left');
	$('.dropdown').dropdown({
      // you can use any ui transition
      transition: 'drop'
    });
    $scope.favModules = 4;
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
		// var response = {userId: "2564576577888-3455454-4555", sessionValid: "true", access: "|M(PO-B-IT-DI)|"};

		var response = JSON.parse(((localStorage.getItem("access")).replace('&#x20;','')).replace('Usr&#x20;','Usr'));

			console.log(response);
			$scope.accessSeperator(response);
	};
	$scope.accessSeperator = function(data){
		// var accessLevel = data.access, // name as aL
			// aL_Modes = ((accessLevel.replace('|M(','')).replace(')|','')).split('-'); //clean it up to array FOR MODULES

			angular.forEach(data, function(v,k){ 
				// this json needs to get generated in different scope function
				for ( k in v ) {
					$scope.moduleConstructor(k)
				  // console.log( property ); // Outputs: foo, fiz or fiz, foo
				}
			})
		console.log($scope.modules)
	}
	$scope.moduleConstructor = function(mCode){
		var codes = {
			// B : {
			// 	name : 'Brand',
			// 	mainIcon: 'puzzle'
			// },
			// PO: {
			// 	name: 'Purchase Order',
			// 	mainIcon: 'heartbeat'
			// },
			// IT:{
			// 	name: 'Item',
			// 	mainIcon: 'alarm'
			// },
			// DI:{
			// 	name: 'Buy',
			// 	mainIcon: 'find'
			// },
			A:{
				name: 'Application',
				mainIcon: 'alarm'
			},
			Usr:{
				name: 'User',
				mainIcon: 'alarm'
			},
			UsrRol:{
				name: 'User Roles',
				mainIcon: 'alarm'
			},
			C:{
				name: 'Company',
				mainIcon: 'alarm'
			},
			Br:{
				name: 'Branch',
				mainIcon: 'alarm'
			},
			Sc:{
				name: 'System Config',
				mainIcon: 'alarm'
			},
			Cus:{
				name: 'Customer',
				mainIcon: 'alarm'
			},
			S:{
				name: 'Supplier',
				mainIcon: 'alarm'
			},
			B:{
				name: 'Brand',
				mainIcon: 'alarm'
			},
			I:{
				name: 'Item',
				mainIcon: 'alarm'
			},
			IT:{
				name: 'Item Type',
				mainIcon: 'alarm'
			},
			M:{
				name: 'Measurement',
				mainIcon: 'alarm'
			},
			MC:{
				name: 'Measurement Conversion',
				mainIcon: 'alarm'
			},
			Ing:{
				name: 'Ingredients',
				mainIcon: 'alarm'
			},
			PR:{
				name: 'Purchase Request',
				mainIcon: 'alarm'
			},
			PO:{
				name: 'Purchase Order',
				mainIcon: 'alarm'
			},
			P:{
				name: 'Pullout',
				mainIcon: 'alarm'
			},
			JO:{
				name: 'Job Order',
				mainIcon: 'alarm'
			},
			BOM:{
				name: 'Bill of Materials',
				mainIcon: 'alarm'
			},
			STR:{
				name: 'Stock Transfer',
				mainIcon: 'alarm'
			},
			InvAdj:{
				name: 'Inventory Adjustment',
				mainIcon: 'alarm'
			},
			Inv:{
				name: 'Inventory',
				mainIcon: 'alarm'
			},
			InvMov:{
				name: 'Inventory Movement',
				mainIcon: 'alarm'
			},
			POS:{
				name: 'Point-of-Sale',
				mainIcon: 'alarm'
			},
			POSD:{
				name: 'Point-of-Sale Diner',
				mainIcon: 'alarm'
			},
			SO:{
				name: 'Sales Order',
				mainIcon: 'alarm'
			},
			SI:{
				name: 'Sales Invoice',
				mainIcon: 'alarm'
			},
			SR:{
				name: 'Sales Return',
				mainIcon: 'alarm'
			},

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
		console.log($scope.modules);
		localStorage.setItem("structedAccess",JSON.stringify($scope.modules));
	}
	
      return {
          restrict: 'AE',
          templateUrl: 'scripts/dashboard/main-dashboard.tpl.html'
      };
  });