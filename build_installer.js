// ./build_installer.js

// 1. Import Modules
const { MSICreator } = require('electron-wix-msi');
const path = require('path');

// 2. Define input and output directory.
// Important: the directories must be absolute, not relative e.g
// appDirectory: "C:\\Users\sdkca\Desktop\OurCodeWorld-win32-x64", 
//const APP_DIR = path.resolve(__dirname, './Bussiness');
const APP_DIR = path.resolve(__dirname, './ZoomClone-win32-x64');
// outputDirectory: "C:\\Users\sdkca\Desktop\windows_installer", 
const OUT_DIR = path.resolve(__dirname, './windows_installer');
const icon_path = path.resolve(__dirname, './src/assets/img/logo.ico');

// 3. Instantiate the MSICreator
const msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,

    // Configure metadata
    description: 'App for all types of busseness and stores',
    exe: 'ZoomClone',
    name: 'ZoomClone',
    manufacturer: 'Chandan Kushwaha',
    version: '1.0.0',
	iconPath: icon_path,
    // Configure installer User Interface
    ui: {
        chooseDirectory: true
    },
});

// 4. Create a .wxs template file
msiCreator.create().then(function(){

    // Step 5: Compile the template to a .msi file
    msiCreator.compile();
});