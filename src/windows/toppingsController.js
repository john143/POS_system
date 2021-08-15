//toppingsController
const { initDb, getDateTime } = require('../config/initApp.js');
var db = initDb();
class users {
	constructor(brand) {  // Constructor

	}

	//Funtion to add addTopping
	addTopping(arg, callback) {
		var current_dt = getDateTime();
		console.log('cat cont : ' + JSON.stringify(arg))
		var frm_data = arg;
		db.get("SELECT * FROM topping_mast WHERE tname = '" + frm_data.topp_name + "' ", function (err, row) {
			if (err) {
				console.log(err.message);
			}
			if (!row) {
				console.log('Error : ' + JSON.stringify(row))
				
				db.run("INSERT INTO topping_mast (tname,is_active,uentdt) VALUES (?,?,?)", [frm_data.topp_name, frm_data.topp_status, current_dt], function (err) {
					if (err) {
						callback(err.message);
					}
					var topp_id = this.lastID;
					var frm_size_price = frm_data.size_price;
					if(frm_size_price.length != 0){
						console.log('if')
						frm_size_price.map(SB=>{
							var size_id = SB.size;
							var p_plus = SB.p_plus;
							var p_double = SB.p_double;
							var p_h_plus = SB.p_h_plus;
							var p_h_double = SB.p_h_double;
							db.run("INSERT INTO topping_info (topp_id,szid,p_plus,p_double,p_h_plus,p_h_double,created_at) VALUES (?,?,?,?,?,?,?)", [topp_id,size_id,p_plus,p_double,p_h_plus,p_h_double, current_dt], function (err) {
								if (err) {
									callback(err.message);
								}
								//callback('1');
							})
							
							
						})
					}
					
					callback('1');
				})

			} else {
				
				callback('2');
			}
		})
	}

	//Funtion to add updateTopping
	updateTopping(arg, callback) {
		var current_dt = getDateTime();
		console.log('cat cont : ' + JSON.stringify(arg))
		var frm_data = arg;
		var topp_id = frm_data.unique;
		db.get("SELECT * FROM topping_mast WHERE tname = '" + frm_data.topp_name + "' AND tid != '" + topp_id + "' ", function (err, row) {
			if (err) {
				console.log(err.message);
			}
			if (!row) {
				console.log('Up Error : ' + JSON.stringify(row))
				
				db.run("UPDATE topping_mast SET tname=?,is_active=? WHERE tid=?", [frm_data.topp_name, frm_data.topp_status, topp_id], function (err) {
					if (err) {
						callback(err.message);
					}
					
					var frm_size_price = frm_data.size_price;
					if(frm_data.upflag == '1'){
						db.run(`DELETE FROM topping_info WHERE topp_id=?`, [topp_id], function(err) {
							if (err) {
							   console.error(err.message);
							  //callback('2');
							}
							console.log('In delete action');
							//callback('1');
						  });
						if(frm_size_price.length != 0){
							console.log('if')
							frm_size_price.map(SB=>{
								var size_id = SB.size;
								var p_plus = SB.p_plus;
								var p_double = SB.p_double;
								var p_h_plus = SB.p_h_plus;
								var p_h_double = SB.p_h_double;
								db.run("INSERT INTO topping_info (topp_id,szid,p_plus,p_double,p_h_plus,p_h_double,created_at) VALUES (?,?,?,?,?,?,?)", [topp_id,size_id,p_plus,p_double,p_h_plus,p_h_double, current_dt], function (err) {
									if (err) {
										callback(err.message);
									}
									//callback('1');
								})
								
								
							})
						}
					}
					
					callback('1');
				})

			} else {
				
				callback('2');
			}
		})
	}
	
	//Funtion to all category list
	getToppings(arg, callback) {
		db.all("SELECT * FROM topping_mast ORDER BY tname ASC", function (err, row) {
			if (err) {
				//console.log('cont: ' + JSON.stringify(err));
				callback(err.message);
			}
			//console.log('cont: ' + JSON.stringify(row));
			callback(row);
		})
	}
	//Funtion to all Active toppings
	getActiveToppings(arg, callback) {
		db.all("SELECT * FROM topping_mast WHERE is_active=1 ORDER BY tname ASC", function (err, row) {
			if (err) {
				//console.log('cont: ' + JSON.stringify(err));
				callback(err.message);
			}
			//console.log('cont: ' + JSON.stringify(row));
			callback(row);
		})
	}
	//Funtion to deleteCategory
	deleteTopping(arg, callback) {
		db.run(`DELETE FROM topping_mast WHERE tid=?`, arg.unique, function(err) {
			if (err) {
			  return console.error(err.message);
			  callback('2');
			}
			callback('1');
		  });
	}
	//Funtion to getCategoryById
	getToppingById(arg, callback) {
		
		console.log('cat cont : ' + JSON.stringify(arg))
		var frm_data = arg;
		db.get("SELECT * FROM topping_mast WHERE tid = '" + frm_data.unique + "' ", function (err, row) {
			if (err) {
				console.log(err.message);
				callback(2);
			}
			callback(row);


		})


	}
	//Funtion to all category list
	getToppingInfo(arg, callback) {
		db.all("SELECT * FROM topping_info WHERE topp_id=?",[arg.toppid], function (err, row) {
			if (err) {
				//console.log('cont: ' + JSON.stringify(err));
				callback(err.message);
			}
			console.log('cont: ' + JSON.stringify(row));
			callback(row);
		})
	}
	
}

module.exports = users;