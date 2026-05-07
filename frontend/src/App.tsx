import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Backlog } from './pages/Backlog';
import { Sprints } from './pages/Sprints';
import { Metrics } from './pages/Metrics';
import { Team } from './pages/Team';
import { Forecast } from './pages/Forecast';
import { Settings } from './pages/Settings';
import { PageLayout } from './components/layout/PageLayout';
import { useAuthStore } from './stores/authStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userId } = useAuthStore();
  if (!userId) return <Navigate to="/" />;
  return <PageLayout>{children}</PageLayout>;
};

import { Scenarios } from './pages/Scenarios';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/projects" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/projects/:projectId/backlog" element={
            <ProtectedRoute>
              <Backlog />
            </ProtectedRoute>
          } />

          <Route path="/projects/:projectId/sprints" element={
            <ProtectedRoute>
              <Sprints />
            </ProtectedRoute>
          } />

          <Route path="/projects/:projectId/metrics" element={
            <ProtectedRoute>
              <Metrics />
            </ProtectedRoute>
          } />

          <Route path="/projects/:projectId/scenarios" element={
            <ProtectedRoute>
              <Scenarios />
            </ProtectedRoute>
          } />

          <Route path="/projects/:projectId/team" element={
            <ProtectedRoute>
              <Team />
            </ProtectedRoute>
          } />

          <Route path="/projects/:projectId/forecast" element={
            <ProtectedRoute>
              <Forecast />
            </ProtectedRoute>
          } />

          <Route path="/projects/:projectId/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />

          {/* Redirecionamento padrão */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
