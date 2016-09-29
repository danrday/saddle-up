'use strict';

app.controller('ProfileCtrl', function($scope, UserFactory) {
  
  $scope.userList = []

  const loadPage = () => {

    UserFactory.getCurrentUser('studmuffin')
    .then(({data}) => {
      $scope.currentUser = data
      console.log($scope.currentUser)
    })

    UserFactory.loadUserList()
    .then(({data}) => {
      // ^^^^^^^^^^^^
      // returned entire user list from database as "data"

      // loop through current user's dislikeduser array
      $scope.currentUser.likedusers.forEach((username) => {
        // filter user list array
        $scope.userList = data.filter((user) => {
          // if username of user in data array does not match
          // username if disliked user array, return user
          // to user list array
          if(user.username === username) {
            return user
          }         
        })
      })
    });

  };
  loadPage();

})