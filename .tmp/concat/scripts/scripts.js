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
  .module('barbod', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    /* SERVICES */
    // 'services.ajaxCall'
    // 'genericTablessss'
  ])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.tpl.html',
        controller: 'LoginCtrl',
      })
      .when('/dashboard', {
        templateUrl: 'views/main-dashboard.tpl.html',
        controller: 'mainDashboardCtrl'
      })
      .when('/dashboard/modules', {
        templateUrl: 'views/dashboard.tpl.html',
        controller: 'DashboardCtrl'
      });
  //     .otherwise({
  //       redirectTo: '/'
  //     });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name inventoryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inventoryApp
 */
var barbod = angular.module('barbod');

barbod.controller('DashboardCtrl',['$scope','$http','$templateRequest','$compile','APIService',
  function ($scope,$http,$templateRequest,$compile,APIService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ]; 
    
      $http.get('calls.json').success(function(data) {
        if ($scope.callConfig != undefined || $scope.callConfig !== null ) {
          $scope.callConfig = data;
        };
       console.log($scope.callConfig)
    });


    $('.in-login-bg').removeClass('in-login-bg');
    $('.dropdown').dropdown({
      // you can use any ui transition
      transition: 'drop'
    });
    //table sorter global

    // $('table').tablesort();

    console.log('DashbaordCtrl is ready');
    // mouseover info for each brand
    $scope.mouseoverInfo = function(){
    // console.log(id)
    $('.brand-edit-each').popup({
      position : 'top center',
    });  
    };
    $scope.mainData = '';
    $scope.showColumn = {};
    // $scope.limitation = 10;
    $scope.typeControl = {};
    // messages on each module
    $scope.messageHandler = 'test';
    $scope.dataTableRequester = function(requesterId,pageNo){
      console.log("here");
      $('#'+requesterId).append( '<div class="ui active inverted dimmer">'+
                                    '<div class="ui medium text loader">Loading</div>'+
                                  '</div>');
  
      // $http({
      //   url : 'http://service.webbels.net/brand/paginate/',
      //   method: 'GET',

      var dataInput = { advanceSearch: [
          { 
            key: "",
            value: ""
          }
        ]
      }
      var  params = {
            userId : '169055BD-24D6-4E10-9F98-D4A8C6E102C5',
            sessionId: '169055BD-24D6-4E10-9F98-D4A8C6E102C5',
            browserInfo : 'chrome canary',
            rowIndex : pageNo,
            rowSize : 7,
            orderColumn : 'code',
            orderType : 'desc', //asc 
            searchKeyword : '',
            advanceSearch : JSON.stringify(dataInput)
                                        
          }
      //   }).then(function(response) {
      // // $http.get('table.json').then(function(response){
      //   console.log(response);
      //   $scope.mainData = response.data.GD;
      //   $scope.pagination = response.data.GD.pagecount;
      //   $scope.pageNumbers = [];
      //   for (var i = 0 ; i <$scope.pagination ; i++){
      //     $scope.pageNumbers.push(+i+1);
      //   }
      //   console.log($scope.pageNumbers);
      //   $('#'+requesterId).children('.inverted.dimmer').remove();
      //   console.log($scope.mainData);
      // });

      var url = 'http://service.webbels.net/brand/paginate',
          method = 'GET';
          // params = $scope.auth;

          APIService.doApiCall(params,url, method, function(response) {
              // if (data.sessionValid === "true") {]
                if (response.success !== "true") {
                  $('#'+requesterId+ ' .loader').hide()
                  .parent().append('<i class="huge icons">\
                                      <i class="big red warning circle icon"></i>\
                                      <i class="black setting loading icon"></i>\
                                    </i><br>\
                                    <button class="ui big compact labeled red icon button">\
                                      <i class="retweet icon"></i>\
                                      Retry ?\
                                    </button>')


                }else{
                  $scope.mainData = response.GD;
                  $scope.pagination = response.GD.pagecount;
                  $scope.pageNumbers = [];
                  for (var i = 0 ; i < $scope.pagination ; i++){
                    $scope.pageNumbers.push(+i+1);
                  }
                  $('#'+requesterId).children('.inverted.dimmer').remove();
                }
                $scope.messageHandler = response.Message;
          });
    };
    $scope.validation = function(t){
      $scope.validation = {};
        var data = {
          brandCode : $scope.validation.brandCode,
          brandDescription: $scope.validation.brandDescription,
          brandActive: $scope.validation.brandActive
        };
      return data;
    };
    $scope.brandAdding = function(){
      /* Add brand function
       1. Assume that validation is done

       2. Assume that this is the correct json
      */
      // Getting ready data
      var data  = angular.copy($scope.brand);
          data.userId = '169055BD-24D6-4E10-9F98-D4A8C6E102C5';
          data.browserInfo = 'Chrome Carany';
          data.companyId =  '';
          data.isActive = 1;
          data.isDeleted =  0;
          data.sessionId = '';

      $http({
        url : 'http://service.webbels.net/brand/save/',
        method: 'GET',
        params: data
      }).then(function(response) {
        $scope.dataTableRequester('brandModule',1);
        console.log(response);
      
      });



      // if there was no error in saving data then:
      $scope.closeOverSlider();
    };


    $scope.brandDelete = function(){
      var ids = [];
      angular.forEach($scope.gridCheckBox, function(value, key){
        ids.push(key);
      });
      var length = ids.length;
      var data  = {};
          data.userId = '169055BD-24D6-4E10-9F98-D4A8C6E102C5';//retrieve from a separate js file
          data.browserInfo = 'Chrome Carany'; //retrieve from a separate js file
          data.ids = ids;
          data.sessionId = '';

      $http({
        url : 'http://service.webbels.net/brand/delete/',
        method: 'GET',
        params: data
      }).then(function(response) {
        $scope.gridCheckBox = {}; //needs to be in a clean function ***
         //needs to be in a clean function *** START

        $scope.dataTableRequester('brandModule',1);
        console.log(response);
      
      });
      $scope.closeOverSlider();
      
            for (var i=0;i<length;i++){
              $('[module-id]').prop('checked', false); 
            }
      //needs to be in a clean function *** END

    };
    $scope.templateRequester = function(name , location){
      $templateRequest('views/'+name+'.tpl.html').then(function(html){
          // Convert the html to an actual DOM node
          var template = angular.element(html);
          // Append it to the directive element
          $('#'+location).html(template);
          $compile(template.contents())($scope);
          $('.brand-edit-each').popup({
            position : 'top center',
          });  
      });

    };
    $scope.closeOverSlider = function(){
        $('.over-slider').toggleClass('hide-over-slider');
        $('.page.dimmer').toggleClass('active');
        $('#over-slider').html('');
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
    $scope.gridCheckBox = {};
    $scope.gridCheckBoxCounter = 0;
    $scope.gridCheckBoxStatus = function(checkId, status,desc,name){
      if ($('[module-id="'+checkId+'"]').is(':checked')) {
        $scope.gridCheckBoxCounter++;
        $scope.gridCheckBox[checkId] = {
          id:checkId,
          description : desc,
          active: status,
          name: name
        };
      }else{
        delete $scope.gridCheckBox[checkId];
        $scope.gridCheckBoxCounter--;
      }
      console.log($scope.gridCheckBox);
      console.log($scope.gridCheckBoxCounter);
    };
    $scope.gridCheckBoxStatusRemover = function(checkId){
      delete $scope.gridCheckBox[checkId];
    };
    $scope.checkAll = function(){
      $('[module-id]').trigger('click');
    };
    // $(document).bind('keyup', '$', function() {
    //     console.log('key up');
    //     if (event.which === 17) {
    //       $('.global-spotlight').dimmer('hide');
    //     }
    // });
    // $(document).bind('keydown', '$', function() {
    //     console.log('key down');
    //     if (event.which === 17) {
    //       $('.global-spotlight').dimmer('show');
    //     }
    // });
    // testAjax("http://service.webbels.net/Service/BrandService.svc/TestGetAll");
    // function testAjax(myUrl){
    //   $.ajax({
    //       type : "Get",
    //       url :myUrl,
    //       dataType :"json",
    //       jsonp: false,
    //       jsonpCallback: "myJsonMethod",
    //       success : function(data){
    //           console.log(data);},
    //       error : function(httpReq,status,exception){
    //           console.log(status+" "+exception);
    //       }
    //   });
    // }
  }]);

  barbod.directive('genericTable', function() {
      return {
          restrict: 'AE',
          templateUrl: 'views/tables.tpl.html'
      };
  });
  barbod.directive('genericOverSlider', function() {
      return {
          restrict: 'AE',
          templateUrl: 'views/overslider.tpl.html'
      };
  });

 
'use strict';


barbod.factory('APIService', ['$http', function($http) {

    return {
        doApiCall: function(params,url, method, payload){

            // I should make a call to server with the parameters passed
            // from the controller.

            var xhr = $http({
                method: method,
                url: url,
                params: params
            });

            // You probably want to differentiate success / error handlers
            xhr.success(payload);
            xhr.error(payload);

            return xhr;
        }
    };
}]);
'use strict';
  barbod.service('LocationService', ["$location", function($location) {
    this.go = function(url){
      return $location.path(url);
    }
  }])
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

'use strict';

/**
 * @ngdoc function
 * @name inventoryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inventoryApp
 */	

  barbod.controller('mainDashboardCtrl', ["$scope", "$location", function($scope,$location) {
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
  }]);