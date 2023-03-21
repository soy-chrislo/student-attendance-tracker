const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron");
const path = require("path");
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
  ipcMain.on("message", (event, content) => {
    console.log(content);
    saveData(content);
  });
  ipcMain.on("change-window", (event, page) => {
    win.loadFile(page);
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

function saveData(content) {
  fs.readFile("data.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    fs.writeFile("data.txt", data + "\n" + content, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  });
}
