import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Clock, Users, CalendarDays, ChevronDown, ChevronLeft, ChevronRight, X, Check, XCircle, Luggage } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Tour = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDay, setActiveDay] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [allImages, setAllImages] = useState([]);
  const [modalImages, setModalImages] = useState([]);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) throw new Error('Error al cargar el tour');
        const data = await response.json();
        const selectedTour = data.tours.find(t => t.id === Number(id));
        if (!selectedTour) throw new Error('Tour no encontrado');
        
        setTour(selectedTour);
        
        // Preparar todas las imágenes del tour
        const tourImages = [
          selectedTour.image,
          ...selectedTour.extraPhotos,
          ...selectedTour.itinerary.flatMap(day => day.images)
        ].filter(img => img);
        
        setAllImages(tourImages);
        setMainImage(selectedTour.image);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  const handleDayToggle = useCallback((index) => {
    setActiveDay(prev => prev === index ? null : index);
  }, []);

  const openGallery = useCallback((images, index = 0) => {
    setModalImages(images);
    setGalleryIndex(index);
    setShowGallery(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeGallery = useCallback(() => {
    setShowGallery(false);
    document.body.style.overflow = 'auto';
  }, []);

  const navigateGallery = useCallback((direction) => {
    setGalleryIndex(prev => {
      const newIndex = direction === 'next' 
        ? (prev + 1) % modalImages.length
        : (prev - 1 + modalImages.length) % modalImages.length;
      return newIndex;
    });
  }, [modalImages.length]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowRight') navigateGallery('next');
    if (e.key === 'ArrowLeft') navigateGallery('prev');
  }, [closeGallery, navigateGallery]);

  useEffect(() => {
    if (showGallery) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [showGallery, handleKeyDown]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!tour) return null;

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <img
          src={mainImage}
          alt={tour.title}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-2"
          >
            {tour.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center"
          >
            <MapPin className="h-5 w-5 mr-2" />
            <span className="text-lg">{tour.location}</span>
          </motion.div>
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="bg-white py-4 px-6 flex flex-wrap justify-center gap-3">
        {allImages.map((img, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMainImage(img)}
            className="focus:outline-none"
          >
            <img
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg transition-all ${mainImage === img ? 'ring-2 ring-amber-500' : 'hover:ring-1 ring-gray-300'}`}
              loading="lazy"
            />
          </motion.button>
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b">Descripción</h2>
              <p className="text-gray-700 leading-relaxed">{tour.description}</p>
            </motion.div>

            {/* Includes/Excludes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-sm p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b">Detalles del Paquete</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Includes */}
                <div className="bg-green-50 p-5 rounded-lg">
                  <h3 className="font-bold text-lg text-green-800 mb-3 flex items-center">
                    <Check className="text-green-600 mr-2" /> Incluye
                  </h3>
                  <ul className="space-y-2">
                    {tour.includes.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index + 0.6 }}
                        className="text-green-700 flex items-start"
                      >
                        <Check className="text-green-500 mt-0.5 mr-2 flex-shrink-0" size={16} />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Excludes */}
                <div className="bg-red-50 p-5 rounded-lg">
                  <h3 className="font-bold text-lg text-red-800 mb-3 flex items-center">
                    <XCircle className="text-red-600 mr-2" /> No incluye
                  </h3>
                  <ul className="space-y-2">
                    {tour.excludes.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index + 0.7 }}
                        className="text-red-700 flex items-start"
                      >
                        <XCircle className="text-red-500 mt-0.5 mr-2 flex-shrink-0" size={16} />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* What to Bring */}
                <div className="bg-blue-50 p-5 rounded-lg md:col-span-2">
                  <h3 className="font-bold text-lg text-blue-800 mb-3 flex items-center">
                    <Luggage className="text-blue-600 mr-2" /> Qué llevar
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {tour.toBring.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index + 0.8 }}
                        className="text-blue-700 flex items-start bg-blue-100/50 p-3 rounded"
                      >
                        <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Itinerary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-sm p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b">Itinerario</h2>
              <div className="space-y-4">
                {tour.itinerary.map((day, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index + 0.7 }}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => handleDayToggle(index)}
                      className="w-full bg-gray-50 p-4 flex justify-between items-center hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-medium text-gray-800 text-left">
                        Día {day.day}: {day.title}
                      </span>
                      <ChevronDown className={`transition-transform ${activeDay === index ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {activeDay === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 flex flex-col md:flex-row gap-6">
                            <div className="md:w-2/3">
                              <p className="text-gray-700 mb-4">{day.description}</p>
                              {day.location && (
                                <div className="flex items-start text-gray-600 mb-2">
                                  <MapPin className="h-4 w-4 mt-0.5 mr-2 text-amber-500 flex-shrink-0" />
                                  <span>{day.location}</span>
                                </div>
                              )}
                              {day.accommodation && (
                                <div className="flex items-start text-gray-600">
                                  <svg className="h-4 w-4 mt-0.5 mr-2 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                  </svg>
                                  <span>{day.accommodation}</span>
                                </div>
                              )}
                            </div>

                   {/**          {day.images && day.images.length > 0 && (
                              <div className="md:w-1/3">
                                <img
                                  src={day.images[0]}
                                  alt={`Día ${day.day}`}
                                  className="rounded-lg w-full h-48 object-cover cursor-pointer shadow"
                                  onClick={() => openGallery(day.images)}
                                />
                                {day.images.length > 1 && (
                                  <button
                                    onClick={() => openGallery(day.images)}
                                    className="mt-2 text-sm text-amber-600 hover:text-amber-700 flex items-center"
                                  >
                                    Ver más fotos ({day.images.length})
                                  </button>
                                )}
                              </div>
                            )}*/}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-6">
            {/* Tour Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-xl shadow-sm p-6 sticky top-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Detalles del Tour</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Duración</p>
                    <p className="text-gray-600">{tour.duration}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Minimo de personas</p>
                    <p className="text-gray-600">{tour.groupSize}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <CalendarDays className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Disponibilidad</p>
                    <p className="text-gray-600">{tour.availability}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Booking CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-6 text-white"
            >
              <h3 className="text-xl font-bold mb-2">¿Interesado en este tour?</h3>
              <p className="mb-4">Reserva ahora y asegura tu lugar</p>
              <button className="w-full bg-white text-amber-600 font-medium py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors">
                Contactar para reservar
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeGallery}
          >
            <div className="relative w-full max-w-5xl" onClick={e => e.stopPropagation()}>
              {/* Main Image */}
              <div className="flex justify-center">
                <img
                  src={modalImages[galleryIndex]}
                  alt={`Gallery ${galleryIndex + 1}`}
                  className="max-h-[80vh] max-w-full object-contain"
                />
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={(e) => { e.stopPropagation(); navigateGallery('prev'); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm transition-colors"
              >
                <ChevronLeft className="h-8 w-8 text-white" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); navigateGallery('next'); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm transition-colors"
              >
                <ChevronRight className="h-8 w-8 text-white" />
              </button>

              {/* Close Button */}
              <button
                onClick={closeGallery}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm transition-colors"
              >
                <X className="h-6 w-6 text-white" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                {galleryIndex + 1} / {modalImages.length}
              </div>

              {/* Thumbnails */}
              <div className="flex justify-center mt-6 gap-2 overflow-x-auto py-2">
                {modalImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setGalleryIndex(idx); }}
                    className="focus:outline-none"
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx}`}
                      className={`w-12 h-12 object-cover rounded transition-all ${galleryIndex === idx ? 'ring-2 ring-amber-400' : 'opacity-70 hover:opacity-100'}`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tour;