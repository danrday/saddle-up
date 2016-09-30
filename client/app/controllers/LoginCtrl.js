'use strict';

app.controller('LoginCtrl', function($scope, $http, $location, $routeParams, UserFactory) {

	$scope.failedLogin = true;

	$scope.login = function() {
		const user = {
			username: $scope.username,
			password: $scope.password
		}


		$http
		 .post('/login', user)
		 .then(data => {
			 console.log("Test data", data.data.user);
			 	if (data.data.user) {
					$location.path('/');
				} else {
					$scope.username = "";
					$scope.password = "";
					$scope.failedLogin = false;
				}
		 })
		.catch(console.error)

	}

})
