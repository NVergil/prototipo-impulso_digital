// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import AppLayout from './components/Layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Diagnostico from './pages/Diagnostic'; // Asegúrate de que esta es la ruta correcta si es 'Diagnostic.jsx'
// import About from './pages/About'; // Si no estás usando About, puedes eliminar esta línea
import './App.css';

import React from 'react'; // Ya no necesitamos useEffect, useState directamente aquí
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
// Ya no necesitamos importar supabase aquí, está en AuthContext

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

const DashboardPage = React.memo(() => (
  <AppLayout>
    <Dashboard />
  </AppLayout>
));

// Si tienes una página About, descomenta y úsala así:
// const AboutPage = React.memo(() => (
//   <AppLayout>
//     <About />
//   </AppLayout>
// ));

const AppContent = () => {
  // Obtiene todos los estados del useAuth
  const { user, loading, isDiagnosisComplete, diagnosisLoading } = useAuth();

  console.log("AppContent Render - user:", user, "loading:", loading, "isDiagnosisComplete:", isDiagnosisComplete, "diagnosisLoading:", diagnosisLoading);

  if (loading || diagnosisLoading) {
    return (
      <Layout style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>Cargando aplicación...</div>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh', justifyContent: 'center' }}>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* La ruta de diagnóstico: si ya está completo, redirige al dashboard */}
        <Route path="/diagnostico" element={
          <PrivateRoute>
            {isDiagnosisComplete ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AppLayout><Diagnostico /></AppLayout>
            )}
          </PrivateRoute>
        } />

        {/* Rutas protegidas: Dashboard */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            {isDiagnosisComplete ? (
              <AppLayout><Dashboard /></AppLayout>
            ) : (
              // Si el diagnóstico no está completo, redirige a /diagnostico
              <Navigate to="/diagnostico" replace />
            )}
          </PrivateRoute>
        } />

        {/* Si tienes una página About, descomenta y úsala como Dashboard:
        <Route path="/about" element={
          <PrivateRoute>
            {isDiagnosisComplete ? (
              <AppLayout><About /></AppLayout>
            ) : (
              <Navigate to="/diagnostico" replace />
            )}
          </PrivateRoute>
        } />
        */}

        {/* Ruta comodín para cualquier otra URL no definida */}
        <Route path="*" element={
          user ? ( // Si hay un usuario logeado
            isDiagnosisComplete ? <Navigate to="/dashboard" replace /> : <Navigate to="/diagnostico" replace />
          ) : ( // Si no hay usuario logeado, va a login
            <Navigate to="/login" replace />
          )
        } />
      </Routes>
    </Layout>
  );
};

const PrivateRoute = React.memo(({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Cargando autenticación...</div>;
  return user ? children : <Navigate to="/login" />;
});

export default App;