import React from 'react';
import { PhoneIcon, MailIcon, MapPinIcon, Facebook, InstagramIcon, TwitterIcon, YoutubeIcon } from 'lucide-react';
const Footer = () => {
  return (<footer className="bg-[#413d3e] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Aventoura</h3>
            <p className="text-gray-300 mb-4">
              Explorando el mundo juntos desde (Date). Ofrecemos las mejores
              experiencias para viajeros apasionados.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-[#f39703]">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#f39703]">
                <InstagramIcon className="h-5 w-5" />
              </a>
             
              <a href="#" className="text-gray-300 hover:text-[#f39703]">
                <YoutubeIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Destinos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Tours
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPinIcon className="h-5 w-5 mr-2 mt-0.5 text-[#f39703]" />
                <span className="text-gray-300">Av. Principal 123, Ciudad</span>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-2 text-[#f39703]" />
                <span className="text-gray-300">+34 123 456 789</span>
              </li>
              <li className="flex items-center">
                <MailIcon className="h-5 w-5 mr-2 text-[#f39703]" />
                <span className="text-gray-300">info@Aventoura.com</span>
              </li>
            </ul>
          </div>
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Suscríbete</h3>
            <p className="text-gray-300 mb-4">
              Recibe nuestras mejores ofertas y novedades
            </p>
            <form className="flex flex-col space-y-2">
              <input type="email" placeholder="Tu correo electrónico" className="px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button type="submit" className="bg-[#f39703] hover:bg-[#f39703]/90 text-white font-medium py-2 px-4 rounded-md transition duration-300">
                Suscribirse
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-10 pt-8 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} Aventoura. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>)
};
export default Footer;