// Configuración de Supabase
const SUPABASE_URL = 'https://qnblolwvnyjfvlrihksw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_6drmMIMEr0e87xho9RHo2A_0iayMzdq'; 
const sbClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let questions = [];
let currentIndex = 0;
let userAnswers = [];
let studentName = '';
let testId = ''; // Se debe definir en el HTML de cada test

async function initQuiz(id, localQuestions = null) {
    testId = id;

    if (localQuestions) {
        questions = localQuestions;
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
    document.getElementById('question-counter').innerText = `Pregunta ${currentIndex + 1} de 10`;
    
    const progress = (currentIndex / 10) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;

    const optionsGrid = document.getElementById('options-grid');
    optionsGrid.innerHTML = '';
    
    // Soporte para Falso/Verdadero (si solo hay 2 opciones)
    if (question.opciones.length === 2) {
        optionsGrid.style.gridTemplateColumns = '1fr 1fr';
    } else {
        optionsGrid.style.gridTemplateColumns = '1fr';
    }

    question.opciones.forEach((opcion, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn animate-fade darker-option';
        btn.innerHTML = `<span>${String.fromCharCode(65 + index)}</span> ${opcion}`;
        btn.onclick = () => handleAnswer(index);
        optionsGrid.appendChild(btn);
    });
}

function handleAnswer(selectedIndex) {
    userAnswers.push(selectedIndex);
    if (currentIndex < 9) { // Hasta la pregunta 10 (index 9)
        currentIndex++;
        renderQuestion();
    } else {
        finishQuiz();
    }
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
    
    // Guardar en Supabase - Curso auto "Excel"
    await sbClient.from('resultados').insert([
        {
            test_id: testId,
            nombre_estudiante: studentName,
            curso_estudiante: 'Excel',
            puntaje: score,
            total_preguntas: 10,
            respuestas_usuario: userAnswers
        }
    ]);
}
