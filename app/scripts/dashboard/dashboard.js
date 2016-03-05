'use strict';

/**
 * @ngdoc function
 * @name inventoryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inventoryApp
 */
var barbod = angular.module('barbod');

  // barbod.config(['$routeProvider', function ($routeProvider) {
  //   $routeProvider.when('/dashboard', {
  //     templateUrl:'scripts/dashboard/dashboard.tpl.html',
  //     controller:'DashbaordCtrl'
  //     });
  //   }]);

  barbod.controller('DashboardCtrl', function ($scope,$http) {
    $('.in-login-bg').removeClass('in-login-bg');
    $('.dropdown').dropdown({
      // you can use any ui transition
      transition: 'drop'
    });
    //table sorter global

    // $('table').tablesort();

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
    console.log('DashbaordCtrl is ready');
    $('.ui.page.dimmer.global-spotlight .ui.search')
      .search({
        source: content
    });
    $scope.mainData = '';
    $scope.showColumn = {};
    $scope.limitation = 10;
    $scope.typeControl = {};
    $http.get('http://service.webbels.net/Service/BrandService.svc/TestGetAll')
    // $http.get('table.json')
      .then(function(response){
        $scope.mainData = response.data.GD;
        // $scope.limitation = $scope.mainData.rowsperpage;
        console.log(response);
      });
    $scope.closeOverSlider = function(){
        $('.over-slider').toggleClass('hide-over-slider');
        $('.page.dimmer').dimmer('show');
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
    $(document).bind('keyup', '$', function() {
        console.log('key up');
        if (event.which === 17) {
          $('.global-spotlight').dimmer('hide');
        }
    });
    $(document).bind('keydown', '$', function() {
        console.log('key down');
        if (event.which === 17) {
          $('.global-spotlight').dimmer('show');
        }
    });
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
  });
  
 