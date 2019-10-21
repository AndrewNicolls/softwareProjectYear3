var frameModule = require("tns-core-modules/ui/frame");
const firebase = require("nativescript-plugin-firebase");
var { fromObject } = require("tns-core-modules/data/observable");
var appSettings = require("application-settings");
var dialogsModule = require("tns-core-modules/ui/dialogs");


var loginModel = {
  loginEmail: "",
  loginPassword: ""
}

user_type=appSettings.getString('user_type');
var bindingContext = fromObject(loginModel);

exports.loaded = args => {
  const page = args.object;

  page.bindingContext = bindingContext;
};


exports.registerPressed = () => {
  var topmost = frameModule.topmost();
  topmost.navigate("register-page");
};

exports.forgotPassword = () => {
  var topmost = frameModule.topmost();
  topmost.navigate("forgot-page");
};


exports.loginPressed = () => {
  //alert(`${bindingContext.get('loginEmail')} and ${bindingContext.get('loginPassword')}`);

  return firebase.login(
    {
      type: firebase.LoginType.PASSWORD,
      passwordOptions: {
        email: bindingContext.get("loginEmail"),
        password: bindingContext.get("loginPassword")
      }
    })
    .then(
      function(response)
      {
        appSettings.setString('user_id',response.uid);
        var user_id = appSettings.getString('user_id');
        
        console.log("User uid:"+user_id);
      }
      
      )
    .then(
      function()
      {
        var topmost = frameModule.topmost();
        topmost.navigate("customerHome-page");
      }
    )
    .catch(error => dialogsModule.alert({
      message: "Unfortunately we could not find your account",
      okButtonText: "OK"
    }));
  
};


exports.logoutPressed = () => {
  firebase.logout();
  alert("log out");
};



