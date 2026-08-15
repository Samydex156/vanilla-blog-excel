# Propuesta Comercial — Excel Learning Hub

## 1. Resumen ejecutivo

**Excel Learning Hub** es un portal educativo en español que centraliza teoría, fórmulas, atajos, tips, herramientas, prácticas y certificaciones de Microsoft Excel para el Instituto Nueva Tecnología (Prof. Samuel Durán). El sitio ofrece una ruta de aprendizaje estructurada —ver, practicar, evaluarse y certificarse— con la novedad de integrar inteligencia artificial generativa dentro de Excel mediante una función VBA (`GEMINI_PROMPT2`). Todo se publica como sitio estático en Vercel, sin costos de infraestructura, con un backend de datos (Supabase) solo donde hace falta: las evaluaciones.

## 2. Problema vs Solución

```mermaid
graph LR
    subgraph Problema
        P1[Contenido disperso en clases presenciales]
        P2[Material no descargable ni centralizado]
        P3[Sin medición objetiva del aprendizaje]
        P4[Excel percibido como complejo y tedioso]
    end
    subgraph Solucion[Excel Learning Hub]
        S1[Biblioteca única: teoría, fórmulas, atajos, tips]
        S2[Prácticas y casos reales descargables]
        S3[Certificación en línea con puntaje y resumen]
        S4[IA dentro de Excel: análisis con Gemini]
    end
    Problema --> Solucion
    P1 -.-> S1
    P2 -.-> S2
    P3 -.-> S3
    P4 -.-> S4
```

## 3. Mapeo de valor y capacidades

```mermaid
mindmap
  root((Excel Learning Hub))
    Aprender
      Teoría de Excel
      34 guías de fórmulas
      Atajos de teclado
      Tips y herramientas
    Practicar
      15+ archivos descargables
      Casos PixelWorld y BeatWave
      Infografías visuales
    Certificar
      Tests de 10 preguntas
      Puntaje y retroalimentación
      Registro de resultados
    Innovar
      IA generativa en Excel
      Función VBA GEMINI_PROMPT2
      Consulta de rangos como CSV
```

## 4. Traducción técnico-comercial

| Característica Técnica | Beneficio Directo | Impacto Financiero |
|------------------------|-------------------|--------------------|
| Sitio estático en Vercel | Cero costo de hosting y alta velocidad de carga | Ahorro total en infraestructura |
| Bibliotecas de fórmulas con buscador en vivo | Consulta inmediata: el estudiante encuentra la solución en segundos | Menos tiempo docente resolviendo dudas repetitivas |
| Archivos de práctica con casos empresariales | Aprendizaje por simulación de negocio real | Estudiantes aplican lo aprendido sin perder tiempo buscando material |
| Evaluaciones con persistencia en Supabase | Certificación verificable y trazable | Sustituye exámenes manuales de papel (calificación automática) |
| Función VBA `GEMINI_PROMPT2` | Análisis de datos con IA desde la propia hoja | Habilidad diferencial "Excel + IA" con alta demanda laboral |
| Interfaz responsive (móvil) | Estudio en cualquier dispositivo | Mayor alcance de estudiantes |

## 5. Casos de uso con ROI

> Las métricas de ahorro son **estimaciones** razonables basadas en la estructura del curso; no se han medido con datos de producción.

### Caso A — Certificación del curso (Institución)
- **Situación actual:** corregir exámenes de 30 estudiantes consume ~6 h/docente por evaluación.
- **Con la plataforma:** la corrección es automática (el motor calcula puntaje y guarda el resultado en Supabase).
- **ROI estimado:** ~6 h ahorradas por evaluación × 4 evaluaciones por ciclo = **~24 h por ciclo**, reasignables a docencia. *(Estimación)*

### Caso B — Preparación laboral del estudiante
- **Situación:** los estudiantes dedican horas a buscar tutoriales dispersos.
- **Con la plataforma:** 8 temas de teoría + 34 fórmulas + 6 tips centralizados reducen el tiempo de preparación.
- **ROI estimado:** de 20 h a ~10 h de estudio dirigido por tema. *(Estimación)*

### Caso C — Ventaja diferencial "Excel + IA"
- La función `GEMINI_PROMPT2` permite a cualquier egresado automatizar análisis de tablas con lenguaje natural.
- **Impacto:** perfil más atractivo en procesos de selección; posible premium de sueldo en roles de analista de datos. *(Estimación)*

## 6. Propuesta de expansión

1. **Certificación en Fórmulas** (bloqueada actualmente en `evaluaciones.html` como "Próximamente").
2. **Dashboard docente** sobre la tabla `resultados` para ver promedios por curso.
3. **Más casos empresariales** (nuevas empresas ficticias y sectores).
4. **Suscripción o venta de certificados** con validación en línea.

## Referencias

Detalles técnicos en [ARQUITECTURA_GLOBAL.md](ARQUITECTURA_GLOBAL.md), alcance y módulos en [CONTEXTO_PROYECTO.md](CONTEXTO_PROYECTO.md) y almacenamiento en [PERSISTENCIA.md](PERSISTENCIA.md).
