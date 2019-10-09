var frameModule = require("tns-core-modules/ui/frame");
const firebase = require("nativescript-plugin-firebase");
const { fromObject } = require("tns-core-modules/data/observable");
var appSettings = require("application-settings");


const loginModel = {
  loginEmail: "",
  loginPassword: "",
  userType: ""
}

const bindingContext = fromObject(loginModel);

exports.loaded = args => {
  //userType=appSettings.getString("userType", "admin");

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
  alert(`${bindingContext.get('loginEmail')} and ${bindingContext.get('loginPassword')}`);

  return firebase.login(
    {
      type: firebase.LoginType.PASSWORD,
      passwordOptions: {
        email: bindingContext.get("loginEmail"),
        password: bindingContext.get("loginPassword")
      }
    })
    .then(result => JSON.stringify(result))
    .then(
      function()
      {
        var topmost = frameModule.topmost();
        topmost.navigate("customerHome-page");
      }
    )
    .catch(error => console.log(error));
  
};


exports.logoutPressed = () => {
  firebase.logout();
  alert("log out");
};



