'use strict';
  barbod.service('LocationService', function($location) {
    this.go = function(url){
      return $location.path(url);
    }
  })