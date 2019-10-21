const firebase = require("nativescript-plugin-firebase");
var frameModule = require("tns-core-modules/ui/frame");
const { fromObject } = require("tns-core-modules/data/observable");

const regmodel = {
  email: "",
  password: ""
}

const bindingContext = fromObject(regmodel);

exports.loaded = args => {
  const page = args.object;

  page.bindingContext = bindingContext;
};

exports.completeReg = () => {
  alert(`${bindingContext.get('email')} and ${bindingContext.get('password')}`);


  firebase.createUser({
    email: bindingContext.get('email'),
    password: bindingContext.get('password')
  }).then(
      function (user) {
        console.log({
          title: "User created",
          message: "email: " + user.email
        })
      },
      function (errorMessage) {
        console.log({
          title: "No user created",
          message: errorMessage
        })
      }
  );
  var topmost = frameModule.topmost();
  topmost.navigate("login-page");
}