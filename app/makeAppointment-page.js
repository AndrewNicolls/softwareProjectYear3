const firebase = require("nativescript-plugin-firebase");
var observableModule = require ('tns-core-modules/data/observable');
var appSettings = require("application-settings");
var page;

  
  
  exports.loaded = function (args) {
    page = args.object;
  };

  exports.makeAppt = () =>
  {
    var user_id = appSettings.getString('user_id');
    firebase.push(
        '/appointments',
        {
          'date': page.getViewById("date").day+"-"+page.getViewById("date").month+"-"+page.getViewById("date").year,
          'time': page.getViewById("time").hour+":"+page.getViewById("time").minute,
          'appointment':page.getViewById("date").day+"-"+page.getViewById("date").month+"-"+page.getViewById("date").year+" "+page.getViewById("time").hour+":"+page.getViewById("time").minute ,
          'customer': user_id
        }
    ).then(
        function (result) {
          console.log("created key: " + result.key);
        }
    );
  }