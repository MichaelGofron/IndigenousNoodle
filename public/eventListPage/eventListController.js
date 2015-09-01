(function() {
  angular.module('eventList', [])
    .controller('eventListController', eventListController)

    eventListController.$inject = ['$state', 'getEventList', 'sendEvent'];

    function eventListController(getEventList, $state, sendEvent) {
      var vm = this;
      vm.getEventList = getEventList.data;

      vm.displayEvents = displayEvents;
      vm.toEventDetail = toEventDetail;

      //////////////////////////////////

      function displayEvents() {
        $state.go('eventList', {city: vm.findCity});
      }

      function toEventDetail(hostEvent){
        // must pass the event and host data to the next screen
        console.log("event === ", hostEvent);
        sendEvent.setCurrentEvent(hostEvent);
        $state.go('eventDetail');
      }
    }
})();