import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Clock, Users, CalendarDays, ChevronDown, ChevronLeft, ChevronRight, X, Loader2, Check, XCircle, Luggage } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

const Tour = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDay, setActiveDay] = useState(null);
  const [mainPhoto, setMainPhoto] = useState("");
  const [modalImages, setModalImages] = useState([]);
  const [modalIndex, setModalIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isHoveringMain, setIsHoveringMain] = useState(false);

  // Efecto de parallax mejorado (sin parpadeo)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [3, -3]); // Reducido el ángulo
  const rotateY = useTransform(x, [-100, 100], [-3, 3]); // Reducido el ángulo

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) throw new Error("Error al obtener el tour");
        const data = await response.json();
        const selectedTour = data.tours.find(tour => tour.id === Number(id));
        if (!selectedTour) throw new Error("Tour no encontrado");
        
        setTour(selectedTour);
        setMainPhoto(selectedTour.photos?.[0] || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / 20); // Movimiento más suave
    y.set((e.clientY - rect.top - rect.height / 2) / 20); // Movimiento más suave
  }, [x, y]);

  const toggleDay = useCallback((index) => {
    setActiveDay(prev => (prev === index ? null : index));
  }, []);

  const openModal = useCallback((images, index = 0) => {
    setModalImages(images);
    setModalIndex(index);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  }, []);

  const handleImageNavigation = useCallback((direction) => {
    setModalIndex(prev => {
      const newIndex = direction === "next" 
        ? (prev + 1) % modalImages.length
        : (prev - 1 + modalImages.length) % modalImages.length;
      return newIndex;
    });
  }, [modalImages.length]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') handleImageNavigation("next");
    if (e.key === 'ArrowLeft') handleImageNavigation("prev");
  }, [closeModal, handleImageNavigation]);

  useEffect(() => {
    if (showModal) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [showModal, handleKeyDown]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className="text-[#f39703] size-12" />
      </motion.div>
    </div>
  );

  if (error) return (
    <div className="text-center py-20 px-4 bg-gray-50">
      <motion.div 
        className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-sm"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700">{error}</p>
      </motion.div>
    </div>
  );

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full text-gray-800 pb-16 bg-gray-50"
    >
      {/* Imagen principal con efecto parallax mejorado */}
      <div className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden bg-gray-200">
        <motion.div
          style={{
            x,
            y,
            rotateX,
            rotateY,
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHoveringMain(true)}
          onMouseLeave={() => {
            setIsHoveringMain(false);
            x.set(0);
            y.set(0);
          }}
          className="w-full h-full"
        >
          <motion.img 
            src={mainPhoto} 
            alt="Principal" 
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { duration: 0.8 } // Transición más larga
            }}
            exit={{ opacity: 0 }}
          />
        </motion.div>
        
        {/* Overlay elegante */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/40 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        />
        
        {/* Título superpuesto */}
        <motion.div 
          className="absolute bottom-8 left-0 w-full px-6 text-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold max-w-4xl mx-auto">{tour.title}</h1>
          <div className="flex items-center gap-2 mt-2 max-w-4xl mx-auto">
            <MapPin className="size-5" />
            <span className="text-lg">{tour.location}</span>
          </div>
        </motion.div>
      </div>

      {/* Galería miniaturas */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4 p-6 bg-white"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {tour.photos?.map((photo, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.img
              src={photo}
              alt={`Miniatura ${idx + 1}`}
              className={`w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg cursor-pointer transition-all duration-300 ${
                mainPhoto === photo 
                  ? 'ring-2 ring-[#f39703] shadow-md' 
                  : 'hover:ring-1 ring-gray-300'
              }`}
              onClick={() => setMainPhoto(photo)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * idx + 0.8 }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Contenedor principal de contenido */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 mt-8">
        {/* Sección de información */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {/* Detalles principales */}
          <div className="md:col-span-2 space-y-8">
            {/* Descripción */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-sm"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Descripción</h2>
              <p className="text-gray-700 leading-relaxed">{tour.description}</p>
            </motion.div>

            {/* Nueva sección: Incluye/No incluye/Que llevar */}
            <motion.div
              className="bg-white p-8 rounded-xl shadow-sm"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 1.05 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Detalles del paquete</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Lo que incluye */}
                <motion.div 
                  className="bg-green-50 p-5 rounded-lg"
                  whileHover={{ y: -3 }}
                >
                  <h3 className="font-bold text-lg text-green-800 mb-3 flex items-center gap-2">
                    <Check className="text-green-600" /> Incluye
                  </h3>
                  <ul className="space-y-2">
                    {tour.includes?.map((item, index) => (
                      <motion.li 
                        key={index}
                        className="text-green-700 flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index + 1.1 }}
                      >
                        <Check className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Lo que no incluye */}
                <motion.div 
                  className="bg-red-50 p-5 rounded-lg"
                  whileHover={{ y: -3 }}
                >
                  <h3 className="font-bold text-lg text-red-800 mb-3 flex items-center gap-2">
                    <XCircle className="text-red-600" /> No incluye
                  </h3>
                  <ul className="space-y-2">
                    {tour.excludes?.map((item, index) => (
                      <motion.li 
                        key={index}
                        className="text-red-700 flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index + 1.15 }}
                      >
                        <XCircle className="text-red-500 mt-0.5 flex-shrink-0" size={16} />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Qué llevar */}
                <motion.div 
                  className="bg-blue-50 p-5 rounded-lg md:col-span-2"
                  whileHover={{ y: -3 }}
                >
                  <h3 className="font-bold text-lg text-blue-800 mb-3 flex items-center gap-2">
                    <Luggage className="text-blue-600" /> Qué llevar
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {tour.toBring?.map((item, index) => (
                      <motion.li 
                        key={index}
                        className="text-blue-700 flex items-start gap-2 bg-blue-100/50 p-2 rounded"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index + 1.2 }}
                      >
                        <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
                          {index + 1}
                        </span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>

            {/* Itinerario */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-sm"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Itinerario</h2>
              <div className="space-y-4">
                {tour.itinerary.map((day, index) => (
                  <motion.div 
                    key={index}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index + 1.2 }}
                  >
                    <motion.div 
                      className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer"
                      onClick={() => toggleDay(index)}
                      whileHover={{ backgroundColor: "#f8f9fa" }}
                    >
                      <span className="font-medium text-gray-800">Día {day.day}: {day.title}</span>
                      <motion.div
                        animate={{ rotate: activeDay === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="text-gray-500" />
                      </motion.div>
                    </motion.div>
                    
                    <AnimatePresence>
                      {activeDay === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 flex flex-col gap-6 md:flex-row">
                            <motion.p 
                              className="w-full md:w-2/3 text-gray-700 leading-relaxed"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              {day.description}
                            </motion.p>
                            <motion.div 
                              className="w-full md:w-1/3"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 }}
                            >
                              <motion.img
                                src={day.imagesItinerario[0]}
                                alt="Itinerario"
                                onClick={() => openModal(day.imagesItinerario, 0)}
                                className="rounded-lg object-cover h-48 w-full cursor-pointer shadow-sm"
                                whileHover={{ scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              />
                              {day.imagesItinerario.length > 1 && (
                                <div className="flex justify-center mt-3">
                                  <motion.button 
                                    onClick={() => openModal(day.imagesItinerario, 0)}
                                    className="text-sm text-[#f39703] hover:underline flex items-center gap-1"
                                    whileHover={{ x: 2 }}
                                  >
                                    Ver galería ({day.imagesItinerario.length})
                                  </motion.button>
                                </div>
                              )}
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar de información */}
          <div className="space-y-6">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm sticky top-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800">Detalles</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-[#f39703]/10 p-2 rounded-full">
                    <Clock className="text-[#f39703] size-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Duración</p>
                    <p className="text-gray-600">{tour.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-[#f39703]/10 p-2 rounded-full">
                    <Users className="text-[#f39703] size-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Tamaño del grupo</p>
                    <p className="text-gray-600">{tour.groupSize}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-[#f39703]/10 p-2 rounded-full">
                    <CalendarDays className="text-[#f39703] size-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Disponibilidad</p>
                    <p className="text-gray-600">Todo el año</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-[#f39703]/10 p-2 rounded-full">
                    <MapPin className="text-[#f39703] size-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Punto de inicio</p>
                    <p className="text-gray-600">{tour.startPoint}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-[#f39703] to-[#f8b133] p-6 rounded-xl text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <h3 className="text-xl font-bold mb-2">Precio</h3>
              <p className="text-3xl font-bold mb-2">{tour.price} $</p>
              <p className="text-white/90">Por persona</p>
              <motion.button
                className="mt-4 w-full bg-white text-[#f39703] py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Reservar ahora
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Modal de galería elegante */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div 
              className="relative w-full max-w-6xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Imagen principal del modal */}
              <motion.div className="relative overflow-hidden rounded-lg">
                <motion.img 
                  src={modalImages[modalIndex]} 
                  alt="Galería" 
                  className="w-full max-h-[80vh] object-contain cursor-zoom-in"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Controles de navegación */}
              <motion.button
                onClick={(e) => { e.stopPropagation(); handleImageNavigation("prev"); }}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white/20 transition"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="text-white size-8" />
              </motion.button>
              
              <motion.button
                onClick={(e) => { e.stopPropagation(); handleImageNavigation("next"); }}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white/20 transition"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="text-white size-8" />
              </motion.button>

              {/* Botón de cerrar */}
              <motion.button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-red-500/20 transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="text-white size-6" />
              </motion.button>

              {/* Indicador de posición */}
              <motion.div 
                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-1 rounded-full text-sm backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {modalIndex + 1} / {modalImages.length}
              </motion.div>

              {/* Miniaturas en la parte inferior */}
              <motion.div 
                className="flex justify-center mt-6 gap-3 overflow-x-auto py-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {modalImages.map((img, idx) => (
                  <motion.img
                    key={idx}
                    src={img}
                    alt={`Miniatura ${idx}`}
                    className={`w-16 h-16 object-cover rounded cursor-pointer border-2 transition-all ${
                      idx === modalIndex ? 'border-[#f39703] opacity-100' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    onClick={(e) => { e.stopPropagation(); setModalIndex(idx); }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Tour;