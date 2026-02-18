import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagramSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

export default function Navbar() {
  useEffect(() => {
    const header = document.getElementById("header");
    const scrolledClasses = [
      "bg-[#1C1C1C]/80",
      "backdrop-blur-sm",
      "shadow-lg",
      "shadow-lime-500/5",
    ];

    const handleScroll = () => {
      if (window.scrollY > 10) {
        header.classList.add(...scrolledClasses);
      } else {
        header.classList.remove(...scrolledClasses);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 bg-transparent transition-all duration-300"
      id="header"
    >
      <nav className="header mx-auto flex max-w-7xl items-center justify-between p-4">
        <div className="hidden items-center space-x-12 md:flex">
          <a
            className="font-medium text-gray-300 transition-colors duration-300 hover:text-lime-400"
            href="#home"
          >
            Home
          </a>
          <a
            className="font-medium text-gray-300 transition-colors duration-300 hover:text-lime-400"
            href="#about"
          >
            About
          </a>
          <a
            className="font-medium text-gray-300 transition-colors duration-300 hover:text-lime-400"
            href="#skills"
          >
            Skills
          </a>
          <a
            className="font-medium text-gray-300 transition-colors duration-300 hover:text-lime-400"
            href="#projects"
          >
            Recent projects
          </a>
          <a
            className="font-medium text-gray-300 transition-colors duration-300 hover:text-lime-400"
            href="#contact"
          >
            Get In Touch
          </a>
        </div>
        <div className="ml-auto flex items-center space-x-6">
          <a
            rel="noopener noreferrer"
            className="text-gray-300 transition-all duration-300 hover:scale-110 hover:text-lime-400"
            href="https://www.linkedin.com/in/izerimana-blaise-90222530a/"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              size="lg"
            />
          </a>
          <a
            rel="noopener noreferrer"
            className="text-gray-300 transition-all duration-300 hover:scale-110 hover:text-lime-400"
            href="https://github.com/Blaise101"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faGithub}
              size="lg"
            />
          </a>
          <a
            rel="noopener noreferrer"
            className="text-gray-300 transition-all duration-300 hover:scale-110 hover:text-lime-400"
            href="mailto:izerimanab74@gmail.com"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={fas.faEnvelope}
              size="lg"
            />
          </a>
          <a
            className="text-gray-300 transition-all duration-300 hover:scale-110 hover:text-lime-400"
            href="https://www.instagram.com/a_m_blaise/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faInstagramSquare}
              size="lg"
            />
          </a>
        </div>
      </nav>
    </header>
  );
}
