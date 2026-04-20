import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import ServicePage from './pages/ServicePage';
import ContactForm from './pages/ContactForm';
import PageTransition from './PageTransition';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {

  const location = useLocation();

  return (
    /* The Layout wraps everything, making it completely immune to the page animations */
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          <Route path='/' element={
            <PageTransition title="Home | Nastya's Visa Emporium">
              <HomePage />
            </PageTransition>
            } />

          <Route path='/services/:serviceId' element={
            <PageTransition title="Services | Nastya's Visa Emporium">
              <ServicePage />
            </PageTransition>
            } />

          <Route path='/contact_us' element={
            <PageTransition title="Contact Us | Nastya's Visa Emporium">
              <ContactForm />
            </PageTransition>
            } />

          <Route path='/login' element={
            <PageTransition title="Login | Nastya's Visa Emporium">
              <LoginPage />
            </PageTransition>
            } />

          <Route path='/register' element={
            <PageTransition title="Register | Nastya's Visa Emporium">
              <RegisterPage />
            </PageTransition>
            } />

        </Routes>
      </AnimatePresence>
    </Layout>
  );
}