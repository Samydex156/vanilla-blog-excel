-- ==============================================================================
-- INSERTS PARA LA TABLA DE PREGUNTAS - TEST 1 (PARTE 1)
-- ID: 659691e6-242a-453d-85b2-c9cfd6335fd3
-- ==============================================================================

INSERT INTO preguntas (test_id, pregunta_text, opciones, respuesta_correcta, orden) VALUES
('659691e6-242a-453d-85b2-c9cfd6335fd3', '¿Cuál es la función principal de Excel según la teoría de hojas de cálculo?', '["Diseñar gráficos vectoriales", "Crear presentaciones visuales", "Organizar, manipular y analizar datos", "Escribir documentos de texto"]'::jsonb, 2, 1),
('659691e6-242a-453d-85b2-c9cfd6335fd3', '¿Cuántas filas tiene una hoja de Excel?', '["1,000,000", "1,048,576", "16,384", "Infinitas"]'::jsonb, 1, 2),
('659691e6-242a-453d-85b2-c9cfd6335fd3', 'En el entorno de trabajo, ¿qué parte muestra la referencia o dirección de la celda activa?', '["Barra de Fórmulas", "Barra de Título", "Cuadro de Nombres", "Barra de Estado"]'::jsonb, 2, 3),
('659691e6-242a-453d-85b2-c9cfd6335fd3', '¿Cómo se identifican las columnas y las filas en una hoja de Excel?', '["Columnas con números, filas con letras", "Columnas con letras, filas con números", "Ambas con números", "Ambas con letras"]'::jsonb, 1, 4),
('659691e6-242a-453d-85b2-c9cfd6335fd3', 'Si introduces un valor en una celda y por defecto se alinea a la DERECHA, ¿qué tipo de dato entiende Excel que es?', '["Texto", "Número", "Lógico", "Error"]'::jsonb, 1, 5),
('659691e6-242a-453d-85b2-c9cfd6335fd3', '¿Qué ocurre si intentas sumar una celda que Excel reconoce como "Texto" aunque parezca un número?', '["Excel lo convierte automáticamente y lo suma", "Excel pregunta si quieres cambiar el formato", "Da un error o un resultado de cero", "Cierra la hoja de cálculo por seguridad"]'::jsonb, 2, 6),
('659691e6-242a-453d-85b2-c9cfd6335fd3', '¿Qué función moderna de Excel 2019/365 es recomendada para reemplazar a BUSCARV por ser más segura y flexible?', '["BUSCARH", "BUSCARX", "BUSCAR.CONJUNTO", "INDICE"]'::jsonb, 1, 7),
('659691e6-242a-453d-85b2-c9cfd6335fd3', '¿Qué concepto introducido en las versiones modernas (2019+) permite que una sola fórmula llene múltiples celdas automáticamente?', '["Tablas Dinámicas", "Matrices Dinámicas", "Fórmulas Recursivas", "Marcos de Datos"]'::jsonb, 1, 8),
('659691e6-242a-453d-85b2-c9cfd6335fd3', 'Según la teoría, ¿qué función se utiliza en las versiones modernas para evaluar múltiples condiciones de forma limpia, reemplazando a los "SI anidados"?', '["SI.CONJUNTO", "SUMAR.SI", "ELEGIR", "CONDICION.MULTIPLE"]'::jsonb, 0, 9),
('659691e6-242a-453d-85b2-c9cfd6335fd3', '¿Cuál de las siguientes es una función moderna que permite extraer una lista de valores sin duplicados instantáneamente?', '["FILTRAR", "ORDENAR", "UNICOS", "LET"]'::jsonb, 2, 10);

-- ==============================================================================
-- INSERTS PARA LA TABLA DE PREGUNTAS - TEST 2 (PARTE 2)
-- ID: a0c03649-6474-4b3a-82e1-f630acf1bae9
-- ==============================================================================

INSERT INTO preguntas (test_id, pregunta_text, opciones, respuesta_correcta, orden) VALUES
('a0c03649-6474-4b3a-82e1-f630acf1bae9', 'Según la anatomía de una función en Excel, ¿qué carácter le indica a Excel que lo que se escribe es una operación a calcular?', '["El paréntesis (", "El signo igual (=)", "El punto y coma (;)", "El corchete ["]'::jsonb, 1, 1),
('a0c03649-6474-4b3a-82e1-f630acf1bae9', '¿Para qué sirven los argumentos dentro de una función de Excel?', '["Para darle un nombre a la operación", "Para separar las diferentes hojas del libro", "Son los datos que la función necesita para trabajar", "Para cambiar el idioma del programa"]'::jsonb, 2, 2),
('a0c03649-6474-4b3a-82e1-f630acf1bae9', 'Cuando en la ayuda de Excel un argumento aparece entre corchetes (ej. [número2]), ¿qué significa?', '["Que es un error de sintaxis", "Que debes presionar F4", "Que ese argumento es opcional", "Que es obligatorio"]'::jsonb, 2, 3),
('a0c03649-6474-4b3a-82e1-f630acf1bae9', '¿Qué es una referencia relativa en Excel?', '["Una fórmula que nunca cambia al copiarse", "El comportamiento por defecto donde la celda se ajusta automáticamente al copiarse", "Una referencia que solo funciona en la misma hoja", "Una fórmula con el símbolo de dólar ($)"]'::jsonb, 1, 4),
('a0c03649-6474-4b3a-82e1-f630acf1bae9', '¿Qué símbolo se utiliza para crear una referencia absoluta y "congelar" una celda?', '["#", "&", "=", "$"]'::jsonb, 3, 5),
('a0c03649-6474-4b3a-82e1-f630acf1bae9', '¿Qué tecla puedes presionar después de escribir una referencia para añadir automáticamente los símbolos de dólar ($)?', '["F2", "F4", "F5", "F9"]'::jsonb, 1, 6),
('a0c03649-6474-4b3a-82e1-f630acf1bae9', 'Si escribes la fórmula =5+2*3 en Excel, ¿cuál será el resultado y por qué?', '["21, porque Excel lee de izquierda a derecha", "11, porque Excel multiplica antes de sumar", "11, porque suma antes de multiplicar", "21, porque es el resultado lógico"]'::jsonb, 1, 7),
('a0c03649-6474-4b3a-82e1-f630acf1bae9', 'Según la jerarquía de operaciones, ¿qué elemento se calcula en primer lugar?', '["La multiplicación", "La suma", "Lo que está dentro de los paréntesis ( )", "Las potencias (exponentes)"]'::jsonb, 2, 8),
('a0c03649-6474-4b3a-82e1-f630acf1bae9', 'Si al escribir una fórmula aparece el error #¡REF!, ¿qué significa?', '["Que estás dividiendo entre cero", "Que Excel no reconoce el nombre de la función", "Que la fórmula hace referencia a una celda que fue eliminada", "Que Excel esperaba un número pero encontró texto"]'::jsonb, 2, 9),
('a0c03649-6474-4b3a-82e1-f630acf1bae9', '¿Qué función sirve como "salvavidas" para manejar los errores y mostrar un mensaje personalizado en lugar del código de error de Excel?', '["SI.ERROR", "BUSCARV", "UNICOS", "IGNORAR.ERROR"]'::jsonb, 0, 10);
