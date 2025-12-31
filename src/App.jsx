import React, { useState } from 'react';
import { Trophy, XCircle, ChevronRight, RefreshCw, Heart, User, CheckCircle2 } from 'lucide-react';

// Configuración de las preguntas (30 en total)
const QUESTIONS = [
  { id: 1, question: "¿Cuál es mi color favorito?", options: ["Rojo vinotinto", "Azul", "Verde", "Negro"], correct: 0 },
  { id: 2, question: "¿Cuál es mi comida preferida?", options: ["Pizza", "Pasta", "Hamburguesa", "Salchipapa"], correct: 0 },
  { id: 3, question: "¿Qué prefiero?", options: ["Playa", "Montaña", "Ciudad", "Campo"], correct: 3 },
  { id: 4, question: "¿A qué le tengo más miedo?", options: ["Alturas", "Arañas", "Oscuridad", "Soledad"], correct: 3 },
  { id: 5, question: "¿Cuál es mi pasatiempo favorito?", options: ["Leer", "Videojuegos", "Deporte", "Programar"], correct: 3 },
  { id: 6, question: "¿Soy de perros o de gatos?", options: ["Perros", "Gatos", "Ambos", "Ninguno"], correct: 1 },
  { id: 7, question: "¿Cuál es mi género de música favorito?", options: ["Rock", "Pop", "Reggaeton", "Jazz"], correct: 1 },
  { id: 8, question: "¿Qué superpoder elegiría?", options: ["Volar", "Invisibilidad", "Teletransportación", "Superfuerza"], correct: 0 },
  { id: 9, question: "¿Cuál es mi estación del año favorita?", options: ["Primavera", "Verano", "Otoño", "Invierno"], correct: 3 },
  { id: 10, question: "¿Prefiero dulce o salado?", options: ["Dulce", "Salado", "Ambos", "Depende del día"], correct: 2 },
  { id: 11, question: "¿A qué hora suelo despertarme?", options: ["6 AM", "8 AM", "10 AM", "Mediodía"], correct: 1 },
  { id: 12, question: "¿Cuál es mi red social favorita?", options: ["Instagram", "TikTok", "Twitter", "YouTube"], correct: 0 },
  { id: 13, question: "¿Qué tipo de películas prefiero?", options: ["Terror", "Comedia", "Acción", "Drama"], correct: 3 },
  { id: 14, question: "¿Soy una persona madrugadora o nocturna?", options: ["Madrugadora", "Nocturna", "Ninguna", "Ambas"], correct: 3 },
  { id: 15, question: "¿Cuántos hermanos tengo?", options: ["Ninguno", "Uno", "Dos", "Tres o más"], correct: 2 },
  { id: 16, question: "¿Cuál es mi deporte favorito?", options: ["Fútbol", "Baloncesto", "Patinaje", "F1"], correct: 2 },
  { id: 17, question: "¿Qué prefiero tomar?", options: ["Café", "Té", "Cerveza", "Agua"], correct: 0 },
  { id: 18, question: "¿A dónde iría de vacaciones soñadas?", options: ["Japón", "Italia", "Suiza", "Australia"], correct: 2 },
  { id: 19, question: "¿Cuál es mi mayor habilidad?", options: ["Cocinar", "Escuchar", "Dibujar", "Resolver problemas"], correct: 1 },
  { id: 20, question: "¿Soy organizado o desordenado?", options: ["Muy organizado", "Normal", "Desordenado", "Un caos"], correct: 0 },
  { id: 21, question: "¿Qué prefiero en una serie?", options: ["Maratón", "Un capítulo al día", "Verla con alguien", "No veo series"], correct: 3 },
  { id: 22, question: "¿Cuál es mi materia favorita (o era)?", options: ["Matemáticas", "Historia", "Ciencias", "Inglés"], correct: 3 },
  { id: 23, question: "¿Qué instrumento me gustaría tocar?", options: ["Guitarra", "Piano", "Batería", "Violín"], correct: 1 },
  { id: 24, question: "¿Soy introvertido o extrovertido?", options: ["Introvertido", "Extrovertido", "Ambivertido", "Depende"], correct: 1 },
  { id: 25, question: "¿Cuál es mi postre favorito?", options: ["Helado", "Pastel", "Fruta", "Pan"], correct: 3 },
  { id: 26, question: "¿Qué prefiero leer?", options: ["Novelas", "Comics", "Noticias", "No leo"], correct: 0 },
  { id: 27, question: "¿Cuál es mi clima ideal?", options: ["Mucho calor", "Frío polar", "Templado", "Lluvioso"], correct: 3 },
  { id: 28, question: "¿Qué aplicación uso más?", options: ["WhatsApp", "Spotify", "Netflix", "Juegos"], correct: 0 },
  { id: 29, question: "¿Cuál es mi mayor sueño?", options: ["Viajar por el mundo", "Tener éxito laboral", "Formar una familia", "Ser famoso"], correct: 3 },
  { id: 30, question: "¿Qué prefiero en un hombre?", options: ["Alto, lindo y con dinero", "Alto, varonil y dotado", "Gordito, alto y cariñoso", "Todas las anteriores"], correct: 3 },
];

export default function App() {
  const [gameState, setGameState] = useState('START'); // START, NAME_ENTRY, QUIZ, RESULT
  const [userName, setUserName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const totalQuestions = QUESTIONS.length;
  const passThreshold = 0.8; 
  const passingScore = Math.ceil(totalQuestions * passThreshold);

  const startNameEntry = () => setGameState('NAME_ENTRY');

  const startQuiz = () => {
    if (userName.trim().length > 0) {
      setGameState('QUIZ');
      setCurrentQuestion(0);
      setScore(0);
    }
  };

  const handleAnswer = (optionIndex) => {
    const isCorrect = optionIndex === QUESTIONS[currentQuestion].correct;
    
    if (isCorrect) setScore(prev => prev + 1);

    if (currentQuestion + 1 < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameState('RESULT');
    }
  };

  const resetQuiz = () => {
    setGameState('START');
    setUserName('');
    setCurrentQuestion(0);
    setScore(0);
  };

  const hasPassed = score >= passingScore;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-100 flex items-center justify-center p-4 font-sans text-slate-800">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300">
        
        {/* 1. Pantalla de Bienvenida */}
        {gameState === 'START' && (
          <div className="p-8 text-center animate-in fade-in zoom-in duration-500">
            <div className="bg-indigo-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Heart className="text-indigo-600 w-12 h-12 animate-pulse" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Test de Amistad</h1>
            <p className="text-slate-500 mb-8 leading-relaxed">¿Realmente sabes todo sobre mí? Demuéstralo respondiendo este test de 30 preguntas.</p>
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-8 text-sm text-amber-800 text-left">
              <p className="font-bold flex items-center gap-2 mb-1">
                <Trophy className="w-4 h-4" /> Objetivo:
              </p>
              Debes acertar el 80% ({passingScore} respuestas) para considerarte un "Mejor Amigo".
            </div>
            <button 
              onClick={startNameEntry}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 group"
            >
              Continuar
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* 2. Pantalla de Registro de Nombre */}
        {gameState === 'NAME_ENTRY' && (
          <div className="p-8 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">¿Quién eres?</h2>
            <p className="text-slate-500 mb-8">Por favor, escribe tu nombre para empezar el desafío.</p>
            
            <div className="relative mb-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Tu nombre completo"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-lg font-medium"
                autoFocus
              />
            </div>

            <button 
              onClick={startQuiz}
              disabled={userName.trim().length < 2}
              className={`w-full font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                userName.trim().length >= 2 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              Comenzar Test
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* 3. Pantalla de Preguntas */}
        {gameState === 'QUIZ' && (
          <div className="p-6 md:p-8 animate-in fade-in duration-300">
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">Amigo: {userName}</span>
                <h2 className="text-2xl font-bold text-slate-900">
                  {currentQuestion + 1} <span className="text-slate-300">/ {totalQuestions}</span>
                </h2>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Progreso</span>
                <div className="w-24 h-2 bg-slate-100 rounded-full mt-1 overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 transition-all duration-300" 
                    style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mb-8 min-h-[90px] flex items-center">
              <p className="text-xl text-slate-800 leading-snug font-semibold">
                {QUESTIONS[currentQuestion].question}
              </p>
            </div>

            <div className="grid gap-3">
              {QUESTIONS[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="group relative w-full text-left p-4 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 flex items-center gap-4 active:scale-95"
                >
                  <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-indigo-100 flex items-center justify-center font-bold text-slate-400 group-hover:text-indigo-600 transition-colors uppercase">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="font-semibold text-slate-600 group-hover:text-indigo-900">{option}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 4. Pantalla de Resultados Finales */}
        {gameState === 'RESULT' && (
          <div className="p-8 text-center animate-in zoom-in duration-500">
            {hasPassed ? (
              <>
                <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Trophy className="text-green-600 w-12 h-12" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-1">¡Felicidades, {userName}!</h2>
                <p className="text-green-600 font-bold mb-6 text-lg tracking-wide uppercase">Amigo de Verdad Detectado</p>
              </>
            ) : (
              <>
                <div className="bg-rose-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <XCircle className="text-rose-600 w-12 h-12" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-1">Lo siento, {userName}</h2>
                <p className="text-rose-600 font-bold mb-6 text-lg tracking-wide uppercase">Necesitas conocerme más</p>
              </>
            )}

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-tighter">Puntuación Final</p>
                <p className="text-3xl font-black text-slate-800">{score} <span className="text-lg text-slate-400 font-normal">/ {totalQuestions}</span></p>
              </div>
              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-tighter">Porcentaje</p>
                <p className="text-3xl font-black text-slate-800">{Math.round((score / totalQuestions) * 100)}%</p>
              </div>
            </div>

            <div className="space-y-3 mb-8">
                <div className="flex items-center justify-between text-sm p-4 bg-green-50 border border-green-100 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-green-800 font-medium">Aciertos</span>
                  </div>
                  <span className="font-black text-xl text-green-700">{score}</span>
                </div>
                <div className="flex items-center justify-between text-sm p-4 bg-rose-50 border border-rose-100 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-500 flex items-center justify-center">
                      <XCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-rose-800 font-medium">Errores</span>
                  </div>
                  <span className="font-black text-xl text-rose-700">{totalQuestions - score}</span>
                </div>
            </div>

            <button 
              onClick={resetQuiz}
              className="w-full bg-slate-900 hover:bg-black text-white font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95"
            >
              <RefreshCw className="w-5 h-5" />
              Intentar de Nuevo
            </button>
          </div>
        )}

      </div>
    </div>
  );
}