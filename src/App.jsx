import React from "react";
import MapContainer from "./components/MapContainer.jsx";

function App() {
  const [restaurantes, setRestaurantes] = useState([]);
  return (
    <>
      <h3 className="titleRestaurant">Restaurantes cercanas a tu ubicación</h3>

      <MapContainer onPlacesLoaded={setRestaurantes} />
      <h3 className="titleRestaurant">Restaurantes cercanas a tu ubicación</h3>

      {restaurantes.map((item) => (
        // Por cada restaurante en el estado, creamos una tarjeta
        <RestaurantCard key={item.id} data={item} />
      ))}
    </>
  );
}

export default App;
