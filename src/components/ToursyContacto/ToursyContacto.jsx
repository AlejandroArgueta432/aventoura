import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, MessageSquare, ChevronDown, Star, CalendarDays, Users, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ToursYContacto = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Datos de contacto simplificados
  const contactInfo = [
    { icon: <MapPin className="text-[#f39703]" />, text: 'Av. Viajeros 123, Ciudad' },
    { icon: <Phone className="text-[#f39703]" />, text: '+34 123 456 789', link: 'tel:+34123456789' },
    { icon: <Mail className="text-[#f39703]" />, text: 'info@aventoura.com', link: 'mailto:info@aventoura.com' },
    { icon: <MessageSquare className="text-[#f39703]" />, text: 'WhatsApp', link: 'https://wa.me/34123456789' }
  ];

  // Fetch tours data
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
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

  const handleTourClick = (id) => {
    navigate(`/tour/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="text-[#f39703] h-12 w-12" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md text-center">
          <AlertCircle className="text-red-500 h-10 w-10 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error al cargar los tours</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#f39703] hover:bg-[#e68a00] text-white font-medium py-2 px-6 rounded-lg"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Contenido */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <h2 className="text-3xl font-bold text-[#413d3e] mb-2">Nuestros Tours</h2>
          <p className="text-gray-600 mb-8">Experiencias únicas diseñadas para aventureros</p>
          
          {tours.map((tour) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => handleTourClick(tour.id)}
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={tour.image} 
                    alt={tour.title} 
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-[#413d3e] mb-2">{tour.title}</h3>
                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="h-5 w-5 mr-2 text-[#f39703]" />
                        <span>{tour.location}</span>
                      </div>
                    </div>
                    <div className="bg-[#f39703] text-white px-3 py-1 rounded-full font-bold">
                      {tour.price} $
                    </div>
                  </div>

                  <div className="flex items-center gap-4 my-4">
                    <div className="flex items-center bg-[#f39703]/10 px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 text-[#f39703] mr-1" />
                      <span className="text-sm font-medium">{tour.rating}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-1 text-[#f39703]" />
                      <span className="text-sm">{tour.groupSize} personas</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <CalendarDays className="h-4 w-4 mr-1 text-[#f39703]" />
                      <span className="text-sm">{tour.duration}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 line-clamp-3">{tour.description}</p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTourClick(tour.id);
                    }}
                    className="bg-[#f39703] hover:bg-[#e68a00] text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2"
                  >
                    Ver detalles completos
                    <ChevronDown className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Sección de Contacto simplificada */}
          <div className="bg-white rounded-xl shadow-lg p-8 mt-16">
            <h2 className="text-3xl font-bold text-[#413d3e] mb-6">Contacto</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-[#413d3e] mb-4">Información de contacto</h3>
                <ul className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ x: 5 }}
                      className="flex items-start"
                    >
                      <span className="mr-4 mt-0.5">{item.icon}</span>
                      {item.link ? (
                        <a href={item.link} className="text-gray-600 hover:text-[#f39703] transition-colors">
                          {item.text}
                        </a>
                      ) : (
                        <span className="text-gray-600">{item.text}</span>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#413d3e] mb-4">Horario de atención</h3>
                <p className="text-gray-600 mb-2">Lunes a Viernes: 9:00 - 18:00</p>
                <p className="text-gray-600">Sábados: 10:00 - 14:00</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ToursYContacto;