'use strict';

app.controller('AvailableCtrl', function($scope, $http, $location, UserFactory) {
  
  $scope.userList = [];

  const currentUser = UserFactory.getCurrentUsername();
  /////////////////////////////////////////

  /////////////////////////////////////////
  //Load users to page
  const loadPage = () => {

    UserFactory
      .getCurrentUser('studmuffin')
      .then(({data}) => {
        $scope.currentUser = data
      })

    UserFactory.loadUserList()
      .then(({data}) => {
        // ^^^^^^^^^^^^
        // returned entire user list from database as "data"

        // loop through current user's dislikeduser array
        $scope.currentUser.dislikedusers.forEach((username) => {
          // filter user list array
          $scope.userList = data.filter((user) => {
            // if username of user in data array does not match
            // username if disliked user array, return user
            // to user list array
            if(user.username !== username) {
              return user
            }         
          })
        })
      });
  }
  loadPage();
  /////////////////////////////////////////


  /////////////////////////////////////////
  $scope.likeUser = (user) => {
    const likedUser = user.username;
    console.log("Liked", likedUser);
    // $http
    // .put('api/like/:username/:likedusername')
    // .then(() => {
    //   //Run the page load display function
    // })
    // .catch(console.error)
  };

  $scope.dislikeUser = (user) => {
    const dislikedUser = user.username;
    console.log("Disliked", dislikedUser);
    // $http
    // .put('api/dislike/:username/:likedusername')
    // .then(() => {
    //   //Run the page load display function
    // })
    // .catch(console.error)
  };
  /////////////////////////////////////////

});//End AvailableCtrl
