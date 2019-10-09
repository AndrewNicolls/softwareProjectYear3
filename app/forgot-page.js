const firebase = require("nativescript-plugin-firebase");
const { fromObject } = require("tns-core-modules/data/observable");



const forgotModel = {
    email: ""
  }

const bindingContext = fromObject(forgotModel);

exports.loaded = args => {
    const page = args.object;
  
    page.bindingContext = bindingContext;
  };

exports.emailReset= () =>
{
    alert(`${bindingContext.get('email')}`)
    firebase.sendPasswordResetEmail(bindingContext.get('email'))
    .then(() => console.log("Password reset email sent"))
    .catch(error => console.log("Error sending password reset email: " + error));
}