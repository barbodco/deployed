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
  .module('inventoryApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name inventoryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inventoryApp
 */
angular.module('inventoryApp')
  .controller('MainCtrl', ["$scope", "$http", function ($scope,$http) {
  	$scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.attrs = [
        { attr: 'type-checkbox', value: '' }
    ];
  $scope.mainData = '';
  $scope.showColumn = {};
  $scope.limitation = 10;
  $scope.typeControl = {};
  $http.get('table.json')
  	.then(function(response){
  		$scope.mainData = response.data.GD;
  		$scope.limitation = $scope.mainData.rowsperpage;
  	});

  }]);
angular.module('inventoryApp').directive('typeCheckbox', function() {
	  return {
	    scope: {
	      typeCheckox: '=' //import referenced model to our directives scope
	    },
	    templateUrl: 'checkbox.html',
	    // link: function(scope, elem, attr, ctrl) {
	      
	    //   scope.$watch('demoDisplay', function() { // watch for when model changes

	    //     elem.html("") //remove all elements

	    //     angular.forEach(scope.demoDisplay, function(d) { //iterate list
	    //       var s = scope.$new(); //create a new scope
	    //       angular.extend(s, d); //copy data onto it
	    //       console.log(scope.demoDays);

	    //       var template = '';
	    //       elem.append($compile(template)(s)); // compile template & append
	    //     });
	    //   }, true) //look deep into object
	      
	    // }
	  };
	});
'use strict';

/**
 * @ngdoc function
 * @name inventoryApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the inventoryApp
 */
angular.module('inventoryApp')
  .controller('AboutCtrl', ["$scope", function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
