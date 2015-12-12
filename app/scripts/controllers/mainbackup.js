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
    $scope.user = $stateParams.user;

    //Bind the firebase location of our Friend
    var FBFriendOwesRef = new Firebase('https://jordansdemo.firebaseio.com/items/' + $scope.user + "/owes");
    var FBFriendOwesObj = $firebaseObject(FBFriendOwesRef);
    FBFriendOwesObj.$bindTo($scope, "itemsFriendOwes");
    var FBFriendOwedRef = new Firebase('https://jordansdemo.firebaseio.com/items/' + $scope.user + "/owed");
    var FBFriendOwedObj = $firebaseObject(FBFriendOwedRef);
    FBFriendOwedObj.$bindTo($scope, "itemsFriendIsOwed");

    //Bind the firebase location of the user         NOTE: change the "Jordan" here to the app user
    var FBUserOwesRef = new Firebase('https://jordansdemo.firebaseio.com/items/' + 'Jordan' + "/owes");
    var FBUserOwesObj = $firebaseObject(FBUserOwesRef);
    FBUserOwesObj.$bindTo($scope, "itemsUserOwes");
    var FBUserOwedRef = new Firebase('https://jordansdemo.firebaseio.com/items/' + 'Jordan' + "/owed");
    var FBUserOwedObj = $firebaseObject(FBUserOwedRef);
    FBUserOwedObj.$bindTo($scope, "itemsUserIsOwed");

    $scope.updateQuantity = function (key, qty, addingItemsUserOwes) {
      if (addingItemsUserOwes) {
        var FBUserOwesItem = FBUserOwesRef.child(key);
        FBUserOwesItem.update({qty: qty});
        var FBFriendOwedItem = FBFriendOwedRef.child(key);
        console.log(FBFriendOwedItem);
        FBFriendOwedItem.update({qty: qty});
      }
      else {
        var FBFriendItem = FBFriendRef.child(key);
        FBFriendItem.update({qty: qty});
      }
    };

    $scope.removeItem = function(key, removingItemsOwed)  {
      if (removingItemsOwed) {
        var FBUserItem = FBUserRef.child(key);
        FBUserItem.update({qty: qty});
      }
      else {
        var FBFriendItem = FBFriendRef.child(key);
        FBFriendItem.remove();
      }
    };

    $scope.addItem = function(qty, item)  {
      var FBnewref = FBFriendRef.push();
      FBnewref.set({name: item, qty: qty, to: 'Jordan'});
    };
  });
