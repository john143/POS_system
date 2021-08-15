const { app, BrowserWindow, ipcMain, screen, session  } = require('electron')
const async = require('async')
const path = require('path');
const { initDb, getDateTime, createWindow } = require('./src/config/initApp.js');
const { getRoute } = require('./src/windows/routes.js');
const db = initDb();
var appPath = app.getPath('userData');

ipcMain.on('initRoute', (event, arg) => {
	var info = getRoute(arg, function(back){
		event.returnValue = back;
	});
	
})
ipcMain.on('getapp', (event, arg) => {
	var temp = path.resolve(appPath, 'my_pos/assets');
  console.log(temp);
		event.returnValue = temp;
	
	
})

  
  
app.whenReady().then(()=>{
	createWindow();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})



app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
	  //browserWindow.setMenu(null);
    createWindow()
  }
})
function getCurrentDateTime(){
	var currentdate = new Date(); 
	var datetime = currentdate.getDate() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
	return datetime;	
}
