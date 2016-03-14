'use strict';

var barbod = angular.module('barbod');
  barbod.service('GenericCallsService', function($http) {
    // var alreadyLoading = {};
    // return {
      this.fetch =function(url, structor) {
        return $http.get(url).then(function (response) {
           // delete alreadyLoading[url];
           return response.data[structor];
        });
      }
    // };
  })