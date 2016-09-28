'use strict';

app.controller('RegisterCtrl', function($scope, $http) {

	$(document).ready(function() {
		$('select').material_select()
	})

	$scope.login = function() {
	const user = {
		username: $scope.username,
		password: $scope.password
	}

	console.log(user)

	$http
		.post('api/register', user)
		.then(() => {})
		.catch(console.error)
	}

})