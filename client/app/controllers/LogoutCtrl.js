'use strict';


app.controller('LogoutCtrl', function($scope, $http, $location, AuthFactory) {

  /////////////////////////////////////////
  // Logout functionality
  $scope.logout = () => {
    AuthFactory.logout();
    $location.path('/login');
	};
  /////////////////////////////////////////


});
/////////////////////////////////////////
