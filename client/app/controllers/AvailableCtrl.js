'use strict';

app.controller('AvailableCtrl', function($scope, $http, $location, UserFactory) {

  /////////////////////////////////////////
  //Load users to page
  UserFactory.loadUserList()
  .then((list) => console.log("Test", list.data));

  //     //Filter the users and do not display disliked users for the current user
  //     console.log("Test list", list);
  //     // list.forEach((each) => {
  //     //   $scope.userList = each.disliked.filter((user) => {}
  //     //     return  $scope.username !== user.username
  //     //   });
  //     // })
  //   });
  // };
  /////////////////////////////////////////


  /////////////////////////////////////////
  $scope.likeUser = () => {
    console.log("Liked");
    // $http
    // .put('api/like/:username/:likedusername')
    // .then(() => {
    //   //Run the page load display function
    // })
    // .catch(console.error)
  };

  $scope.dislikeUser = () => {
    console.log("Disliked user");
    // $http
    // .put('api/dislike/:username/:likedusername')
    // .then(() => {
    //   //Run the page load display function
    // })
    // .catch(console.error)
  };
  /////////////////////////////////////////


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
