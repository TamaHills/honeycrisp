import { app, BrowserWindow } from 'electron';
import { config } from 'dotenv' 
import Axios from 'axios';
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

config()

const createWindow = async () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 800,
    width: 1200,
    backgroundColor: '#3b4252',
    webPreferences: {
      plugins: true
    }
  });

  let res = await Axios.get(process.env.TOKEN_SERVER_URL)

  // and load the index.html of the app.
  mainWindow.loadURL(`${MAIN_WINDOW_WEBPACK_ENTRY}?token=${res.data.token}`);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
