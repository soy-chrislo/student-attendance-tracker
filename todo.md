# Todo list

## Ventana Registro de Asistencias (asistencias.html)

- Dos listas donde cada item sea el nombre completo del estudiante y su grado.
- Inicialmente, todos los estudiantes aparecen en la lista de **estudiantes ausentes**.
  - Cada nombre se puede clickear por lo que debe tener *hover*, si el nombre se clickea, se elimina de la lista **ausentes** y se agrega a la lista de estudiantes **presentes**.
    - Los estudiantes que pertenezcan en la lista inicial (la de ausentes) seran considerados como **ausentes** una vez finalice el conteo.
  - Los estudiantes de la lista **presentes** tambien pueden ser clickeados para regresarlos a la lista de **ausentes** en caso de error.
  
- Boton para crear un registro de asistencias:
  - Un registro de asistencias es:
    - Un fichero .json con un array global que contiene dos objetos:
      - El primer objeto tiene una sola propiedad llamada `asistieron` y su valor es un arreglo con el nombre de los estudiantes que asistieron.
      - El segundo objeto tiene una sola propiedad llamada `no-asistieron` y su valor es un arreglo con el nombre de los estudiantes que no asistieron.
  - Al clickear el boton, se deben tomar los estudiantes de las listas **ausentes** y **presentes** para generar un *registro de asistencias*.
    - El registro se genera como fichero .json al mismo nivel de la aplicacion `/`, y su nombre correspondera al formato `%dia%/%mes%/%anio% - RALP` (RALP - Registro Asistencia Ludica de Programacion)
    - Se puede reiniciar la vista para limpiar las listas, donde todos los elementos deberian "regresar" a la lista **ausentes** para tomar un nuevo reporte.
