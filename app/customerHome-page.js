const frameModule = require("tns-core-modules/ui/frame");
var appSettings = require("application-settings");

  exports.goNewAppointment = () => {
    var topmost = frameModule.topmost();
    topmost.navigate("makeAppointment-page");
   
  };

  exports.goBookedAppointment = () => {
    var topmost = frameModule.topmost();
    topmost.navigate("upcomingAppointment-page");
   
  };

  exports.goAppointmentHistory = () => {
    var topmost = frameModule.topmost();
    topmost.navigate("appointmentHistory-page");
   
  };

  exports.goInfo = () => {
    var topmost = frameModule.topmost();
    topmost.navigate("customerDetails-page");
   
  };

  function outLog(args)
    {
      const button = args.object;
      const page=button.page;
      appSettings.clear;
      page.frame.navigate({moduleName: "login-page", clearHistory: true});
    }
    exports.logout = outLog;
 