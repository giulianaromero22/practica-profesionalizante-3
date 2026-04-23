-- Agregar campo nota_aprobacion a materias
ALTER TABLE materias  
ADD nota_aprobacion INT 
AFTER anio_cursado;