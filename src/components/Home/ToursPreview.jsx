import React, { useEffect, useState } from 'react';
import { MapPinIcon, CalendarIcon, StarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const ToursPreview = () => {
  const [tour, settour] = useState([]); // Estado para almacenar los tours
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    fetch('/data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los tours');
        }
        return response.json();
      })
      .then((data) => {
        settour(data.tours); // ✅ Corregido para acceder al array
        console.log(data.tours);
      })
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (tour.length === 0 && !error) {
    return <div className="text-center text-gray-500">No hay tours disponibles.</div>;
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#413d3e] mb-4">
            Tours Destacados
          </h2>
          <p className="text-[#413d3e]/80 max-w-2xl mx-auto">
            Explora nuestras experiencias más populares y comienza a planificar
            tu próxima aventura inolvidable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tour.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="flex items-center text-sm text-[#413d3e]/70">
                    <MapPinIcon className="h-4 w-4 mr-1 text-[#f39703]" />
                    {tour.location}
                  </span>
                  <span className="flex items-center text-sm text-[#413d3e]/70">
                    <CalendarIcon className="h-4 w-4 mr-1 text-[#f39703]" />
                    {tour.duration}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {tour.title}
                </h3>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{tour.rating}</span>
                  </div>
                  <div className="text-[#f39703] font-bold">€{tour.price}</div>
                </div>
                <Link to={`/tour/${tour.id}`}>
                  <button className="w-full bg-[#f39703] hover:bg-[#413d3e] text-white font-medium py-2 px-4 rounded-md transition duration-300">
                    Ver Detalles
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-transparent hover:bg-[#f39703] text-[#f39703] hover:text-white border border-[#f39703] font-bold py-3 px-8 rounded-full transition duration-300">
            Ver Todos los Tours
          </button>
        </div>
      </div>
    </section>
  );
};

export default ToursPreview;
