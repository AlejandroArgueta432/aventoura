import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPinIcon, Clock, UsersRound, Calendar } from "lucide-react";

const Tour = () => {
  const { id } = useParams(); // Obtenemos el id de la URL
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true); // Nuevo estado de carga
  const [error, setError] = useState(null);
  const [visibleDescriptions, setVisibleDescriptions] = useState([]); // Estado para controlar visibilidad

  useEffect(() => {
    fetch("/data.json") // Asegúrate de que esté en la carpeta public
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener el tour");
        }
        return response.json();
      })
      .then((data) => {
        const selectedTour = data.tours.find((tour) => tour.id === Number(id));
        if (!selectedTour) {
          throw new Error("Tour no encontrado");
        }
        setTour(selectedTour);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener el tour:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="text-center text-gray-600 mt-10 text-lg">
        Cargando información del tour...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10 text-lg">
        Error: {error}
      </div>
    );
  }

  const handleDescriptionClick = (index) => {
    setVisibleDescriptions((prev) => {
      if (prev.includes(index)) {
        // Si ya está visible, lo ocultamos
        return prev.filter((i) => i !== index);
      } else {
        // Si no está visible, lo mostramos
        return [...prev, index];
      }
    });
  };

  return (
    <section className="w-full text-[#413d3e]">
      {/* Imagen principal */}
      {tour?.image && (
        <div>
          <img
            className="w-full h-[400px] object-cover"
            src={tour.image}
            alt={tour.title}
          />
        </div>
      )}

      {/* Galería de fotos */}
      <div className="flex flex-wrap justify-center gap-3 shadow-md p-4">
        {tour?.photos?.map((photo, index) => (
          <img
            key={index}
            className="w-[100px] h-[100px] rounded-md object-cover hover:scale-105 transition duration-300 ease-in-out hover:rotate-2"
            src={photo}
            alt={`Foto ${index + 1} de ${tour.title}`}
          />
        ))}
      </div>

      {/* nombre y precio */}
      <div className="p-6 max-w-4xl mx-auto flex justify-between items-center bg-white  rounded-lg mt-6">
        <div className="flex flex-col ">
          <h2> {tour.title}</h2>
          <div className="flex flex-row ">
            <MapPinIcon /> <p> {tour.location}</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p> Desde</p>
          <h3 className="text-2xl font-bold text-[#f39703]">{tour.price} €</h3>
          <p className="text-gray-600">Por persona</p>
        </div>
      </div>

      {/* Descripción del tour */}
      <div className="flex flex-row justify-center items-center gap-4 mt-6 p-4 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="bg-gray-100 rounded-md p-2 flex flex-col items-center">
          <Clock className="text-[#f39703] " />
          <p>Duracion</p>
          <p className="text-[#413d3e]/70">{tour.duration}</p>
        </div>

        <div className="bg-gray-100 rounded-md p-2 flex flex-col items-center">
          <UsersRound className="text-[#f39703] " />
          <p>Tamaño del grupo</p>
          <p className="text-[#413d3e]/70">{tour.groupSize}</p>
        </div>
        <div className="bg-gray-100 rounded-md p-2 flex flex-col items-center">
          <Calendar className="text-[#f39703] " />
          <p>Disponibilidad</p>
          <p className="text-[#413d3e]/70">Todo el año</p>
        </div>
        <div className="bg-gray-100 rounded-md p-2 flex flex-col items-center">
          <MapPinIcon className="text-[#f39703] " />
          <p>Punto de inicio</p>
          <p className="text-[#413d3e]/70">lugar de inicio</p>
        </div>
      </div>

      {/* Descripción */}
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-bold mb-4">Descripción</h3>
        <p className="text-gray-700">{tour.description}</p>
      </div>

      {/* Itinerario */}
      <div>
        <h1 className="text-2xl font-bold text-center mt-6">Itinerario</h1>
        <div className="max-w-4xl mx-auto mt-4">
          {tour.itinerary.map((day, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-4 mb-4 shadow-md">
              <h2
                onClick={() => handleDescriptionClick(index)}
                className="text-lg font-bold text-[#f39703] cursor-pointer"
              >
                Día {day.day}: {day.title}
              </h2>
              {visibleDescriptions.includes(index) && (
<div>      <p className="text-gray-700 mt-2">{day.description}</p>
                <img src="" alt="" />

</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tour;