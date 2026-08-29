# Glosario Técnico — Excel Learning Hub

Glosario de términos técnicos usados en el proyecto, extraídos del código y de la documentación. Ordenados alfabéticamente.

## A

- **ADR (Architecture Decision Record):** Registro de decisión de arquitectura. Ver [ARQUITECTURA_GLOBAL.md](ARQUITECTURA_GLOBAL.md).
- **Argumento:** Dato que una función de Excel necesita para trabajar (números, celdas, rangos, texto, fechas). En la documentación de Excel se indica con corchetes `[...]` cuando es **opcional** (ver `teoria/anatomia-funcion.html`).
- **Autofiltro:** Filtro de tabla activable con `Ctrl + Shift + L` (documentado en `atajos.html`).

## B

- **BUSCARV / BUSCARX:** Funciones de búsqueda y referencia. BUSCARV solo busca hacia la derecha de la columna de búsqueda; BUSCARX es la función moderna (2019/365) más flexible. Ver `formulas/buscarv.html` y `formulas/buscarx.html`.
- **Buscador en vivo:** Filtrado del DOM en tiempo real conforme se escribe en `#search-shortcuts` (atajos) o `#search-formulas` (fórmulas).

## C

- **Clean URLs:** Configuración de Vercel (`vercel.json`) que elimina la extensión `.html` de las rutas servidas.

## D

- **data-category:** Atributo de datos en las tarjetas `.formula-pad` de `formulas.html` que define el color temático por categoría (Matemáticas, Estadística, Fecha y Hora, Lógica, Texto, Búsqueda).
- **data-page:** Atributo de datos que `sidebar.js` compara con el nombre del archivo de la URL para resaltar la sección activa del menú.
- **DIVIDIRTEXTO / LET / FILTRAR / ORDENAR:** Funciones modernas de Excel 2019/365 documentadas en la biblioteca (`formulas/`).

## E

- **Escala 0–100:** En `quiz-core.js`, cada acierto suma 10 puntos sobre 10 preguntas (total 100).
- **Esquema SQL:** Definición legacy de las tablas `tests`, `preguntas` y `resultados` en `assets/db/eschema.sql` (ya no se usa).

## F

- **Flash Fill (Relleno Rápido):** Herramienta que detecta patrones y completa datos automáticamente (`tips/relleno-rapido.html`); atajo `Ctrl + Shift + E`.

## G

- **Google Fonts (Inter):** Fuente importada en `main-style.css` para la tipografía del sitio.

## I

- **Infografía:** Imagen educativa de la galería de `index.html`; se abre en un modal desplazable y descargable.
- **initQuiz():** Función principal de `quiz-core.js` que recibe un array de preguntas, las baraja aleatoriamente y prepara el quiz.

## J

- **JSONB:** Tipo de columna en PostgreSQL (legacy) usado en `preguntas.opciones` para guardar el arreglo de opciones de respuesta.
- **JS vanilla:** JavaScript sin frameworks ni bibliotecas de terceros.

## K

- **Kbd (keycap):** Elemento `<kbd>` con estilo 3D que representa una tecla de atajo en `atajos.html`.

## M

- **Modal:** Visor a pantalla completa (`#infoModal`) para infografías, con arrastre para desplazar (umbral de 5 px) y botón de descarga.
- **Matrices dinámicas:** Concepto de Excel 2019+ por el que una fórmula puede rellenar varias celdas automáticamente (tema evaluado en `test-teoria`).

## O

- **Opciones:** Arreglo con las alternativas de cada pregunta en el array `preguntasArray`; la propiedad `respuesta` guarda el índice (0, 1, 2...) de la correcta.

## P

- **PixelWorld / BeatWave:** Empresas ficticias de los casos de práctica en `practicas/casos_practicos/`.

## Q

- **Quiz:** Evaluación de 10 preguntas con registro del estudiante y resumen de respuestas.

## R

- **Referencia absoluta/relativa/mixta:** Comportamientos de las referencias al copiar fórmulas; la absoluta usa `$` (tecla F4). Tema en `teoria/referencias.html`.
- **Resultado:** Puntaje que se muestra al finalizar un test (en memoria, no se persiste).

## S

- **Sidebar:** Barra lateral de navegación inyectada por `assets/js/sidebar.js` con 8 secciones (Prácticas, Fórmulas, Atajos, Herramientas, Infografías, Tips, Teoría, Evaluaciones).

## T

- **Tests:** Evaluaciones de 10 preguntas con registro del estudiante y resumen de respuestas. Preguntas embebidas en HTML.

## V

- **Vercel:** Plataforma de hosting estático que sirve el sitio con CDN y URLs limpias.
