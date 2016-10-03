'use strict';

app.controller('NavCtrl', function($scope, $rootScope, $http, UserFactory) {

  //Set navbar to hide user only nav links
  $rootScope.noUserSignedIn = false;
  $rootScope.UserSignedIn = true;

  $rootScope.showUserNavLinks = () => {
    $rootScope.noUserSignedIn = true;
    $rootScope.UserSignedIn = false;
  }

  $rootScope.hideUserNavLinks = () => {
    $rootScope.noUserSignedIn = false;
    $rootScope.UserSignedIn = true;
  }


  //If user is signed in, hide navbar elements
  UserFactory.getCurrentUserObj()
  .then((user) => {

    if (user) {
      $rootScope.showUserNavLinks();
    } else {
      $rootScope.hideUserNavLinks();
    }

  });

});
