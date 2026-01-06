
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import CitizenPage from './pages/CitizenPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import { GrievancesProvider } from './context/GrievancesContext';
import { AuthProvider, useAuth } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <GrievancesProvider>
        <AppContent />
      </GrievancesProvider>
    </AuthProvider>
  );
}

const AppContent: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="flex flex-col h-screen font-sans text-gray-800">
      <Header />
      <main className="flex-grow overflow-hidden">
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/" element={<CitizenPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
};


export default App;
