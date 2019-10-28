const firebase = require("nativescript-plugin-firebase");
var observableModule = require ('tns-core-modules/data/observable');
var ObservableArray = require ('tns-core-modules/data/observable-array').ObservableArray;
var appSettings = require("application-settings");

var page;

var pageData = new observableModule.fromObject({
    
  groceryList: new ObservableArray([
      {name: 'eggs',},
      {name: 'bread'}
  ])
})

  
  var user_id = appSettings.getString('user_id');
  //const bindingContext = fromObject(makeApptModel);
  
  exports.loaded = function (args) {
    page = args.object;
    page.bindingContext = pageData;
  };

  exports.makeAppt = () =>
  {
    firebase.push(
        '/appointments',
        {
          'date': page.getViewById("date").day+"-"+page.getViewById("date").month+"-"+page.getViewById("date").year,
          'time': page.getViewById("time").hour+":"+page.getViewById("time").minute,
          'stylist': bindingContext.get("stylist"),
          'customer': user_id
        }
    ).then(
        function (result) {
          console.log("created key: " + result.key);
        }
    );
  }

  function itemTap(args) {
    const index = args.index;
    alert(`ListView item tap ${index}`).then(() => {
        console.log("Dialog closed!");
    });
    
  
}
exports.itemTap = itemTap;