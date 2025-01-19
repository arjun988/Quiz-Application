import React from "react";
import { CheckCircle, Flag } from "lucide-react";

const OverviewPanel = ({ 
  questions, 
  currentQuestion, 
  setCurrentQuestion, 
  answers,
  flaggedQuestions 
}) => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-2">
        {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuestion(index)}
            className={`relative h-12 rounded-lg font-medium transition-all duration-200 hover:shadow-lg ${
              index === currentQuestion
                ? "bg-blue-600 text-white shadow-blue-500/25"
                : answers[index]
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-700/50 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {answers[index] && (
              <CheckCircle className="absolute top-1 right-1 h-3 w-3 text-green-500" />
            )}
            {flaggedQuestions.has(index) && (
              <Flag className="absolute top-1 left-1 h-3 w-3 text-amber-500" />
            )}
            {index + 1}
          </button>
        ))}
      </div>
      
      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          Answered
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div className="h-3 w-3 rounded-full bg-blue-600"></div>
          Current Question
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div className="h-3 w-3 rounded-full bg-amber-500"></div>
          Flagged for Review
        </div>
      </div>
    </div>
  );
};

export default OverviewPanel;