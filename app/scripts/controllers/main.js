'use strict';

/**
 * @ngdoc function
 * @name angulardemoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angulardemoApp
 */
angular.module('angulardemoApp')
  .controller('MainCtrl', function ($scope, $stateParams, $firebaseObject) {
    $scope.friend = $stateParams.friend;

    //Bind the firebase location of our Friend
    var FBFriendOwesRef = new Firebase('https://jordansdemo.firebaseio.com/items/' + $scope.friend + "/owes");
    var FBFriendOwesObj = $firebaseObject(FBFriendOwesRef);
    FBFriendOwesObj.$bindTo($scope, "itemsFriendOwes");

    //TODO
    //Bind the firebase location of the user         NOTE: change the "Jordan" here to the app user
    var FBUserOwesRef = new Firebase('https://jordansdemo.firebaseio.com/items/' + 'Jordan' + "/owes");
    var FBUserOwesObj = $firebaseObject(FBUserOwesRef);
    FBUserOwesObj.$bindTo($scope, "itemsUserOwes");

    $scope.updateQuantity = function (key, qty, addingItemsUserOwes) {
      if (addingItemsUserOwes) {
        var FBUserOwesItem = FBUserOwesRef.child(key);
        FBUserOwesItem.update({qty: qty});
      }
      else {
        var FBFriendOwesItem = FBFriendOwesRef.child(key);
        FBFriendOwesItem.update({qty: qty});
      }
    };

    $scope.removeItem = function (key, removingItemsUserOwes)  {
      if (removingItemsUserOwes) {
        var FBUserItem = FBUserOwesRef.child(key);
        FBUserItem.remove();
      }
      else {
        var FBFriendItem = FBFriendOwesRef.child(key);
        FBFriendItem.remove();
      }
    };

    $scope.addItem = function(qty, item, user, addingItemsUserOwes)  {
      if (addingItemsUserOwes) {
        var FBUsernewref = FBUserOwesRef.push();
        FBUsernewref.set({name: item, qty: qty, to: user});
      }
      else {
        var FBnewref = FBFriendOwesRef.push();
        FBnewref.set({name: item, qty: qty, to: 'Jordan'});
      }
    };
  });
