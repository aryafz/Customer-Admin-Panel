import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SitePage from './pages/Site';
import PlansPage from './pages/Plans';
import FeaturesPage from './pages/Features';
import ThemePage from './pages/Theme';
import PaymentsPage from './pages/Payments';
import ProtectedRoute from './auth/ProtectedRoute';
import { AuthProvider } from './auth/AuthContext';
import Layout from './components/Layout';
import { CurrentSiteProvider } from './auth/CurrentSiteContext';

const App: React.FC = () => (
  <AuthProvider>
    <CurrentSiteProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/site" element={<SitePage />} />
                <Route path="/plans" element={<PlansPage />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/theme" element={<ThemePage />} />
                <Route path="/payments" element={<PaymentsPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </CurrentSiteProvider>
  </AuthProvider>
);

export default App;
