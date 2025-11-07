import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import VoterBallot from "./pages/VoterBallot";
import AdminPanel from "./pages/AdminPanel";
import ElectionSelection from "./pages/ElectionSelection";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/organizer" element={<OrganizerDashboard />} />
              <Route path="/elections" element={<ElectionSelection />} />
              <Route path="/vote/:electionId" element={<VoterBallot />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
