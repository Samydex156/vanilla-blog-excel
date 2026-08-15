---
name: project-documentation
description: Generate the complete documentation suite for a software project — README, global architecture (with ADRs), project context, development timeline, technical glossary, business proposal, and persistence model. Use when starting a new project, or when asked to "create project documentation", "scaffold the docs", "documentar el proyecto", or "crear la documentación del proyecto".
---

# Skill: Project Documentation Suite (Crear Documentación para un Proyecto)

Receta para generar la suite completa de documentación técnica y de negocio de un proyecto de software desde cero, siguiendo el mismo estándar que usa SamyMusic (carpeta `docs/`). Produce **7 documentos** enlazados entre sí, todos verificables contra el código y el historial del repositorio.

## Cuándo usar esta skill

- Al iniciar un proyecto nuevo y se pide documentarlo ("crea la documentación del proyecto", "genera el README y la arquitectura").
- Cuando se pide documentar un repositorio existente que no tiene docs.
- Tras un hito importante, para crear la cronología o ampliar la documentación.
- Como paso final de un scaffold de proyecto.

## Los 7 documentos y su propósito

| # | Documento | Audiencia | Propósito |
|---|-----------|-----------|-----------|
| 1 | `README.md` | Usuarios y devs | Presentación, features, atajos, requisitos, instalación, enlaces a los demás docs |
| 2 | `ARQUITECTURA_GLOBAL.md` | Arquitectos / devs | Diagramas de capas y componentes, flujos críticos, máquina de estados y registro de ADRs |
| 3 | `CONTEXTO_PROYECTO.md` | Todos | Visión de negocio, casos de uso, mapa de módulos, árbol de directorios, stack tecnológico |
| 4 | `CRONOLOGIA_DESARROLLO.md` | Devs / PM | Línea de tiempo de hitos por fases (hoja de ruta replicable) |
| 5 | `GLOSARIO_TECNICO.md` | Todos | Términos técnicos del proyecto, ordenados alfabéticamente, con definición breve |
| 6 | `PROPUESTA_COMERCIAL.md` | Negocio / inversores | Propuesta de valor, problema vs solución, ROI, casos de uso comercial |
| 7 | `PERSISTENCIA.md` | Devs / arquitectos | Estrategia de almacenamiento, claves y entidades, diagramas de clases y DER, reglas de integridad |

---

## Paso 0 — Determinar idioma y ubicación

1. **Idioma**: confirma con el usuario o infiere del código/comentarios (SamyMusic usa **español**). Mantén UN solo idioma coherente en toda la suite.
2. **Ubicación**: crea la carpeta `docs/` en la raíz del proyecto. Si el proyecto tendrá skills de implementación, añade también `docs/skills/`.

## Paso 1 — Analizar el código fuente

Recopila la "fuente de verdad" antes de escribir nada:

1. Lee la estructura raíz (directorios de código, entry point, config de build).
2. Identifica: lenguaje/framework, gestor de paquetes, entry point, módulos principales, sistema de tests, CI/CD.
3. Si hay providers/servicios/modelos, lista sus **clases públicas y métodos** (grep de `class`, `Future<...>`, `bool is`, claves de prefs).
4. Identifica la **persistencia real** (prefs, base de datos, archivos sidecar, APIs externas) y los **servicios externos** (APIs de IA, backends).

## Paso 2 — Recopilar hechos verificables

| Dato | Fuente |
| :--- | :--- |
| Fechas e hitos | `git log --oneline --date=short` (o historial del VCS) |
| Stack y versiones | Manifest de dependencias (`pubspec.yaml`, `package.json`, `pyproject.toml`, `go.mod`, etc.) |
| Instalación / empaquetado | Config de build, instalador, CI |
| Nombre de producto, autor, licencia | README previo, manifest, LICENSE |
| Estructura de archivos | Árbol real de `lib/`, `src/`, etc. |

> [!IMPORTANT]
> Todo dato escrito en los docs debe ser **verificable**: si citas una versión, una clase, un método o un archivo, debe existir en el código.

## Paso 3 — Generar cada documento

### 3.1 `README.md` — Carta de presentación

Secciones (en orden):

1. Título + eslogan + descripción de una línea del producto.
2. **Diagrama de arquitectura de resumen** (Mermaid `graph TD` con Cliente / Motor Core / Persistencia).
3. **Características principales** agrupadas por dominio (motor/DSP, IA/letras, biblioteca, experiencia visual).
4. **Atajos / comandos** (si es app con atajos o CLI) en tabla: `| Atajo | Acción | Descripción |`.
5. **Requisitos previos** (SO, SDK, toolchains) y **Instalación rápida** (pasos numerados con comandos).
6. **Enlaces a la documentación**: los otros 6 docs (rutas `file:///...` o relativas).

Regla: cada feature listada debe existir en el código (verifica con `grep` si hay duda).

### 3.2 `ARQUITECTURA_GLOBAL.md` — Decisiones y diagramas

1. **Diagrama de capas** ASCII (Presentación → Estado/Providers → Servicios → Persistencia).
2. **Diagrama C4 de componentes** (Mermaid `graph TD` con subgraphs por capa y relaciones entre módulos).
3. **Flujos críticos** con `sequenceDiagram` (ej. carga de pista, arranque, autenticación) — documenta los *gotchas* como notas en el flujo.
4. **Máquina de estados** del core (Mermaid `stateDiagram-v2`) si aplica.
5. **Registro de ADRs** numerados de forma continua (ADR-001, ADR-002...). Formato por ADR:
   - `**Contexto:**` (problema)
   - `**Decisión Adoptada:**` (lista numerada)
   - `**Consecuencias Positivas:**` (bullets)

Regla: los ADR se numeran de forma continua y no se renumera; si ya hay ADR-016, el siguiente es ADR-017.

### 3.3 `CONTEXTO_PROYECTO.md` — Visión y estructura

1. **Propósito de negocio y alcance** (Dentro del Alcance / Fuera del Alcance).
2. **Diagrama de casos de uso** (Mermaid `flowchart TD` con Actor → Sistema → casos).
3. **Mapa de módulos / dominio** (Mermaid `graph LR` con subgraphs por dominio).
4. **Árbol de directorios real** con la responsabilidad de cada archivo (comentario al final de cada línea).
5. **Stack tecnológico** en tabla: `| Categoría | Tecnología | Versión | Justificación |`.
6. **Glosario de dominio breve** (los términos clave; el glosario completo va en `GLOSARIO_TECNICO.md`).

### 3.4 `CRONOLOGIA_DESARROLLO.md` — Línea de tiempo

1. **Período cubierto** (desde el primer commit hasta la fecha).
2. **Fases** (0, 1, 2...) cada una con:
   - **Objetivo**
   - **Hitos** (lista con fecha)
   - **Decisiones clave**
   - **Entregables**
3. **Tabla resumen de hitos por fecha**: `| Fecha | Hito | Fase |`.
4. **Lecciones aprendidas** (replicables para futuros proyectos).

Regla: las fechas salen del historial real del VCS; si no hay historial, reconstruye por orden de features y márcalo como estimado.

### 3.5 `GLOSARIO_TECNICO.md` — Términos

1. Encabezado con propósito.
2. **Lista alfabética A–Z** (secciones por letra o tabla): término en **negrita** + definición breve + (si aplica) uso concreto en el proyecto.
3. Extrae los términos del código y de los demás docs; **no inventes acrónimos**.

### 3.6 `PROPUESTA_COMERCIAL.md` — Valor de negocio

1. **Resumen ejecutivo** (pitch de 1 párrafo).
2. **Problema vs Solución** (Mermaid `graph LR` con 2 subgraphs y flechas "Reemplazado por").
3. **Mapeo de valor y capacidades** (Mermaid `mindmap`).
4. **Tabla de traducción técnico-comercial**: `| Característica Técnica | Beneficio Directo | Impacto Financiero |`.
5. **Casos de uso con ROI** (escenarios con métricas).

Regla: las métricas (RAM, FPS, ahorro de horas) deben ser reales o marcarse explícitamente como estimación.

### 3.7 `PERSISTENCIA.md` — Datos y almacenamiento

1. **Motor/estrategia de persistencia** (Mermaid `graph TD` con las capas de almacenamiento).
2. **Tablas de claves/entidades almacenadas** por dominio: `| Clave | Tipo | Valor por Defecto | Descripción |`.
3. **Diagrama de clases** de modelos/providers (Mermaid `classDiagram` con campos y métodos públicos reales).
4. **Diagrama entidad-relación** (Mermaid `erDiagram`).
5. **Diccionario de datos** por entidad: `| Campo | Tipo | Restricciones | Descripción de Negocio |`.
6. **Reglas de integridad y rendimiento** (clamping, debounce, fallbacks).

---

## Paso 4 — Enlazado cruzado

- El `README.md` **enlaza a los 6 docs**.
- Los docs técnicos se citan entre sí con rutas relativas (`docs/ARQUITECTURA_GLOBAL.md`).
- La cronología y el glosario se referencian desde el README.
- Si el proyecto tiene docs adicionales (guías de plataforma, skills), añádelos también a la lista del README.

## Paso 5 — Verificación final

1. **Grep de referencias**: ejecuta `grep` sobre los nombres de archivo, clases, métodos y versiones citados — todos deben existir en el código.
2. **Mermaid**: revisa que los diagramas usen sintaxis válida (nodos, subgraphs, relaciones, `~` para genéricos).
3. **Completitud**: confirma que los 7 archivos existen en `docs/` y están enlazados desde el README.
4. **Idioma**: revisa que no se mezclen idiomas dentro de un mismo documento.

---

## Reglas de oro

1. **Verificabilidad**: todo hecho (versión, clase, método, archivo, métrica) debe existir en el código o en el VCS.
2. **Un solo idioma** coherente en toda la suite.
3. **Independencia relativa**: cada doc se entiende solo, aunque los enlaces cruzados ayuden.
4. **ADRs continuos**: nunca renumera; añade el siguiente número.
5. **No inventar**: si no puedes verificar un dato, déjalo fuera o márcalo como estimación.
6. **Proporcionalidad**: adapta el tamaño al proyecto — una CLI pequeña no necesita 20 ADRs.

## Ejemplo de referencia (modelo canónico)

Los docs de **SamyMusic** en `docs/` son el modelo canónico de esta suite: `README.md`, `ARQUITECTURA_GLOBAL.md`, `CONTEXTO_PROYECTO.md`, `CRONOLOGIA_DESARROLLO.md`, `GLOSARIO_TECNICO.md`, `PROPUESTA_COMERCIAL.md` y `PERSISTENCIA.md`. Úsalos como referencia de estilo, estructura y profundidad.

## Checklist rápido

- [ ] ¿Leí el código y el historial antes de escribir?
- [ ] ¿Los 7 documentos existen en `docs/`?
- [ ] ¿Cada feature/método/clave citada existe en el código?
- [ ] ¿El README enlaza a los 6 docs?
- [ ] ¿Los ADRs están numerados de forma continua?
- [ ] ¿Hay un solo idioma en toda la suite?
- [ ] ¿Las métricas comerciales son reales o están marcadas como estimación?
