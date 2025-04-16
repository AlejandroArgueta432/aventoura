import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Home from './components/Home/home';
import Footer from './components/Footer';
import Tour from './components/Tour/Tour';
import Nosotros from './components/Nosotros/Nosotros';
import ToursYContacto from './components/ToursyContacto/ToursyContacto';


// Componente personalizado para manejar el scroll
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          <ScrollToTop />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tour/:id" element={<Tour />} />
              <Route path ='/nosotros' element={<Nosotros/>}/>
              <Route path="/tours" element={<ToursYContacto/>} />	

          
            </Routes>
          </AnimatePresence>
        </main>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;