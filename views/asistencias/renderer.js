window.addEventListener("DOMContentLoaded", () => {
  const buttonRegresarInicio = document.getElementById("regresar-inicio");
  const buttonRegistrarAlumno = document.getElementById("registrar-alumno");
  const buttonListaAlumnos = document.getElementById("lista-alumnos");
  const buttonGenerarRegistro = document.getElementById("generar-registro");

  const listaAusentes = document.getElementById("lista-ausentes");
  const listaPresentes = document.getElementById("lista-presentes");

  buttonRegistrarAlumno.addEventListener("click", () => {
    window.electronAPI.send("change-window", "register.html");
  });
  buttonListaAlumnos.addEventListener("click", () => {
    window.electronAPI.send("change-window", "list.html");
  });
  buttonRegresarInicio.addEventListener("click", () => {
    window.electronAPI.send("change-window", "index.html");
  });

  // send data to main process
  buttonGenerarRegistro.addEventListener("click", (event) => {
    const presentes = [];
    const ausentes = [];
    for (let i = 0; i < listaPresentes.children.length; i++) {
      presentes.push(listaPresentes.children[i].id);
    }
    for (let i = 0; i < listaAusentes.children.length; i++) {
      ausentes.push(listaAusentes.children[i].id);
    }
    window.electronAPI.send("generar-registro", {
      presentes: presentes,
      ausentes: ausentes,
    });
  });

  // receive data from main process
  window.electronAPI.send("dame-estudiantes");

  window.electronAPI.receive("estudiantes", (data) => {
    data.forEach((estudiante) => {
      const li = document.createElement("li");
      li.id = estudiante.id;
      li.innerText = estudiante.nombre + " - " + estudiante.grado;
      li.tabIndex = 0;
      listaAusentes.appendChild(li);
      li.addEventListener("click", () => {
        if (li.parentNode === listaAusentes) {
          // listaAusentes.removeChild(li); (No es necesario wtf)
          listaPresentes.appendChild(li);
        } else {
          listaAusentes.appendChild(li);
        }
      });
      li.addEventListener("keypress", (event) => {
        if (event.key === "Enter" || event.keyCode === 13) {
          if (li.parentNode === listaAusentes) {
            // listaAusentes.removeChild(li);
            /*
             * No es necesario, ya que appendChild() define a la lista como el padre del elemento, y un elemento solo puede tener UN padre.
             */
            listaPresentes.appendChild(li);
          } else {
            listaAusentes.appendChild(li);
          }
        }
      });
    });
  });
});
