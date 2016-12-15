app.controller('appController', ['$scope', '$http', function($scope, $http) {
  $scope.songList = [];

  $scope.playSong = function(id) {
    $http({
      method: 'GET',
      url: '/play_by_id?id='+id

    }).then(function successCallback(response) {
      console.log(response);
      $scope.init();
    }, function errorCallback(response) {
      console.log(response);
    });
  };

  $scope.stopSong = function(id) {
    $http({
      method: 'GET',
      url: '/stop_by_id?id='+id

    }).then(function successCallback(response) {
      console.log(response);
      $scope.init();
    }, function errorCallback(response) {
      console.log(response);
    });
  };

  $scope.init = function() {
    $http({
      method: 'GET',
      url: '/all'

    }).then(function successCallback(response) {
      console.log('success get songs list');
      response.data.map(function(song) {
        if(song.play){
          song.border = '#5cb85c';
        } else {
          song.border = '#d9534f';
        }
      })
      $scope.songList = response.data;
    }, function errorCallback(response) {
      console.log('play error');
    });
  }
}]);
