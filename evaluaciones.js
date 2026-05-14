// Configuración de Supabase
const SUPABASE_URL = 'https://qnblolwvnyjfvlrihksw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_6drmMIMEr0e87xho9RHo2A_0iayMzdq'; // Usamos la publishable key
const sbClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Estado de la aplicación
let currentQuiz = null;
let questions = [];
let currentIndex = 0;
let userAnswers = [];
let studentData = {
    name: '',
    course: ''
};

// Elementos del DOM
const testsList = document.getElementById('tests-list');
const registrationForm = document.getElementById('registration-form');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const testsSelection = document.getElementById('tests-selection');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    fetchTests();
    
    document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
});

// 1. Obtener lista de pruebas
async function fetchTests() {
    try {
        const { data, error } = await sbClient
            .from('tests')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        if (data.length === 0) {
            testsList.innerHTML = '<p class="text-muted">No hay evaluaciones disponibles en este momento.</p>';
            return;
        }

        testsList.innerHTML = '';
        data.forEach(test => {
            const card = document.createElement('div');
            card.className = 'test-card';
            card.innerHTML = `
                <div>
                    <h3 style="margin-bottom: 0.25rem;">${test.titulo}</h3>
                    <p style="font-size: 0.9rem; color: var(--text-secondary);">${test.descripcion || 'Sin descripción'}</p>
                </div>
                <span class="tag" style="background: var(--accent-soft); color: var(--accent); border: none;">${test.categoria || 'General'}</span>
            `;
            card.onclick = () => selectTest(test);
            testsList.appendChild(card);
        });
    } catch (err) {
        console.error('Error fetching tests:', err);
        testsList.innerHTML = '<p style="color: #ef4444;">Error al cargar las pruebas. Verifica la conexión.</p>';
    }
}

// 2. Seleccionar un test
function selectTest(test) {
    currentQuiz = test;
    testsSelection.classList.add('hidden');
    registrationForm.classList.remove('hidden');
    window.scrollTo(0, 0);
}

// 3. Comenzar el Quiz (después del registro)
async function startQuiz() {
    const nameInput = document.getElementById('student-name');
    const courseInput = document.getElementById('student-course');

    if (!nameInput.value || !courseInput.value) {
        alert('Por favor, completa tus datos.');
        return;
    }

    studentData.name = nameInput.value;
    studentData.course = courseInput.value;

    // Cargar preguntas
    try {
        const { data, error } = await sbClient
            .from('preguntas')
            .select('*')
            .eq('test_id', currentQuiz.id)
            .order('orden', { ascending: true });

        if (error) throw error;
        if (data.length === 0) {
            alert('Este test no tiene preguntas configuradas aún.');
            return;
        }

        questions = data;
        currentIndex = 0;
        userAnswers = [];

        registrationForm.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        document.getElementById('current-quiz-title').innerText = currentQuiz.titulo;
        
        renderQuestion();
    } catch (err) {
        console.error('Error fetching questions:', err);
        alert('Error al cargar las preguntas.');
    }
}

// 4. Renderizar pregunta actual
function renderQuestion() {
    const question = questions[currentIndex];
    const questionText = document.getElementById('question-text');
    const optionsGrid = document.getElementById('options-grid');
    const counter = document.getElementById('question-counter');
    const progressFill = document.getElementById('progress-fill');

    // Actualizar UI
    questionText.innerText = question.pregunta_text;
    counter.innerText = `Pregunta ${currentIndex + 1} de ${questions.length}`;
    
    const progress = ((currentIndex) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;

    optionsGrid.innerHTML = '';
    question.opciones.forEach((opcion, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn animate-fade';
        btn.innerHTML = `<span>${String.fromCharCode(65 + index)}</span> ${opcion}`;
        btn.onclick = () => handleAnswer(index);
        optionsGrid.appendChild(btn);
    });
    
    window.scrollTo(0, 0);
}

// 5. Manejar respuesta
function handleAnswer(selectedIndex) {
    userAnswers.push(selectedIndex);

    if (currentIndex < questions.length - 1) {
        currentIndex++;
        renderQuestion();
    } else {
        finishQuiz();
    }
}

// 6. Finalizar y Guardar
async function finishQuiz() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    document.getElementById('progress-fill').style.width = '100%';

    // Calcular puntaje
    let score = 0;
    questions.forEach((q, index) => {
        if (q.respuesta_correcta === userAnswers[index]) {
            score++;
        }
    });

    // Mostrar resultados
    document.getElementById('final-score').innerText = score;
    document.getElementById('total-questions').innerText = `de ${questions.length}`;

    const feedback = document.getElementById('feedback-text');
    const percent = (score / questions.length) * 100;
    
    if (percent >= 90) feedback.innerText = '¡Excelente trabajo! Dominas el tema.';
    else if (percent >= 70) feedback.innerText = '¡Muy bien! Tienes buen conocimiento.';
    else if (percent >= 51) feedback.innerText = 'Aprobado. Sigue practicando para mejorar.';
    else feedback.innerText = 'Sigue estudiando, ¡tú puedes mejorar!';

    // Guardar en Supabase
    try {
        const { error } = await sbClient
            .from('resultados')
            .insert([
                {
                    test_id: currentQuiz.id,
                    nombre_estudiante: studentData.name,
                    curso_estudiante: studentData.course,
                    puntaje: score,
                    total_preguntas: questions.length,
                    respuestas_usuario: userAnswers
                }
            ]);

        if (error) throw error;
        console.log('Resultado guardado con éxito');
    } catch (err) {
        console.error('Error saving result:', err);
        alert('Hubo un problema al guardar tu nota, pero el examen fue completado.');
    }
}
