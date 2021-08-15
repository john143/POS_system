//categoriesController
const { initDb, getDateTime } = require('../config/initApp.js');
var db = initDb();
class users {
	constructor(brand) {  // Constructor

	}

	//Funtion to add category
	addCategory(arg, callback) {
		var current_dt = getDateTime();
		//console.log('cat cont : ' + JSON.stringify(arg))
		var frm_data = arg;
		db.get("SELECT * FROM category_mast WHERE catname = '" + frm_data.cat_name + "' ", function (err, row) {
			if (err) {
				console.log(err.message);
			}
			
			if (!row) {
				//console.log('Error : ' + JSON.stringify(frm_data.size_base))
				var size_base = frm_data.size_base;
				db.run("INSERT INTO category_mast (catname,cotxt,extxt,is_active,uentdt) VALUES (?,?,?,?,?)", [frm_data.cat_name,frm_data.contain_idzs,frm_data.extra_idzs, frm_data.cat_status, current_dt], function (err) {
					if (err) {
						callback(err.message);
					}
					console.log('Error : ' + JSON.stringify(this))
					var cat_id = this.lastID;
					if(size_base.length != 0){
						console.log('if')
						size_base.map(SB=>{
							var size_id = SB.size;
							if(SB.base.base_idz){
								const base_arr = SB.base.base_idz.split(",");
								base_arr.map(one_base=>{
									db.run("INSERT INTO size_base_data (catid,szid,bid,uent_dt) VALUES (?,?,?,?)", [cat_id,size_id,one_base, current_dt], function (err) {
										if (err) {
											callback(err.message);
										}
										//callback('1');
									})
								})
								console.log(base_arr);
							}
						})
					}else{// default size & base
						console.log('else')
						db.run("INSERT INTO size_base_data (catid,szid,bid,uent_dt) VALUES (?,?,?,?)", [cat_id, 1,1, current_dt], function (err) {
							if (err) {
								callback(err.message);
							}
							//callback('1');
						})

					}
					callback('1');
				})

				

				/*db.run("INSERT INTO category_mast (catname,is_active,uentdt) VALUES (?,?,?)", [frm_data.cat_name, frm_data.cat_status, current_dt], function (err) {
					if (err) {
						callback(err.message);
					}
					callback('1');
				})*/
				//callback('2');
			} else {
				
				callback('2');
			}


		})


	}
	//Funtion to update category
	updateCategory(arg, callback) {
		var current_dt = getDateTime();
		console.log('cat cont : ' + JSON.stringify(arg))
		//callback('2');
		//return false;
		var frm_data = arg;
		db.get("SELECT * FROM category_mast WHERE catname = '" + frm_data.cat_name + "' AND catid != " + frm_data.cat_id + " ", function (err, row) {
			if (err) {
				console.log(err.message);
			}
			
			if (!row) {
				//console.log('Error : ' + JSON.stringify(frm_data.size_base))
				var size_base = frm_data.size_base;
				db.run("UPDATE category_mast SET catname=?, cotxt=?,extxt=?,is_active=? WHERE catid=?", [frm_data.cat_name,frm_data.contain_idzs,frm_data.extra_idzs, frm_data.cat_status, frm_data.cat_id], function (err) {
					if (err) {
						callback(err.message);
					}
					console.log('Error : ' + JSON.stringify(this))
					var cat_id = frm_data.cat_id;
					if(frm_data.update_sb == '1'){
						db.run(`DELETE FROM size_base_data WHERE catid=?`, cat_id, function(err) {
							if (err) {
							   console.error(err.message);
							  //callback('2');
							}
							//callback('1');
						  });

						if(size_base.length != 0){
							console.log('if')
							size_base.map(SB=>{
								var size_id = SB.size;
								if(SB.base.base_idz){
									const base_arr = SB.base.base_idz.split(",");
									base_arr.map(one_base=>{
										db.run("INSERT INTO size_base_data (catid,szid,bid,uent_dt) VALUES (?,?,?,?)", [cat_id,size_id,one_base, current_dt], function (err) {
											if (err) {
												callback(err.message);
											}
											//callback('1');
										})
									})
									console.log(base_arr);
								}
							})
						}else{// default size & base
							console.log('else')
							db.run("INSERT INTO size_base_data (catid,szid,bid,uent_dt) VALUES (?,?,?,?)", [cat_id, 1,1, current_dt], function (err) {
								if (err) {
									callback(err.message);
								}
								//callback('1');
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
	getCategories(arg, callback) {
		db.all("SELECT * FROM category_mast ORDER BY catname ASC", function (err, row) {
			if (err) {
				//console.log('cont: ' + JSON.stringify(err));
				callback(err.message);
			}
			//console.log('cont: ' + JSON.stringify(row));
			callback(row);
		})
	}
	//Funtion to all category list
	getActiveCategories(arg, callback) {
		db.all("SELECT * FROM category_mast WHERE is_active=1 ORDER BY catname ASC", function (err, row) {
			if (err) {
				//console.log('cont: ' + JSON.stringify(err));
				callback(err.message);
			}
			//console.log('cont: ' + JSON.stringify(row));
			callback(row);
		})
	}
	//Funtion to all category list
	getCategoryToppings(arg, callback) {

		db.get("SELECT * FROM category_mast WHERE catid = '" + arg.cat_id + "' ", function (err, row) {
			if (err) {
				console.log(err.message);
				callback(2);
			}
			//callback(row);
			db.all("SELECT * FROM topping_mast WHERE tid IN ("+row.cotxt+") ORDER BY tname ASC", function (err, row1) {
				if (err) {
					//console.log('cont: ' + JSON.stringify(err));
					callback(err.message);
				}
				//console.log('cont: ' + JSON.stringify(row));
				callback(row1);
			})


		})

		
	}
	//Funtion to deleteCategory
	deleteCategory(arg, callback) {
		db.run(`DELETE FROM category_mast WHERE catid=?`, arg.unique, function(err) {
			if (err) {
			  return console.error(err.message);
			  callback('2');
			}
			callback('1');
		  });
	}
	//Funtion to getCategoryById
	getCategoryById(arg, callback) {
		
		console.log('cat cont : ' + JSON.stringify(arg))
		var frm_data = arg;
		db.get("SELECT * FROM category_mast WHERE catid = '" + frm_data.unique + "' ", function (err, row) {
			if (err) {
				console.log(err.message);
				callback(2);
			}
			callback(row);


		})


	}
	
}

module.exports = users;