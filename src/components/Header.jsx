import React, { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from '../resources/Logo.png';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toursMenuOpen, setToursMenuOpen] = useState(false);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Obtener tours del JSON
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) throw new Error('Error al cargar tours');
        const data = await response.json();
        setTours(data.tours || []);
      } catch (error) {
        console.error('Error fetching tours:', error);
        setTours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  // Cerrar menús al cambiar de ruta
  useEffect(() => {
    setToursMenuOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.tours-dropdown')) {
        setToursMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Animaciones
  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    closed: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.img 
              src={Logo} 
              alt={Logo} 
              className="h-12"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`px-3 py-2 font-medium ${location.pathname === '/' ? 'text-[#f39703] font-semibold' : 'text-[#413d3e] hover:text-[#f39703]'} transition-colors duration-200`}
            >
              Inicio
            </Link>
            
            {/* Tours Dropdown */}
            <div className="relative tours-dropdown">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setToursMenuOpen(!toursMenuOpen);
                }}
                className={`px-3 py-2 font-medium flex items-center ${toursMenuOpen || location.pathname.includes('/tour/') ? 'text-[#f39703] font-semibold' : 'text-[#413d3e] hover:text-[#f39703]'} transition-colors duration-200`}
                whileHover={{ scale: 1.03 }}
                disabled={loading}
              >
                Tours
                {!loading && (
                  <motion.span
                    animate={{ rotate: toursMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </motion.span>
                )}
                {loading && (
                  <span className="ml-1 h-4 w-4 animate-pulse">...</span>
                )}
              </motion.button>
              
              <AnimatePresence>
                {toursMenuOpen && !loading && (
                  <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={menuVariants}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {tours.length > 0 ? (
                      tours.map((tour) => (
                        <Link
                          key={tour.id}
                          to={`/tour/${tour.id}`}
                          className={`block px-4 py-2 text-sm ${location.pathname === `/tour/${tour.id}` ? 'bg-[#f39703]/10 text-[#f39703]' : 'text-gray-700 hover:bg-[#f39703]/10 hover:text-[#f39703]'} transition-colors duration-200`}
                        >
                          {tour.title}
                        </Link>
                      ))
                    ) : (
                      <p className="px-4 py-2 text-sm text-gray-500">No hay tours disponibles</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              to="/nosotros" 
              className={`px-3 py-2 font-medium ${location.pathname === '/nosotros' ? 'text-[#f39703] font-semibold' : 'text-[#413d3e] hover:text-[#f39703]'} transition-colors duration-200`}
            >
              Nosotros
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#f39703] focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="px-2 pt-2 pb-4 space-y-1">
              <Link
                to="/"
                className={`block px-3 py-3 text-base font-medium ${location.pathname === '/' ? 'text-[#f39703] font-semibold' : 'text-[#413d3e]'} border-b border-gray-100`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              
              <div className="tours-dropdown">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setToursMenuOpen(!toursMenuOpen);
                  }}
                  className={`w-full flex justify-between items-center px-3 py-3 text-base font-medium ${toursMenuOpen || location.pathname.includes('/tour/') ? 'text-[#f39703] font-semibold' : 'text-[#413d3e]'} border-b border-gray-100`}
                  disabled={loading}
                >
                  Tours
                  {!loading && (
                    <motion.span
                      animate={{ rotate: toursMenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  )}
                  {loading && (
                    <span className="h-4 w-4 animate-pulse">...</span>
                  )}
                </button>
                
                <AnimatePresence>
                  {toursMenuOpen && !loading && (
                    <motion.div
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={menuVariants}
                      className="pl-4 space-y-1"
                    >
                      {tours.length > 0 ? (
                        tours.map((tour) => (
                          <Link
                            key={tour.id}
                            to={`/tour/${tour.id}`}
                            className={`block px-3 py-2 text-sm ${location.pathname === `/tour/${tour.id}` ? 'bg-[#f39703]/10 text-[#f39703]' : 'text-gray-600 hover:text-[#f39703]'}`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {tour.title}
                          </Link>
                        ))
                      ) : (
                        <p className="px-3 py-2 text-sm text-gray-500">No hay tours disponibles</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/nosotros"
                className={`block px-3 py-3 text-base font-medium ${location.pathname === '/nosotros' ? 'text-[#f39703] font-semibold' : 'text-[#413d3e]'} border-b border-gray-100`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Nosotros
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;