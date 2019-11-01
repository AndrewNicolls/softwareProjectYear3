var frameModule = require("tns-core-modules/ui/frame");
const firebase = require("nativescript-plugin-firebase");
var { fromObject } = require("tns-core-modules/data/observable");
var appSettings = require("application-settings");
var dialogsModule = require("tns-core-modules/ui/dialogs");


var loginModel = {
  loginEmail: "",
  loginPassword: ""
}

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
        appSettings.setString('email',response.email);
        console.log("Email: "+appSettings.getString('email'));
        console.log("User uid: "+appSettings.getString('user_id'));
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



