const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron");
const path = require("path");
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: true,
      webSecurity: true,
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
  ipcMain.on("generar-registro", (event, data) => {
    if (!fs.existsSync("data.json")) {
      fs.writeFileSync("data.json", "[]");
    }
    const reporte = [];
    const reporteAsistieron = [];
    const reporteNoAsistieron = [];
    const estudiantes = JSON.parse(fs.readFileSync("data.json", "utf8"));
    const idsPresentes = data.presentes;
    const idsAusentes = data.ausentes;
    estudiantes.forEach((estudiante) => {
      if (idsPresentes.includes(estudiante.id.toString())) {
        reporteAsistieron.push(estudiante);
      } else if (idsAusentes.includes(estudiante.id.toString())) {
        reporteNoAsistieron.push(estudiante);
      }
    });
    reporte.push({
      asistieron: reporteAsistieron,
      noAsistieron: reporteNoAsistieron,
    });
    const date = new Date();
    const dateString = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    const nombreFile = `reporte-${dateString}.json`;
    if (!fs.existsSync(nombreFile)) {
      fs.writeFileSync(nombreFile, "[]");
    }
    fs.writeFileSync(nombreFile, JSON.stringify(reporte));
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
