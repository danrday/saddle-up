'use strict';

app.factory('AuthFactory', function($http, $q) {

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
  };//End login()


  //Post to '/logout' server route
  const logout = () => {
      $http.post('/logout').then(console.log("Logged out"));
  };//End logout()
  /////////////////////////////////////////


  /////////////////////////////////////////
  return { login, logout };

});//End of CurrentUsernameFactory()
