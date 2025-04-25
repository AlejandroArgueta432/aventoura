import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown, Phone, Mail, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ToursPreview from './ToursPreview';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const toursRef = useRef(null);
  const intervalRef = useRef(null);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'Montañas majestuosas con lago',
      title: 'Aventuras en la Naturaleza',
      subtitle: 'Descubre los paisajes más impresionantes del planeta'
    },
    {
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'Playa tropical con palmeras',
      title: 'Paraísos Tropicales',
      subtitle: 'Relájate en las playas más exóticas del mundo'
    },
    {
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'Ciudad histórica con arquitectura impresionante',
      title: 'Culturas Fascinantes',
      subtitle: 'Sumérgete en la historia y tradiciones locales'
    }
  ];

  // Contactos
  const contacts = [
    {
      icon: <Phone className="h-5 w-5" />,
      text: '+1 714 232 9319',
      link: 'tel:+17142329319',
      bgColor: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: <Mail className="h-5 w-5" />,
      text: 'aventouraes@gmail.com',
      link: 'aventouraes@gmail.com',
      bgColor: 'bg-red-500 hover:bg-red-600'
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      text: 'WhatsApp',
      link: 'https://wa.me/17142329319',
      bgColor: 'bg-green-400 hover:bg-green-500'
    }
  ];

  // Funciones del slider
  const nextSlide = () => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const startInterval = () => {
    intervalRef.current = setInterval(nextSlide, 5000);
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Scroll suave mejorado
  const scrollToTours = () => {
    if (toursRef.current && !isScrolling) {
      setIsScrolling(true);
      const start = window.pageYOffset;
      const target = toursRef.current.offsetTop;
      const distance = target - start;
      const duration = 1000;
      let startTime = null;

      const ease = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };

      const animation = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          setIsScrolling(false);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  useEffect(() => {
    startInterval();
    return () => stopInterval();
  }, []);

  useEffect(() => {
    if (currentSlide !== 0) {
      stopInterval();
      startInterval();
    }
  }, [currentSlide]);

  return (
    <div className="relative">
      {/* Hero Slider */}
      <section className="relative h-screen max-h-[800px] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {slides.map((slide, index) => (
            currentSlide === index && (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover object-center"
                />
                
                <motion.div 
                  className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20 px-4"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.h1 
                    className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 max-w-4xl"
                    whileHover={{ scale: 1.02 }}
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p 
                    className="text-xl md:text-2xl mb-8 max-w-2xl"
                    whileHover={{ scale: 1.01 }}
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.button
                    onClick={scrollToTours}
                    className="bg-[#f39703] hover:bg-[#413d3e] text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 flex items-center gap-2 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explorar Tours
                    <motion.span
                      animate={{ y: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ChevronDown className="group-hover:translate-y-1 transition-transform" />
                    </motion.span>
                  </motion.button>
                </motion.div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Controles del slider */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-3 text-white z-30 transition-all duration-300"
          aria-label="Slide anterior"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-3 text-white z-30 transition-all duration-300"
          aria-label="Siguiente slide"
        >
          <ArrowRight className="h-6 w-6" />
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
              }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Barra de Contactos Integrada */}
      <motion.div 
        className="w-full py-8 bg-white shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-center text-xl font-bold text-[#413d3e] mb-6">
            ¿Listo para tu próxima aventura? Contáctanos
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
            {contacts.map((contact, index) => (
              <motion.a
                key={index}
                href={contact.link}
                className={`flex items-center ${contact.bgColor} text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 w-full sm:w-auto justify-center`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{contact.icon}</span>
                <span className="font-medium">{contact.text}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Sección de Tours Destacados */}
      <div ref={toursRef} className="mt-4">
        <ToursPreview />
      </div>
      
    </div>
  );
};

export default Home;