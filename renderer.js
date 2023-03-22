// index.html
window.addEventListener("DOMContentLoaded", () => {
  const buttonRegistrarAlumno = document.getElementById("registrar-alumno");
  const buttonListaAlumnos = document.getElementById("lista-alumnos");
  const buttonRegistroAsistencias = document.getElementById(
    "registro-asistencias"
  );

  buttonRegistrarAlumno.addEventListener("click", () => {
    window.electronAPI.send("change-window", "register.html");
  });
  buttonListaAlumnos.addEventListener("click", () => {
    window.electronAPI.send("change-window", "list.html");
  });
  buttonRegistroAsistencias.addEventListener("click", () => {
    window.electronAPI.send("change-window", "asistencias.html");
  });
});
