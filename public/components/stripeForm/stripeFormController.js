(function(){

  angular
    .module("app.stripeForm", [])
    .controller('stripeController', stripeController);

  stripeController.$inject = ['$scope', '$http', 'stripeService'];

  // the directive angular-payments doesn't work with controllerAs syntax
  // so I injected $scope to use the angular payment method
  function stripeController($scope, stripeService){

    $scope.sendToken = sendToken;

    ////////////////////////////////////////

    function sendToken(code, result){
      if(result.error){
        console.log('it failed! error: ' + result.error.message);
      }else{
        console.log('success! token: ' + result.id);
        console.log("StripeService === ", stripeService);
        console.log("sendTokenToServer ===", stripeService.sendTokenToServer);
        stripeService.sendTokenToServer();
      }

    }

  }

})();