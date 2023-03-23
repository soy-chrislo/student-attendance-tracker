# Student Attendance Tracker

This is a desktop application built with Electron JS that allows users to register students with their name and grade level. The application consists of three windows: registration, student list, and attendance report. The registration window allows users to input student information and save it to a data.json file. The student list window displays all registered students, and the attendance report window generates a report of attendance based on the students who were present and absent. The application also generates a `registro` file with the current date and the list of registered students.

## Main Window

![inicio](https://i.imgur.com/TdWYQqO.png)

## Registration Window

The registration window allows users to input the student's name and grade level and save it to the data.json file. Users can also edit or delete existing student records. When users click the save button, the application checks for errors in the input fields and displays an error message if necessary. Once the data is saved, the application updates the student list window to display the new student.
![registrar](https://i.imgur.com/3SxbEVD.png)
![data.json](https://i.imgur.com/ya0FmJ2.png)

## List Window

![listar](https://i.imgur.com/wz30xcz.png)

## Attendance Report Window

The attendance report window displays a list of all registered students and allows users to mark them as present or absent. Users can navigate through the list using the tab key and select students using the enter key. When users click on a student's name, the application switches the student to the present list. If a mistake is made, users can click on the student's name in the present list to return them to the absent list. The application also generates a report of attendance based on the current status of each student, which can be saved to a file.

![asistencias](https://i.imgur.com/LHUYsmH.png)
![reporte.json](https://i.imgur.com/8XwQlqu.png)
