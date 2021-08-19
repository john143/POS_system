//Route
var users = require('./usersController.js');
var Category = require('./categoriesController.js');
var SizeBase = require('./sizebaseController.js');
var Topping = require('./toppingsController.js');
var Items = require('./itemsController.js');
module.exports = {
	  getRoute: (arg, callback) => {
			console.log('In Route: '+ JSON.stringify(arg));
			switch (arg.route) {
			  
			  case 'users': //usersController
					var usersObj = new users();
					if(arg.action == 'checkUser'){
						usersObj.checkUser(arg, function(back){
							callback(back);
						});
					}else if(arg.action == 'loginUser'){
						usersObj.loginUser(arg, function(back){
							callback(back);
						});
					}else if(arg.action == 'logoutMe'){
						usersObj.logoutMe(arg, function(back){
							callback(back);
						});
					}else if(arg.action == 'initView'){
						usersObj.initView(arg, function(back){
							callback(back);
						});
					}else if(arg.action == 'registerUser'){
						usersObj.registerUser(arg, function(back){
							callback(back);
						});
					}
				break;
			  case 'categories': //categoriesController
					var catObj = new Category();
					if(arg.action == 'addCategory'){
						catObj.addCategory(arg, function(back){
							callback(back);
						});
					}else if(arg.action == 'getCategories'){
						catObj.getCategories(arg, function(back){
							callback(back);
						});
					}else if(arg.action == 'getActiveCategories'){
						catObj.getActiveCategories(arg, function(back){
							callback(back);
						});
					}else if(arg.action == 'getCategoryToppings'){
						catObj.getCategoryToppings(arg, function(back){
							callback(back);
						});
					}else if(arg.action == 'deleteCategory'){
						catObj.deleteCategory(arg, function(back){
							callback(back);
						});
					}else if(arg.action == 'getCategoryById'){
						catObj.getCategoryById(arg, function(back){
							callback(back);
						});
					}else if(arg.action == 'updateCategory'){
						catObj.updateCategory(arg, function(back){
							callback(back);
						});
					}
				break;
			  case 'sizeBase':
					var catbaseObj = new SizeBase();
					if(arg.action == 'addSize'){
						catbaseObj.addSize(arg, function(back){
							callback(back);
						});
					}else if(arg.action == 'getSizes'){
						catbaseObj.getSizes(arg, function(back){
							callback(back);
						});
					}else if(arg.action == 'sizeStatus'){
						catbaseObj.sizeStatus(arg, function(back){
							callback(back);
						});
					}else if(arg.action == 'addBase'){
						catbaseObj.addBase(arg, function(back){
							callback(back);
						});
					}else if(arg.action == 'getBases'){
						catbaseObj.getBases(arg, function(back){
							callback(back);
						});
					}else if(arg.action == 'baseStatus'){
						catbaseObj.baseStatus(arg, function(back){
							callback(back);
						});
					}else if(arg.action == 'getActiveSizes'){
						catbaseObj.getActiveSizes(arg, function(back){
							callback(back);
						});
					}else if(arg.action == 'getActiveBases'){
						catbaseObj.getActiveBases(arg, function(back){
							callback(back);
						});
					}else if(arg.action == 'getSizeBaseByCatId'){
						catbaseObj.getSizeBaseByCatId(arg, function(back){
							callback(back);
						});
					}
				break;
			  case 'topping':
					var toppingObj = new Topping();
					if(arg.action == 'addTopping'){
						toppingObj.addTopping(arg, function(back){
							callback(back);
						});
					}else if(arg.action == 'updateTopping'){
						toppingObj.updateTopping(arg, function(back){
							callback(back);
						});
					}else if(arg.action == 'getToppings'){
						toppingObj.getToppings(arg, function(back){
							callback(back);
						});
					}else if(arg.action == 'getActiveToppings'){
						toppingObj.getActiveToppings(arg, function(back){
							callback(back);
						});
					}else if(arg.action == 'deleteTopping'){
						toppingObj.deleteTopping(arg, function(back){
							callback(back);
						});
					}else if(arg.action == 'getToppingById'){
						toppingObj.getToppingById(arg, function(back){
							callback(back);
						});
					}else if(arg.action == 'getToppingInfo'){
						toppingObj.getToppingInfo(arg, function(back){
							callback(back);
						});
					}
				break;
			  case 'items':
					var itemObj = new Items();
					if(arg.action == 'addItem'){
						itemObj.addItem(arg, function(back){
							callback(back);
						});
					}else if(arg.action == 'getItems'){
						itemObj.getItems(arg, function(back){
							callback(back);
						});
					}
				break;
			  case 6:
				day = "Saturday";
			}
			
	  },

	  getApi: () => {
		return getCurrentDateTime();
	  },
	  
	};
