import React from "react";

const decodeHTML = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const Question = ({ data, onAnswer, selectedAnswer }) => {
  const decodedQuestion = decodeHTML(data.question);
  
  return (
    <div className="bg-gray-900/30 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6">{decodedQuestion}</h2>
      <div className="space-y-3">
        {data.options.map((option, index) => {
          const decodedOption = decodeHTML(option);
          return (
            <button
              key={index}
              onClick={() => onAnswer(decodedOption)}
              className={`w-full text-left p-4 rounded-lg transition-all duration-200 hover:shadow-lg ${
                selectedAnswer === decodedOption
                  ? "bg-blue-600 text-white shadow-blue-500/25"
                  : "bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:shadow-gray-500/25"
              } flex items-center gap-3`}
            >
              <span className={`flex items-center justify-center h-6 w-6 rounded-full border ${
                selectedAnswer === decodedOption
                  ? "border-white"
                  : "border-gray-500"
              }`}>
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1">{decodedOption}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Question;