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
      
      });
      $scope.closeOverSlider();
      
            for (var i=0;i<length;i++){
              $('[module-id]').prop('checked', false); 
            }
      //needs to be in a clean function *** END

    };
    // get access for navigation
    $scope.moduleList = JSON.parse(localStorage.getItem("structedAccess"));

    // this will trigger when user clicks on menubar
    $scope.moduleToggler = function(nameOfClickedModule){
      $scope.unparsedName = nameOfClickedModule;
      var name  = nameOfClickedModule.toLowerCase().replace(" " , "");
      $scope.page = name;
    }
    /*
      this function query will load options for a dropdown
    */
    $scope.dropdown = {
      // // "po-source-type":{
      //   "name":"test",
      //   "value":"test"
      // // }
    }
    $scope.dropdownQuery = function(id){
      // $scope.dropdown[id] = [];
      var method = $scope.callConfig.endpoint.methods[1],
          params = {
            userId: '169055BD-24D6-4E10-9F98-D4A8C6E102C5',
            sessionId: '', 
            browserInfo: 'chrome canary'
          },
          url = "http://service.webbels.net/supplier/getall";


      APIService.doApiCall(params,url, method, function(response) {
        // angular.forEach(response.GD.data , function(k,v){
        // if (k !== null) {
          // $scope.dropdown.push( {name: k[1].value , value: k[0].value});
          // console.log($scope.dropdown);
          $scope.dropdown = response.GD.data;
        // }
        // })
      })
    }
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
        if (true) {};
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
    // // item Adding
    // $scope.itemAdd = function(){
    //   console.log($scope.barbod.item)
    // };
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

  barbod.directive('brandTable', function() {
      return {
          restrict: 'AE',
          templateUrl: 'views/brandtable.tpl.html'
      };
  });
  barbod.directive('companyModule', function() {
      return {
          restrict: 'AE',
          templateUrl: 'views/companymodule.tpl.html'
      };
  });
  barbod.directive('itemtypeModule', function() {
      return {
          restrict: 'AE',
          templateUrl: 'views/itemtypemodule.tpl.html'
      };
  });
  barbod.directive('supplierModule', function() {
      return {
          restrict: 'AE',
          templateUrl: 'views/suppliermodule.tpl.html'
      };
  });
  barbod.directive('itemModule', function() {
    return {
        restrict: 'AE',
        templateUrl: 'views/itemmodule.tpl.html'
    };
  });
  barbod.directive('measurementModule', function() {
      return {
          restrict: 'AE',
          templateUrl: 'views/measurementmodule.tpl.html'
      };
  });
  barbod.directive('purchaseorderModule', function() {
      return {
          restrict: 'AE',
          templateUrl: 'views/purchaseordermodule.tpl.html'
      };
  });
  barbod.directive('genericOverSlider', function() {
      return {
          restrict: 'AE',
          templateUrl: 'views/overslider.tpl.html'
      };
  });

  barbod.controller('measurementModuleController',
      function($scope,APIService,$http) {
        // initData
        $scope.barbod = {};
        $scope.pageCount = [];
        $scope.barbod.measurement = { 
            userId: '169055BD-24D6-4E10-9F98-D4A8C6E102C5',
            sessionId: '169055BD-24D6-4E10-9F98-D4A8C6E102C5',  
            browserInfo: 'chrome canary',
            id: '',
            code: '', 
            description: '',
            companyId: '',
            isActive: 1, 
            isDeleted: 0
        };

      // Fetch Data Tables ~Start
          // Get local Data
          $scope.initData = function(page){  
            $http.get('calls.json').success(function(calls) {
                  $scope.calls = calls;
                  var url = calls.endpoint.main + calls.controllers[4]+calls.endpoint.paginate, //Generation of URL based on calls variable
                      method = calls.endpoint.methods[1], //GET
                        params = {
                          userId : calls.function.public.userId, //Current userID
                          sessionId: '', //Current Session ID
                          browserInfo: 'Chrome Canary', //Browser Info
                          rowIndex :page,
                          rowSize : 3,
                          orderColumn : "code",
                          orderType : "asc",
                          searchKeyword : "",
                          advanceSearch :""
                      };
                  var dimmer = 'moduleDimmer';
                  // ~ dimmer pop up
                  $('#'+dimmer).addClass('active');

                  APIService.doApiCall(params , url ,method,function(response){

                    $scope.tableData = response;
                    console.log($scope.tableData.GD.rowsperpage);
                    $scope.initPageCount($scope.tableData.GD);
                    // ~ dimmer shutdown
                    $('#'+dimmer).removeClass('active');
                  });
            });
          }
          $scope.initPageCount = function(data){
            $scope.pageCount = [];
            for(var i=0;i<data.pagecount;i++) {
              $scope.pageCount.push(i);
            }
          }
          $scope.initData(1);
      // Fetch Data Tables ~End
  });
  barbod.controller('itemModuleController',
      function($scope,APIService,$http) {
      // initData
        $scope.barbod = {};
        $scope.barbod.item = {};
        $scope.barbod.item.itemcode = '';
        $scope.barbod.item.itemdescription = '';
        $scope.barbod.item.itembarcode = '';

      // Fetch Data Tables ~Start
          // Get local Data
          $http.get('calls.json').success(function(calls) {
                var url = calls.endpoint.main + calls.controllers[0]+calls.endpoint.paginate, //Generation of URL based on calls variable
                    method = calls.endpoint.methods[1], //GET
                      params = {
                        userId : calls.function.public.userId, //Current userID
                        sessionId: '', //Current Session ID
                        browserInfo: 'Chrome Canary', //Browser Info
                    };
                    
                APIService.doApiCall(params , url ,method,function(response){

                  $scope.tableData = response;
                });
            });
      // Fetch Data Tables ~End
      // Table Dropdown initiation
        $('.dropdown').dropdown({transition: 'drop'});
      // Modal window function
        $scope.configModal = function(){
          $('.ui.basic.modal').modal('show');
        };
        $scope.itemAdd = function(){
        }
  });
  barbod.controller('brandModuleController',
      function($scope,APIService,$http) {
        // initData
        $scope.barbod = {
          customize:{
            tableRowSize: 10
          },
          brand : { 
            userId: '169055BD-24D6-4E10-9F98-D4A8C6E102C5',
            sessionId: '169055BD-24D6-4E10-9F98-D4A8C6E102C5',  
            browserInfo: 'chrome canary',
            id: '',
            code: 'testcode', 
            description: '',
            companyId: '',
            isActive: 1, 
            isDeleted: 0,
            configModal: false
          }
        }
        $scope.pageCount = [];
        $scope.barbod.brand.stepper = [
          {
            "title": "Code",
            "description": "Write your brand code",
            "icon": "qrcode"

          },
          {
            "title": "Description",
            "description": "Write your brand description",
            "icon": "browser"
          }
        ]
      // Fetch Data Tables ~Start
          // Get local Data
          $scope.initData = function(page){  
            $http.get('calls.json').success(function(calls) {
                  $scope.calls = calls;
                  var url = calls.endpoint.main + calls.controllers[0]+calls.endpoint.paginate, //Generation of URL based on calls variable
                      method = calls.endpoint.methods[1], //GET
                        params = {
                          userId : calls.function.public.userId, //Current userID
                          sessionId: '', //Current Session ID
                          browserInfo: 'Chrome Canary', //Browser Info
                          rowIndex :page,
                          rowSize : $scope.barbod.customize.tableRowSize,
                          orderColumn : "code",
                          orderType : "asc",
                          searchKeyword : "",
                          advanceSearch :""
                      };
                  var dimmer = 'moduleDimmer';
                  // ~ dimmer pop up
                  $('#'+dimmer).addClass('active');

                  APIService.doApiCall(params , url ,method,function(response){

                    $scope.tableData = response;
                    $scope.initPageCount($scope.tableData.GD);
                    // ~ dimmer shutdown
                    $('#'+dimmer).removeClass('active');
                  });
            });
          }
          $scope.initPageCount = function(data){
            $scope.pageCount = [];
            for(var i=0;i<data.pagecount;i++) {
              $scope.pageCount.push(i);
            }
          }
          $scope.initData(1);
      // Fetch Data Tables ~End

      // Table Dropdown initiation
        $('.dropdown').dropdown({transition: 'drop'});
      
      // Adding new brand
        $scope.addNewBrand = function(){
          var params = $scope.barbod.brand,
              url = $scope.calls.endpoint.main + $scope.calls.controllers[0]+$scope.calls.endpoint.save, //Generation of URL based on calls variable
              method = $scope.calls.endpoint.methods[1] //GET

          APIService.doApiCall(params , url ,method,function(response){
              $scope.showSuccessMessage = true;
              $scope.overSlider();

              // $scope.adding = false;
              $scope.initData($scope.tableData.GD.currentpage)
          });
        }
      // Delete brand(s)
        $scope.DeleteBrands = function(){
           delete $scope.editList.list;
              var params = [];
                  angular.forEach($scope.editList , function(v,k){
                    params.push(k);
                  });
              var data = {
                    userId: '169055BD-24D6-4E10-9F98-D4A8C6E102C5',    
                    sessionId: '169055BD-24D6-4E10-9F98-D4A8C6E102C5',    
                    browserInfo: 'chrome canary',
                    ids: params
                  }       
              // Conversion of Params
             

              var   url = $scope.calls.endpoint.main + $scope.calls.controllers[0]+$scope.calls.endpoint.delete, //Generation of URL based on calls variable
                    method = $scope.calls.endpoint.methods[1] //GET

              APIService.doApiCall(data , url ,method,function(response){
                  $scope.showSuccessMessage = true;
                  $scope.overSlider();

                  // $scope.adding = false;
              $scope.initData($scope.tableData.GD.currentpage)
          });
        }
      // Overslider Handler
          $scope.closeBrandOverSlider = function(){
            $scope.showHideValidation = false;
          };
      // All Validation
          // Code Validation
              $scope.codeValidation = function(){
                // $scope.codeValidated = angular.isNumber($scope.barbod.brand.code);
                var code = $scope.barbod.brand.code,
                    codeLength1 = code.length,
                    codeLength2 = (parseInt(code)).toString().length;
                return (codeLength1 === codeLength2);
                
              };
          // Description Validation
              $scope.descValidation = function(code){

              }
  });
  barbod.controller('companyModuleController',
      function($scope,APIService,$http) {
      // initData
        $scope.barbod = {};
        $scope.barbod.company = { 
            userId: "169055BD-24D6-4E10-9F98-D4A8C6E102C5",
            sessionId: "169055BD-24D6-4E10-9F98-D4A8C6E102C5",
            browserInfo: "chrome canary",
            id: "842CB376-25D4-41B9-B1B6-1055F1306762"
        };
      // init model
        $scope.barbod.company.dataInput = { 
            parent: {
                id: "",
                name: "",
                description: "",
                companyId: "",
                isActive: "1",
                isDeleted: "0"
              },
            child: [
              { 
                id:"",
                templateId: "E67FAA2F-7A5A-4E09-A6FB-EE0CC8E64F8E",
                label: "Contact Person",
                value: ""
              },
              {   
                id:"",
                templateId: "B5614042-F6B6-4489-ABFB-E55D79089F66",
                label: "Contact No.",
                value: ""
              },
              {   
                id:"",
                templateId: "8F75C6F4-CF72-487C-ACAD-7DCAE5F22A07",
                label: "Address",
                value: ""
              }
            ]
        };
      // update Mode
        $scope.companyEditMode = false; 
      // Fetch Data Tables ~Start
        $scope.initData =function(page){
              // Get local Data
              $http.get('calls.json').success(function(calls) {
                    $scope.calls = calls;
                    var url = calls.endpoint.main + calls.controllers[2]+calls.endpoint.getbyid, //Generation of URL based on calls variable
                        method = calls.endpoint.methods[1], //GET
                          params = {
                            userId : calls.function.public.userId, //Current userID
                            sessionId: '', //Current Session ID
                            browserInfo: 'Chrome Canary', //Browser Info
                            id:$scope.barbod.company.id
                        };
                    var dimmer = 'moduleDimmer';
                        // ~ dimmer pop up
                        $('#'+dimmer).addClass('active');  
                    APIService.doApiCall(params , url ,method,function(response){

                      $scope.tableData = response.FM.body;
                      $scope.barbod.company.dataInput.parent.id = $scope.tableData[0].displayname;
                        // ~ dimmer shutdown
                          $('#'+dimmer).removeClass('active');
                    });
                });          
        }
        $scope.initData();
      // Updating Company
            $scope.updateCompany = function(){
              var calls = $scope.calls,
                  // params = $scope.barbod.company.dataInput,
                  params = { 
                      userId: '169055BD-24D6-4E10-9F98-D4A8C6E102C5',
                      sessionId: '169055BD-24D6-4E10-9F98-D4A8C6E102C5',  
                      browserInfo: 'chrome canary',
                      dataToken: JSON.stringify($scope.barbod.company.dataInput)
                  },
                  url = calls.endpoint.main + calls.controllers[2]+calls.endpoint.save,
                  method = calls.endpoint.methods[1]

              APIService.doApiCall(params , url ,method,function(response){
                  $scope.initData();
                });
            }
  });
  barbod.controller('supplierModuleController',
      function($scope,APIService,$http) {
        // initData
        $scope.barbod = {};
        $scope.barbod.customize = {
            tableRowSize: 10
        }
        $scope.pageCount = [];
        $scope.barbod.supplier = { 
            userId: '169055BD-24D6-4E10-9F98-D4A8C6E102C5',
            sessionId: '',  
            browserInfo: 'chrome canary',
            id: '',
            code: '', 
            description: '',
            companyId: '',
            isActive: 1, 
            isDeleted: 0,
            dataToken: ""
        };
        $scope.barbod.supplier.dataInput = {
          parent: {
            id: "CB55FDEE-D4A9-47EC-94A1-DFB6AD408D44",
            code: "companyxxa",
            description: "company xx one",
            companyId: "",
            isTaxable: 1,
            isActive: 1,
            isDeleted: "0"
          },
          child: [
            { 
              id:"",
              templateId: "E67FAA2F-7A5A-4E09-A6FB-EE0CC8E64F8E",
              label: "Contact Person",
              value: ""
            },
            {   
              id:"",
              templateId: "8F75C6F4-CF72-487C-ACAD-7DCAE5F22A07",
              label: "Address",
              value: ""
            },
            {   
              id:"3755DAEC-FCB7-4F13-9BE4-C3F9596A2CC8",
              templateId: "B5614042-F6B6-4489-ABFB-E55D79089F66",
              label: "Contact No.",
              value: ""
            }
          ]
        }
      // Fetch Data Tables ~Start
        $scope.initData = function(page){ 
          // Get local Data
          $http.get('calls.json').success(function(calls) {
                $scope.calls = calls;
                var url = calls.endpoint.main + calls.controllers[1]+calls.endpoint.paginate, //Generation of URL based on calls variable
                    method = calls.endpoint.methods[1], //GET
                      params = {
                          userId : calls.function.public.userId, //Current userID
                          sessionId: '', //Current Session ID
                          browserInfo: 'Chrome Canary', //Browser Info
                          rowIndex :page,
                          rowSize : $scope.barbod.customize.tableRowSize,
                          orderColumn : "code",
                          orderType : "asc",
                          searchKeyword : "",
                          advanceSearch :""
                      };
                var dimmer = 'moduleDimmer';
                // ~ dimmer pop up
                $('#'+dimmer).addClass('active');
                APIService.doApiCall(params , url ,method,function(response){

                  $scope.tableData = response;
                  $scope.initPageCount($scope.tableData.GD);
                  // ~ dimmer shutdown
                  $('#'+dimmer).removeClass('active');
                });
            });
        }
        $scope.initPageCount = function(data){
          $scope.pageCount = [];
          for(var i=0;i<data.pagecount;i++) {
            $scope.pageCount.push(i);
          }
        }
        $scope.initData(1);
      // Supplier Deleting
        $scope.supplierDelete = function(){
        }
      // Adding new brand
        $scope.addNewSupplier = function(){
         $scope.barbod.supplier.dataToken = JSON.stringify($scope.barbod.supplier.dataInput);
          var params = $scope.barbod.supplier,
              url = $scope.calls.endpoint.main + $scope.calls.controllers[1]+$scope.calls.endpoint.save, //Generation of URL based on calls variable
              method = $scope.calls.endpoint.methods[1] //GET

          APIService.doApiCall(params , url ,method,function(response){
              $scope.showSuccessMessage = true;
              $scope.overSlider();

              // $scope.adding = false;
              $scope.initData($scope.tableData.GD.currentpage)
          });
        }

  });
  barbod.controller('itemtypeModuleController',
      function($scope,APIService,$http) {
        // initData
        $scope.barbod = {};
        $scope.barbod.customize = {
            tableRowSize: 10
        }
        $scope.pageCount = [];
        $scope.barbod.itemtype = { 
            userId: '169055BD-24D6-4E10-9F98-D4A8C6E102C5',
            sessionId: '169055BD-24D6-4E10-9F98-D4A8C6E102C5',  
            browserInfo: 'chrome canary',
            id: '',
            code: '', 
            description: '',
            companyId: '',
            isActive: 1, 
            isDeleted: 0
        };

      // Fetch Data Tables ~Start
          // Get local Data
          $scope.initData = function(page){
            $http.get('calls.json').success(function(calls) {
                  $scope.calls = calls;
                  var url = calls.endpoint.main + calls.controllers[3]+calls.endpoint.paginate, //Generation of URL based on calls variable
                      method = calls.endpoint.methods[1], //GET
                      // params = $scope.barbod.itemtype
                      params = {
                          userId : calls.function.public.userId, //Current userID
                          sessionId: '', //Current Session ID
                          browserInfo: 'Chrome Canary', //Browser Info
                          rowIndex :page,
                          rowSize : $scope.barbod.customize.tableRowSize,
                          orderColumn : "code",
                          orderType : "asc",
                          searchKeyword : "",
                          advanceSearch :""
                      };    
                  APIService.doApiCall(params , url ,method,function(response){

                    $scope.tableData = response;
                    $scope.initPageCount($scope.tableData.GD);
                  });
            });
          }
          $scope.initPageCount = function(data){
            $scope.pageCount = [];
            for(var i=0;i<data.pagecount;i++) {
              $scope.pageCount.push(i);
            }
          }
          $scope.initData(1);
          $scope.addNewItemType = function(){
            var params = $scope.barbod.itemtype,
              url = $scope.calls.endpoint.main + $scope.calls.controllers[3]+$scope.calls.endpoint.save, //Generation of URL based on calls variable
              method = $scope.calls.endpoint.methods[1] //GET

              APIService.doApiCall(params , url ,method,function(response){
                  $scope.showSuccessMessage = true;
                  $scope.closeOverSlider();

                  // $scope.adding = false;
                  $scope.initData($scope.tableData.GD.currentpage)
              });
          };
          $scope.deleteItemTypes = function(){
           delete $scope.editList.list;
              var params = [];
                  angular.forEach($scope.editList , function(v,k){
                    params.push(k);
                  });
          var data = {
                userId: '169055BD-24D6-4E10-9F98-D4A8C6E102C5',    
                sessionId: '169055BD-24D6-4E10-9F98-D4A8C6E102C5',    
                browserInfo: 'chrome canary',
                ids: params
              }    
          // Conversion of Params
         

          var   url = $scope.calls.endpoint.main + $scope.calls.controllers[3]+$scope.calls.endpoint.delete, //Generation of URL based on calls variable
                method = $scope.calls.endpoint.methods[1] //GET

          APIService.doApiCall(data , url ,method,function(response){
              $scope.showSuccessMessage = true;
              $scope.closeOverSlider();

              // $scope.adding = false;
              $scope.initData($scope.tableData.GD.currentpage)
          });
        }
  });


  barbod.directive('brandOverSlider', function() {
      return {
          restrict: 'AE',
          templateUrl: 'views/brandOverSlider.tpl.html'
      };
  });
  barbod.directive('supplierOverSlider', function() {
      return {
          restrict: 'AE',
          templateUrl: 'views/supplierOverSlider.tpl.html'
      };
  });
  barbod.directive('itemTypeOverSlider', function() {
      return {
          restrict: 'AE',
          templateUrl: 'views/itemtypeOverSlider.tpl.html'
      };
  });
  barbod.directive('itemOverSlider', function() {
      return {
          restrict: 'AE',
          templateUrl: 'views/itemOverSlider.tpl.html'
      };
  });

    barbod.directive('brandValidation', function() {
      return {
          restrict: 'AE',
          templateUrl: 'views/brandValidation.tpl.html'
      };
  });


// All Generic directives re here

  barbod.directive('companyInfo',['APIService','$http', function(APIService,$http) {
      
        return {
            restrict: 'AE',
            templateUrl: 'views/companyInfo.tpl.html',
        };
  }]);
  barbod.directive('genericTable',['APIService','$http', function(APIService,$http) {
      
        return {
            restrict: 'AE',
            templateUrl: 'views/genericTable.tpl.html',
            link: function($scope, elem, attr){

              $scope.$parent.showEmptyMessage = true;
              $scope.$parent.NoOfItems = 0;
              $scope.$parent.showHideValidation = false;
              // $scope.$parent.showHideValidation = $('.hide-over-slider').length >0;

              $scope.updateEditList = function(index){
                $scope.$parent.NoOfItems = -1;

                if (angular.isUndefined($scope.barbod.editList.list)) {
                  $scope.barbod.editList.list = {};
                }

                angular.forEach($scope.barbod.editList , function(v,k){
                  $scope.$parent.NoOfItems++
                  if (v === false) {
                    delete $scope.barbod.editList[k];
                    delete $scope.barbod.editList.list[k]
                    $scope.$parent.NoOfItems--
                  }
                });
                var newId = $scope.tableData.GD.data[index][0].value,
                    isIdExist = angular.isDefined($scope.barbod.editList[newId]),
                    isIdListExist = angular.isUndefined($scope.barbod.editList.list[newId]);
                    if (isIdExist && isIdListExist) {
                      $scope.barbod.editList.list[newId] = $scope.tableData.GD.data[index];
                    }
                $scope.$parent.editList = $scope.barbod.editList;

                $scope.$parent.showEmptyMessage = (JSON.stringify($scope.barbod.editList.list) === '{}'); 
              };
              $scope.clearEditList = function(id){
                $scope.barbod.editList[k] = false;
                $scope.updateEditList();
              }
              $scope.editMode = false;
              $scope.requesterRow = 0
            // Local Calls
              $scope.moduleLocalCalls = function(f){
                // init functions
                $scope.$parent.adding = false;
                $scope.$parent.deleting = false;
                $scope.$parent.editing = false;

                $scope.$parent[f] = true;
              }
            // Modal window function
              $scope.configModal = function(){
                $('.ui.basic.modal.hidden').remove();
                $('.ui.basic.modal').modal('show');
              };
              $scope.$parent.overSlider = function(){
                $scope.$parent.showHideValidation = !$scope.$parent.showHideValidation;
              }
            // Edit a table row
              $scope.$parent.rowEditMode = function(index){

                $scope.overSlider();
                $scope.moduleLocalCalls('adding');
                $scope.$parent.$$childTail.barbod.brand.code = $scope.tableData.GD.data[index][1].value;
                $scope.$parent.$$childTail.barbod.brand.description = $scope.tableData.GD.data[index][2].value;
                $scope.$parent.$$childTail.barbod.brand.active = $scope.tableData.GD.data[index][3].value;

                // $scope.tmpEditorContainer = {
                //   "code": $scope.tableData.GD.data[index][1].value,
                //   "description": $scope.tableData.GD.data[index][2].value,
                //   "active": $scope.tableData.GD.data[index][3].value
                // }
                console.log($scope);
                // console.log($scope.tmpEditorContainer);
                
              }
            }
        };
  }]);
  barbod.directive('genericMessage',['APIService','$http', function(APIService,$http) {
      
        return {
            restrict: 'AE',
            templateUrl: 'views/genericMessage.tpl.html',
            link: function($scope, elem, attr){
            }
        };
  }]);