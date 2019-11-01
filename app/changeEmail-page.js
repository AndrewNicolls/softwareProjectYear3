const firebase = require("nativescript-plugin-firebase");
var { fromObject } = require("tns-core-modules/data/observable");
var appSettings = require("application-settings");
var dialogsModule = require("tns-core-modules/ui/dialogs");

var changeEmailModel = {
  oldEmail: "",
  newEmail: ""
}

var bindingContext = fromObject(changeEmailModel);

exports.loaded = args => {
  const page = args.object;

  page.bindingContext = bindingContext;
};

exports.changeEmail = () =>{
    if(bindingContext.get("newEmail") !=appSettings.getString('email'))
    {
        dialogsModule.alert(
            {
                message: "Old email does not match the email connected to the logged in account",
                okButtonText: "OK"
            }
        )
    }
    else{
        firebase.updateEmail(bindingContext.get("newEmail"))
      .then(() => console.log("Email updated"))
      .catch(error => console.log("Error updating email: " + error));
    }
}