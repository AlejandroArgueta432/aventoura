import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, MessageSquare, ChevronDown, Star, CalendarDays, Users, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ToursYContacto = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('contacto');
  const navigate = useNavigate();

  // Datos de contacto mejorados
  const contactInfo = [
    { 
      icon: <Phone className="text-[#f39703]" />, 
      text: '+1 714 232 9319', 
      link: 'tel:+17142329319',
      description: 'Llámanos para reservas o consultas' 
    },
    { 
      icon: <Mail className="text-[#f39703]" />, 
      text: 'aventouraes@gmail.com', 
      link: 'mailto:aventouraes@gmail.com',
      description: 'Envíanos un correo para más información' 
    },
    { 
      icon: <MessageSquare className="text-[#f39703]" />, 
      text: 'WhatsApp', 
      link: 'https://wa.me/17142329319',
      description: 'Chatea con nosotros directamente' 
    }
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="flex flex-col items-center"
        >
          <Loader2 className="text-[#f39703] h-16 w-16 mb-4" />
          <p className="text-gray-600 font-medium">Cargando experiencias...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <div className="max-w-md text-center bg-white p-8 rounded-xl shadow-lg">
          <AlertCircle className="text-red-500 h-12 w-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error al cargar los tours</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-[#f39703] to-[#e68a00] hover:from-[#e68a00] hover:to-[#da7f00] text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Encabezado con pestañas elegantes */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-[#413d3e] mb-4"
          >
            {activeTab === 'contacto' ? 'Contáctanos' : 'Nuestros Tours'}
          </motion.h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {activeTab === 'contacto' 
              ? 'Estamos aquí para ayudarte en cada paso de tu aventura' 
              : 'Descubre experiencias únicas diseñadas para aventureros'}
          </p>
        </div>

        {/* Pestañas elegantes */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-white rounded-full p-1 shadow-md">
            <button
              onClick={() => setActiveTab('contacto')}
              className={`px-8 py-3 font-medium text-lg rounded-full transition-all ${activeTab === 'contacto' 
                ? 'bg-gradient-to-r from-[#f39703] to-[#e68a00] text-white shadow-md' 
                : 'text-gray-600 hover:text-gray-800'}`}
            >
              Contacto
            </button>
            <button
              onClick={() => setActiveTab('tour')}
              className={`px-8 py-3 font-medium text-lg rounded-full transition-all ${activeTab === 'tour' 
                ? 'bg-gradient-to-r from-[#f39703] to-[#e68a00] text-white shadow-md' 
                : 'text-gray-600 hover:text-gray-800'}`}
            >
              Tours
            </button>
          </div>
        </div>

        {/* Contenido de las pestañas */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-20"
        >
          {activeTab === 'contacto' ? (
            <div className="max-w-4xl mx-auto">
              {/* Tarjeta de contacto elegante */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="md:flex">
                  {/* Sección izquierda con fondo degradado */}
                  <div className="md:w-2/5 bg-gradient-to-b from-[#f39703] to-[#e68a00] p-8 text-white">
                    <h2 className="text-2xl font-bold mb-6">Información de contacto</h2>
                    <p className="mb-8">Estamos disponibles para responder tus preguntas y ayudarte a planificar tu próxima aventura.</p>
                    
                    <div className="space-y-6">
                      {contactInfo.map((item, index) => (
                        <motion.div 
                          key={index}
                          whileHover={{ x: 5 }}
                          className="flex items-start"
                        >
                          <div className="bg-white bg-opacity-20 p-2 rounded-lg mr-4">
                            {item.icon}
                          </div>
                          <div>
                            <a 
                              href={item.link} 
                              className="text-white font-medium hover:underline block"
                            >
                              {item.text}
                            </a>
                            <p className="text-white text-opacity-80 text-sm">{item.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Sección derecha con horarios */}
                  <div className="md:w-3/5 p-8">
                    <h2 className="text-2xl font-bold text-[#413d3e] mb-6">Horario de atención</h2>
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="bg-[#f39703] bg-opacity-10 p-2 rounded-lg mr-4">
                          <CalendarDays className="text-[#f39703] h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#413d3e]">Días laborales</h3>
                          <p className="text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-[#f39703] bg-opacity-10 p-2 rounded-lg mr-4">
                          <CalendarDays className="text-[#f39703] h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#413d3e]">Fines de semana</h3>
                          <p className="text-gray-600">Sábados: 10:00 - 14:00</p>
                          <p className="text-gray-600">Domingos: Cerrado</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Sección adicional para mantener el balance visual */}
                    <div className="mt-10">
                      <h3 className="font-semibold text-[#413d3e] mb-4">¿Necesitas ayuda?</h3>
                      <p className="text-gray-600">
                        Nuestro equipo está listo para asistirte durante nuestro horario de atención. 
                        No dudes en contactarnos por cualquiera de nuestros canales disponibles.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Listado de tours con diseño mejorado */}
              {tours.map((tour) => (
                <motion.div
                  key={tour.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
                  onClick={() => handleTourClick(tour.id)}
                >
                  <div className="md:flex">
                    <div className="md:w-2/5 relative overflow-hidden">
                      <img 
                        src={tour.image} 
                        alt={tour.title} 
                        className="w-full h-64 md:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <button className="bg-white text-[#f39703] font-medium py-2 px-6 rounded-full shadow-md">
                          Ver tour
                        </button>
                      </div>
                    </div>
                    <div className="md:w-3/5 p-8">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-[#413d3e] mb-2 group-hover:text-[#f39703] transition-colors">{tour.title}</h3>
                          <div className="flex items-center text-gray-600 mb-3">
                            <MapPin className="h-5 w-5 mr-2 text-[#f39703]" />
                            <span>{tour.location}</span>
                          </div>
                        </div>
                        <div className="bg-[#f39703] bg-opacity-10 px-3 py-1 rounded-full flex items-center">
                          <Star className="h-4 w-4 text-[#f39703] mr-1" />
                          <span className="text-[#f39703] font-medium">{tour.rating}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 my-4">
                        <div className="bg-gray-50 px-3 py-1 rounded-full flex items-center">
                          <Users className="h-4 w-4 mr-1 text-[#f39703]" />
                          <span className="text-sm text-gray-600">{tour.groupSize}</span>
                        </div>
                        <div className="bg-gray-50 px-3 py-1 rounded-full flex items-center">
                          <CalendarDays className="h-4 w-4 mr-1 text-[#f39703]" />
                          <span className="text-sm text-gray-600">{tour.duration}</span>
                        </div>
                     {/**   <div className="bg-gray-50 px-3 py-1 rounded-full">
                          <span className="text-sm text-gray-600">Desde ${tour.price}</span>
                        </div>*/} 
                      </div>

                      <p className="text-gray-600 mb-6 line-clamp-2">{tour.description}</p>

                      <div className="flex justify-between items-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTourClick(tour.id);
                          }}
                          className="bg-gradient-to-r from-[#f39703] to-[#e68a00] hover:from-[#e68a00] hover:to-[#da7f00] text-white font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                        >
                          Ver detalles
                          <ChevronDown className="h-5 w-5" />
                        </button>
                        {tour.isPopular && (
                          <span className="bg-[#f39703] text-white text-xs font-bold px-3 py-1 rounded-full">
                            POPULAR
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ToursYContacto;