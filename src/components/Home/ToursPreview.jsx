import React, { useEffect, useState } from 'react';
import { MapPin, CalendarDays, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ToursPreview = () => {
  const [allTours, setAllTours] = useState([]);
  const [visibleTours, setVisibleTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const toursPerLoad = 4; // Cantidad de tours a mostrar inicialmente

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) throw new Error('Error al cargar los tours');
        const data = await response.json();
        setAllTours(data.tours);
        setVisibleTours(data.tours.slice(0, toursPerLoad));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    fetchTours();
  }, []);

  const toggleShowAll = () => {
    if (!showAll) {
      // Mostrar todos los tours con animación
      setVisibleTours(allTours);
    } else {
      // Volver a mostrar solo los primeros tours
      setVisibleTours(allTours.slice(0, toursPerLoad));
    }
    setShowAll(!showAll);
  };

  if (loading && initialLoad) {
    return (
      <div className="py-20 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f39703]"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#413d3e] mb-4">
            {showAll ? 'Todos Nuestros Tours' : 'Tours'}
          </h2>
          <p className="text-[#413d3e]/80 max-w-2xl mx-auto">
            {showAll ? 'Explora nuestra completa selección de experiencias' : 'Descubre nuestras experiencias '}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {visibleTours.map((tour) => (
              <motion.div
                key={tour.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <Link to={`/tour/${tour.id}`} className="block">
                  <div className="relative h-48 overflow-hidden group">
                    <motion.img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-4 right-4 bg-[#f39703] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="h-4 w-4 mr-1 fill-current" />
                      {tour.rating}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="flex items-center text-sm text-[#413d3e]/70">
                        <MapPin className="h-4 w-4 mr-1 text-[#f39703]" />
                        {tour.location}
                      </span>
                      <span className="flex items-center text-sm text-[#413d3e]/70">
                        <CalendarDays className="h-4 w-4 mr-1 text-[#f39703]" />
                        {tour.duration}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                      {tour.title}
                    </h3>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-lg font-bold text-[#f39703]">
                        ${tour.price.toLocaleString()}
                      </span>
                      <span className="flex items-center text-sm text-[#413d3e] font-medium">
                        Ver detalles <ChevronDown className="h-4 w-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {allTours.length > toursPerLoad && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button 
              onClick={toggleShowAll}
              className="bg-transparent hover:bg-[#f39703] text-[#f39703] hover:text-white border border-[#f39703] font-bold py-3 px-8 rounded-full transition-all duration-300 flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAll ? 'Mostrar menos' : 'Ver más tours'}
              {showAll ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ToursPreview;