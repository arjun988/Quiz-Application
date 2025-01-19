import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate,useLocation } from "react-router-dom";
import StartPage from "./pages/StartPage";
import QuizPage from "./pages/QuizPage";
import ReportPage from "./pages/ReportPage";

// Layout wrapper component
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation could be added here if needed */}
      <main>{children}</main>
      <footer className="fixed bottom-0 w-full py-4 px-6 text-center text-gray-400 text-sm backdrop-blur-sm bg-gray-900/30">
        © {new Date().getFullYear()} Quiz App. All rights reserved.
      </footer>
    </div>
  );
};

// Protected route wrapper
const ProtectedRoute = ({ element: Element, ...rest }) => {
  const location = useLocation();
  const hasEmail = location.state?.email || sessionStorage.getItem("userEmail");

  if (!hasEmail && rest.path !== "/") {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <Element />
    </Layout>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <StartPage />
            </Layout>
          }
        />
        <Route
          path="/quiz"
          element={<ProtectedRoute element={QuizPage} />}
        />
        <Route
          path="/report"
          element={<ProtectedRoute element={ReportPage} />}
        />
        <Route
          path="*"
          element={
            <Layout>
              <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-4xl font-bold text-white mb-4">404</h1>
                <p className="text-gray-300 mb-8">Page not found</p>
                <button
                  onClick={() => window.location.href = '/'}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                >
                  Go Home
                </button>
              </div>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;