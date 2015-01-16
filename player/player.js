'use strict';

angular
  .module('app.player', [])
  .controller('PlayerController', PlayerController);

  PlayerController.$inject = ['$scope', 'PlayerService'];

  function PlayerController($scope, PlayerService) {
    var vm = this;
    vm.player = null;

    vm.currentSong = {};

    vm.showYoutubePlayer = false;

    vm.play = function() {
      PlayerService.play();
    }

    vm.pause = function() {
      PlayerService.pause();
    }

    $scope.$watch(function() {
      return PlayerService.currentSong;
    }, function(newVal, oldVal) {
      vm.currentSong = newVal;
    });

    $scope.$watch(function() {
      return PlayerService.showYoutubePlayer;
    }, function(newVal, oldVal) {
      vm.showYoutubePlayer = newVal;
    });

    $scope.$watch(function() {
      return PlayerService.player;
    }, function(newVal, oldVal) {
      vm.player = newVal;
    });

    vm.playNext = function() {
      console.log("NEXT!");
      PlayerService.playNext();
    }

    vm.playPrevious = function() {
      PlayerService.playPrevious();
    }

  }