(function(){

  angular
    .module('app.dataservice')
    .factory('stripeService', stripeService)

  stripeService.$inject = [];

  function stripeService(){

    return {
      sendTokenToServer: sendTokenToServer
    };

    ///////////////////////////////////////

    function sendTokenToServer(){
      console.log('in stripeservice');
    }

  }

})();
