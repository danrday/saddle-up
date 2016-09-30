'use strict';

app.controller('LoginCtrl', function($scope, $http, $location, UserFactory) {

	$scope.login = function() {
		const user = {
			username: $scope.username,
			password: $scope.password
		}


		$http
		 .post('/login', user)
		 .then(data => {
			 	if (data.user) {
					$location.path('/');
				} else {
					$location.path('/login');
				}
		 })
		.catch(console.error)

	}

})
