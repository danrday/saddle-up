'use strict';

app.controller('ProfileCtrl', function($scope, UserFactory, $http) {

  $scope.allUsers = []
  let newLikedUsers = []

  /////////////////////////////////////////
  //Function to load users profiles on pageloade
  const loadPage = () => {
    //Return the current users object from db
    UserFactory.getCurrentUserObj()
      .then((user) => {
        $scope.currentUser = user;
        // Returned entire user list from database as "data"
        UserFactory.loadUserList(user.username)
        .then((data) => {
          //Return only the users that are like by the current user
          $scope.currentUser.likedusers.forEach((likedUser) => {
            data.forEach((user) => {
              if(user.username === likedUser) {
                $scope.allUsers.push(user)
              }
            })
          })
        });
      })

  };
  loadPage();
  /////////////////////////////////////////



  $scope.dislikeUser = (user) => {
    const dislikedUser = user.username;
    newLikedUsers = $scope.currentUser.likedusers
    newLikedUsers.forEach((likedUser, index) => {
      if(likedUser === dislikedUser)
      newLikedUsers.splice(index, 1)
    })

    $http
    .put(`api/updatelike/${$scope.currentUser.username}`, newLikedUsers)
    .then((data) => {
      $scope.allUsers = []
      loadPage()
      //Run the page load display function
    })
    .catch(console.error)
  };
})
