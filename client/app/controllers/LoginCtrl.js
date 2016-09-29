'use strict';

app.controller('LoginCtrl', function($scope, $http, $location, UserFactory) {

	$scope.login = function() {
		const user = {
			username: $scope.username,
			password: $scope.password
		}

		//Store current username in user factory
		UserFactory.setCurrentUsername($scope.username);

		// console.log(user)

		// $location.path('/');

		$http
			.post('/login', user)
			.then(() => $location.path('/'))
			.catch(console.error)

	}

})
