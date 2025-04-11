import React, { useRef, useState } from "react";
import Logo from "../resources/Logo.png";
import { GlobeIcon, ChevronDownIcon, MenuIcon, XIcon } from 'lucide-react';
import { Link } from "react-router-dom";

const Header =()=>{


  const [isOpen, setIsOpen] = useState(false);// abrir menu movil

  const [isopentours, setisopentours] = useState(false);// abrir menu tours

  const [isopenservices, setisopenservices] = useState(false);// abrir menu servicios
  const [language, setLanguage] = useState('ES');// idioma por defecto

  const toggleLanguage = () => {
    setLanguage(prev=> prev === 'ES' ? 'EN' : 'ES');
  };
  
  

return(

<nav className="bg-white shadow-md sticky top-0 z-50  p-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between h-16">

     <Link to='/'>    <div className="flex items-center">
         <img className="max-w-[200px]" src={Logo} alt="" />
          </div></Link> 

          <div className="hidden md:flex items-center space-x-8">
         <Link to= '/'>  <a href="#" className="text-[#413d3e] hover:text-[#f39703] px-3 py-2 font-medium">
              Inicio
            </a></Link> 
            {/* Tours */}
            <div className="relative">
              <button onClick={() => setisopentours(!isopentours)} className="text-[#413d3e] hover:text-[#f39703] px-3 py-2 font-medium flex items-center">
                Tours <ChevronDownIcon className="ml-1 h-4 w-4" />
              </button>
              {isopentours && <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                 Tour 1
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                 Tour 2
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Tour3
                  </a>
                </div>}
            </div>
                                           {/*servicios */}
            <div className="relative">
              <button onClick={() => setisopenservices(!isopenservices)} className="text-[#413d3e] hover:text-[#f39703] px-3 py-2 font-medium flex items-center">
                Servicios <ChevronDownIcon className="ml-1 h-4 w-4" />
              </button>
              {isopenservices && <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Tours Guiados
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Paquetes
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Experiencias
                  </a>
                </div>}
            </div>


            <a href="#" className="text-[#413d3e] hover:text-[#f39703] px-3 py-2 font-medium">
              Contacto
            </a>
                                {/* Idioma */}
            <button onClick={toggleLanguage} className="flex items-center text-[#413d3e] hover:text-[#f39703] px-3 py-2 font-medium">
              <GlobeIcon className="h-5 w-5 mr-1" />
              {language}
            </button>

          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none">
              {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6 animation-modalFadeIn " />}
            </button>
          </div>
        </div>
      </div>


      {isOpen && <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
                    Inicio
                  </a>
                  <button onClick={() => setisopentours(!isopentours)} className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 flex justify-between items-center">
                    Destinos
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>
                  {isopentours && <div className="pl-4">
                      <a href="#" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600">
                      tour 1
                      </a>
                      <a href="#" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600">
                    tour 2
                      </a>
                      <a href="#" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600">
                   tour 3
                      </a>
                    </div>}
                  <button onClick={() => setisopenservices(!isopenservices)} className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 flex justify-between items-center">
                    Servicios
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>
                  {isopenservices && <div className="pl-4">
                      <a href="#" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600">
                        Tours Guiados
                      </a>
                      <a href="#" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600">
                        Paquetes
                      </a>
                      <a href="#" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600">
                        Experiencias
                      </a>
                    </div>}
                  <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
                    Contacto
                  </a>
                  <button onClick={toggleLanguage} className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 flex items-center">
                    <GlobeIcon className="h-5 w-5 mr-2" />
                    {language === 'ES' ? 'Español' : 'English'}
                  </button>
                </div>
              </div>}
          </nav>




)




};
export default Header;