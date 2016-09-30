'use strict';

app.controller('ProfileCtrl', function($scope, UserFactory, $http) {
  
  $scope.allUsers = []
  let newLikedUsers = []

  const loadPage = () => {

    $http
      .get('/currentUser')
      .then((data) => {
        UserFactory.setCurrentUsername(data.data.username)
      })
      .then(() => {
        $scope.currentUser = UserFactory.getCurrentUsername();
      })
      .then(() => {
        UserFactory
          .getCurrentUser($scope.currentUser)
          .then(({data}) => {
            $scope.currentUser = data
          })
      })
      .then(() => {
        UserFactory.loadUserList()
        .then(({data}) => {

          // ^^^^^^^^^^^^
          // returned entire user list from database as "data"
          $scope.currentUser.likedusers.forEach((likedUser) => {
            data.forEach((user, index) => {
              if(user.username === likedUser) {
                $scope.allUsers.push(user)
              }
            })
          })
        });
      })

  };
  loadPage();

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