const firebase = require("nativescript-plugin-firebase");
var ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
var appSettings = require("application-settings");

function indexOf(item) {
    var match = -1;
    this.forEach(function(loopItem, index) {
      if (loopItem.id === item.key) {
        match = index;
      }
    });
    return match;
  }

function GroceryListViewModel(items){
    var viewModel = new ObservableArray(items);
    viewModel.indexOf = indexOf;
  
    viewModel.load = function() {
  
      var onChildEvent = function(result) {
        var matches = [];
  
        if (result.type === "ChildAdded") {
          if (result.value.customer === appSettings.getString('user_id')) {
            viewModel.push({
              name: result.value.appointment,
              appointmentid: result.key
            });
          }
        } else if (result.type === "ChildRemoved") {
          matches.push(result);
          matches.forEach(function(match) {
            var index = viewModel.indexOf(match);
            viewModel.splice(index, 1);
          });
        }
  
      };
  
      return firebase.addChildEventListener(onChildEvent, "/appointments").then(
        function() {
          console.log("firebase.addChildEventListener added");
        },
        function(error) {
          console.log("firebase.addChildEventListener error: " + error);
        }
      )
    }

    viewModel.empty = function()
    {
        while (viewModel.length)
        {
            viewModel.pop();
        }
    }

      viewModel.delete = function(index) {
        var id = viewModel.getItem(index).appointmentid;
        console.log(""+id);
        return firebase.remove("/appointments/"+id+"");
      };

    return viewModel;
}

module.exports = GroceryListViewModel;
