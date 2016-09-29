'use strict';

app.factory('UserFactory', function($http, $q) {

  /////////////////////////////////////////
  //Save current user
  let currentUser;

  const setCurrentUsername = (name) => {
    currentUser = name;
  };

  const getCurrentUsername = () => currentUser;
  /////////////////////////////////////////

  /////////////////////////////////////////
  //Get all users from the db
  const loadUserList = function() {

    return $q((resolve, reject) => {
      $http.get('data/user.json')
      .then((list) => {
        if ( list ) {
          resolve(list);
        } else {
          reject(null);
        }
      })
      .catch(console.error);
    });

  };
  /////////////////////////////////////////


  /////////////////////////////////////////
  //Get the current users obj from db
  const getCurrentUser = function() {

    return $q((resolve, reject) => {
      $http.get('api/:username')
      .then((list) => {
        if ( list ) {
          resolve(list);
        } else {
          reject(null);
        }
      })
      .catch(console.error);
    });

  };
  /////////////////////////////////////////

  /////////////////////////////////////////
  return { loadUserList, getCurrentUser, setCurrentUsername, getCurrentUsername };

});
