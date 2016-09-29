'use strict';

app.controller('AvailableCtrl', function($scope, $http, $location, UserFactory) {
  
  $scope.userList = [];

  /////////////////////////////////////////

  /////////////////////////////////////////
  //Load users to page
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

            if($scope.currentUser.dislikedusers.length === 0 ) {
              $scope.userList = data
            } else {

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
            }
          });
      })
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
