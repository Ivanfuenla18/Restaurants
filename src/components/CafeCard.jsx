const CafeCard = ({ data }) => {
  // 1. Generamos la URL de la foto correctamente
  const photoUrl =
    data.photos && data.photos.length > 0
      ? data.photos[0].getURI({ maxWidth: 400, maxHeight: 300 })
      : "https://via.placeholder.com/400x300?text=Sin+Foto";

  return (
    <div className="cafeCard">
      <h4>
        {typeof data.displayName === "object"
          ? data.displayName.text
          : data.displayName}
      </h4>

      <img
        src={photoUrl}
        alt={data.displayName?.text || "Café"}
        style={{
          width: "100%",
          height: "200px",
          borderRadius: "8px",
          objectFit: "cover",
        }}
      />

      {data.rating && <p>Rating: {data.rating}⭐</p>}
    </div>
  );
};

export default CafeCard;
