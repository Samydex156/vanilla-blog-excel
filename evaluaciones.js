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

// Inyectar estilos dinámicos para la nueva UX
const dynamicStyles = document.createElement('style');
dynamicStyles.innerHTML = `
    .option-btn.selected {
        background: var(--accent);
        color: white;
        border-color: var(--accent);
    }
    .option-btn.selected span {
        background: white;
        color: var(--accent);
    }
    .nav-buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 2rem;
        gap: 1rem;
    }
    .btn-secondary {
        background: #f1f5f9;
        color: #475569;
        border: 1px solid #cbd5e1;
        padding: 1rem 2rem;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    .btn-secondary:hover {
        background: #e2e8f0;
    }
    .summary-container {
        margin-top: 2rem;
        text-align: left;
    }
    .summary-item {
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        border: 1px solid var(--border);
        background: #fff;
    }
    .summary-item.correct {
        border-left: 5px solid #22c55e;
    }
    .summary-item.incorrect {
        border-left: 5px solid #ef4444;
    }
`;
document.head.appendChild(dynamicStyles);

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
            if(testsList) testsList.innerHTML = '<p class="text-muted">No hay evaluaciones disponibles en este momento.</p>';
            return;
        }

        if(testsList) {
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
        }
    } catch (err) {
        console.error('Error fetching tests:', err);
        if(testsList) testsList.innerHTML = '<p style="color: #ef4444;">Error al cargar las pruebas. Verifica la conexión.</p>';
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

    if (!nameInput.value || (courseInput && !courseInput.value)) {
        alert('Por favor, completa tus datos.');
        return;
    }

    studentData.name = nameInput.value;
    studentData.course = courseInput ? courseInput.value : 'Excel';

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
        userAnswers = new Array(questions.length).fill(null);

        registrationForm.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        
        const currentQuizTitle = document.getElementById('current-quiz-title');
        if(currentQuizTitle) currentQuizTitle.innerText = currentQuiz.titulo;
        
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
    if(questionText) questionText.innerText = question.pregunta_text;
    if(counter) counter.innerText = `Pregunta ${currentIndex + 1} de ${questions.length}`;
    
    if(progressFill) {
        const progress = ((currentIndex) / questions.length) * 100;
        progressFill.style.width = `${progress}%`;
    }

    if(optionsGrid) {
        optionsGrid.innerHTML = '';
        question.opciones.forEach((opcion, index) => {
            const btn = document.createElement('button');
            const isSelected = userAnswers[currentIndex] === index;
            btn.className = `option-btn animate-fade ${isSelected ? 'selected' : ''}`;
            btn.innerHTML = `<span>${String.fromCharCode(65 + index)}</span> ${opcion}`;
            btn.onclick = () => handleAnswer(index);
            optionsGrid.appendChild(btn);
        });
    }

    renderNavButtons();
    window.scrollTo(0, 0);
}

function renderNavButtons() {
    let navContainer = document.getElementById('quiz-nav-buttons-eval');
    if (!navContainer) {
        navContainer = document.createElement('div');
        navContainer.id = 'quiz-nav-buttons-eval';
        navContainer.className = 'nav-buttons';
        // Buscamos question-container o quiz-screen como fallback
        const parent = document.getElementById('question-container') || document.getElementById('quiz-screen');
        if(parent) parent.appendChild(navContainer);
    }
    navContainer.innerHTML = '';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'btn-secondary';
    prevBtn.innerText = '← Anterior';
    prevBtn.style.visibility = currentIndex > 0 ? 'visible' : 'hidden';
    prevBtn.onclick = () => {
        if (currentIndex > 0) {
            currentIndex--;
            renderQuestion();
        }
    };

    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn-primary';
    nextBtn.style.width = 'auto';
    
    if (currentIndex < questions.length - 1) {
        nextBtn.innerText = 'Siguiente →';
        nextBtn.onclick = () => {
            if (userAnswers[currentIndex] === null) {
                alert('Por favor, selecciona una opción antes de continuar.');
                return;
            }
            currentIndex++;
            renderQuestion();
        };
    } else {
        nextBtn.innerText = 'Finalizar Evaluación';
        nextBtn.onclick = () => {
            if (userAnswers[currentIndex] === null) {
                alert('Por favor, selecciona una opción antes de finalizar.');
                return;
            }
            finishQuiz();
        };
    }

    navContainer.appendChild(prevBtn);
    navContainer.appendChild(nextBtn);
}

// 5. Manejar respuesta
function handleAnswer(selectedIndex) {
    userAnswers[currentIndex] = selectedIndex;
    renderQuestion(); // Highlight current option
}

// 6. Finalizar y Guardar
async function finishQuiz() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    const progressFill = document.getElementById('progress-fill');
    if(progressFill) progressFill.style.width = '100%';

    // Calcular puntaje
    let score = 0;
    questions.forEach((q, index) => {
        if (q.respuesta_correcta === userAnswers[index]) {
            score++;
        }
    });

    // Mostrar resultados
    const finalScoreEl = document.getElementById('final-score');
    if(finalScoreEl) finalScoreEl.innerText = score;
    const totalQEl = document.getElementById('total-questions');
    if(totalQEl) totalQEl.innerText = `de ${questions.length}`;

    const feedback = document.getElementById('feedback-text');
    if(feedback) {
        const percent = (score / questions.length) * 100;
        if (percent >= 90) feedback.innerText = '¡Excelente trabajo! Dominas el tema.';
        else if (percent >= 70) feedback.innerText = '¡Muy bien! Tienes buen conocimiento.';
        else if (percent >= 51) feedback.innerText = 'Aprobado. Sigue practicando para mejorar.';
        else feedback.innerText = 'Sigue estudiando, ¡tú puedes mejorar!';
    }

    renderSummary();

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

function renderSummary() {
    let summaryContainer = document.getElementById('quiz-summary-eval');
    if (!summaryContainer) {
        summaryContainer = document.createElement('div');
        summaryContainer.id = 'quiz-summary-eval';
        summaryContainer.className = 'summary-container';
        // Append before any "Back to menu" button inside result-screen
        const rScreen = document.getElementById('result-screen');
        if(rScreen) rScreen.insertBefore(summaryContainer, rScreen.lastElementChild);
    }
    
    summaryContainer.innerHTML = '<h3 style="margin-bottom: 1.5rem; text-align: center;">Resumen de tus respuestas:</h3>';

    questions.forEach((q, index) => {
        const userAnswerIndex = userAnswers[index];
        const isCorrect = userAnswerIndex === q.respuesta_correcta;
        
        const item = document.createElement('div');
        item.className = `summary-item ${isCorrect ? 'correct' : 'incorrect'}`;
        
        let html = `<p style="font-weight: 600; margin-bottom: 0.5rem;">${index + 1}. ${q.pregunta_text}</p>`;
        html += `<p style="margin-bottom: 0.25rem; color: ${isCorrect ? '#16a34a' : '#dc2626'}">`;
        html += `<strong>Tu respuesta:</strong> ${q.opciones[userAnswerIndex] || 'Sin responder'}</p>`;
        
        if (!isCorrect) {
            html += `<p style="color: #16a34a"><strong>Respuesta correcta:</strong> ${q.opciones[q.respuesta_correcta]}</p>`;
        }
        
        item.innerHTML = html;
        summaryContainer.appendChild(item);
    });
}

