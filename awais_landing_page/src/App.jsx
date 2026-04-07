import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import ServicePage from './pages/ServicePage';
import ContactForm from './pages/ContactForm';
import PageTransition from './PageTransition';

export default function App() {

  const location = useLocation();

  return (
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

      </Routes>
    </AnimatePresence>
  );
}