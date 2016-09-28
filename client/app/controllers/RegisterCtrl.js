'use strict';

app.controller('RegisterCtrl', function($scope, $http, $location) {

	$(document).ready(function() {
		$('select').material_select()
	})

	$scope.login = function() {
	const user = {
		username: $scope.username,
		password: $scope.password,
		location: $scope.location,
		species:  $scope.species,
		seeking:  $scope.seeking,
		description: $scope.description,
	}

	console.log(user)

	$http
		.post('api/register', user)
		.then((user) => {
			if(user) {
				$location.path('/login')
			} else {
				$location.path('/register')
			}
		})
		.catch(console.error)
	}

})