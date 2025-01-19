import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Mail, 
  ArrowRight, 
  Brain, 
  Clock, 
  CheckCircle2, 
  BookOpen,
  AlertCircle,
  Sparkles,
  Trophy
} from "lucide-react";

const StartPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleStart = () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    navigate("/quiz", { state: { email } });
  };

  const features = [
    {
      icon: <Brain className="h-6 w-6 text-blue-400" />,
      title: "Adaptive Questions",
      description: "Questions tailored to test your knowledge effectively",
      delay: "100"
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-400" />,
      title: "Timed Sessions",
      description: "Complete the quiz within the allocated time",
      delay: "200"
    },
    {
      icon: <CheckCircle2 className="h-6 w-6 text-blue-400" />,
      title: "Instant Results",
      description: "Get detailed feedback right after completion",
      delay: "300"
    },
    {
      icon: <BookOpen className="h-6 w-6 text-blue-400" />,
      title: "Comprehensive Report",
      description: "Download detailed analysis of your performance",
      delay: "400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000" />
      </div>

      <div className={`w-full max-w-6xl grid lg:grid-cols-[1.2fr,1.8fr] gap-8 items-center opacity-0 translate-y-4 ${
        mounted ? 'animate-in fade-in slide-in-from-bottom-4 duration-1000 opacity-100 translate-y-0' : ''
      }`}>
        <div className="relative">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full filter blur-2xl" />
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-700/50 relative overflow-hidden group hover:border-blue-500/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="mb-8 relative">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-6 w-6 text-blue-400" />
                <span className="text-blue-400 font-medium">Quiz Platform</span>
              </div>
              <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
                Challenge Your Knowledge
              </h1>
              <p className="text-gray-400 text-lg">
                Test yourself with our adaptive quiz system and track your progress.
              </p>
            </div>

            <div className="space-y-4 relative">
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-colors group-hover:text-blue-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  className={`w-full bg-gray-700/50 text-white placeholder-gray-400 rounded-lg pl-12 pr-4 py-4 outline-none transition-all duration-300 border ${
                    error ? 'border-red-500 focus:ring-2 focus:ring-red-500' 
                    : 'border-gray-600 focus:ring-2 focus:ring-blue-500 hover:border-blue-400/50'
                  }`}
                  onKeyPress={(e) => e.key === 'Enter' && handleStart()}
                />
              </div>
              
              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm animate-in slide-in-from-top duration-200">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              <button
                onClick={handleStart}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Quiz <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 group relative overflow-hidden opacity-0 translate-y-4 ${
                mounted ? `animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-${feature.delay} opacity-100 translate-y-0` : ''
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="bg-blue-500/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  {feature.title}
                  <Sparkles className="h-4 w-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartPage;