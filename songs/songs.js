'use strict';

angular
  .module('app.songs', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'songs/songs.html',
      controller: 'SongsController',
      controllerAs: 'vm'
    })
  }])
  .controller('SongsController', SongsController);

  SongsController.$inject = ['$scope', '$http', 'PlayerService', 'DetailsService', 'ModalService'];

  function SongsController($scope, $http, PlayerService, DetailsService, ModalService) {
    console.log("Songs Controller!");
    var vm = this;
    initializeYouTubePlayer();
    vm.songs = [];
    vm.showingDetails = false;
    vm.details = null;
    vm.player = null;

    vm.playSong = function(song) {
      PlayerService.playSong(song);
    }

    vm.showDetails = function(song) {
      vm.details = song;
      // vm.showingDetails = true;
      ModalService.showModal({
        templateUrl: "songs/details.html",
        controller: "SongDetailsController",
        inputs: {
          song: song
        }
      }).then(function(modal) {
        modal.element.show();
      })
    }

    vm.hideDetails = function() {
      vm.showingDetails = false;
      console.log("Hide");
    }

    vm.isReleased = function(song) {
      var today = moment()
      var releaseDate = moment(song.releaseDate);

      if (releaseDate.isBefore(today)) {
        return "Released";
      } else {
        return "Unreleased";
      }
    }

    $scope.$watch(function() {
      return DetailsService.showingDetails;
    }, function(newVal, oldVal) {
      vm.showingDetails = newVal;
    });

    $scope.$watch(function() {
      return PlayerService.player;
    }, function(newVal, oldVal) {
      vm.player = newVal;
    });

    $http.get('json/2014.json')
      .success(function(data) {
        console.log(data);
        vm.songs = data;
        PlayerService.loadPlaylist(vm.songs);
      });

    function initializeYouTubePlayer() {
      console.log("Initializing YouTube Player");

    }

    $scope.display = true;

    $scope.close = function() {
      $scope.display = false;
            close();
    }
  }