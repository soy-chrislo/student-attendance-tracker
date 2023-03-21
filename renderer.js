// index.html
window.addEventListener("DOMContentLoaded", () => {
  const buttonRegistrarAlumno = document.getElementById("registrar-alumno");
  const buttonListaAlumnos = document.getElementById("lista-alumnos");

  buttonRegistrarAlumno.addEventListener("click", () => {
    window.electronAPI.send("change-window", "register.html");
  });
  buttonListaAlumnos.addEventListener("click", () => {
    window.electronAPI.send("change-window", "list.html");
  });
});
