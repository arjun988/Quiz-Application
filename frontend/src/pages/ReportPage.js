import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  CheckCircle, 
  XCircle, 
  Download, 
  Trophy, 
  Home,
  Circle,
  BarChart3,
  ChevronDown
} from "lucide-react";

const ReportPage = () => {
  const { state: locationState } = useLocation();
  const navigate = useNavigate();
  const [reportData, setReportData] = useState({
    questions: locationState?.questions || [],
    answers: locationState?.answers || {}
  });
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    if (!locationState?.questions || !locationState?.answers) {
      const storedAnswers = sessionStorage.getItem('quizAnswers');
      const storedQuestions = sessionStorage.getItem('quizQuestions');
      
      if (!storedAnswers || !storedQuestions) {
        navigate('/', { replace: true });
        return;
      }

      setReportData({
        questions: JSON.parse(storedQuestions),
        answers: JSON.parse(storedAnswers)
      });
    }
    // Add animation delay for initial load
    setTimeout(() => setIsPageLoaded(true), 100);
  }, [locationState, navigate]);

  const calculateScore = () => {
    if (!reportData.questions.length || !Object.keys(reportData.answers).length) return 0;
    
    let correct = 0;
    reportData.questions.forEach((q, index) => {
      if (reportData.answers[index] === q.correct) correct++;
    });
    return (correct / reportData.questions.length) * 100;
  };

  const calculateStats = () => {
    const total = reportData.questions.length;
    const attempted = Object.keys(reportData.answers).length;
    const correct = reportData.questions.reduce((acc, q, index) => 
      acc + (reportData.answers[index] === q.correct ? 1 : 0), 0);
    const incorrect = attempted - correct;
    const skipped = total - attempted;

    return { total, attempted, correct, incorrect, skipped };
  };

  const downloadReport = () => {
    const score = calculateScore();
    const stats = calculateStats();
    
    let reportContent = `Quiz Report\n\n`;
    reportContent += `Final Score: ${score.toFixed(1)}%\n\n`;
    reportContent += `Statistics:\n`;
    reportContent += `Total Questions: ${stats.total}\n`;
    reportContent += `Attempted: ${stats.attempted}\n`;
    reportContent += `Correct: ${stats.correct}\n`;
    reportContent += `Incorrect: ${stats.incorrect}\n`;
    reportContent += `Skipped: ${stats.skipped}\n\n`;
    reportContent += `Detailed Questions and Answers:\n\n`;

    reportData.questions.forEach((q, index) => {
      reportContent += `Question ${index + 1}: ${q.question}\n`;
      reportContent += `Your Answer: ${reportData.answers[index] || "Not Attempted"}\n`;
      reportContent += `Correct Answer: ${q.correct}\n\n`;
    });

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quiz-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const ScoreRing = ({ score }) => {
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-blue-900/20"
          />
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-blue-400 transition-all duration-1000 ease-out"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isPageLoaded ? strokeDashoffset : circumference}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-blue-400">
            {score.toFixed(0)}%
          </span>
        </div>
      </div>
    );
  };

  if (!reportData.questions.length || !Object.keys(reportData.answers).length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="animate-pulse text-white flex items-center gap-2">
          <Circle className="animate-spin h-5 w-5" />
          Loading your results...
        </div>
      </div>
    );
  }

  const stats = calculateStats();
  const score = calculateScore();

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-gray-700">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Quiz Report
            </h1>
            <div className="flex gap-3">
              <button
                onClick={downloadReport}
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-200 hover:scale-105"
              >
                <Download className="h-5 w-5" /> Download Report
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-200 hover:scale-105"
              >
                <Home className="h-5 w-5" /> New Quiz
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/20 rounded-xl p-6 border border-blue-500/20 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Trophy className="h-6 w-6 text-blue-400" />
                    <h2 className="text-xl font-semibold text-white">Final Score</h2>
                  </div>
                  <p className="text-sm text-blue-300/80">
                    {stats.correct} correct out of {stats.total} questions
                  </p>
                </div>
                <ScoreRing score={score} />
              </div>
            </div>

            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="h-6 w-6 text-gray-400" />
                <h2 className="text-xl font-semibold text-white">Statistics</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="transform transition-all duration-300 hover:scale-105">
                  <p className="text-gray-400">Total Questions</p>
                  <p className="text-2xl font-semibold text-white">{stats.total}</p>
                </div>
                <div className="transform transition-all duration-300 hover:scale-105">
                  <p className="text-gray-400">Attempted</p>
                  <p className="text-2xl font-semibold text-white">{stats.attempted}</p>
                </div>
                <div className="transform transition-all duration-300 hover:scale-105">
                  <p className="text-green-400">Correct</p>
                  <p className="text-2xl font-semibold text-white">{stats.correct}</p>
                </div>
                <div className="transform transition-all duration-300 hover:scale-105">
                  <p className="text-red-400">Incorrect</p>
                  <p className="text-2xl font-semibold text-white">{stats.incorrect}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {reportData.questions.map((q, index) => (
              <div
                key={index}
                className={`transform transition-all duration-300 ${
                  expandedQuestion === index ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                }`}
              >
                <button
                  onClick={() => setExpandedQuestion(expandedQuestion === index ? null : index)}
                  className="w-full p-6 bg-gray-700/30 rounded-xl border border-gray-600 hover:bg-gray-700/40 transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-800 rounded-lg p-2 text-gray-400">
                      Q{index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-lg text-white font-medium">
                          {q.question}
                        </p>
                        <ChevronDown 
                          className={`h-5 w-5 text-gray-400 transform transition-transform duration-300 ${
                            expandedQuestion === index ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                      <div className={`mt-4 space-y-3 overflow-hidden transition-all duration-300 ${
                        expandedQuestion === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">Your Answer:</span>
                          <span className="text-white font-medium">
                            {reportData.answers[index] || "Not Attempted"}
                          </span>
                          {reportData.answers[index] === q.correct ? (
                            <CheckCircle className="text-green-500 h-5 w-5" />
                          ) : (
                            <XCircle className="text-red-500 h-5 w-5" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">Correct Answer:</span>
                          <span className="text-green-400 font-medium">{q.correct}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;