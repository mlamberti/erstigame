{function{}
var app= angular.module('erstigame', ['ionic']);
app.controller('erstigameCtrl',function($scope){
 $scope.subgroup = [
  {
   title=Team 1
   teamid=1
   }
  {
   title=Team 2
   teamid=2
   }
  {
   title=Team 3
   teamid=3
   }

 

 ]; 

});

app.run(function($ionicPlatform){
  $ionicPlatform.ready(function(){
  if(window.cordova && window.cordowa.plugins.Keyboard) {cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
  }
  if (windows.StatusBar) {
    StatusBar.styleDefault();
  }


  });  



});
}