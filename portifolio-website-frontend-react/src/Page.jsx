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

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0f0c] rounded";

/* Fades a section in once it enters the viewport. Reduced-motion users
   just see the content, no animation. */
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

function HomePage() {
  const navigate = useNavigate();

  const skills = [
    { icon: faReact, name: "React.js" },
    { icon: faNode, name: "Node.js" },
    { icon: faLaravel, name: "Laravel" },
    { icon: faPhp, name: "PHP" },
    { icon: faJs, name: "JavaScript" },
    { icon: faVuejs, name: "Vue.js" },
    { icon: faPython, name: "Python" },
    { icon: faCss3Alt, name: "CSS3" },
  ];
  const skillsLoop = [...skills, ...skills];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const length = projects.length;
  const carouselRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % length);
    }, 8000);
    return () => clearInterval(interval);
  }, [length, paused]);

  const goToSlide = (index) => setCurrentIndex((index + length) % length);

  const handleCarouselKeyDown = (e) => {
    if (e.key === "ArrowRight") goToSlide(currentIndex + 1);
    if (e.key === "ArrowLeft") goToSlide(currentIndex - 1);
  };

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

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
    <div className="text-gray-200 opacity-0 transition-opacity duration-1000 ease-in main-container relative overflow-x-hidden">
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity .7s ease, transform .7s ease;
        }
        .reveal.is-visible {
          opacity: 1;
          transform: none;
        }
        .marquee-track {
          animation: marquee 22s linear infinite;
        }
        .marquee-pause:hover .marquee-track {
          animation-play-state: paused;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
          .marquee-track { animation: none !important; }
        }
      `}</style>

      {/* Ambient background — faint grid + a glow that follows the cursor */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed inset-0 -z-10 bg-[#0e0f0c]"
        style={{ "--mx": "50%", "--my": "20%" }}
      >
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#84cc16 1px, transparent 1px), linear-gradient(90deg, #84cc16 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          className="absolute inset-0 transition-[background] duration-300"
          style={{
            background:
              "radial-gradient(600px circle at var(--mx) var(--my), rgba(132,204,22,0.07), transparent 55%)",
          }}
        />
        <div className="absolute left-1/2 top-[-10%] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-lime-500/10 blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-10%] h-[400px] w-[400px] rounded-full bg-lime-400/5 blur-[100px]" />
      </div>

      <header
        className="sticky top-0 z-50 bg-transparent transition-all duration-300"
        id="header"
      >
        <nav className="header mx-auto flex max-w-7xl items-center justify-between p-4">
          <a
            href="#home"
            className={`font-mono text-sm font-bold tracking-[3px] text-white transition-colors hover:text-lime-400 ${FOCUS_RING}`}
          >
            BI<span className="text-lime-400">.</span>
          </a>

          <div className="hidden items-center space-x-10 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                className={`relative font-medium text-gray-300 transition-colors duration-300 hover:text-lime-400 after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-0 after:bg-lime-400 after:transition-all after:duration-300 hover:after:w-full ${FOCUS_RING}`}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden items-center space-x-5 md:flex">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  rel="noopener noreferrer"
                  className={`text-gray-300 transition-all duration-300 hover:-translate-y-0.5 hover:text-lime-400 ${FOCUS_RING}`}
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
              className={`text-gray-200 transition-colors hover:text-lime-400 md:hidden ${FOCUS_RING}`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </nav>

        <div
          className={`overflow-hidden bg-[#141410]/95 backdrop-blur-sm transition-[max-height] duration-300 ease-in-out md:hidden ${
            menuOpen ? "max-h-96 shadow-lg shadow-lime-500/5" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-1 px-4 pb-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-md px-2 py-3 font-medium text-gray-200 transition-colors hover:bg-white/5 hover:text-lime-400 ${FOCUS_RING}`}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-6 border-t border-white/10 px-2 pt-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  rel="noopener noreferrer"
                  className={`text-gray-300 transition-colors hover:text-lime-400 ${FOCUS_RING}`}
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
                <h2 className="rotate-180 whitespace-nowrap text-3xl font-bold uppercase tracking-[10px] [writing-mode:vertical-rl]">
                  <span className="text-white">Software </span>
                  <span className="text-glow text-lime-400">Developer</span>
                </h2>
              </div>
              <div className="text-center md:text-left">
                <p className="mb-3 font-mono text-sm uppercase tracking-[4px] text-lime-400/80">
                  Hi, my name is
                </p>
                <h1 className="mb-4 text-5xl font-extrabold leading-tight text-white md:text-7xl">
                  Blaise Izerimana
                </h1>
                <p className="mb-8 max-w-lg text-lg text-gray-400 md:text-xl ibm-plex">
                  A passionate full stack developer dedicated to building
                  scalable web solutions and always striving to turn complex
                  problems into simple, elegant code.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
                  <button
                    className={`lime-glow lime-glow-hover inline-flex transform items-center rounded-lg bg-lime-500 px-8 py-3 text-lg font-bold text-gray-900 transition-all duration-300 hover:scale-105 hover:bg-lime-400 ${FOCUS_RING}`}
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
                    className={`inline-flex items-center rounded-lg border border-lime-400/40 px-8 py-3 text-lg font-bold text-lime-400 transition-all duration-300 hover:scale-105 hover:bg-lime-500/10 ${FOCUS_RING}`}
                  >
                    View Work
                  </a>
                </div>
              </div>
            </div>
            <div className="relative mt-10 md:mt-0">
              <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-lime-500/20 blur-2xl" />
              <div className="lime-glow h-64 w-64 overflow-hidden rounded-full bg-lime-500 ring-4 ring-lime-400/20 md:h-80 md:w-80">
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
            <p className="mb-2 font-mono text-sm uppercase tracking-[4px] text-lime-400/80">
              Get to know me
            </p>
            <h2 className="text-4xl font-bold md:text-5xl">
              About <span className="text-glow text-lime-400">Me</span>
            </h2>
          </Reveal>
          <Reveal
            as="div"
            delay={100}
            className="mx-auto max-w-4xl space-y-6 text-center text-lg text-gray-300"
          >
            <p>
              Hi there, I am{" "}
              <span className="font-bold text-white">Blaise IZERIMANA</span>, a
              computer science student at Ashesi University and former{" "}
              <span className="font-bold text-white">
                Ireme Technologies Intern
              </span>{" "}
              in software development, with proficient skills across programming
              languages that I use to build solid frontend designs and
              backend-powered applications.
            </p>
            <p>
              I'm capable of building big projects on my own, but I enjoy
              working in teams the most, because that's where I{" "}
              <span className="font-bold text-lime-400">gain more skills</span>{" "}
              and grow by
              <span className="font-bold text-lime-400"> correcting</span> one
              another's mistakes,
              <span className="font-bold text-lime-400"> collaborating</span> to
              get things done faster, and building
              <span className="font-bold text-lime-400"> connections</span>.
            </p>
            <p>
              I'm open to any job opportunities where I can contribute, learn,
              and grow. If you have something that matches my skills, don't
              hesitate to reach out.
            </p>
          </Reveal>
          <Reveal
            as="div"
            delay={200}
            className="mt-12 flex flex-wrap justify-center gap-6"
          >
            <button
              className={`lime-glow lime-glow-hover inline-flex transform items-center rounded-lg bg-lime-500 px-8 py-3 text-lg font-bold text-gray-900 transition-all duration-300 hover:scale-105 hover:bg-lime-400 ${FOCUS_RING}`}
              onClick={() => navigate("/cv")}
            >
              <span>Download CV</span>
              <ChevronRight
                size={16}
                className="m-auto ms-2"
              />
            </button>
            <a
              className={`inline-flex transform items-center rounded-lg bg-gray-700 px-8 py-3 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-gray-600 ${FOCUS_RING}`}
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
          className="rounded-xl border border-white/5 bg-gray-900/40 py-24"
          id="skills"
        >
          <Reveal
            as="div"
            className="mb-12 text-center"
          >
            <p className="mb-2 font-mono text-sm uppercase tracking-[4px] text-lime-400/80">
              What I work with
            </p>
            <h2 className="text-4xl font-bold md:text-5xl">Major Skills</h2>
          </Reveal>

          <Reveal
            as="div"
            delay={100}
            className="marquee-pause mx-auto max-w-5xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
          >
            <div className="marquee-track flex w-max items-center gap-16">
              {skillsLoop.map((skill, i) => (
                <div
                  className="group flex flex-col items-center gap-3"
                  key={`${skill.name}-${i}`}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl text-gray-400 skills-icons transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-lime-500/10 group-hover:text-lime-400">
                    <FontAwesomeIcon
                      icon={skill.icon}
                      size="lg"
                    />
                  </div>
                  <span className="whitespace-nowrap text-sm font-medium text-gray-400 transition-colors duration-300 group-hover:text-white">
                    {skill.name}
                  </span>
                </div>
              ))}
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
            <p className="mb-2 font-mono text-sm uppercase tracking-[4px] text-lime-400/80">
              Selected work
            </p>
            <h2 className="text-4xl font-bold md:text-5xl">
              Recent <span className="text-lime-400">Projects</span>
            </h2>
            <p className="mt-4 text-gray-400">
              Hover to explore each project in detail &middot; use ← → to
              navigate
            </p>
          </Reveal>

          <Reveal
            as="div"
            delay={100}
            className="relative mx-auto max-w-6xl"
          >
            <div
              ref={carouselRef}
              tabIndex={0}
              role="region"
              aria-label="Project carousel"
              onKeyDown={handleCarouselKeyDown}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              className={`overflow-hidden rounded-2xl border border-white/5 shadow-2xl shadow-lime-900/20 ${FOCUS_RING}`}
            >
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0"
                  >
                    <div className="group relative h-[500px] w-full overflow-hidden md:h-[600px]">
                      <img
                        src={project.src}
                        alt={project.alt}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="absolute inset-0 flex translate-y-4 flex-col justify-end p-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:p-12">
                        <h3 className="text-3xl font-bold text-lime-400">
                          {project.title}
                        </h3>
                        <p className="mt-3 max-w-2xl text-gray-200">
                          {project.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.tech.map((t, i) => (
                            <span
                              key={i}
                              className="rounded-full bg-lime-500/20 px-3 py-1 text-xs text-lime-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="mt-6 flex gap-4">
                          <a
                            href={project.live}
                            target={
                              project.live !== "#projects"
                                ? "_blank"
                                : undefined
                            }
                            rel="noopener noreferrer"
                            className={`rounded-lg bg-lime-500 px-5 py-2 font-semibold text-black transition hover:bg-lime-400 ${FOCUS_RING}`}
                          >
                            Live Demo
                          </a>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`rounded-lg border border-lime-400 px-5 py-2 text-lime-400 transition hover:bg-lime-500/10 ${FOCUS_RING}`}
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

            <button
              onClick={() => goToSlide(currentIndex - 1)}
              aria-label="Previous project"
              className={`absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-lime-500 font-bold text-black transition hover:bg-lime-400 ${FOCUS_RING}`}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => goToSlide(currentIndex + 1)}
              aria-label="Next project"
              className={`absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-lime-500 font-bold text-black transition hover:bg-lime-400 ${FOCUS_RING}`}
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
                      ? "w-6 bg-lime-400"
                      : "w-3 bg-gray-600 hover:bg-gray-500"
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
                toast.type === "success" ? "bg-green-600" : "bg-red-600"
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
            <p className="mb-2 font-mono text-sm uppercase tracking-[4px] text-lime-400/80">
              Let's talk
            </p>
            <h2 className="mb-4 text-3xl font-bold md:text-5xl">
              Get In Touch
            </h2>
            <p className="mb-10 text-lg text-gray-400">
              Reach out for opportunities, collaborations, or just to leave a
              testimonial.
            </p>

            <form
              className="space-y-6 text-left"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="w-full sm:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Name
                  </label>
                  <input
                    className={`w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white transition-shadow form-item focus:outline-none focus:ring-2 focus:ring-lime-500 ${FOCUS_RING}`}
                    name="name"
                    required
                    placeholder="Full Name..."
                    type="text"
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    className={`w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white transition-shadow form-item focus:outline-none focus:ring-2 focus:ring-lime-500 ${FOCUS_RING}`}
                    name="email"
                    required
                    placeholder="Email..."
                    type="email"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Subject
                </label>
                <input
                  className={`w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white transition-shadow form-item focus:outline-none focus:ring-2 focus:ring-lime-500 ${FOCUS_RING}`}
                  placeholder="Subject..."
                  name="subject"
                  type="text"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  className={`w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white transition-shadow form-item focus:outline-none focus:ring-2 focus:ring-lime-500 ${FOCUS_RING}`}
                  name="message"
                  placeholder="Message..."
                  required
                  rows="5"
                ></textarea>
              </div>
              <div className="pt-4 text-center">
                <button
                  id="submitBtn"
                  disabled={loading}
                  type="submit"
                  className={`lime-glow lime-glow-hover flex w-full transform items-center justify-center gap-2 rounded-lg bg-lime-500 px-8 py-3 text-lg font-bold text-gray-900 transition-all duration-300 hover:scale-105 hover:bg-lime-400 disabled:cursor-not-allowed disabled:opacity-60 ${FOCUS_RING}`}
                >
                  {loading && (
                    <svg
                      className="h-5 w-5 animate-spin text-white"
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
          </Reveal>
        </section>

        <footer className="flex flex-col items-center gap-4 border-t border-white/5 py-10 text-center text-sm text-gray-500">
          <div className="flex items-center gap-5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                rel="noopener noreferrer"
                className={`transition-colors hover:text-lime-400 ${FOCUS_RING}`}
                href={s.href}
                target="_blank"
                aria-label={s.label}
              >
                <FontAwesomeIcon icon={s.icon} />
              </a>
            ))}
          </div>
          <p>
            Designed &amp; built by Blaise Izerimana ©{" "}
            {new Date().getFullYear()}
          </p>
        </footer>
      </main>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-lime-500 text-black shadow-lg shadow-lime-900/30 transition-all duration-300 hover:scale-110 hover:bg-lime-400 ${FOCUS_RING} ${
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
    <div className="text-gray-200 opacity-0 transition-opacity duration-1000 ease-in main-container">
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <div className="w-full rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 p-8 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-lime-400">
                CV / Cover Letter
              </h2>
              <Link
                to="/"
                className={`rounded-lg bg-lime-400 px-4 py-2 font-semibold text-gray-900 transition-colors hover:bg-lime-300 ${FOCUS_RING}`}
              >
                Back to Home
              </Link>
            </div>
            <iframe
              src={CV}
              className="h-screen w-full rounded-lg border border-gray-600"
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
      "bg-[#1C1C1C]/80",
      "backdrop-blur-sm",
      "shadow-lg",
      "shadow-lime-500/5",
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
