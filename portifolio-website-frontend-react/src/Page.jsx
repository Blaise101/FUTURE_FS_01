import { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagramSquare,
  faLinkedin,
  faLaravel,
  faPhp,
  faReact,
  faJs,
  faVuejs,
  faNode,
  faPython,
  faCss3Alt,
  faJava,
} from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import CV from "./assets/Blaise_Izerimana_Cover_Letter.pdf";
import MyImage from "/images/blaise.jpg";
import { ChevronRight, ChevronLeft, Menu, X, ArrowUp } from "lucide-react";
import { projects } from "./assets/defaults";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Get In Touch" },
];

const NAV_EXT = {
  home: ".jsx",
  about: ".md",
  skills: ".json",
  projects: "/",
  contact: ".sh",
};

const SOCIALS = [
  {
    icon: faLinkedin,
    href: "https://www.linkedin.com/in/izerimana-blaise-90222530a/",
    label: "LinkedIn",
  },
  { icon: faGithub, href: "https://github.com/Blaise101", label: "GitHub" },
  {
    icon: fas.faEnvelope,
    href: "mailto:izerimanab74@gmail.com",
    label: "Email",
  },
  {
    icon: faInstagramSquare,
    href: "https://www.instagram.com/a_m_blaise/",
    label: "Instagram",
  },
];

const FRONTEND_SKILLS = [
  { icon: faReact, name: "React.js" },
  { icon: faLaravel, name: "Blade" },
  { icon: faVuejs, name: "Vue.js" },
  { icon: faJs, name: "JavaScript" },
  { icon: faCss3Alt, name: "CSS3" },
];

const BACKEND_SKILLS = [
  { icon: faNode, name: "Node.js" },
  { icon: faLaravel, name: "Laravel" },
  { icon: faPhp, name: "PHP" },
  { icon: faPython, name: "Python" },
  { icon: faJava, name: "Java" },
];

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 rounded";

/* Fades a block in once it enters the viewport. Reduced-motion users just see the content. */
function Reveal({ children, className = "", as: Tag = "div", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* Types a fixed string out character by character, then leaves the cursor blinking. */
function useTypewriter(text, speed = 85, startDelay = 350) {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    let i = 0;
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setDisplay(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);
  return display;
}

function TrafficLights() {
  return (
    <div className="flex gap-1.5">
      <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
    </div>
  );
}

function SkillChip({ icon, name }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-stone-700/80 bg-stone-800/60 px-3 py-1.5 font-mono text-sm text-stone-200 transition-colors hover:border-amber-400/40 hover:text-amber-200">
      <FontAwesomeIcon
        icon={icon}
        className="text-amber-400"
      />
      <span className="before:text-stone-500 after:text-stone-500">{name}</span>
    </span>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const typedName = useTypewriter("Blaise Izerimana");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const length = projects.length;

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % length);
    }, 8000);
    return () => clearInterval(interval);
  }, [length, paused]);

  const goToSlide = (index) => setCurrentIndex((index + length) % length);

  const HEADER_OFFSET = 84;
  const scrollToSection = (hash) => (e) => {
    e.preventDefault();
    const el = document.querySelector(hash);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleCarouselKeyDown = (e) => {
    if (e.key === "ArrowRight") goToSlide(currentIndex + 1);
    if (e.key === "ArrowLeft") goToSlide(currentIndex - 1);
  };

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeId, setActiveId] = useState("home");

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(
      () =>
        setToast((t) => (t.message === message ? { message: "", type } : t)),
      4000,
    );
  };

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: highlight the nav tab matching the section in view.
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Cursor-reactive glow on the ambient background layer.
  const glowRef = useRef(null);
  useEffect(() => {
    let raf = null;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.setProperty("--mx", `${e.clientX}px`);
          glowRef.current.style.setProperty("--my", `${e.clientY}px`);
        }
        raf = null;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);

    try {
      const res = await fetch(
        "https://future-fs-01-ebrq.onrender.com/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send");

      showToast("Message sent successfully ✅", "success");
      e.target.reset();
    } catch (err) {
      console.error(err);
      showToast(err.message || "Something went wrong ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-stone-200 opacity-0 transition-opacity duration-1000 ease-in main-container relative overflow-x-hidden bg-stone-950">
      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s ease; }
        .reveal.is-visible { opacity: 1; transform: none; }
        .blink-cursor { animation: blink 1s steps(1) infinite; }
        @keyframes blink { 50% { opacity: 0; } }
        @media (prefers-reduced-motion: reduce) {
          .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
          .blink-cursor { animation: none !important; }
        }
      `}</style>

      {/* Ambient background: faint amber grid + a glow that follows the cursor */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed inset-0 -z-10 bg-stone-950"
        style={{ "--mx": "50%", "--my": "20%" }}
      >
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div
          className="absolute inset-0 transition-[background] duration-300"
          style={{
            background:
              "radial-gradient(620px circle at var(--mx) var(--my), rgba(245,158,11,0.07), transparent 55%)",
          }}
        />
        <div className="absolute left-1/2 top-[-10%] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[130px]" />
        <div className="absolute bottom-[-15%] right-[-10%] h-[400px] w-[400px] rounded-full bg-amber-400/5 blur-[110px]" />
      </div>

      <header
        id="header"
        className="sticky top-0 z-50 bg-transparent transition-all duration-300"
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 p-4">
          <a
            href="#home"
            onClick={scrollToSection("#home")}
            className={`flex items-center gap-2 font-mono text-sm font-bold text-stone-100 transition-colors hover:text-amber-400 ${FOCUS_RING}`}
          >
            <TrafficLights />
            <span className="ml-1">
              blaise<span className="text-stone-500">@</span>portfolio
              <span className="text-amber-400">:~$</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 rounded-lg border border-stone-800 bg-stone-900/60 p-1 md:flex">
            {NAV_LINKS.map((link) => {
              const id = link.href.slice(1);
              const active = activeId === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={scrollToSection(link.href)}
                  className={`rounded-md px-3 py-1.5 font-mono text-sm transition-colors ${FOCUS_RING} ${
                    active
                      ? "bg-amber-400/10 text-amber-300"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  {link.label}
                  <span className="text-stone-600">{NAV_EXT[id]}</span>
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden items-center space-x-5 md:flex">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  rel="noopener noreferrer"
                  className={`text-stone-400 transition-all duration-300 hover:-translate-y-0.5 hover:text-amber-400 ${FOCUS_RING}`}
                  href={s.href}
                  target="_blank"
                  aria-label={s.label}
                >
                  <FontAwesomeIcon
                    icon={s.icon}
                    size="lg"
                  />
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className={`font-mono text-sm text-stone-300 transition-colors hover:text-amber-400 md:hidden ${FOCUS_RING}`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        <div
          className={`overflow-hidden border-b border-stone-800 bg-stone-900/95 backdrop-blur-sm transition-[max-height] duration-300 ease-in-out md:hidden ${
            menuOpen ? "max-h-96" : "max-h-0 border-b-0"
          }`}
        >
          <div className="flex flex-col gap-1 px-4 pb-4">
            {NAV_LINKS.map((link) => {
              const id = link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={scrollToSection(link.href)}
                  className={`rounded-md px-2 py-3 font-mono text-sm text-stone-200 transition-colors hover:bg-white/5 hover:text-amber-400 ${FOCUS_RING}`}
                >
                  {link.label}
                  <span className="text-stone-600">{NAV_EXT[id]}</span>
                </a>
              );
            })}
            <div className="mt-2 flex items-center gap-6 border-t border-stone-800 px-2 pt-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  rel="noopener noreferrer"
                  className={`text-stone-400 transition-colors hover:text-amber-400 ${FOCUS_RING}`}
                  href={s.href}
                  target="_blank"
                  aria-label={s.label}
                >
                  <FontAwesomeIcon
                    icon={s.icon}
                    size="lg"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HOME */}
        <section
          className="flex min-h-screen items-center justify-center py-20"
          id="home"
        >
          <div className="container mx-auto flex flex-col items-center justify-between gap-12 md:flex-row">
            <div className="flex items-center gap-8 md:gap-12">
              <div className="hidden items-center justify-center md:flex">
                <h2 className="rotate-180 whitespace-nowrap text-2xl font-bold uppercase tracking-[10px] [writing-mode:vertical-rl]">
                  <span className="text-stone-500">Software </span>
                  <span className="text-amber-400">Developer</span>
                </h2>
              </div>

              <div className="w-full max-w-xl text-center md:text-left">
                {/* Terminal window: the hero's signature moment */}
                <div className="mx-auto overflow-hidden rounded-xl border border-stone-800 bg-stone-900/70 text-left shadow-2xl shadow-black/40 md:mx-0">
                  <div className="flex items-center gap-3 border-b border-stone-800 bg-stone-900 px-4 py-2.5">
                    <TrafficLights />
                    <span className="font-mono text-xs text-stone-500">
                      blaise@portfolio: ~
                    </span>
                  </div>
                  <div className="px-5 py-6 font-mono">
                    <p className="text-sm text-stone-500">
                      <span className="text-amber-400">$</span> whoami
                    </p>
                    <p className="mt-2 text-4xl font-bold leading-tight text-stone-50 md:text-5xl">
                      {typedName}
                      <span className="blink-cursor text-amber-400">▌</span>
                    </p>
                    <p className="mt-4 text-base text-stone-400 md:text-lg">
                      <span className="text-stone-600">// </span>A passionate
                      full stack developer dedicated to building scalable web
                      solutions and always striving to turn complex problems
                      into simple, elegant code.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
                  <button
                    className={`inline-flex transform items-center rounded-lg bg-amber-400 px-8 py-3 text-lg font-bold text-stone-900 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:scale-105 hover:bg-amber-300 ${FOCUS_RING}`}
                    onClick={() => navigate("/cv")}
                  >
                    <span>My Resume</span>
                    <ChevronRight
                      size={16}
                      className="m-auto ms-2"
                    />
                  </button>
                  <a
                    href="#projects"
                    onClick={scrollToSection("#projects")}
                    className={`inline-flex items-center rounded-lg border border-amber-400/40 px-8 py-3 text-lg font-bold text-amber-300 transition-all duration-300 hover:scale-105 hover:bg-amber-400/10 ${FOCUS_RING}`}
                  >
                    View Work
                  </a>
                </div>
              </div>
            </div>

            <div className="relative mt-10 shrink-0 md:mt-0">
              <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-amber-500/15 blur-2xl" />
              <div className="absolute -left-3 -top-3 h-8 w-8 border-l-2 border-t-2 border-amber-400/50" />
              <div className="absolute -bottom-3 -right-3 h-8 w-8 border-b-2 border-r-2 border-amber-400/50" />
              <div className="h-64 w-64 overflow-hidden rounded-full ring-4 ring-amber-400/20 md:h-80 md:w-80">
                <img
                  alt="Blaise Izerimana"
                  className="h-full w-full scale-110 object-cover object-top"
                  src={MyImage}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section
          className="py-24"
          id="about"
        >
          <Reveal
            as="div"
            className="mb-12 text-center"
          >
            <p className="mb-2 font-mono text-sm uppercase tracking-[4px] text-amber-400/80">
              Get to know me
            </p>
            <h2 className="text-4xl font-bold md:text-5xl">
              About <span className="text-amber-400">Me</span>
            </h2>
          </Reveal>

          <Reveal
            as="div"
            delay={100}
            className="mx-auto max-w-4xl"
          >
            <div className="overflow-hidden rounded-xl border border-stone-800 bg-stone-900/50">
              <div className="flex items-center gap-2 border-b border-stone-800 bg-stone-900 px-4 py-2.5 font-mono text-xs text-stone-500">
                <span className="text-amber-400">#</span> about.md
              </div>
              <div className="space-y-6 px-6 py-8 text-left text-lg text-stone-300 sm:px-10">
                <p>
                  Hi there, I am{" "}
                  <span className="font-bold text-stone-50">
                    Blaise IZERIMANA
                  </span>
                  , a computer science student at Ashesi University and former{" "}
                  <span className="font-bold text-stone-50">
                    Ireme Technologies Intern
                  </span>{" "}
                  in software development, with proficient skills across
                  programming languages that I use to build solid frontend
                  designs and backend-powered applications.
                </p>
                <p>
                  I'm capable of building big projects on my own, but I enjoy
                  working in teams the most, because that's where I{" "}
                  <span className="rounded bg-amber-400/10 px-1.5 py-0.5 font-semibold text-amber-300">
                    gain more skills
                  </span>{" "}
                  and grow by{" "}
                  <span className="rounded bg-amber-400/10 px-1.5 py-0.5 font-semibold text-amber-300">
                    correcting
                  </span>{" "}
                  one another's mistakes,{" "}
                  <span className="rounded bg-amber-400/10 px-1.5 py-0.5 font-semibold text-amber-300">
                    collaborating
                  </span>{" "}
                  to get things done faster, and building{" "}
                  <span className="rounded bg-amber-400/10 px-1.5 py-0.5 font-semibold text-amber-300">
                    connections
                  </span>
                  .
                </p>
                <p>
                  I'm open to any job opportunities where I can contribute,
                  learn, and grow. If you have something that matches my skills,
                  don't hesitate to reach out.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal
            as="div"
            delay={200}
            className="mt-10 flex flex-wrap justify-center gap-6"
          >
            <button
              className={`inline-flex transform items-center rounded-lg bg-amber-400 px-8 py-3 text-lg font-bold text-stone-900 transition-all duration-300 hover:scale-105 hover:bg-amber-300 ${FOCUS_RING}`}
              onClick={() => navigate("/cv")}
            >
              <span>Download CV</span>
              <ChevronRight
                size={16}
                className="m-auto ms-2"
              />
            </button>
            <a
              className={`inline-flex transform items-center rounded-lg border border-stone-700 bg-stone-800 px-8 py-3 text-lg font-bold text-stone-100 transition-all duration-300 hover:scale-105 hover:bg-stone-700 ${FOCUS_RING}`}
              href="mailto:izerimanab74@gmail.com"
            >
              <span>Hire Me</span>
              <ChevronRight
                size={16}
                className="m-auto ms-2"
              />
            </a>
          </Reveal>
        </section>

        {/* SKILLS */}
        <section
          className="rounded-xl border border-stone-800 bg-stone-900/40 py-24"
          id="skills"
        >
          <Reveal
            as="div"
            className="mb-12 text-center"
          >
            <p className="mb-2 font-mono text-sm uppercase tracking-[4px] text-amber-400/80">
              What I work with
            </p>
            <h2 className="text-4xl font-bold md:text-5xl">Major Skills</h2>
          </Reveal>

          <Reveal
            as="div"
            delay={100}
            className="mx-auto max-w-3xl px-4"
          >
            <div className="overflow-hidden rounded-xl border border-stone-800 bg-stone-950/60 font-mono">
              <div className="flex items-center gap-2 border-b border-stone-800 bg-stone-900 px-4 py-2.5 text-xs text-stone-500">
                <span className="text-amber-400">{"{}"}</span> skills.json
              </div>
              <div className="space-y-6 px-6 py-8">
                <p className="text-stone-500">{"{"}</p>
                <div className="space-y-6 pl-4 sm:pl-8">
                  <div>
                    <p className="mb-3 text-sm text-sky-300">
                      "backend"<span className="text-stone-500">:</span>
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {BACKEND_SKILLS.map((s) => (
                        <SkillChip
                          key={s.name}
                          {...s}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-3 text-sm text-sky-300">
                      "frontend"<span className="text-stone-500">:</span>
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {FRONTEND_SKILLS.map((s) => (
                        <SkillChip
                          key={s.name}
                          {...s}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-stone-500">{"}"}</p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* PROJECTS */}
        <section
          className="py-24"
          id="projects"
        >
          <Reveal
            as="div"
            className="mb-12 text-center"
          >
            <p className="mb-2 font-mono text-sm uppercase tracking-[4px] text-amber-400/80">
              Selected work
            </p>
            <h2 className="text-4xl font-bold md:text-5xl">
              Recent <span className="text-amber-400">Projects</span>
            </h2>
            <p className="mt-4 text-stone-400">
              Hover to explore each project in detail{" "}
              <span className="text-stone-600">
                &middot; use ← → to navigate
              </span>
            </p>
          </Reveal>

          <Reveal
            as="div"
            delay={100}
            className="relative mx-auto max-w-6xl"
          >
            <div
              tabIndex={0}
              role="region"
              aria-label="Project carousel"
              onKeyDown={handleCarouselKeyDown}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              className={`overflow-hidden rounded-2xl border border-stone-800 shadow-2xl shadow-black/40 ${FOCUS_RING}`}
            >
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {projects.map((project, index) => {
                  const isPlaceholder =
                    !project.live || project.live === "#projects";
                  const urlLabel = isPlaceholder
                    ? "deploying soon..."
                    : project.live
                        .replace(/^https?:\/\//, "")
                        .replace(/\/$/, "");
                  return (
                    <div
                      key={index}
                      className="w-full flex-shrink-0"
                    >
                      <div className="group flex h-[560px] w-full flex-col overflow-hidden bg-stone-900 md:h-[640px]">
                        {/* Browser chrome */}
                        <div className="flex items-center gap-3 border-b border-stone-800 bg-stone-900 px-4 py-2.5">
                          <TrafficLights />
                          <div className="flex flex-1 items-center gap-2 truncate rounded-md bg-stone-800/80 px-3 py-1 font-mono text-xs text-stone-400">
                            <span className="text-stone-600">https://</span>
                            <span className="truncate">{urlLabel}</span>
                          </div>
                          {!isPlaceholder && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Open live demo"
                              className={`text-stone-500 hover:text-amber-400 ${FOCUS_RING}`}
                            >
                              <ChevronRight size={16} />
                            </a>
                          )}
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View source on GitHub"
                            className={`text-stone-500 hover:text-amber-400 ${FOCUS_RING}`}
                          >
                            <FontAwesomeIcon icon={faGithub} />
                          </a>
                        </div>

                        {/* Screenshot + overlay */}
                        <div className="relative flex-1 overflow-hidden">
                          <img
                            src={project.src}
                            alt={project.alt}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                          <div className="absolute inset-0 flex translate-y-4 flex-col justify-end p-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:p-12">
                            <h3 className="text-3xl font-bold text-amber-400">
                              {project.title}
                            </h3>
                            <p className="mt-3 max-w-2xl text-stone-200">
                              {project.description}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {project.tech.map((t, i) => (
                                <span
                                  key={i}
                                  className="rounded-full bg-amber-400/15 px-3 py-1 text-xs text-amber-300"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => goToSlide(currentIndex - 1)}
              aria-label="Previous project"
              className={`absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-amber-400 font-bold text-stone-900 transition hover:bg-amber-300 ${FOCUS_RING}`}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => goToSlide(currentIndex + 1)}
              aria-label="Next project"
              className={`absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-amber-400 font-bold text-stone-900 transition hover:bg-amber-300 ${FOCUS_RING}`}
            >
              <ChevronRight size={18} />
            </button>

            <div className="absolute -bottom-10 left-1/2 flex -translate-x-1/2 gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to project ${index + 1}`}
                  className={`h-3 rounded-full transition-all ${FOCUS_RING} ${
                    index === currentIndex
                      ? "w-6 bg-amber-400"
                      : "w-3 bg-stone-700 hover:bg-stone-600"
                  }`}
                />
              ))}
            </div>
          </Reveal>
        </section>

        {/* CONTACT */}
        <section
          className="py-24"
          id="contact"
        >
          {toast?.message && (
            <div
              role="status"
              className={`fixed right-5 top-5 z-50 flex items-center gap-3 rounded-lg px-4 py-3 text-white shadow-lg transition-all ${
                toast.type === "success" ? "bg-emerald-600" : "bg-red-600"
              }`}
            >
              <span>{toast.message}</span>
              <button
                onClick={() => setToast({ message: "", type: toast.type })}
                aria-label="Dismiss notification"
                className="text-white/80 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <Reveal
            as="div"
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mb-2 font-mono text-sm uppercase tracking-[4px] text-amber-400/80">
              Let's talk
            </p>
            <h2 className="mb-4 text-3xl font-bold md:text-5xl">
              Get In Touch
            </h2>
            <p className="mb-10 text-lg text-stone-400">
              Reach out for opportunities, collaborations, or just to leave a
              testimonial.
            </p>
          </Reveal>

          <Reveal
            as="div"
            delay={100}
            className="mx-auto max-w-3xl"
          >
            <div className="overflow-hidden rounded-xl border border-stone-800 bg-stone-900/50">
              <div className="flex items-center gap-2 border-b border-stone-800 bg-stone-900 px-4 py-2.5 font-mono text-xs text-stone-500">
                <span className="text-amber-400">$</span> contact.sh
              </div>
              <form
                className="space-y-6 px-6 py-8 text-left sm:px-10"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-6 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label className="mb-2 flex items-center gap-1.5 font-mono text-sm text-stone-400">
                      <span className="text-amber-400">&gt;</span> Name
                    </label>
                    <input
                      className={`w-full rounded-lg border border-stone-700 bg-stone-800 px-4 py-3 text-white transition-shadow focus:outline-none focus:ring-2 focus:ring-amber-400 ${FOCUS_RING}`}
                      name="name"
                      required
                      placeholder="Full Name..."
                      type="text"
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className="mb-2 flex items-center gap-1.5 font-mono text-sm text-stone-400">
                      <span className="text-amber-400">&gt;</span> Email
                    </label>
                    <input
                      className={`w-full rounded-lg border border-stone-700 bg-stone-800 px-4 py-3 text-white transition-shadow focus:outline-none focus:ring-2 focus:ring-amber-400 ${FOCUS_RING}`}
                      name="email"
                      required
                      placeholder="Email..."
                      type="email"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-1.5 font-mono text-sm text-stone-400">
                    <span className="text-amber-400">&gt;</span> Subject
                  </label>
                  <input
                    className={`w-full rounded-lg border border-stone-700 bg-stone-800 px-4 py-3 text-white transition-shadow focus:outline-none focus:ring-2 focus:ring-amber-400 ${FOCUS_RING}`}
                    placeholder="Subject..."
                    name="subject"
                    type="text"
                  />
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-1.5 font-mono text-sm text-stone-400">
                    <span className="text-amber-400">&gt;</span> Message
                  </label>
                  <textarea
                    className={`w-full rounded-lg border border-stone-700 bg-stone-800 px-4 py-3 text-white transition-shadow focus:outline-none focus:ring-2 focus:ring-amber-400 ${FOCUS_RING}`}
                    name="message"
                    placeholder="Message..."
                    required
                    rows="5"
                  ></textarea>
                </div>
                <div className="pt-2 text-center">
                  <button
                    id="submitBtn"
                    disabled={loading}
                    type="submit"
                    className={`flex w-full transform items-center justify-center gap-2 rounded-lg bg-amber-400 px-8 py-3 text-lg font-bold text-stone-900 transition-all duration-300 hover:scale-105 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60 ${FOCUS_RING}`}
                  >
                    {loading && (
                      <svg
                        className="h-5 w-5 animate-spin text-stone-900"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                    )}
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </Reveal>
        </section>

        <footer className="flex flex-col items-center gap-4 border-t border-stone-800 py-10 text-center font-mono text-sm text-stone-500">
          <div className="flex items-center gap-5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                rel="noopener noreferrer"
                className={`transition-colors hover:text-amber-400 ${FOCUS_RING}`}
                href={s.href}
                target="_blank"
                aria-label={s.label}
              >
                <FontAwesomeIcon icon={s.icon} />
              </a>
            ))}
          </div>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Designed &amp; built by Blaise Izerimana ©{" "}
            {new Date().getFullYear()}
          </p>
        </footer>
      </main>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-amber-400 text-stone-900 shadow-lg shadow-black/30 transition-all duration-300 hover:scale-110 hover:bg-amber-300 ${FOCUS_RING} ${
          showTop ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}

function CVPage() {
  return (
    <div className="main-container text-stone-200 opacity-0 transition-opacity duration-1000 ease-in bg-stone-950 min-h-screen">
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-xl border border-stone-800 bg-stone-900/60 shadow-2xl shadow-black/40">
          <div className="flex items-center justify-between gap-3 border-b border-stone-800 bg-stone-900 px-5 py-3">
            <div className="flex items-center gap-3">
              <TrafficLights />
              <span className="font-mono text-xs text-stone-500">
                blaise@portfolio: ~/cv
              </span>
            </div>
            <Link
              to="/"
              className={`rounded-lg bg-amber-400 px-4 py-1.5 font-mono text-sm font-semibold text-stone-900 transition-colors hover:bg-amber-300 ${FOCUS_RING}`}
            >
              Back to Home
            </Link>
          </div>
          <div className="px-5 py-6 sm:px-8">
            <h2 className="mb-4 text-2xl font-bold text-amber-400">
              CV / Cover Letter
            </h2>
            <iframe
              src={CV}
              className="h-screen w-full rounded-lg border border-stone-800"
              title="CV / Cover Letter"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  useEffect(() => {
    const main = document.querySelector(".main-container");
    main?.classList.remove("opacity-0");
    const header = document.getElementById("header");
    const scrolledClasses = [
      "bg-stone-950/85",
      "backdrop-blur-sm",
      "border-b",
      "border-stone-800",
    ];

    const handleScroll = () => {
      if (!header) return;
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
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/cv"
          element={<CVPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
