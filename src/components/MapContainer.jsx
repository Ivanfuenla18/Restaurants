import UseMapApiLoader from "../hooks/UseMapApiLoader.jsx";
import { GoogleMap } from "@react-google-maps/api";
import { useState, useEffect } from "react";

const MapContainer = ({ onPlacesLoaded }) => {
  const isLoaded = UseMapApiLoader();
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
    const { AdvancedMarkerElement } =
      await window.google.maps.importLibrary("marker");

    new AdvancedMarkerElement({
      map: instanceMap,
      position: currentPosition,
      title: "Tú",
    });

    const request = {
      fields: ["displayName", "location", "photos", "rating"],
      includedPrimaryTypes: ["cafe"],
      locationRestriction: { center: currentPosition, radius: 1500 },
      maxResultCount: 9,
    };

    const { places } = await Place.searchNearby(request);

    if (places && places.length > 0) {
      if (onPlacesLoaded) onPlacesLoaded(places);

      places.forEach((place) => {
        new AdvancedMarkerElement({
          map: instanceMap,
          position: { lat: place.location.lat(), lng: place.location.lng() },
          title: place.displayName,
        });
      });
    }
  };

  if (!isLoaded) return <div>Cargando mapa....</div>;

  return (
    <div className="mapContainer">
      <GoogleMap
        center={currentPosition}
        zoom={15}
        mapContainerStyle={{ height: "40vh", width: "90%", margin: "0 auto" }}
        onLoad={handdleOnLoadMap}
        options={{ mapId: "DEMO_MAP_ID" }}
      />
    </div>
  );
};

export default MapContainer;
