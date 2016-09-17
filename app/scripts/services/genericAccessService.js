'use strict';


barbod.factory('AccessService', ['$http', function($http) {

    return {
        accessTypes : function(accessTypesData){
        	// Getting data from login Service
        	accessTypesData = accessTypesData.substr(1);
        		// Converting each access to array member
	        var moduleAccess = accessTypesData.split('|'),
	        	// split up module name and its accesses
	        	regExp = /\(([^)]+)\)/,
				modulesArray = {};
	        angular.forEach(moduleAccess, function(v,k){
	        	// get everything between parantesee
	        var eachModule = regExp.exec(v),
	        	inModule = eachModule[1],
	        	module = v.replace(eachModule[0],"");
        		modulesArray[k] = {};
        		modulesArray[k][module] = inModule;
        		// console.log(modulesArray);

	        })
        		return modulesArray;
	      }
    };
}]);