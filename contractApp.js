
var app = angular.module('ContactDatabaseApp', ['ngSanitize']);

app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;  // used for IE 9 +
        $httpProvider.defaults.withCredentials = true; // used for non-IE broswers
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }



]);
