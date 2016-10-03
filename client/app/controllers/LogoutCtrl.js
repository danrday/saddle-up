'use strict';


app.controller('LogoutCtrl', function($scope, $rootScope, $http, $location, AuthFactory) {

  /////////////////////////////////////////
  // Logout functionality
  $scope.logout = () => {
    AuthFactory.logout();
    $location.path('/login');
    //When user logs out, hide some navbar links
    $rootScope.hideUserNavLinks();
	};
  /////////////////////////////////////////


});
/////////////////////////////////////////
