'use strict';

app.controller('AvailableCtrl', function($scope, $http, $location) {

  //Get the entire db of users
  // let loadUserList = () => {
  //   $http
  //   .get('api/available/:username')
  //   .then((list) => {
  //     //Filter the users and do not display disliked users for the current user
  //     list.forEach((each) => {
  //       $scope.userList = list.filter((user) => {
  //         return  ===
  //       });
  //     })
  //   });
  // }

  $scope.likeUser = () => {
    $http
    .put('api/available/:username/:likedusername')
    .then(() => {
      //Run the page load display function
    })
    .catch()

  };

  $scope.dislikeUser = () => console.log("Test text");

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
];



});//End AvailableCtrl
