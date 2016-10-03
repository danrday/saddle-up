'use strict';

app.controller('LoginCtrl', function($scope, $rootScope, $http, $location, $routeParams, UserFactory, AuthFactory) {

	//Message to show for failed login
	$scope.failedLogin = true;
	/////////////////////////////////////////


	/////////////////////////////////////////
	//User login functionality
	$scope.login = function() {

		const user = {
			username: $scope.username,
			password: $scope.password
		}

		//Call to server for user verification
		AuthFactory.login(user)
		 .then(data => {
			 	//If user exists sign them in
			 	if (data.data.user) {
					$location.path('/');
					//If login is a success, show full navbar
					$rootScope.showUserNavLinks();
				//If user does not exist
				//Reset form and show error message
				} else {
					$scope.username = "";
					$scope.password = "";
					$scope.failedLogin = false;
				}
		 })
		.catch(console.error);
	}
	/////////////////////////////////////////

});//End loginCtrl
