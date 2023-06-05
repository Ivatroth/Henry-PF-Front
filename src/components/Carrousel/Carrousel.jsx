import "./Carrousel.css";
import { useState, useEffect } from "react";

const background_image = [
  "https://http2.mlstatic.com/D_NQ_671365-MLA69288732514_052023-OO.webp",
  "https://http2.mlstatic.com/D_NQ_900715-MLA69337684526_052023-OO.webp",
  "https://http2.mlstatic.com/D_NQ_776401-MLA54983332943_052023-OO.webp",
  "https://http2.mlstatic.com/D_NQ_875375-MLA69362854298_052023-OO.webp",
  "https://http2.mlstatic.com/D_NQ_882174-MLA69410591226_052023-OO.webp",
  "https://http2.mlstatic.com/D_NQ_872488-MLA69385672977_052023-OO.webp",
];

export default function Carrousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex(
      currentIndex === background_image.length - 1 ? 0 : currentIndex + 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(nextImage, 4000);
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <div className="carousel">
      <button
        className="buton-carousel"
        onClick={() =>
          setCurrentIndex(
            currentIndex === 0 ? background_image.length - 1 : currentIndex - 1
          )
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="30"
          viewBox="0 0 24 24"
          style={{ fill: "rgba(0, 0, 0, 1)" }}
        >
          <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
        </svg>
      </button>
      {background_image.map((image, index) => (
        <img
          key={index}
          src={image}
          alt="carousel-image"
          className={`carousel-image ${index === currentIndex ? "active" : ""}`}
        />
      ))}
      <button
        className="buton-carousel1"
        onClick={() =>
          setCurrentIndex(
            currentIndex === background_image.length - 1 ? 0 : currentIndex + 1
          )
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ fill: "rgba(0, 0, 0, 1)" }}
        >
          <path d="M10.707 6.293 9.293 7.707 13.586 12l-4.293 4.293 1.414 1.414L16.414 12z"></path>
        </svg>
      </button>
    </div>
  );
}
