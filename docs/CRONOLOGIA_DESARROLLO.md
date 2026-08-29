# Cronología de Desarrollo — Excel Learning Hub

Período cubierto: del **28 de abril de 2026** (primer commit) al **29 de agosto de 2026** (último commit). Fuente: historial real del repositorio `git log`. Autor de los commits: Samuel Durán. Repositorio: `https://github.com/Samydex156/vanilla-blog-excel.git`.

## Fases

### Fase 0 — Bootstrap (28 abr 2026)
- **Objetivo:** levantar la estructura base del sitio y preparar el despliegue.
- **Hitos:**
  - `2026-04-28` Estructura HTML inicial, estilos CSS y configuración de Vercel.
  - `2026-04-28` Refactor de la estructura HTML y mejora de estilos.
- **Decisiones clave:** sitio 100 % estático sobre Vercel (ADR-001, ADR-002).
- **Entregables:** primeras páginas HTML, `assets/css/main-style.css`, `vercel.json`.

### Fase 1 — Rediseño minimalista y módulos de contenido (11–12 may 2026)
- **Objetivo:** dar identidad visual al sitio y expandir el contenido educativo.
- **Hitos:**
  - `2026-05-11` Rediseño con layout minimalista y ampliación de la biblioteca (guías, atajos, prácticas).
  - `2026-05-12` Visor de imágenes con modal interactivo.
  - `2026-05-12` Módulos de **teoría** y **tips** con sus páginas de documentación.
  - `2026-05-12` Modal de imagen desplazable con arrastre y mejora del layout móvil.
  - `2026-05-12` Renombrado de la marca del sitio, títulos y formato HTML consistente.
- **Decisiones clave:** galería de infografías con modal *fullscreen* (ADR por patrón de UX); navegación lateral única (ADR-005).
- **Entregables:** `index.html`, `teoria/` (8 páginas), `tips/` (6 páginas).

### Fase 2 — Módulo de evaluaciones con Supabase (14–25 may 2026)
- **Objetivo:** implementar evaluación y certificación de estudiantes en línea.
- **Hitos:**
  - `2026-05-14` Motor de quiz (`quiz-core.js`) y página `evaluaciones/test-atajos.html`.
  - `2026-05-14` Paleta del sidebar y fondo con grises más oscuros.
  - `2026-05-15` Quiz interactivo con integración a Supabase para atajos.
  - `2026-05-25` Esquema de base de datos backend (`assets/db/eschema.sql`) y motor de quiz modular.
  - `2026-05-25` Módulos de teoría completos y sus assets.
- **Decisiones clave:** Supabase como backend (ADR-003); 10 preguntas por test (ADR-004).
- **Entregables:** `quiz-core.js`, `eschema.sql`, `insert_preguntas_teoria.sql`, tests de atajos y teoría.

### Fase 3 — UI del quiz y biblioteca de fórmulas (6–18 jun 2026)
- **Objetivo:** pulir la experiencia del quiz y consolidar la biblioteca de fórmulas con búsqueda.
- **Hitos:**
  - `2026-06-06` Funcionalidad de quiz completa y componentes de UI vía `quiz-core.js`.
  - `2026-06-12` Reorganización de estructura: migración de assets y scripts modulares.
  - `2026-06-12` Hoja de estilos global y búsqueda en páginas de atajos.
  - `2026-06-12` Hoja de estilos principal con layout responsive.
  - `2026-06-18` Ampliación de la biblioteca con nuevas guías de fórmulas, assets y navegación.
- **Decisiones clave:** catálogo de fórmulas por nivel/categoría con buscador en vivo (ADR-007).
- **Entregables:** `formulas/` (34 guías), buscador en `formulas.html` y `atajos.html`.

### Fase 4 — Biblioteca de prácticas (17 jun – 3 jul 2026)
- **Objetivo:** ofrecer material de práctica real (casos empresariales).
- **Hitos:**
  - `2026-06-17` Nuevos archivos de práctica XLSX.
  - `2026-06-19` Plantillas de casos **PixelWorld** y **BeatWave**.
  - `2026-06-29` Eliminación de ejercicios antiguos y nuevas plantillas PixelWorld.
  - `2026-07-01` Archivo `.bas` descargable (`gemini_prompt.bas`).
  - `2026-07-03` Plantilla de ventas/personal de PixelWorld.
- **Decisiones clave:** casos empresariales como material pedagógico principal.
- **Entregables:** `practicas/archivos_practica/` (15+ archivos).

> **Actualización (ago 2026):** `practicas/gemini_prompt.bas` fue eliminado del repositorio por seguridad (contenía una API key real expuesta) y por no ser ya necesario. Ver ADR-009 en [ARQUITECTURA_GLOBAL.md](ARQUITECTURA_GLOBAL.md).

### Fase 5 — Refactorización de evaluaciones y reorganización de prácticas (29 ago 2026)
- **Objetivo:** eliminar dependencia de Supabase, simplificar evaluaciones y reorganizar prácticas.
- **Hitos:**
  - `2026-08-29` Reorganización de prácticas: creación de `casos_practicos/`, 4 ejercicios visibles.
  - `2026-08-29` Refactorización de evaluaciones: eliminación de Supabase, preguntas embebidas en HTML.
  - `2026-08-29` Creación de 3 tests: Fórmulas Básicas, Fundamentos, Tipos de Datos y Referencias.
  - `2026-08-29` Eliminación de `evaluaciones.js` y tests legacy.
  - `2026-08-29` Barajado aleatorio de preguntas y dispersión de respuestas.
  - `2026-08-29` Nombre del estudiante en pantalla de resultados.
- **Decisiones clave:** eliminación de Supabase (ADR-012); evaluaciones 100% estáticas.
- **Entregables:** `quiz-core.js` (estático), 3 tests, `practicas/casos_practicos/`.

## Tabla resumen de hitos

| Fecha | Hito | Fase |
|-------|------|------|
| 2026-04-28 | Estructura HTML, CSS y configuración Vercel | 0 |
| 2026-05-11 | Rediseño minimalista y expansión de biblioteca | 1 |
| 2026-05-12 | Modal interactivo y módulos de teoría/tips | 1 |
| 2026-05-14 | Motor de quiz y test de atajos | 2 |
| 2026-05-15 | Quiz interactivo con Supabase | 2 |
| 2026-05-25 | Esquema de BD y motor modular de evaluaciones | 2 |
| 2026-06-06 | Componentes de UI del quiz | 3 |
| 2026-06-12 | Reorganización de assets y buscadores | 3 |
| 2026-06-18 | Ampliación de biblioteca de fórmulas | 3 |
| 2026-06-17 | Archivos de práctica XLSX | 4 |
| 2026-06-19 | Plantillas PixelWorld y BeatWave | 4 |
| 2026-06-29 | Reemplazo de ejercicios y nuevas plantillas | 4 |
| 2026-07-01 | Archivo VBA descargable (retirado en ago 2026) | 4 |
| 2026-07-03 | Plantilla de personal y casos PixelWorld | 4 |

## Lecciones aprendidas

1. **Hosting estático acelera el ciclo:** publicar HTML/CSS/JS puros en Vercel permite iterar por módulo sin pipeline de build.
2. **Contenido reutilizable en JS:** centralizar el menú en `sidebar.js` y los estilos en un único CSS redujo la duplicación entre más de 60 páginas.
3. **Separar contenido de interacción:** las páginas educativas son estáticas y las evaluaciones también lo son ahora; todo es mantenible sin backend.
4. **Supabase era innecesario:** para un proyecto educativo con preguntas estables, embeber las preguntas en HTML es más simple y no requiere mantenimiento de base de datos.
5. **Los casos empresariales (PixelWorld/BeatWave) son el mejor gancho pedagógico:** las prácticas "con historia" motivan más que los ejercicios genéricos.
6. **El orden aleatorio de preguntas mejora la integridad:** cada estudiante ve un orden distinto, reduciendo la posibilidad de copia.

Siguiente hito esperado: dashboard docente para consultar resultados de estudiantes.
