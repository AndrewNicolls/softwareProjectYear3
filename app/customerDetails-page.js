const frameModule = require("tns-core-modules/ui/frame");
const firebase = require("nativescript-plugin-firebase");
var {fromObject} = require('tns-core-modules/data/observable');
var appSettings = require("application-settings");


const custDetailmodel = {
    firstName: "",
    lastname: "",
    address: "",
    contactNum: ""
  }
  
  const bindingContext = fromObject(custDetailmodel);
  
  exports.loaded = args => {
    const page = args.object;
    
    page.bindingContext = bindingContext;

    var onQueryEvent = function(result) {
      // note that the query returns 1 match at a time
      // in the order specified in the query
      if (!result.error) {
          console.log("Event type: " + result.type);
          console.log("Key: " + result.key);
          console.log("Value: " + JSON.stringify(result.value)); // a JSON object
          console.log("Children: " + JSON.stringify(result.children)); // an array, added in plugin v 8.0.0
          console.log(""+JSON.stringify(result.value.address)); 
          console.log(""+JSON.stringify(result.value.contactNum));    
          console.log(""+JSON.stringify(result.value.firstname)); 
          console.log(""+JSON.stringify(result.value.lastname));
          bindingContext.set("firstname",result.value.firstname); 
          bindingContext.set("lastname",result.value.lastname);  
          bindingContext.set("address",result.value.address);  
          bindingContext.set("contactNum",result.value.contactNum);   
      }
  };

 firebase.query(
    onQueryEvent,
    "/users/"+appSettings.getString('user_id'),
   {
        
        singleEvent: true,
        orderBy: {
            type: firebase.QueryOrderByType.CHILD,
            value: 'firstname' // mandatory when type is 'child'
        },
       
        range: [
          {
              type: firebase.QueryRangeType.EQUAL_TO,
              value: ''
          },
        ],
        // only the first 2 matches
        // (note that there's only 1 in this case anyway)
        limit: {
            type: firebase.QueryLimitType.LAST,
            value: 6
        }
   }
);
  };


  exports.onTap = () => {

    firebase.update(
      '/users/'+appSettings.getString('user_id'),
      {
        firstname: bindingContext.get("firstname"),
        lastname: bindingContext.get("lastname"),
        address: bindingContext.get("address"),
        contactNum: bindingContext.get("contactNum")
      }
    );
    }

    exports.goChangeEmail = () =>{
      var topmost = frameModule.topmost();
      topmost.navigate("changeEmail-page");
    }