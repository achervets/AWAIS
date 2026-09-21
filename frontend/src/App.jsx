import { lazy, Suspense } from 'react';
import '@/styles/App.css';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';

const HomePage = lazy(() => import('@/pages/HomePage'));
const ServicePage = lazy(() => import('@/pages/ServicePage'));
const ContactForm = lazy(() => import('@/pages/ContactForm'));
const NewsPage = lazy(() => import('@/pages/NewsPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
const AdminPage = lazy(() => import('@/pages/AdminPage'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));

function RequireAdmin({ children }) {
  return localStorage.getItem('token') ? children : <Navigate to="/login" replace />;
}

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1>Page not found</h1>
      <p>The page you requested does not exist.</p>
      <a href="/">Return to the home page</a>
    </div>
  );
}

export default function App() {

  const location = useLocation();

  return (
    /* The Layout wraps everything, making it immune to the page animations */
    <Layout>
      <AnimatePresence mode="wait">
        <Suspense fallback={<p className="route-loading" role="status">Loading…</p>}>
          <Routes location={location} key={location.pathname}>

          <Route path='/' element={
            <PageTransition title="Home | America with Anastasiia">
              <HomePage />
            </PageTransition>
            } />

          <Route path='/services/:serviceId' element={
            <PageTransition title="Services | America with Anastasiia">
              <ServicePage />
            </PageTransition>
            } />

          <Route path='/contact_us' element={
            <PageTransition title="Contact Us | America with Anastasiia">
              <ContactForm />
            </PageTransition>
            } />

          <Route path='/login' element={
            <PageTransition title="Admin Login | America with Anastasiia">
              <LoginPage />
            </PageTransition>
            } />

          <Route path='/register' element={
            <PageTransition title="Admin Setup | America with Anastasiia">
              <RegisterPage />
            </PageTransition>
            } />

          <Route path='/news' element={
            <PageTransition title="News | America with Anastasiia">
              <NewsPage />
            </PageTransition>
            } />

          <Route path='/privacy' element={
            <PageTransition title="Privacy Policy | America with Anastasiia">
              <PrivacyPolicy />
            </PageTransition>
            } />

          <Route path='/admin' element={
            <PageTransition title="Admin | America with Anastasiia">
              <RequireAdmin><AdminPage /></RequireAdmin>
            </PageTransition>
            } />

          <Route path="*" element={
            <PageTransition title="Page Not Found | America with Anastasiia">
              <NotFoundPage />
            </PageTransition>
          } />

          </Routes>
        </Suspense>
      </AnimatePresence>
    </Layout>
  );
}
