angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $http, $ionicLoading, $ionicPopup) {

    $scope.loginData = {};

    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      $ionicLoading.show({
        template: 'loading...'
      });
      // $http.jsonp("http://192.168.0.80/DomoGandres/public/index.php/login?" + "&callback=JSON_CALLBACK&email=" + $scope.loginData.username + "&password=" + $scope.loginData.password)
      $http.jsonp("https://badpoint.me/index.php/login-volet?&callback=JSON_CALLBACK&email=" + $scope.loginData.username + "&password=" + $scope.loginData.password)

        .success(function (data) {
          // localStorage.setItem("token", data.token);
          $ionicLoading.hide();
          localStorage.setItem("token", data);
        }).error(function (data) {
          $ionicLoading.hide();
          $ionicPopup.alert({
            // template: '<input type="password" ng-model="data.wifi">',
            title: 'Erreur',
            template: 'La requête n\'a pas aboutit',
            // subTitle: 'Please use normal things',
            buttons: [
              { text: 'Cancel' }]
          });


        });
      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };
  })
  .controller('AutoCtrl', function ($scope, $ionicScrollDelegate, $window) {
    $scope.scrollvalue = 0.01;
    var width = $window.innerWidth;
    var height = $window.innerHeight;
    //console.log(100/(height*0.9-20));
    $scope.ondrag = function(event){
      $scope.scrollvalue = (event.gesture.center.pageY-60)*(120/(height*0.9-20));
      //console.log($scope.scrollvalue);
    }
    $scope.onDragDown = function (event) {
      $scope.scrollvalue+=0.3;
      //console.log("scrolldown");
      if($scope.scrollvalue > 100){
        $scope.scrollvalue = 100;
      }
    }

    $scope.onDragUp = function () {
      $scope.scrollvalue-=0.3;
      if($scope.scrollvalue < 0.02){
        $scope.scrollvalue = 0.01;
      }
    }
  })
  .controller('VoletCtrl', function ($http, $scope, $ionicLoading, $ionicPopup) {
    var url = "https://badpoint.me/index.php";
    // var url ="http://192.168.0.80/DomoGandres/public/index.php";
    $scope.ouvrir = function () {
      doRequest("ouvrir");

    }

    $scope.stop = function () {
      // $http.jsonp(url + "/stop?callback=JSON_CALLBACK&token=" + localStorage.getItem("token"));
      doRequest("stop");
    }

    $scope.fermer = function () {
      // $http.jsonp(url + "/fermer?callback=JSON_CALLBACK&token=" + localStorage.getItem("token"));
      doRequest("fermer");
    }

    var doRequest = function (action) {
      $ionicLoading.show({
        template: 'loading...'
      });
      // $http.jsonp("http://192.168.0.80/DomoGandres/public/index.php/ouvrir?callback=JSON_CALLBACK&token="+localStorage.getItem("token"));
      $http.jsonp(url + "/" + action + "?callback=JSON_CALLBACK&token=" + localStorage.getItem("token"))
        .success(function (data) {
          // $scope.playerinfo = data.Retour;//.PlayerInformation[0].PER_NOM

          $ionicLoading.hide();
          // .then(function () {
          //   console.log("The loading indicator is now hidden");
          // });

        })
        .error(function () {
          $ionicPopup.alert({
            // template: '<input type="password" ng-model="data.wifi">',
            title: 'Erreur',
            template: 'La requête n\'a pas aboutit',
            // subTitle: 'Please use normal things',
            buttons: [
              { text: 'Cancel' }]
          });
          $ionicLoading.hide();
        });
    }
  })

  ;
