// list.html
window.addEventListener("DOMContentLoaded", () => {
  const buttonRegresarInicio = document.getElementById("regresar-inicio");
  const buttonRegistrarAlumno = document.getElementById("registrar-alumno");
  const buttonRegistroAsistencias = document.getElementById(
    "registro-asistencias"
  );

  buttonRegresarInicio.addEventListener("click", () => {
    window.electronAPI.send("change-window", "index.html");
  });
  buttonRegistrarAlumno.addEventListener("click", () => {
    window.electronAPI.send("change-window", "register.html");
  });
  buttonRegistroAsistencias.addEventListener("click", () => {
    window.electronAPI.send("change-window", "asistencias.html");
  });

  // receive data from main process
  window.electronAPI.send("dame-estudiantes");

  window.electronAPI.receive("estudiantes", (data) => {
    const tabla = document.getElementById("tabla");
    const th = document.createElement("th");
    th.innerText = "Nombre";
    tabla.appendChild(th);
    const th2 = document.createElement("th");
    th2.innerText = "Grado";
    tabla.appendChild(th2);
    const th3 = document.createElement("th");
    th3.innerText = "ID";
    tabla.appendChild(th3);
    data.forEach((estudiante) => {
      const tr = document.createElement("tr");
      const tdNombre = document.createElement("td");
      const tdGrado = document.createElement("td");
      const tdId = document.createElement("td");
      tdNombre.innerText = estudiante.nombre;
      tdGrado.innerText = estudiante.grado;
      tdId.innerText = estudiante.id;
      tr.appendChild(tdNombre);
      tr.appendChild(tdGrado);
      tr.appendChild(tdId);
      tabla.appendChild(tr);
    });
  });
});
