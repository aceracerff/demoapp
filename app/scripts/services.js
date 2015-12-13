angular.module('angularDemoApp', [])
.service('Auth', function($firebaseObject, $firebaseAuth, User) {
  this.fromGoogle = function(){
        console.log("attempting to authenticate user...");
        if(!User.email){
          console.log("no user email found - authenticating via Google+ API ")
          var ref = new Firebase('https://jordansdemo.firebaseio.com/users');
          var obj = $firebaseObject(ref);

          var authRef = new Firebase("https://jordansdemo.firebaseio.com");
          var auth = $firebaseAuth(authRef);

          auth.$authWithOAuthPopup("google", { scope: 'email' }).then(function(authData) {
            User.set(authData.google.email, authData.google.displayname, authData.google.profileImageURL);
            var userEmail = authData.google.email;
            var userName = authData.google.displayName;
            var userImage = authData.google.profileImageURL;

            obj.$loaded().then(function() {
              $scope.users = obj;
              var userExists = false;
              $scope.users.forEach(function(user) {
                if (user.email == userEmail) userExists = true;
              });
              console.log("user exists:" + userExists);
              if (!userExists) {
                var FBnewref = ref.push();
                FBnewref.set({name: userName, email: userEmail, imageURL: userImage});
              }
            });

          }).catch(function(error) {
            console.error("Authentication failed:", error);
          });
        }
    }
})
.service('User', function(Auth){
  var _email = null;
  var _name = null;
  var _profileImage = null;
  this.set = function(email, name, profileImage){
    console.log("Setting user data in user Service");
    _email = email;
    _name = name;
    _profileImage = profileImage;
  };
  this.get = function(){
    //for simplicity sake, assume no email means we're not signed in
    if(!_email){
      console.log("attempting to fetch user data before authed. attempting to authenticate...");
      Auth.fromGoogle();
    }
    console.log("returning fetched user data");
    return {email: _email, name: _name, profileImage: _profileImage};

  };
});
