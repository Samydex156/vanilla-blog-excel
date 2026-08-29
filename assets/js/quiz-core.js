// quiz-core.js — Motor de evaluaciones estático (sin Supabase)

let questions = [];
let currentIndex = 0;
let userAnswers = [];
let studentName = '';

// Inyectar estilos dinámicos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
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
});

// Barajar array (Fisher-Yates)
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Inicializar quiz con preguntas locales
function initQuiz(preguntasArray) {
    questions = shuffleArray([...preguntasArray]);
    userAnswers = new Array(questions.length).fill(null);
    currentIndex = 0;
}

// Comenzar quiz (tras registro)
function startQuiz() {
    try {
        const nameInput = document.getElementById('student-name');
        if (!nameInput || !nameInput.value.trim()) {
            alert('Por favor, ingresa tu nombre completo.');
            return;
        }
        studentName = nameInput.value.trim();
        const regForm = document.getElementById('registration-form');
        const quizScreen = document.getElementById('quiz-screen');
        if (!regForm || !quizScreen) {
            alert('Error: no se encontraron los elementos del quiz.');
            return;
        }
        regForm.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        renderQuestion();
    } catch (e) {
        alert('Error al iniciar el quiz: ' + e.message);
    }
}

// Renderizar pregunta actual
function renderQuestion() {
    try {
        const question = questions[currentIndex];
        if (!question) return;

        const questionText = document.getElementById('question-text');
        const counter = document.getElementById('question-counter');
        const progressFill = document.getElementById('progress-fill');
        const optionsGrid = document.getElementById('options-grid');

        if (questionText) questionText.innerText = question.pregunta;
        if (counter) counter.innerText = `Pregunta ${currentIndex + 1} de ${questions.length}`;
        if (progressFill) progressFill.style.width = `${(currentIndex / questions.length) * 100}%`;

        if (!optionsGrid) return;
        optionsGrid.innerHTML = '';

        if (question.tipo === 'vf') {
            optionsGrid.style.gridTemplateColumns = '1fr 1fr';
            ['Verdadero', 'Falso'].forEach((opcion, index) => {
                const btn = document.createElement('button');
                const isSelected = userAnswers[currentIndex] === index;
                btn.className = `option-btn animate-fade ${isSelected ? 'selected' : ''}`;
                btn.innerHTML = `<span>${String.fromCharCode(65 + index)}</span> ${opcion}`;
                btn.onclick = () => handleAnswer(index);
                optionsGrid.appendChild(btn);
            });
        } else {
            optionsGrid.style.gridTemplateColumns = '1fr';
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
    } catch (e) {
        console.error('Error en renderQuestion:', e);
    }
}

// Renderizar botones de navegación
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

// Manejar respuesta seleccionada
function handleAnswer(selectedIndex) {
    userAnswers[currentIndex] = selectedIndex;
    renderQuestion();
}

// Finalizar y mostrar resultados
function finishQuiz() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('progress-fill').style.width = '100%';

    let score = 0;
    questions.forEach((q, index) => {
        if (q.respuesta === userAnswers[index]) score += 10;
    });

    document.getElementById('final-score').innerText = score;

    const nameDisplay = document.getElementById('student-name-display');
    if (nameDisplay) nameDisplay.innerText = `Estudiante: ${studentName}`;

    const feedback = document.getElementById('feedback-text');
    if (feedback) {
        if (score >= 90) feedback.innerText = '¡Excelente trabajo! Dominas el tema.';
        else if (score >= 70) feedback.innerText = '¡Muy bien! Tienes buen conocimiento.';
        else if (score >= 50) feedback.innerText = 'Aprobado. Sigue practicando para mejorar.';
        else feedback.innerText = 'Sigue estudiando, ¡tú puedes mejorar!';
    }

    renderSummary();
}

// Renderizar resumen de respuestas
function renderSummary() {
    let summaryContainer = document.getElementById('quiz-summary');
    if (!summaryContainer) {
        summaryContainer = document.createElement('div');
        summaryContainer.id = 'quiz-summary';
        summaryContainer.className = 'summary-container';
        const resultScreen = document.getElementById('result-screen');
        resultScreen.insertBefore(summaryContainer, resultScreen.lastElementChild);
    }

    summaryContainer.innerHTML = '<h3 style="margin-bottom: 1.5rem; text-align: center;">Resumen de tus respuestas:</h3>';

    questions.forEach((q, index) => {
        const userAnswerIndex = userAnswers[index];
        const isCorrect = userAnswerIndex === q.respuesta;

        const item = document.createElement('div');
        item.className = `summary-item ${isCorrect ? 'correct' : 'incorrect'}`;

        let textoRespuesta;
        if (q.tipo === 'vf') {
            textoRespuesta = userAnswerIndex === 0 ? 'Verdadero' : 'Falso';
        } else {
            textoRespuesta = q.opciones[userAnswerIndex] || 'Sin responder';
        }

        let textoCorrecta;
        if (q.tipo === 'vf') {
            textoCorrecta = q.respuesta === 0 ? 'Verdadero' : 'Falso';
        } else {
            textoCorrecta = q.opciones[q.respuesta];
        }

        let html = `<p style="font-weight: 600; margin-bottom: 0.5rem;">${index + 1}. ${q.pregunta}</p>`;
        html += `<p style="margin-bottom: 0.25rem; color: ${isCorrect ? '#16a34a' : '#dc2626'}">`;
        html += `<strong>Tu respuesta:</strong> ${textoRespuesta}</p>`;

        if (!isCorrect) {
            html += `<p style="color: #16a34a"><strong>Respuesta correcta:</strong> ${textoCorrecta}</p>`;
        }

        item.innerHTML = html;
        summaryContainer.appendChild(item);
    });
}
