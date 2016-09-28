'use strict';

app.controller('LoginCtrl', function($scope, $http, UserFactory) {

	$scope.login = function() {
		const user = {
			username: $scope.username,
			password: $scope.password
		}

		//Store current username in user factory
		UserFactory.setCurrentUsername($scope.username);

		console.log(user)

		// $http
		// 	.post('api/login', user)
		// 	.then(() => {})
		// 	.catch(console.error)

	}

})
