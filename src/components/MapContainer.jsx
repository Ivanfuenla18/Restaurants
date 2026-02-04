import UseMapApiLoader from "../hooks/UseMapApiLoader.jsx";
import { GoogleMap } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard.jsx";

const MapContainer = () => {
  const isLoaded = UseMapApiLoader();
  const zoom = 15;
  const mapStyles = {
    height: "60vh",
    width: "90%",
    borderRadius: "10px",
    border: "2px solid white",
    boxShadow: "0 4px 8px rgb(255, 255, 255)",
    margin: "0 auto",
  };
  const [currentPosition, setCurrentPosition] = useState({
    lat: 40.4168,
    lng: -3.7038,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCurrentPosition({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

  const handdleOnLoadMap = async (instanceMap) => {
    const { Place } = await window.google.maps.importLibrary("places");
    // Actualización del marcador
    const { AdvancedMarkerElement } =
      await window.google.maps.importLibrary("marker");

    // Marcador de tu posición usando la nueva API
    new AdvancedMarkerElement({
      map: instanceMap,
      position: currentPosition,
      title: "Tú",
    });

    const request = {
      fields: ["displayName", "location"],
      includedPrimaryTypes: ["restaurant"],
      locationRestriction: {
        center: currentPosition,
        radius: 1500,
      },
      maxResultCount: 15,
    };

    const { places } = await Place.searchNearby(request);

    if (places && places.length > 0) {
      onPlacesLoaded(places);
      places.forEach((place) => {
        // 1. Quitamos los corchetes []. Solo necesitamos el objeto.
        const post = {
          lat: place.location.lat(),
          lng: place.location.lng(),
        };

        // 2. Usamos 'post' y corregimos el título
        new AdvancedMarkerElement({
          map: instanceMap,
          position: post, // Ahora es un objeto válido
          title: place.displayName, // Nombre corregido
        });
      });
    }
  };

  if (isLoaded) {
    return (
      <div className="mapContainer">
        <GoogleMap
          center={currentPosition}
          zoom={zoom}
          mapContainerStyle={mapStyles}
          onLoad={handdleOnLoadMap}
          options={{ mapId: "DEMO_MAP_ID" }}
        />
      </div>
    );
  } else {
    return <div>Cargando mapa....</div>;
  }
};

export default MapContainer;
