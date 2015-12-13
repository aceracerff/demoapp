angular.module('angulardemoApp')
.service('Auth', function($firebaseAuth, User) {
  this.fromGoogle = function(){
        console.log("attempting to authenticate user via Google+ API...");

        var authRef = new Firebase("https://jordansdemo.firebaseio.com");
        var auth = $firebaseAuth(authRef);

        auth.$authWithOAuthPopup("google", { scope: 'email' }).then(function(authData) {
          User.set(authData.google.email, authData.google.displayName, authData.google.profileImageURL);
        }).catch(function(error) {
          console.error("Authentication failed:", error);
        });
    }
})
.service('User', function($rootScope){
  var _email = null;
  var _name = null;
  var _profileImage = null;
  this.set = function(email, name, profileImage){
    console.log("Setting user data in user Service");
    _email = email;
    _name = name;
    _profileImage = profileImage;
    $rootScope.$broadcast('AUTHED-USER-DATA-READY');
  };
  this.get = function(){
    console.log("returning fetched user data");
    return {email: _email, name: _name, profileImage: _profileImage};
  };
});
