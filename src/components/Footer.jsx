import React, { useRef } from 'react';
import { MapPin, Phone, Mail, MessageSquare, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const contactRef = useRef(null);

  

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-[#413d3e] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Información de la empresa */}
          <div>
            <h3 className="text-xl font-bold mb-4">Aventoura</h3>
            <p className="text-gray-300 mb-4">
              Explorando el mundo juntos. Ofrecemos las mejores experiencias para viajeros apasionados.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-[#f39703] transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.instagram.com/aventoura.es?igsh=MTVxOHc1ZjRleXpseg==" className="text-gray-300 hover:text-[#f39703] transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            
            </div>
          </div>

          {/* Enlaces rápidos simplificados */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Link 
                  to="/nosotros" 
                  className="text-gray-300 hover:text-white flex items-center transition-colors"
                >
                  <span className="w-2 h-2 bg-[#f39703] rounded-full mr-2"></span>
                  Nosotros
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
              
             
              <Link 
                  to="/tours" 
                  className="text-gray-300 hover:text-white flex items-center transition-colors"
                >
                
                  <span className="w-2 h-2 bg-[#f39703] rounded-full mr-2"></span>
                  Contacto
                  </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Link 
                  to="/tours" 
                  className="text-gray-300 hover:text-white flex items-center transition-colors"
                >
                  <span className="w-2 h-2 bg-[#f39703] rounded-full mr-2"></span>
                  Tours
                </Link>
              </motion.li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div ref={contactRef}>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-4">
            {/* 
              <motion.li 
                className="flex items-start"
                whileHover={{ x: 3 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <MapPin className="h-5 w-5 mr-3 mt-0.5 text-[#f39703] flex-shrink-0" />
                <span className="text-gray-300">Av. Principal 123, Ciudad</span>
              </motion.li>*/}  

             {/*    <motion.li 
                className="flex items-center"
                whileHover={{ x: 3 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Phone className="h-5 w-5 mr-3 text-[#f39703] flex-shrink-0" />
                <a href="tel:+34123456789" className="text-gray-300 hover:text-white transition-colors">+1 714 232 9319 </a>
              </motion.li>*/} 


              <motion.li 
                className="flex items-center"
                whileHover={{ x: 3 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Mail className="h-5 w-5 mr-3 text-[#f39703] flex-shrink-0" />
                <a href="aventouraes@gmail.com" className="text-gray-300 hover:text-white transition-colors">aventouraes@gmail.com</a>
              </motion.li>
              <motion.li 
                className="flex items-center"
                whileHover={{ x: 3 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <MessageSquare className="h-5 w-5 mr-3 text-[#f39703] flex-shrink-0" />
                <a href="https://wa.me/17142329319" className="text-gray-300 hover:text-white transition-colors">WhatsApp</a>
              </motion.li>
            </ul>
          </div>
        </div>

        {/* Botón para subir */}
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[#f39703] text-white p-3 rounded-full shadow-lg hover:bg-[#e68a00] transition-colors z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Volver arriba"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>

        {/* Derechos de autor */}
        <div className="border-t border-gray-700 mt-10 pt-8 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} Aventoura. Todos los derechos reservados. | 
            <a href="#" className="hover:text-[#f39703] ml-2 transition-colors">Política de Privacidad</a> | 
            <a href="#" className="hover:text-[#f39703] ml-2 transition-colors">Términos de Servicio</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
