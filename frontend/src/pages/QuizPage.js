import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {  Send, ArrowLeft, ArrowRight, Flag } from "lucide-react";
import fetchData from "../utils/fetchData";
import Timer from "../components/Timer";
import OverviewPanel from "../components/OverviewPanel";
import Question from "../components/Question";

const QuizPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());

  useEffect(() => {
    if (!state?.email) {
      navigate('/', { replace: true });
      return;
    }

    const loadQuestions = async () => {
      try {
        const quizQuestions = await fetchData();
        setQuestions(quizQuestions);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load quiz questions:", error);
      }
    };

    loadQuestions();
  }, [state, navigate]);

  const handleAnswer = (index, answer) => {
    setAnswers(prev => ({ ...prev, [index]: answer }));
  };

  const handleSubmit = () => {
    try {
      sessionStorage.setItem('quizAnswers', JSON.stringify(answers));
      sessionStorage.setItem('quizQuestions', JSON.stringify(questions));
      
      navigate('/report', {
        state: {
          questions,
          answers,
          email: state?.email
        },
        replace: true
      });
    } catch (error) {
      console.error("Navigation error:", error);
      navigate('/report');
    }
  };

  const moveToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const moveToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const toggleFlagQuestion = () => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestion)) {
        newSet.delete(currentQuestion);
      } else {
        newSet.add(currentQuestion);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Quiz Assessment</h1>
            <Timer onTimeUp={handleSubmit} />
          </div>
        </div>

        <div className="grid lg:grid-cols-[350px,1fr] gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-4">Question Overview</h2>
            <OverviewPanel
              questions={questions}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              answers={answers}
              flaggedQuestions={flaggedQuestions}
            />
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                Question {currentQuestion + 1} of {questions.length}
              </h2>
              <button
                onClick={toggleFlagQuestion}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  flaggedQuestions.has(currentQuestion)
                    ? 'bg-amber-500/20 text-amber-500'
                    : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <Flag className="h-5 w-5" />
              </button>
            </div>

            <Question
              data={questions[currentQuestion]}
              onAnswer={(answer) => handleAnswer(currentQuestion, answer)}
              selectedAnswer={answers[currentQuestion]}
            />

            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={moveToPreviousQuestion}
                  disabled={currentQuestion === 0}
                  className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-200"
                >
                  <ArrowLeft className="h-5 w-5" /> Previous
                </button>
                <button
                  onClick={moveToNextQuestion}
                  disabled={currentQuestion === questions.length - 1}
                  className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-200"
                >
                  Next <ArrowRight className="h-5 w-5" />
                </button>
              </div>

              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-6 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
              >
                Submit Quiz <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;