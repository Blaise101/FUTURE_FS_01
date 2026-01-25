import { useEffect, useState } from "react";
import { ProjectImages } from "../assets/defaults";

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ProjectImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex((index + ProjectImages.length) % ProjectImages.length);
  };

  return (
    <section
      className="py-24"
      id="projects"
    >
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold md:text-5xl">
          Recent <span className="text-glow text-lime-400">Projects!</span>
        </h2>
      </div>
      <div className="carousel-container relative mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-lg shadow-2xl shadow-lime-900/30">
          <div
            className="flex transition-transform duration-700 ease-in-ou"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {ProjectImages.map((image, index) => (
              <img
                key={index}
                alt={image.alt}
                className="h-auto w-full flex-shrink-0"
                src={image.src}
              />
            ))}
          </div>
        </div>
        <button
          aria-label="Previous project"
          onClick={() => goToSlide(currentIndex - 1)}
          className="lime-glow-hover absolute left-0 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-lime-500/80 text-gray-900 transition-all duration-300 hover:bg-lime-500"
        >
          &lt;
        </button>
        <button
          onClick={() => goToSlide(currentIndex + 1)}
          aria-label="Next project"
          className="lime-glow-hover absolute right-0 top-1/2 flex h-12 w-12 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-lime-500/80 text-gray-900 transition-all duration-300 hover:bg-lime-500"
        >
          &gt;
        </button>
        <div
          className="absolute -bottom-10 left-1/2 flex -translate-x-1/2 gap-2"
          id="carousel-dots"
        >
          {ProjectImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-lime-400 scale-125" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
