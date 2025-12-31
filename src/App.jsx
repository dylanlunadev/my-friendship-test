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
  { id: 30, question: "¿Qué animal exotico quiero tener?", options: ["Zorro del desierto", "Serpiente", "Tiburones pequeños", "Medusas"], correct: 0 },
];

export default function App() {
  const [gameState, setGameState] = useState('START'); // START, NAME_ENTRY, QUIZ, RESULT
  const [userName, setUserName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); // Guardamos { selected, correct, isCorrect, question }
  const [showReview, setShowReview] = useState(false);

  const totalQuestions = QUESTIONS.length;
  const passThreshold = 0.8; 
  const passingScore = Math.ceil(totalQuestions * passThreshold);

  const startNameEntry = () => setGameState('NAME_ENTRY');

  const startQuiz = () => {
    if (userName.trim().length > 0) {
      setGameState('QUIZ');
      setCurrentQuestion(0);
      setUserAnswers([]);
      setShowReview(false);
    }
  };

  const handleAnswer = (optionIndex) => {
    const questionData = QUESTIONS[currentQuestion];
    const isCorrect = optionIndex === questionData.correct;
    
    const answerLog = {
      question: questionData.question,
      selectedLabel: questionData.options[optionIndex],
      correctLabel: questionData.options[questionData.correct],
      isCorrect
    };

    setUserAnswers([...userAnswers, answerLog]);

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
    setUserAnswers([]);
    setShowReview(false);
  };

  const score = userAnswers.filter(a => a.isCorrect).length;
  const hasPassed = score >= passingScore;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 flex items-center justify-center p-4 font-sans text-slate-800">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 my-8">
        
        {/* 1. Pantalla de Bienvenida */}
        {gameState === 'START' && (
          <div className="p-8 text-center animate-in fade-in zoom-in duration-500">
            <div className="bg-indigo-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Heart className="text-indigo-600 w-12 h-12 animate-pulse" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Test de Amistad</h1>
            <p className="text-slate-500 mb-8 leading-relaxed">¿Realmente sabes todo sobre mí? Demuéstralo respondiendo este test de {totalQuestions} preguntas.</p>
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-8 text-sm text-amber-800 text-left">
              <p className="font-bold flex items-center gap-2 mb-1">
                <Trophy className="w-4 h-4 text-amber-600" /> Objetivo de Amigo:
              </p>
              Debes acertar al menos el 80% ({passingScore} respuestas) para ganar el test.
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
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Identifícate</h2>
            <p className="text-slate-500 mb-8">Escribe tu nombre para saber quién está haciendo el test.</p>
            
            <div className="relative mb-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Ej: Juan Pérez"
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
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 px-2 py-1 rounded">Usuario: {userName}</span>
                <h2 className="text-2xl font-bold text-slate-900 mt-2">
                  {currentQuestion + 1} <span className="text-slate-300 text-lg">/ {totalQuestions}</span>
                </h2>
              </div>
              <div className="text-right">
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
                  className="group relative w-full text-left p-4 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 flex items-center gap-4 active:scale-[0.98]"
                >
                  <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-indigo-100 flex items-center justify-center font-bold text-slate-400 group-hover:text-indigo-600 transition-colors uppercase text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="font-semibold text-slate-600 group-hover:text-indigo-900 leading-tight">{option}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 4. Pantalla de Resultados Finales */}
        {gameState === 'RESULT' && (
          <div className="animate-in fade-in duration-500 max-h-[85vh] overflow-y-auto custom-scrollbar">
            <div className="p-8 text-center sticky top-0 bg-white z-10 border-b border-slate-50">
              {hasPassed ? (
                <>
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Trophy className="text-green-600 w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-1">¡Increíble, {userName}!</h2>
                  <p className="text-green-600 font-bold mb-4 text-xs tracking-widest uppercase italic">Amigo nivel Experto</p>
                </>
              ) : (
                <>
                  <div className="bg-rose-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <XCircle className="text-rose-600 w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-1">Uff, {userName}...</h2>
                  <p className="text-rose-600 font-bold mb-4 text-xs tracking-widest uppercase italic">Necesitas ponerme más atención</p>
                </>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Puntos</p>
                  <p className="text-2xl font-black text-slate-800">{score} / {totalQuestions}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Efectividad</p>
                  <p className="text-2xl font-black text-slate-800">{Math.round((score / totalQuestions) * 100)}%</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Botón de revisión colapsable */}
              <button 
                onClick={() => setShowReview(!showReview)}
                className="w-full flex items-center justify-between p-4 bg-slate-900 text-white rounded-2xl font-bold transition-all hover:bg-black"
              >
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  {showReview ? 'Ocultar Revisión' : 'Ver en qué fallaste'}
                </div>
                {showReview ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>

              {showReview && (
                <div className="space-y-3 animate-in slide-in-from-top-4 duration-300 pb-4">
                  <h3 className="text-sm font-black text-slate-400 uppercase px-2 mb-4">Detalle de respuestas:</h3>
                  {userAnswers.map((ans, idx) => (
                    <div 
                      key={idx} 
                      className={`p-4 rounded-2xl border ${
                        ans.isCorrect ? 'bg-green-50 border-green-100' : 'bg-rose-50 border-rose-100'
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                          ans.isCorrect ? 'bg-green-500' : 'bg-rose-500'
                        }`}>
                          {ans.isCorrect ? <CheckCircle2 className="w-3 h-3 text-white" /> : <XCircle className="w-3 h-3 text-white" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-slate-800 mb-2 leading-tight">{idx + 1}. {ans.question}</p>
                          <div className="grid grid-cols-1 gap-1 text-xs">
                            <p className={`${ans.isCorrect ? 'text-green-700' : 'text-rose-700'} font-medium`}>
                              Tu respuesta: <span className="font-bold underline">{ans.selectedLabel}</span>
                            </p>
                            {!ans.isCorrect && (
                              <p className="text-slate-600 font-medium">
                                Respuesta correcta: <span className="text-green-600 font-bold">{ans.correctLabel}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button 
                onClick={resetQuiz}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
              >
                <RefreshCw className="w-5 h-5" />
                Volver al Inicio
              </button>
            </div>
          </div>
        )}

      </div>
      
      {/* Estilos para una barra de scroll personalizada si hay muchas preguntas */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}} />
    </div>
  );
}
