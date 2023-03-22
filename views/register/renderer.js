// register.html
window.addEventListener("DOMContentLoaded", () => {
  const buttonRegresarInicio = document.getElementById("regresar-inicio");
  const buttonRegistrarAlumno = document.getElementById("registrar-alumno");
  const buttonListaAlumnos = document.getElementById("lista-alumnos");
  const buttonRegistroAsistencias = document.getElementById(
    "registro-asistencias"
  );

  const inputNombre = document.getElementById("nombre");
  const inputGrado = document.getElementById("grado");

  buttonRegresarInicio.addEventListener("click", () => {
    window.electronAPI.send("change-window", "index.html");
  });
  buttonRegistrarAlumno.addEventListener("click", (event) => {
    event.preventDefault();
    window.electronAPI.send("registrar-alumno", {
      nombre: inputNombre.value,
      grado: inputGrado.value,
    });
    inputNombre.value = "";
    inputGrado.value = "";
  });
  buttonListaAlumnos.addEventListener("click", () => {
    window.electronAPI.send("change-window", "list.html");
  });
  buttonRegistroAsistencias.addEventListener("click", () => {
    window.electronAPI.send("change-window", "asistencias.html");
  });
});
