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