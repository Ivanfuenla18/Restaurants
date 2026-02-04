import React from "react";
import MapContainer from "./components/MapContainer.jsx";
import { useState } from "react";
import CafeCard from "./components/CafeCard.jsx";

function App() {
  const [restaurantes, setRestaurantes] = useState([]);
  return (
    <>
      <h3 className="titleRestaurant">Cafeterias cercanas a tu ubicación</h3>

      <div className="cardsContainer">
        {restaurantes.map((item, index) => (
          // Usamos el index o el id si existe para la key
          <CafeCard key={index} data={item} />
        ))}
      </div>

      <h3 className="titleRestaurant">Ubicaciones</h3>
      <MapContainer onPlacesLoaded={setRestaurantes} />
    </>
  );
}

export default App;
