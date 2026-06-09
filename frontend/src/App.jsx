import '@/styles/App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import ServicePage from '@/pages/ServicePage';
import ContactForm from '@/pages/ContactForm';
import NewsPage from '@/pages/NewsPage';
import PageTransition from '@/components/PageTransition';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ApiTest from '@/components/ApiTest';

export default function App() {

  const location = useLocation();

  return (
    /* The Layout wraps everything, making it completely immune to the page animations */
    <Layout>
      <ApiTest />
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

          <Route path='/news' element={
            <PageTransition title="News | Nastya's Visa Emporium">
              <NewsPage />
            </PageTransition>
            } />

        </Routes>
      </AnimatePresence>
    </Layout>
  );
}