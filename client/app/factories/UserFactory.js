'use strict';

app.factory('UserFactory', function($http, $q) {

  /////////////////////////////////////////
  //Save current user
  const getCurrentUserObj = () => {
    return $q((resolve, reject) => {
      $http
        .get('/currentUserObj')
        .then(({data}) => {
          if (data) {
            resolve(data);
          } else {
            reject(null);
          }
        })
    })//End promise
  }
  /////////////////////////////////////////

  /////////////////////////////////////////
  //Get all users from the db
  const loadUserList = function(currentUsername) {

    return $q((resolve, reject) => {
      $http.get('api/allusers')
      .then((list) => {
        if (list) {

          let userListMinusCurrentUser = list.data.filter((user) => {
            if (user.username !== currentUsername) {
              return user;
            }
          })

          resolve(userListMinusCurrentUser);
        } else {
          reject(null);
        }
      })
      .catch(console.error);
    });

  };
  /////////////////////////////////////////


  /////////////////////////////////////////
  return { loadUserList, getCurrentUserObj };

});
