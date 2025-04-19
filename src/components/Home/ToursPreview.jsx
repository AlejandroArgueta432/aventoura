import React, { useEffect, useState } from 'react';
import { MapPin, CalendarDays, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ToursPreview = () => {
  const [tours, setTours] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) throw new Error('Error al cargar los tours');
        const data = await response.json();
        setTours(data.tours);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const toggleShowMore = () => {
    setVisibleCount(prev => prev === 4 ? tours.length : 4);
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Nuestros Tours Exclusivos
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-gray-500 sm:mt-4">
            Descubre experiencias únicas en los destinos más fascinantes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence>
            {tours.slice(0, visibleCount).map((tour) => (
              <motion.div
                key={tour.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Link to={`/tour/${tour.id}`} className="block h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3 text-sm">
                      <span className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-1 text-amber-500" />
                        {tour.location.split('(')[0].trim()}
                      </span>
                      <span className="flex items-center text-gray-600">
                        <CalendarDays className="h-4 w-4 mr-1 text-amber-500" />
                        {tour.duration.split('/')[0].trim()}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                      {tour.title}
                    </h3>

                    <div className="flex justify-end mt-4">
                      <span className="inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-700">
                        Ver detalles
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {tours.length > 4 && (
          <div className="mt-12 text-center">
            <motion.button
              onClick={toggleShowMore}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {visibleCount === 4 ? (
                <>
                  Ver todos los tours ({tours.length})
                  <ChevronDown className="ml-2 h-5 w-5" />
                </>
              ) : (
                <>
                  Mostrar menos
                  <ChevronUp className="ml-2 h-5 w-5" />
                </>
              )}
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ToursPreview;