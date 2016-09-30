'use strict';

app.factory('LoginFactory', function($http, $q) {

  /////////////////////////////////////////
  // Call to server to verify user in db
  const login = (user) => {
    return $q((resolve, reject) => {
      $http.post('/login', user)
      .then((data) => {
        if (data) {
          resolve(data);
        } else {
          reject(console.error);
        }
      })
    })//End promise
   }
  /////////////////////////////////////////
  

  /////////////////////////////////////////
  return { login };

});//End of CurrentUsernameFactory()
