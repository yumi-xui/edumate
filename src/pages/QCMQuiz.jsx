import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import PageHeader from '../components/PageHeader';

const QCMQuiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get quiz data from location state or use sample data
  const quizData = location.state?.quiz || {
    title: 'Quiz de révision',
    questions: [
      {
        id: 1,
        question: 'Quelle est la dérivée de x² ?',
        options: ['2x', 'x', '2', 'x²'],
        correctAnswer: 0,
        explanation: 'La dérivée de x² est 2x.'
      },
      {
        id: 2,
        question: 'Quelle est la formule chimique de l\'eau ?',
        options: ['CO₂', 'H₂O', 'O₂', 'H₂O₂'],
        correctAnswer: 1,
        explanation: 'La formule chimique de l\'eau est H₂O.'
      },
      {
        id: 3,
        question: 'Quelle est la capitale de la France ?',
        options: ['Lyon', 'Marseille', 'Paris', 'Bordeaux'],
        correctAnswer: 2,
        explanation: 'Paris est la capitale de la France.'
      }
    ]
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const totalQuestions = quizData.questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const hasAnswered = selectedAnswers[currentQuestionIndex] !== undefined;
  const isCorrect = hasAnswered && selectedAnswers[currentQuestionIndex] === currentQuestion.correctAnswer;

  const handleAnswerSelect = (answerIndex) => {
    if (!showAnswer) {
      setSelectedAnswers({
        ...selectedAnswers,
        [currentQuestionIndex]: answerIndex
      });
      setShowAnswer(true);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswer(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowAnswer(false);
    }
  };

  const renderQuestion = () => {
    if (showResults) {
      const correctAnswers = Object.entries(selectedAnswers).filter(
        ([index, answer]) => answer === quizData.questions[parseInt(index)].correctAnswer
      ).length;
      
      return (
        <div className="p-6">
          <div className="text-center max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Résultats du quiz</h2>
            
            <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
              <div className="text-5xl font-bold text-[#7A4BC7] mb-2">
                {correctAnswers}/{totalQuestions}
              </div>
              <div className="text-gray-600 mb-6">
                {correctAnswers / totalQuestions >= 0.7 ? 'Félicitations !' : 'Vous pouvez faire mieux !'}
              </div>
              
              <button
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setSelectedAnswers({});
                  setShowResults(false);
                  setShowAnswer(false);
                }}
                className="w-full py-2.5 bg-[#7A4BC7] text-white rounded-lg hover:bg-[#6a3fb0] transition-colors"
              >
                Refaire le quiz
              </button>
            </div>
            
            <button
              onClick={() => navigate('/')}
              className="text-[#7A4BC7] hover:underline"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6 p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-gray-800">Question {currentQuestionIndex + 1}/{totalQuestions}</h2>
            <div className="text-sm text-gray-500">
              {currentQuestionIndex + 1} sur {totalQuestions}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#7A4BC7] h-2 rounded-full transition-all duration-300" 
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">{currentQuestion.question}</h3>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === index;
              const isCorrectOption = index === currentQuestion.correctAnswer;
              let optionClass = 'border-gray-200';
              
              if (showAnswer) {
                if (isCorrectOption) {
                  optionClass = 'border-green-500 bg-green-50';
                } else if (isSelected && !isCorrect) {
                  optionClass = 'border-red-300 bg-red-50';
                }
              } else if (isSelected) {
                optionClass = 'border-[#7A4BC7] bg-blue-50';
              }
              
              return (
                <div 
                  key={index}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${optionClass} ${
                    !showAnswer ? 'hover:border-[#7A4BC7]' : ''
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                      showAnswer && isCorrectOption 
                        ? 'border-green-500 bg-green-100 text-green-600' 
                        : showAnswer && isSelected && !isCorrect 
                          ? 'border-red-300 bg-red-100 text-red-600' 
                          : isSelected 
                            ? 'border-[#7A4BC7] bg-[#7A4BC7] text-white' 
                            : 'border-gray-300'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className={showAnswer && isCorrectOption ? 'text-green-700 font-medium' : ''}>
                      {option}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {showAnswer && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="font-medium text-blue-800">
                {isCorrect ? '✅ Correct !' : '❌ Incorrect. '}
                {!isCorrect && (
                  <span className="block mt-1">
                    La bonne réponse est: <span className="font-semibold">
                      {String.fromCharCode(65 + currentQuestion.correctAnswer)}. {currentQuestion.options[currentQuestion.correctAnswer]}
                    </span>
                  </span>
                )}
              </p>
              {currentQuestion.explanation && (
                <p className="mt-3 text-sm text-gray-700 bg-white p-3 rounded border border-gray-100">
                  💡 {currentQuestion.explanation}
                </p>
              )}
            </div>
          )}

          <div className="flex justify-between pt-6 mt-8 border-t border-gray-200">
            <button
              onClick={handlePreviousQuestion}
              disabled={isFirstQuestion}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium ${
                isFirstQuestion 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-[#7A4BC7] border border-[#7A4BC7] hover:bg-purple-50'
              } transition-colors`}
            >
              ← Précédent
            </button>
            
            <button
              onClick={handleNextQuestion}
              disabled={!hasAnswered && !showAnswer}
              className="px-6 py-2.5 bg-[#7A4BC7] text-white text-sm font-medium rounded-lg hover:bg-[#6a3fb0] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              {isLastQuestion ? 'Voir les résultats' : 'Suivant →'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeMenuItem="quiz" />

      <main className="flex-1 flex flex-col overflow-hidden">
        <PageHeader 
          greeting="Quiz"
          searchPlaceholder="Rechercher..."
        />

        <div className="flex-1 overflow-y-auto bg-[#FFFEEC]">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm my-6">
            {renderQuestion()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QCMQuiz;
