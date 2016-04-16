'use strict';

/**
 * @ngdoc function
 * @name inventoryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inventoryApp
 */
var barbod = angular.module('barbod');

barbod.controller('DashboardCtrl',['$scope','$http','$templateRequest','$compile',
  function ($scope,$http,$templateRequest,$compile) {
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
    // mouseover info for each brand
        $scope.mouseoverInfo = function(){
          // console.log(id)
          $('.brand-edit-each').popup({
            position : 'top center',
          });  
        }
    
    $('.ui.page.dimmer.global-spotlight .ui.search')
      .search({
        source: content
    });
    $scope.mainData = '';
    $scope.showColumn = {};
    $scope.limitation = 10;
    $scope.typeControl = {};
    // // $http.get('http://service.webbels.net/Service/BrandService.svc/TestGetAll')
    // $http.get('table.json')
    //   .then(function(response){
    //     $scope.mainData = response.data.GD;
    //     // $scope.limitation = $scope.mainData.rowsperpage;
    //     console.log(response);
    //   });
    $scope.dataTableRequester = function(requesterId){
      console.log("here");
      $('#'+requesterId).append( '<div class="ui active inverted dimmer">\
                                    <div class="ui medium text loader">Loading</div>\
                                  </div>');
  
      $http({
        url : 'http://service.webbels.net/brand/paginate/',
        method: 'GET',
        params: {
            userId : '169055bd-24d6-4e10-9f98-d4a8c6e102c5',
            browserInfo : 'chrome canary',
            rowIndex : 1,
            rowSize : 10,
            orderColumn : 'code',
            orderType : 'desc', //asc
            searchKeyword : '',
            advanceSearch : ''
          }
        }).then(function(response) {
      // $http.get('table.json').then(function(response){
        console.log(response);
        $scope.mainData = response.data.GD;
        $('#'+requesterId).children('.inverted.dimmer').remove();
        console.log($scope.mainData);
      });
    };
    $scope.validation = function(t){
      $scope.validation = {};
        var data = {
          brandCode : $scope.validation.brandCode,
          brandDescription: $scope.validation.brandDescription,
          brandActive: $scope.validation.brandActive
        }
      return data
    }
    $scope.brandAdding = function(){
      /* Add brand function
       1. Assume that validation is done

       2. Assume that this is the correct json
      */
      // Getting ready data
      var data  = angular.copy($scope.brand);
          data['userId'] = '169055BD-24D6-4E10-9F98-D4A8C6E102C5';
          data['browserInfo'] = 'Chrome Carany';
          data['companyId'] =  '';
          data['isActive'] = 1;
          data['isDeleted'] =  0;

      $http({
        url : 'http://service.webbels.net/brand/save/',
        method: 'GET',
        params: data
      }).then(function(response) {
        $scope.dataTableRequester('brandModule');
        console.log(response);
      
      });



      // if there was no error in saving data then:
      $scope.closeOverSlider()
    }


    $scope.brandDelete = function(){
      var ids = [];
      angular.forEach($scope.gridCheckBox, function(value, key){
        ids.push(key);
      });
      var length = ids.length;
      var data  = {};
          data['userId'] = '169055BD-24D6-4E10-9F98-D4A8C6E102C5';//retrieve from a separate js file
          data['browserInfo'] = 'Chrome Carany'; //retrieve from a separate js file
          data['ids'] = ids;

      $http({
        url : 'http://service.webbels.net/brand/delete/',
        method: 'GET',
        params: data
      }).then(function(response) {
        $scope.gridCheckBox = {}; //needs to be in a clean function ***
         //needs to be in a clean function *** START

        $scope.dataTableRequester('brandModule');
        console.log(response);
      
      });
      $scope.closeOverSlider()
      
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

    }
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
    $scope.gridCheckBoxStatus = function(checkId, desc,status,name){
      if ($('[module-id="'+checkId+'"]').is(':checked')) {
        $scope.gridCheckBoxCounter++
        $scope.gridCheckBox[checkId] = {
          id:checkId,
          description : desc,
          active: status,
          name: name
        };
      }else{
        delete $scope.gridCheckBox[checkId];
        $scope.gridCheckBoxCounter--
      }
      console.log($scope.gridCheckBox);
      console.log($scope.gridCheckBoxCounter);
    };
    $scope.gridCheckBoxStatusRemover = function(checkId){
      delete $scope.gridCheckBox[checkId];
    }
    $scope.checkAll = function(){
      $('[module-id]').trigger('click');
    }
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

 