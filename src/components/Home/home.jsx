import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import ToursPreview from './ToursPreview';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      alt: 'Montañas majestuosas con lago',
    },
    {
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      alt: 'Playa tropical con palmeras',
    },
    {
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      alt: 'Ciudad histórica con arquitectura impresionante',
    },
  ];

  const intervalRef = useRef(null); // Referencia para el intervalo
  const toursRef = useRef(null); // Referencia para la sección de tours

  // Función para avanzar al siguiente slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Función para retroceder al slide anterior
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Función para detener el intervalo
  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Función para reiniciar el intervalo
  const resetInterval = () => {
    stopInterval(); // Detenemos el intervalo actual
    intervalRef.current = setInterval(() => {
      nextSlide(); // Cambia al siguiente slide automáticamente
    }, 5000); // Cambia cada 5 segundos
  };

  // Configura el intervalo al montar el componente
  useEffect(() => {
    resetInterval(); // Inicia el intervalo
    return () => stopInterval(); // Limpia el intervalo al desmontar
  }, []);

  // Reinicia el intervalo cada vez que cambia el slide
  useEffect(() => {
    resetInterval();
  }, [currentSlide]);


   // Función para desplazarse a la sección de tours
  /* const scrollToTours = () => {
    if (toursRef.current) {
      toursRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };*/

  const scrollToTours = () => {
    if (toursRef.current) {
      const targetPosition = toursRef.current.offsetTop; // Posición de la sección de tours
      const startPosition = window.scrollY; // Posición actual del scroll
      const distance = targetPosition - startPosition; // Distancia a recorrer
      const duration = 1000; // Duración de la animación en milisegundos
      let startTime = null;
  
      const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };
  
      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };
  
      requestAnimationFrame(animation);
    }
  };

  return (
    <div>
      <section className="relative h-[70vh] w-full overflow-hidden">
        <div className="h-full w-full relative">
          {/* Renderizar los slides */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-40"></div>
            </div>
          ))}

          {/* Botón para retroceder */}
          <button
            onClick={() => {
              prevSlide();
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 text-white"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>

          {/* Botón para avanzar */}
          <button
            onClick={() => {
              nextSlide();
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 text-white"
          >
            <ArrowRightIcon className="h-6 w-6" />
          </button>

          {/* Indicadores de los slides */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                }}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              ></button>
            ))}
          </div>
        </div>

        {/* Texto superpuesto */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Descubre el Mundo con Nosotros
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mb-8">
            Experiencias inolvidables en los destinos más impresionantes del
            planeta
          </p>
          <button       onClick={scrollToTours} className="bg-[#f39703] hover:bg-[#413d3e] text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105">
            Explorar Tours
          </button>
        </div>
      </section>

      <div ref={toursRef} className="mt-16">
        <ToursPreview />
      </div>
    </div>
  );
};

export default Home;