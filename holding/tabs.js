angular.module('ContactDatabaseApp', ['ui.bootstrap']);
angular.module('ContactDatabaseApp').controller('TabsDemoCtrl', function ($scope, $window) {
  $scope.tabs = [
    { title:'Contracts', content:'Contracts' },
    { title:'Networks', content:'Networks' },
    { title:'Glossary', content:'Glossary'}
  ];

  $scope.alertMe = function() {
    setTimeout(function() {
      $window.alert('You\'ve selected the alert tab!');
    });
  };
});
