// Configuración de Supabase
const SUPABASE_URL = 'https://qnblolwvnyjfvlrihksw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_6drmMIMEr0e87xho9RHo2A_0iayMzdq'; 
const sbClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let questions = [];
let currentIndex = 0;
let userAnswers = [];
let studentName = '';
let testId = ''; // Se debe definir en el HTML de cada test

// Inyectar estilos dinámicos para la nueva UX
const dynamicStyles = document.createElement('style');
dynamicStyles.innerHTML = `
    .option-btn.selected {
        background: var(--accent) !important;
        color: white !important;
        border-color: var(--accent) !important;
    }
    .option-btn.selected:hover {
        background: var(--accent) !important;
        color: white !important;
        border-color: var(--accent) !important;
        opacity: 0.9;
    }
    .option-btn.selected span {
        background: white !important;
        color: var(--accent) !important;
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

async function initQuiz(id, localQuestions = null) {
    testId = id;

    if (localQuestions) {
        questions = localQuestions;
        userAnswers = new Array(questions.length).fill(null);
        renderQuestion();
        return;
    }

    const { data, error } = await sbClient
        .from('preguntas')
        .select('*')
        .eq('test_id', testId)
        .order('orden', { ascending: true })
        .limit(10); // Siempre 10 preguntas

    if (error || data.length === 0) {
        alert('Error al cargar preguntas o el test no tiene 10 preguntas.');
        return;
    }

    questions = data;
    userAnswers = new Array(questions.length).fill(null);
    renderQuestion();
}

function startQuiz() {
    const nameInput = document.getElementById('student-name');
    if (!nameInput.value) {
        alert('Por favor, ingresa tu nombre completo.');
        return;
    }
    studentName = nameInput.value;
    document.getElementById('registration-form').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
}

function renderQuestion() {
    const question = questions[currentIndex];
    document.getElementById('question-text').innerText = question.pregunta_text;
    document.getElementById('question-counter').innerText = `Pregunta ${currentIndex + 1} de ${questions.length}`;
    
    const progress = (currentIndex / questions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;

    const optionsGrid = document.getElementById('options-grid');
    optionsGrid.innerHTML = '';
    
    if (question.opciones.length === 2) {
        optionsGrid.style.gridTemplateColumns = '1fr 1fr';
    } else {
        optionsGrid.style.gridTemplateColumns = '1fr';
    }

    question.opciones.forEach((opcion, index) => {
        const btn = document.createElement('button');
        const isSelected = userAnswers[currentIndex] === index;
        btn.className = `option-btn animate-fade darker-option ${isSelected ? 'selected' : ''}`;
        btn.innerHTML = `<span>${String.fromCharCode(65 + index)}</span> ${opcion}`;
        btn.onclick = () => handleAnswer(index);
        optionsGrid.appendChild(btn);
    });

    renderNavButtons();
}

function renderNavButtons() {
    let navContainer = document.getElementById('quiz-nav-buttons');
    if (!navContainer) {
        navContainer = document.createElement('div');
        navContainer.id = 'quiz-nav-buttons';
        navContainer.className = 'nav-buttons';
        document.getElementById('question-container').appendChild(navContainer);
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

function handleAnswer(selectedIndex) {
    userAnswers[currentIndex] = selectedIndex;
    renderQuestion(); // Re-render to highlight the selected option
}

async function finishQuiz() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('progress-fill').style.width = '100%';

    let score = 0;
    questions.forEach((q, index) => {
        if (q.respuesta_correcta === userAnswers[index]) score += 10;
    });

    document.getElementById('final-score').innerText = score;
    
    renderSummary();

    // Guardar en Supabase - Curso auto "Excel"
    await sbClient.from('resultados').insert([
        {
            test_id: testId,
            nombre_estudiante: studentName,
            curso_estudiante: 'Excel',
            puntaje: score,
            total_preguntas: questions.length,
            respuestas_usuario: userAnswers
        }
    ]);
}

function renderSummary() {
    let summaryContainer = document.getElementById('quiz-summary');
    if (!summaryContainer) {
        summaryContainer = document.createElement('div');
        summaryContainer.id = 'quiz-summary';
        summaryContainer.className = 'summary-container';
        // Append before the finish button
        const resultScreen = document.getElementById('result-screen');
        resultScreen.insertBefore(summaryContainer, resultScreen.lastElementChild);
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
