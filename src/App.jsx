import { useEffect } from "react";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";

function App() {
  useEffect(() => {
    const main = document.querySelector(".main-container");
    main.classList.remove("opacity-0");
  }, []);
  return (
    <>
      <div className="bg-[#1C1C1C] text-gray-200 opacity-0 transition-opacity duration-1000 ease-in main-container">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Intro />
        </main>
      </div>
    </>
  );
}

export default App;
