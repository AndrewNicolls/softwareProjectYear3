const firebase = require("nativescript-plugin-firebase");
var {LocalNotifications} = require("nativescript-local-notifications");
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
          var year=page.getViewById("date").year;
          var month=(page.getViewById("date").month)-1;
          var date=page.getViewById("date").day;
          var hours=(page.getViewById("time").hour);
          var minutes=page.getViewById("time").minute;
          console.log(year,month,date,hours,minutes);   
          LocalNotifications.schedule([{
          id: 1, // generated id if not set
          title: 'Appointment reminder',
          body: 'Your hair appointment is scheduled today in 4 hours',
          ticker: 'The ticker',
          badge: 1,
          ongoing: false, // makes the notification ongoing (Android only)
          image: "https://cdn-images-1.medium.com/max/1200/1*c3cQvYJrVezv_Az0CoDcbA.jpeg",
          thumbnail: true,
          channel: 'My Channel', // default: 'Channel'
          sound: "customsound-ios.wav", // falls back to the default sound on Android
          at: new Date(year,month,date,hours,minutes) 
    }]).then(
        function(scheduledIds) {
          console.log("Notification id(s) scheduled: " + JSON.stringify(scheduledIds));
        },
        function(error) {
          console.log("scheduling error: " + error);
        }
    )
        }
    );
  }