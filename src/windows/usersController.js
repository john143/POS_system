//ItemsController
const {machineId, machineIdSync} = require('node-machine-id');
const { initDb, getDateTime } = require('../config/initApp.js');
var db = initDb();
class users {
	constructor(brand) {  // Constructor

	}

	//Funtion to registerUser bussiness
	checkUser(arg, callback) {
		var current_dt = getDateTime();
		console.log('u_name: ' + arg);
		var log_user = arg.data;
		db.get("SELECT username,full_name,email FROM users WHERE username = '" + log_user.userID + "' ", function (err, row) {
			if (err) {
				console.log(err.message);
			}
			console.log('Error : ' + JSON.stringify(row))
			if (!row) {
				db.run("INSERT INTO users (user_id,full_name,username,email,phone, password, is_login,last_login,start_date,stop_date,admin_id,device_id,is_admin,created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [log_user.id, log_user.name, log_user.userID, log_user.email, log_user.contact, log_user.password, '1', current_dt, log_user.start_date, log_user.stop_date, log_user.admin_id, log_user.device_id, '0', current_dt, current_dt], function (err) {
					if (err) {
						callback(err.message);
					}
					callback('1');
				})
				//callback('2');
			} else {
				db.run(`UPDATE users SET is_login = 1,device_id = ?,stop_date = ?, last_login = ? WHERE username = ?`, [log_user.device_id, log_user.stop_date, current_dt, log_user.userID], function (err) {
					if (err) {
						callback(err.message);
					}

				})
				callback('1');
			}


		})


	}
	//Function to loginUser
	loginUser(arg, callback) {
		var current_dt = getDateTime();
		db.get("SELECT * FROM users WHERE email=? AND password=?", [arg['email'], arg['password']], function (err, row) {
			console.log('log f : ' + JSON.stringify(row))
			//console.log('Error : '+JSON. stringify(err)) 
			if (row) {

				console.log(arg['email']);
				var device_id = machineIdSync();
				//return false;
				db.run(`UPDATE users SET is_login = ?,last_login = ?,device_id = ? WHERE email = ?`, [1, current_dt, device_id, arg['email']], function (err) {
					if (err) {
						console.log('Error11 : ' + JSON.stringify(err.message))
						//callback(err.message);
					}
					//console.log(`Row(s) updated: ${this.changes}`);
					callback('done');
				})
				
			} else {
				callback('error');
			}
		})
	}
	//Funtion to logoutMe
	logoutMe(arg, callback) {
		db.get("SELECT * FROM users WHERE is_login=1", function (err, row) {
			db.run(`UPDATE users SET is_login = '0' WHERE is_login = ?`, [1], function (err) {
				if (err) {
					callback(err.message);
				}

			})
			callback('done');
		})
	}
	//Funtion to registerUser bussiness
	registerUser(arg, callback) {
		var current_dt = getDateTime();
		console.log('u_name: ' + arg);
		var log_user = arg;
		db.get("SELECT * FROM users WHERE email = '" + log_user.email + "' ", function (err, row) {
			if (err) {
				console.log(err.message);
			}
			console.log('Error : ' + JSON.stringify(row))
			if (!row) {
				db.run("INSERT INTO users (name,email,password,created_at, updated_at) VALUES (?,?,?,?,?)", [log_user.name, log_user.email, log_user.password, current_dt, current_dt], function (err) {
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
	//Funtion to initView
	initView(arg, callback) {
		db.get("SELECT * FROM users WHERE is_login=1", function (err, row) {
			console.log('rrrrr: ' + JSON.stringify(row));
			callback(row);
		})
	}
}

module.exports = users;