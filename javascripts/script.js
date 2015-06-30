
var app = angular.module("quotesApp", []);

app.controller("MainCtrl", function($scope, $http) {
  $http.get("/quotes").success(function(data) {
    $scope.quotes = data.quotes;
  });

  $scope.addQuote = function() {
    $http.post("/quotes", { quote: $scope.newQuote}).success(function(data) {
      console.log(data);
      $scope.quotes.push(data.quote);
      $scope.newQuote = "";
    }).catch(function(err){
      $scope.formError = err.data.error;
    });
  };

  $scope.deleteQuote = function(){
    console.log('HelloooO!');
  };
});
