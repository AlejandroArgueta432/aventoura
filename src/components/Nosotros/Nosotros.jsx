import React from 'react';
import { Globe, Target, Eye, Heart, Users, Star, ChevronDown } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const Nosotros = () => {
  // Animaciones para cada sección
  const controls = useAnimation();
  const [ref1, inView1] = useInView({ threshold: 0.2, triggerOnce: false });
  const [ref2, inView2] = useInView({ threshold: 0.2, triggerOnce: false });
  const [ref3, inView3] = useInView({ threshold: 0.2, triggerOnce: false });
  const [ref4, inView4] = useInView({ threshold: 0.2, triggerOnce: false });

  React.useEffect(() => {
    if (inView1) controls.start("visible");
    if (inView2) controls.start("visible");
    if (inView3) controls.start("visible");
    if (inView4) controls.start("visible");
  }, [controls, inView1, inView2, inView3, inView4]);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const values = [
    { icon: <Heart className="w-8 h-8 text-[#f39703]" />, title: "Pasión", description: "Amor por los viajes y la aventura" },
    { icon: <Users className="w-8 h-8 text-[#f39703]" />, title: "Comunidad", description: "Conexiones auténticas con locales" },
    { icon: <Globe className="w-8 h-8 text-[#f39703]" />, title: "Sostenibilidad", description: "Turismo responsable con el medio ambiente" },
    { icon: <Star className="w-8 h-8 text-[#f39703]" />, title: "Excelencia", description: "Servicio de calidad superior" }
  ];

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-[#f39703] to-[#f8b133] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10 px-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Nuestra Historia</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Más que una agencia de viajes, somos creadores de experiencias inolvidables
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-8"
          >
            <ChevronDown className="mx-auto text-white h-8 w-8" />
          </motion.div>
        </motion.div>
      </div>

      {/* Sobre Nosotros */}
      <motion.section
        ref={ref1}
        initial="hidden"
        animate={inView1 ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-16 px-4 max-w-6xl mx-auto"
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-1 rounded-xl shadow-lg"
            >
              <img 
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                alt="Equipo Aventoura" 
                className="rounded-lg w-full h-auto"
              />
            </motion.div>
          </div>
          <div className="md:w-1/2">
            <div className="flex items-center mb-4">
              <Globe className="text-[#f39703] h-6 w-6 mr-2" />
              <h2 className="text-2xl font-bold text-[#413d3e]">Sobre Nosotros</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Fundada en 2015, Aventoura nació de un viaje de mochileros que querían compartir su pasión por descubrir rincones auténticos del mundo.
            </p>
            <p className="text-gray-600 mb-4">
              Lo que comenzó como un pequeño grupo de entusiastas se ha convertido en una familia global de viajeros que valoran experiencias genuinas sobre turismo masivo.
            </p>
            <p className="text-gray-600">
              Hoy, con más de 50 destinos en 30 países, mantenemos nuestro espíritu original: viajes con alma, para viajeros con corazón.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Misión y Visión */}
      <div className="bg-[#413d3e] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          {/* Misión */}
          <motion.div
            ref={ref2}
            initial="hidden"
            animate={inView2 ? "visible" : "hidden"}
            variants={fadeIn}
            className="bg-white/10 p-8 rounded-xl backdrop-blur-sm"
          >
            <div className="flex items-center mb-6">
              <Target className="text-[#f39703] h-8 w-8 mr-3" />
              <h2 className="text-2xl font-bold">Nuestra Misión</h2>
            </div>
            <p className="text-gray-300">
              Transformar la manera en que el mundo viaja, creando conexiones significativas entre culturas a través de experiencias auténticas y sostenibles que enriquecen tanto a los viajeros como a las comunidades locales.
            </p>
          </motion.div>

          {/* Visión */}
          <motion.div
            ref={ref3}
            initial="hidden"
            animate={inView3 ? "visible" : "hidden"}
            variants={fadeIn}
            className="bg-white/10 p-8 rounded-xl backdrop-blur-sm"
          >
            <div className="flex items-center mb-6">
              <Eye className="text-[#f39703] h-8 w-8 mr-3" />
              <h2 className="text-2xl font-bold">Nuestra Visión</h2>
            </div>
            <p className="text-gray-300">
              Ser reconocidos como la plataforma que redefine el turismo global, donde cada viaje es una oportunidad para el crecimiento personal, el entendimiento intercultural y la preservación de los destinos que amamos.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Valores */}
      <motion.section
        ref={ref4}
        initial="hidden"
        animate={inView4 ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-16 px-4 max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-[#413d3e]">Nuestros Valores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <div className="bg-[#f39703]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#413d3e]">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <div className="bg-gradient-to-r from-[#f39703] to-[#f8b133] py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">¿Listo para vivir una aventura auténtica?</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-[#f39703] font-bold py-3 px-8 rounded-full text-lg shadow-lg"
          >
            <Link 
                  to="/tours" 
                
                > Descubre nuestros tours</Link>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;