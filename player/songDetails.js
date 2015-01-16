'use strict';

angular
  .module('app')
  .controller('SongDetailsController', SongDetailsController);

  SongDetailsController.$inject = ['$scope', 'song', 'PlayerService']

  function SongDetailsController($scope, song, PlayerService) {
    $scope.display = true;
    $scope.song = song;
    console.log(song);

    $scope.playSong = function(song) {
      PlayerService.playSong(song);
    }

    $scope.close = function() {
      $scope.display = false;
            close();
    }
  }