'use strict';

app.controller('LoginCtrl', function($scope, $http) {

	$scope.login = function() {
		const user = {
			username: $scope.username,
			password: $scope.password
		}

		console.log(user)

		$http
			.post('api/login', user)
			.then(() => {})
			.catch(console.error)

	}

})