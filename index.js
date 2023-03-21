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

  ipcMain.on("change-window", (event, page) => {
    if (page === "index.html") {
      win.loadFile(page);
    } else {
      const pathPage = `views/${page.split(".")[0]}/${page}`;
      win.loadFile(pathPage);
    }
  });
  ipcMain.on("registrar-alumno", (event, data) => {
    // incluir id
    data.id = getIdToRegister();
    saveData(data);
  });
  ipcMain.on("dame-estudiantes", (event) => {
    fs.readFile("data.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      win.webContents.send("estudiantes", JSON.parse(data));
    });
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
  if (!fs.existsSync("data.json")) {
    fs.writeFileSync("data.json", "[]");
  }
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let dataArray = JSON.parse(data);
    if (!Array.isArray(dataArray)) {
      dataArray = [];
    }
    dataArray.push(content);
    fs.writeFile("data.json", JSON.stringify(dataArray), (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  });
}

// register counter
function getIdToRegister() {
  if (!fs.existsSync("id.txt")) {
    fs.writeFileSync("id.txt", "0");
  }
  const dataFile = fs.readFileSync("id.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    return data;
  });
  incrementId();
  return Number(dataFile);
}

function incrementId() {
  fs.readFile("id.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let number = Number(data) + 1;
    fs.writeFile("id.txt", number.toString(), (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  });
}
