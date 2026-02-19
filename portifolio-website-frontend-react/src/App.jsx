import { useEffect } from "react";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Languages from "./components/Languages";
import Projects from "./components/Projects";
import Contacts from "./components/Contacts";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CV from "./assets/Blaise_Izerimana_Cover_Letter.pdf";

function App() {
  useEffect(() => {
    const main = document.querySelector(".main-container");
    main.classList.remove("opacity-0");
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-gray-200 opacity-0 transition-opacity duration-1000 ease-in main-container">
                <Navbar />
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <Intro />
                  <About />
                  <Languages />
                  <Projects />
                  <Contacts />
                </main>
              </div>
            }
          />
          <Route
            path="/cv"
            element={
              <div className="text-gray-200 opacity-0 transition-opacity duration-1000 ease-in main-container">
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                  <div className="flex items-center justify-center">
                    <div className="w-full rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 shadow-2xl border border-gray-700">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-lime-400">
                          CV / Cover Letter
                        </h2>
                        <Link
                          to="/"
                          className="px-4 py-2 bg-lime-400 text-gray-900 font-semibold rounded-lg hover:bg-lime-300 transition-colors"
                        >
                          Back to Home
                        </Link>
                      </div>

                      <iframe
                        src={CV}
                        className="w-full h-screen rounded-lg border border-gray-600"
                        title="CV / Cover Letter"
                      />
                    </div>
                  </div>
                </main>
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
