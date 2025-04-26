import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { MapPin, CalendarDays, ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ToursPreview = forwardRef(({ activeFilter }, ref) => {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = [
    { id: 'todos', name: 'Todos', icon: '🌎', count: 0 },
    { id: 'ruta-maya', name: 'Ruta Maya', icon: '🏛️', count: 2 },
    { id: 'trifinio', name: 'Trifinio', icon: '🔺', count: 1 },
    { id: 'mexico', name: 'México', icon: '🇲🇽', count: 2 },
    { id: 'el-salvador', name: 'El Salvador', icon: '🇸🇻', count: 5 },
    { id: 'nicaragua', name: 'Nicaragua', icon: '🇳🇮', count: 4 },
    { id: 'multidestinos', name: 'Multidestinos', icon: '✈️', count: 2 }
  ];

  // Exponer la función de filtrado al componente padre
  useImperativeHandle(ref, () => ({
    filterByCategory: (categoryId) => {
      filterTours(categoryId);
    }
  }));

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) throw new Error('Error al cargar los tours');
        const data = await response.json();
        setTours(data.tours);
        setFilteredTours(data.tours);
        
        // Actualizar conteos de categorías
        const updatedCategories = categories.map(cat => {
          let count = 0;
          if (cat.id === 'todos') count = data.tours.length;
          if (cat.id === 'ruta-maya') count = data.tours.filter(t => 
            t.title.includes('Ruta Maya') || t.title.includes('Al Sureste del Mundo Maya')
          ).length;
          if (cat.id === 'trifinio') count = data.tours.filter(t => 
            t.title.includes('Trifinio')
          ).length;
          if (cat.id === 'mexico') count = data.tours.filter(t => 
            t.title.includes('México') || t.location.includes('México') || 
            t.title.includes('Chiapas') || t.title.includes('Riviera Maya')
          ).length;
          if (cat.id === 'el-salvador') count = data.tours.filter(t => 
            t.location.includes('El Salvador') && !t.location.includes('Guatemala') && 
            !t.location.includes('Honduras')
          ).length;
          if (cat.id === 'nicaragua') count = data.tours.filter(t => 
            t.location.includes('Nicaragua')
          ).length;
          if (cat.id === 'multidestinos') count = data.tours.filter(t => 
            t.location.includes('El Salvador') && t.location.includes('Guatemala') || 
            t.location.includes('Honduras')
          ).length;
          return { ...cat, count };
        });
        categories.forEach((cat, index) => {
          categories[index].count = updatedCategories[index].count;
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  // Efecto para aplicar el filtro cuando cambia activeFilter
  useEffect(() => {
    if (activeFilter) {
      filterTours(activeFilter);
    }
  }, [activeFilter]);

  const filterTours = (categoryId) => {
    let filtered = [];
    
    if (categoryId === 'todos') {
      filtered = tours;
    } else {
      switch(categoryId) {
        case 'ruta-maya':
          filtered = tours.filter(t => 
            t.title.includes('Ruta Maya') || t.title.includes('Al Sureste del Mundo Maya')
          );
          break;
        case 'trifinio':
          filtered = tours.filter(t => 
            t.title.includes('Trifinio')
          );
          break;
        case 'mexico':
          filtered = tours.filter(t => 
            t.title.includes('México') || t.location.includes('México') || 
            t.title.includes('Chiapas') || t.title.includes('Riviera Maya')
          );
          break;
        case 'el-salvador':
          filtered = tours.filter(t => 
            t.location.includes('El Salvador') && !t.location.includes('Guatemala') && 
            !t.location.includes('Honduras')
          );
          break;
        case 'nicaragua':
          filtered = tours.filter(t => 
            t.location.includes('Nicaragua')
          );
          break;
        case 'multidestinos':
          filtered = tours.filter(t => 
            (t.location.includes('El Salvador') && t.location.includes('Guatemala')) || 
            t.location.includes('Honduras')
          );
          break;
        default:
          filtered = tours;
      }
    }
    
    setFilteredTours(filtered);
    setVisibleCount(4);
  };

  const toggleShowMore = () => {
    setVisibleCount(prev => prev === 4 ? filteredTours.length : 4);
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

        {/* Filtro para desktop */}
        <div className="hidden md:block mb-10">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => filterTours(category.id)}
                className={`flex items-center px-4 py-2 rounded-full transition-all duration-200 ${activeFilter === category.id 
                  ? 'bg-amber-600 text-white shadow-md' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2 text-lg">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
                {category.count > 0 && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${activeFilter === category.id 
                    ? 'bg-amber-700 text-white' 
                    : 'bg-gray-200 text-gray-800'}`}>
                    {category.count}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Filtro para móvil */}
        <div className="md:hidden mb-10">
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl ${isFilterOpen ? 'bg-amber-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
            >
              <div className="flex items-center">
                <Filter className={`h-5 w-5 mr-2 ${isFilterOpen ? 'text-white' : 'text-amber-500'}`} />
                <span className="font-medium">
                  {categories.find(c => c.id === activeFilter)?.name || 'Filtrar'}
                </span>
              </div>
              {isFilterOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        filterTours(category.id);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left flex items-center justify-between ${activeFilter === category.id ? 'bg-amber-50 text-amber-700' : 'hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center">
                        <span className="mr-3 text-lg">{category.icon}</span>
                        <span>{category.name}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${activeFilter === category.id ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Resultados del filtro */}
        {filteredTours.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No hay tours disponibles en esta categoría</h3>
            <p className="mt-2 text-gray-500">Prueba con otra categoría o vuelve más tarde</p>
            <button
              onClick={() => filterTours('todos')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Ver todos los tours
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <AnimatePresence>
                {filteredTours.slice(0, visibleCount).map((tour) => (
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

            {filteredTours.length > 4 && (
              <div className="mt-12 text-center">
                <motion.button
                  onClick={toggleShowMore}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {visibleCount === 4 ? (
                    <>
                      Ver más tours ({filteredTours.length})
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
          </>
        )}
      </div>
    </section>
  );
});

export default ToursPreview;