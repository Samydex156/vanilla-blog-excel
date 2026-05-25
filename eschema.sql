-- 1. Tabla de Tests (Para definir qué pruebas existen)
CREATE TABLE tests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  categoria TEXT, -- Ejemplo: 'Excel Básico', 'Excel Avanzado'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabla de Preguntas (Relacionada a cada test)
CREATE TABLE preguntas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  test_id UUID REFERENCES tests(id) ON DELETE CASCADE,
  pregunta_text TEXT NOT NULL,
  opciones JSONB NOT NULL, -- Guardaremos un array: ["Opción A", "Opción B", ...]
  respuesta_correcta INTEGER NOT NULL, -- El índice (0, 1, 2, 3) de la opción correcta
  orden INTEGER DEFAULT 0 -- Para controlar el orden de las preguntas
);

-- 3. Tabla de Resultados (Donde se registran los estudiantes)
CREATE TABLE resultados (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  test_id UUID REFERENCES tests(id),
  nombre_estudiante TEXT NOT NULL,
  curso_estudiante TEXT NOT NULL,
  puntaje INTEGER NOT NULL,
  total_preguntas INTEGER NOT NULL,
  respuestas_usuario JSONB, -- Opcional: para ver qué marcó exactamente
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
