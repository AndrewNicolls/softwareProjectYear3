var observableModule = require("tns-core-modules/data/observable");
const firebase = require("nativescript-plugin-firebase");
var ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
var GroceryListViewModel = require ('./grocery-list-view-model');
var appSettings = require("application-settings");

var page;
var user_id = appSettings.getString('user_id');

var groceryList = new GroceryListViewModel([]);
var pageData = observableModule.fromObject({
  groceryList: groceryList
})

exports.loaded = function (args) {
    page = args.object;
    page.bindingContext = pageData;
    groceryList.empty();
    groceryList.load();
  };

  exports.delete = function(args) {
    var item = args.view.bindingContext;
    var index = groceryList.indexOf(item);
    groceryList.delete(index);
};