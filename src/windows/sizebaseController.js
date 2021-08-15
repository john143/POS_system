//sizebaseController
const { initDb, getDateTime } = require('../config/initApp.js');
var db = initDb();
class sizeBase {
	constructor(brand) {  // Constructor

	}

	//Funtion to add size
	addSize(arg, callback) {
		var current_dt = getDateTime();
		console.log('size cont : ' + JSON.stringify(arg))
		var frm_data = arg;
		db.get("SELECT * FROM size_mast WHERE szname = '" + frm_data.size_name + "' ", function (err, row) {
			if (err) {
				console.log(err.message);
			}
			console.log('Error : ' + JSON.stringify(row))
			if (!row) {
				db.run("INSERT INTO size_mast (szname,is_active,uentdt) VALUES (?,?,?)", [frm_data.size_name, 1, current_dt], function (err) {
					if (err) {
						callback(err.message);
					}
					callback('1');
				})
				//callback('2');
			} else {
				
				callback('2');
			}


		})


	}
	//Funtion to all size list
	getSizes(arg, callback) {
		db.all("SELECT * FROM size_mast", function (err, row) {
			if (err) {
				//console.log('cont: ' + JSON.stringify(err));
				callback(err.message);
			}
			//console.log('cont: ' + JSON.stringify(row));
			callback(row);
		})
	}
	//Funtion to all size list
	getActiveSizes(arg, callback) {
		db.all("SELECT * FROM size_mast WHERE is_active=1", function (err, row) {
			if (err) {
				//console.log('cont: ' + JSON.stringify(err));
				callback(err.message);
			}
			//console.log('cont: ' + JSON.stringify(row));
			callback(row);
		})
	}
    //Funtion to update status
	sizeStatus(arg, callback) {
        if(arg.status == '1'){
            var up_status = 0;
        }else{
            var up_status = 1;
        }
        db.run(`UPDATE size_mast SET is_active = ? WHERE szid = ?`, [up_status, arg.unique], function (err) {
            if (err) {
                callback(err.message);
            }
            callback('1');
        })
			
		
	}
    //Funtion to add base
	addBase(arg, callback) {
		var current_dt = getDateTime();
		console.log('base cont : ' + JSON.stringify(arg))
		var frm_data = arg;
		db.get("SELECT * FROM base_mast WHERE bname = '" + frm_data.base_name + "' ", function (err, row) {
			if (err) {
				console.log(err.message);
			}
			console.log('Error : ' + JSON.stringify(row))
			if (!row) {
				db.run("INSERT INTO base_mast (bname,uentdt) VALUES (?,?)", [frm_data.base_name, current_dt], function (err) {
					if (err) {
						callback(err.message);
					}
					callback('1');
				})
				//callback('2');
			} else {
				
				callback('2');
			}


		})


	}
	//Funtion to all base list
	getBases(arg, callback) {
		db.all("SELECT * FROM base_mast", function (err, row) {
			if (err) {
				//console.log('cont: ' + JSON.stringify(err));
				callback(err.message);
			}
			//console.log('cont: ' + JSON.stringify(row));
			callback(row);
		})
	}
	//Funtion to all base list
	getActiveBases(arg, callback) {
		db.all("SELECT * FROM base_mast WHERE is_active=1", function (err, row) {
			if (err) {
				//console.log('cont: ' + JSON.stringify(err));
				callback(err.message);
			}
			//console.log('cont: ' + JSON.stringify(row));
			callback(row);
		})
	}
    //Funtion to update status
	baseStatus(arg, callback) {
        if(arg.status == '1'){
            var up_status = 0;
        }else{
            var up_status = 1;
        }
        db.run(`UPDATE base_mast SET is_active = ? WHERE bid = ?`, [up_status, arg.unique], function (err) {
            if (err) {
                callback(err.message);
            }
            callback('1');
        })
			
		
	}
	//Funtion to get getSizeBaseByCatId
	getSizeBaseByCatId(arg, callback) {
		db.all("SELECT * FROM size_base_data WHERE catid=?",[arg.catid], function (err, row) {
			if (err) {
				//console.log('cont: ' + JSON.stringify(err));
				callback(err.message);
			}
			//console.log('cont: ' + JSON.stringify(row));
			callback(row);
		})
	}
	
	
}

module.exports = sizeBase;