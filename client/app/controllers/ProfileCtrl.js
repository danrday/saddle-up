'use strict';

app.controller('ProfileCtrl', function($scope) {

	$scope.user = {
    username: 'Greg',
    species: 'Stud',
    seeking: 'Steed',
    location: 'Location 1',
    description: 'My name is greg'
  }

  $scope.userList = [
  {
    username: 'Greg',
    species: 'Stud',
    seeking: 'Steed',
    location: 'Location 1',
    description: 'My name is greg'
  },
  {
    username: 'Greg',
    species: 'Stud',
    seeking: 'Steed',
    location: 'Location 1',
    description: 'My name is greg'
  },
  {
    username: 'Greg',
    species: 'Stud',
    seeking: 'Steed',
    location: 'Location 1',
    description: 'My name is greg'
  }
  ]

})