const { app, BrowserWindow, screen } = require('electron');
const {machineId, machineIdSync} = require('node-machine-id');
var sqlite3 = require('sqlite3').verbose();
const path = require('path');
const url = require('url')
var fs = require('fs');
var appPath = app.getPath('userData');
module.exports = {
	initDb: () => {
		//create dir if not exist
		const dir = appPath + '/my_pos';
		const asset_path = appPath + '/my_pos/assets';
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, {
				recursive: true
			});
			createDB();
			fs.mkdirSync(asset_path, {
				recursive: true
			});
		}
		var dbPath = path.resolve(appPath, 'my_pos/cron.sqlite');
		var db = new sqlite3.Database(dbPath);
		return db;
	},

	getDateTime: () => {
		return getCurrentDateTime();
	},

	createWindow: () => {
		return createWin();
	},
};

function getCurrentDateTime() {
	var currentdate = new Date();
	var datetime = currentdate.getDate() + "-"
		+ (currentdate.getMonth() + 1) + "-"
		+ currentdate.getFullYear() + " "
		+ currentdate.getHours() + ":"
		+ currentdate.getMinutes() + ":"
		+ currentdate.getSeconds();
	return datetime;
}

function createDB() {
	var dbPath = path.resolve(appPath, 'my_pos/cron.sqlite');
	var db = new sqlite3.Database(dbPath);
	db.serialize(function () {
		db.run("CREATE TABLE IF NOT EXISTS users (user_id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,email	TEXT,phone TEXT,password TEXT,logo TEXT,is_login INTEGER,is_manager INTEGER,last_login	TEXT,device_id TEXT,created_at TEXT,updated_at TEXT)");
		
		db.run("CREATE TABLE IF NOT EXISTS category_mast (catid INTEGER PRIMARY KEY AUTOINCREMENT,catname TEXT, uentdt TEXT,is_active INT,description TEXT,is_deal INT DEFAULT 0,order_no TEXT,sztxt TEXT,bstxt	TEXT,cotxt TEXT,extxt TEXT,anytxt TEXT,nbtxt TEXT,slug TEXT,catnmtxt TEXT,photo TEXT, is_maintain_stock INT DEFAULT 0, allow_stock_qty INT DEFAULT 0)");
		
		db.run("CREATE TABLE IF NOT EXISTS size_mast (szid INTEGER PRIMARY KEY AUTOINCREMENT,szname TEXT,is_active INT, uentdt TEXT)");
		db.run("CREATE TABLE IF NOT EXISTS base_mast (bid INTEGER PRIMARY KEY AUTOINCREMENT,bname TEXT,is_active INT DEFAULT 1, uentdt TEXT)");
		db.run("CREATE TABLE IF NOT EXISTS size_base_data (sbid INTEGER PRIMARY KEY AUTOINCREMENT,catid INT,szid INT, bid INT, uent_dt TEXT)");

		db.run("CREATE TABLE IF NOT EXISTS item_mast (tid INTEGER PRIMARY KEY AUTOINCREMENT,itemid TEXT, itemnm TEXT,detail TEXT,photo TEXT,cstatus INT DEFAULT 1,uent_dt TEXT,is_own_pizza INT DEFAULT 0,is_half_pizza	INT DEFAULT 0,item_flag INT DEFAULT 0,base_default TEXT,unit TEXT,slug TEXT,itmtxt TEXT,barcode TEXT,sqty INT, is_special INT DEFAULT 0, min_stock_qty INT DEFAULT 0, item_stime TEXT, item_etime TEXT, attrids TEXT, deactive_dt TEXT)");

		db.run("CREATE TABLE IF NOT EXISTS item_master (tid INTEGER PRIMARY KEY AUTOINCREMENT,cat_id TEXT,code TEXT, name TEXT,status INT DEFAULT 1,pickup_price TEXT,delivery_price TEXT,eat_in_price TEXT,cost_price TEXT,stock TEXT,min_stock TEXT,item_img TEXT,bar_code TEXT,desc TEXT,contain TEXT,extra TEXT, created_at TEXT, deactive_dt TEXT)");

		db.run("CREATE TABLE IF NOT EXISTS item_any (id INTEGER PRIMARY KEY AUTOINCREMENT,itemid INT,name TEXT, how_many INT, order_num INT, is_must INT DEFAULT 0, topp_idz TEXT, created_at TEXT)");

		db.run("CREATE TABLE IF NOT EXISTS topping_mast (tid INTEGER PRIMARY KEY AUTOINCREMENT,tname TEXT,is_active INT, uentdt TEXT)");
		db.run("CREATE TABLE IF NOT EXISTS topping_info (id INTEGER PRIMARY KEY AUTOINCREMENT,topp_id INT,szid INT, p_plus TEXT, p_double TEXT, p_h_plus TEXT, p_h_double TEXT, created_at TEXT)");

		/**************Insert data to table******************/
		var current_dt = getCurrentDateTime();
		db.run("INSERT INTO users (name,email,password,is_login,is_manager,created_at) VALUES ('TeseUser','testuser@gmail.com','12345678','0','0', '" + current_dt + "'),('pos_manager','pos_manager@gmail.com','pos@123#','0','1', '" + current_dt + "')");
		db.run("INSERT INTO size_mast (szname,is_active,uentdt) VALUES ('NS',1,'" + current_dt + "')");
		db.run("INSERT INTO base_mast (bname,is_active,uentdt) VALUES ('NB',1,'" + current_dt + "')");
	})
}

/*const iconUrl = url.format({
 pathname: path.join(__dirname, 'src/assets/img/logo.ico'),
 //protocol: 'file:',
 slashes: true
})*/
var iconUrl = path.resolve(__dirname, '../../src/assets/img/logo.ico');
console.log(iconUrl);
//menuItem.enabled = false;
function createWin() {
	const { width, height } = screen.getPrimaryDisplay().workAreaSize
	const win = new BrowserWindow({
		width: 1200,
		height: 600,

		webPreferences: {
			nodeIntegration: true
		},
		icon: iconUrl // sets window icon
	})
	//win.setMenu(null);
	var dbPath = path.resolve(appPath, 'my_pos/cron.sqlite');
	var db = new sqlite3.Database(dbPath);
	db.serialize(function () {
		var device_id = machineIdSync();
		db.get("SELECT * FROM users WHERE is_login=? AND device_id=?",[1, device_id], function (err, row) {
			//console.log('fffffffff: '+row);
			//console.log('pppdd: '+JSON. stringify(row));
			//const cookie = { username: row.username, bussiness_name: row.bussiness_name, logo: row.bussiness_name }
			//session.defaultSession.cookies.set(cookie);

			if (typeof row !== 'undefined') {
				/*if(row.is_login == 1){
					win.loadFile('./src/views/index.html')
				}else{*/
				win.loadFile('./src/views/dashboard.html')
				//}

			} else {
				win.loadFile('./src/views/login.html')
			}
		});

	});
	win.once('ready-to-show', () => {
		win.show()
	})

}



