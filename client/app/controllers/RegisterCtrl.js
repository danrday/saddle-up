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
		confirmation: $scope.confirmation,
	}

	console.log(user)

	$http
		.post('/register', user)
		.then((data) => {
			console.log(data)
			if(data) {
				$location.path('/login')
			} else {
				$location.path('/register')
			}
		})
		.catch(console.error)
	}

})