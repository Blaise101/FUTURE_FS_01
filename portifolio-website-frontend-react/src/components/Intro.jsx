import { useNavigate } from "react-router-dom";
import MyImage from "/images/blaise.jpg";

export default function Intro() {
  const navigate = useNavigate();
  return (
    <section
      className="flex min-h-screen items-center justify-center pt-n20 py-n20"
      id="home"
    >
      <div className="container mx-auto flex flex-col items-center justify-between gap-10 md:flex-row">
        <div className="flex items-center gap-8 md:gap-12">
          <div className="hidden items-center justify-center md:flex">
            <h2 className="rotate-180 whitespace-nowrap text-3xl font-bold uppercase tracking-[10px] [writing-mode:vertical-rl]">
              <span className="text-white">Software </span>
              <span className="text-glow text-lime-400">Developer</span>
            </h2>
          </div>
          <div className="text-center md:text-left">
            <h1 className="mb-4 text-5xl font-extrabold text-white md:text-7xl">
              Blaise Izerimana
            </h1>
            <p className="mb-8 max-w-lg text-lg text-gray-400 md:text-xl ibm-plex">
              A passionate full stack developer dedicated to building scalable
              web solutions and always striving to turn complex problems into
              simple, elegant code.
            </p>
            <button
              className="lime-glow lime-glow-hover inline-block transform rounded-lg bg-lime-500 px-8 py-3 text-lg font-bold text-gray-900 transition-all duration-300 hover:scale-105 hover:bg-lime-400"
              onClick={() => navigate("/cv")}
            >
              My Resume &rsaquo;
            </button>
          </div>
        </div>
        <div className="relative mt-10 md:mt-0">
          <div className="lime-glow h-64 w-64 overflow-hidden rounded-full bg-lime-500 md:h-80 md:w-80">
            <img
              alt="Blaise Izerimana"
              className="h-full w-full scale-110 object-cover object-top"
              src={MyImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
