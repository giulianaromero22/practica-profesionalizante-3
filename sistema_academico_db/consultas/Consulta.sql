-- Agregar campo nota_aprobacion a la tabla materias

ALTER TABLE materias 
ADD nota_aprobacion INT 
AFTER anio_cursado;

-- Cantidad de alumnos por materia

SELECT materias.nombre, materias.id_materia, COUNT(*)
FROM materias 
INNER JOIN alumnos
ON materias.id_carrera = alumnos.id_carrera
GROUP BY materias.id_materia, materias.nombre

-- Cantidad de alumnos por carrera

SELECT carreras.nombre, COUNT(alumnos.id_alumno)
FROM carreras 
LEFT JOIN alumnos ON carreras.id_carrera = alumnos.id_carrera
GROUP BY carreras.id_carrera, carreras.nombre
