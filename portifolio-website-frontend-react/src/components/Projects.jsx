import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "../assets/defaults";

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = projects.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % length);
    }, 20000);

    return () => clearInterval(interval);
  }, [length]);

  const goToSlide = (index) => {
    setCurrentIndex((index + length) % length);
  };

  return (
    <section
      className="py-24"
      id="projects"
    >
      {/* Header */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold md:text-5xl">
          Recent <span className="text-lime-400">Projects</span>
        </h2>
        <p className="mt-4 text-gray-400">
          Hover to explore each project in detail
        </p>
      </div>

      {/* Carousel */}
      <div className="relative mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-2xl shadow-2xl shadow-lime-900/30">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0"
              >
                {/* CARD */}
                <div className="relative group w-full h-[500px] md:h-[600px] overflow-hidden">
                  {/* IMAGE */}
                  <img
                    src={project.src}
                    alt={project.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* DARK OVERLAY */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* CONTENT OVERLAY */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <h3 className="text-3xl font-bold text-lime-400">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-gray-200 max-w-2xl">
                      {project.description}
                    </p>

                    {/* Tech */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.map((t, i) => (
                        <span
                          key={i}
                          className="text-xs bg-lime-500/20 text-lime-300 px-3 py-1 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="mt-6 flex gap-4">
                      <a
                        href={project.live}
                        target={project.live !== "#projects" && "blank"}
                        className="px-5 py-2 bg-lime-500 text-black font-semibold rounded-lg hover:bg-lime-400 transition"
                      >
                        Live Demo
                      </a>

                      <a
                        href={project.github}
                        target="blank"
                        className="px-5 py-2 border border-lime-400 text-lime-400 rounded-lg hover:bg-lime-500/10 transition"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <button
          onClick={() => goToSlide(currentIndex - 1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-lime-500 text-black font-bold hover:bg-lime-400 transition"
        >
          <ChevronLeft
            className="m-auto"
            size={14}
          />
        </button>

        <button
          onClick={() => goToSlide(currentIndex + 1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-lime-500 text-black font-bold hover:bg-lime-400 transition"
        >
          <ChevronRight
            className="m-auto"
            size={14}
          />
        </button>

        {/* Dots */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
          {projects.map((_, index) => (
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
