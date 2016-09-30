'use strict';

app.controller('ProfileCtrl', function($scope, UserFactory, $http) {
  
  $scope.allUsers = []

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

          console.log(data)
          // ^^^^^^^^^^^^
          // returned entire user list from database as "data"
          $scope.currentUser.likedusers.forEach((likedUser) => {
            data.forEach((user, index) => {
              console.log('LIKED',likedUser)
              console.log('ALL',user.username)
              if(user.username === likedUser) {
                $scope.allUsers.push(user)
              }
            })
          })
        });
      })

    $scope.dislikeUser = (user) => {
      const dislikedUser = user.username;
      $http
      .put(`api/dislike/${$scope.currentUser.username}/${dislikedUser}`)
      .then((data) => {
        console.log(data)
        loadPage()
        //Run the page load display function
      })
      .catch(console.error)
    };
  };
  loadPage();
})