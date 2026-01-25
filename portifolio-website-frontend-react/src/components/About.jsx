export default function About() {
  return (
    <section
      className="py-24"
      id="about"
    >
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold md:text-5xl">
          About <span className="text-glow text-lime-400">ME!</span>
        </h2>
      </div>
      <div className="mx-auto max-w-4xl space-y-6 text-center text-lg text-gray-300">
        <p>
          Hi there, I am
          <span className="font-bold text-white">Blaise IZERIMANA</span> a
          computer sciences student at Ashesi University and former
          <span className="font-bold text-white">
            Ireme Technologies Intern
          </span>
          in software development with proficient skills in various programming
          languages that I use to develop solid frontend designs and I build
          desktop applications with back-end technologies.
        </p>
        <p>
          I'm capable of building big projects all alone but I enjoy the most
          working in teams in most of my projects because that's where I{" "}
          <span className="font-bold text-lime-400">gain more skills</span> and
          grow bigger by learning from each other,
          <span className="font-bold text-lime-400"> correcting</span> one
          another's mistakes,
          <span className="font-bold text-lime-400"> collaborating</span> to get
          things done faster, and building
          <span className="font-bold text-lime-400"> connections</span>.
        </p>
        <p>
          By now I am open to any job opportunities where I can contribute,
          learn and grow. If you have any opportunity that matches my skills,
          please don't to hesitate to reach out.
        </p>
      </div>
      <div className="mt-12 flex justify-center gap-6">
        <a
          className="lime-glow lime-glow-hover inline-block transform rounded-lg bg-lime-500 px-8 py-3 text-lg font-bold text-gray-900 transition-all duration-300 hover:scale-105 hover:bg-lime-400"
          href="#cv"
        >
          Download CV &rsaquo;
        </a>
        <a
          className="inline-block transform rounded-lg bg-gray-700 px-8 py-3 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-gray-600"
          href="mailto:izerimanab74@gmail.com"
        >
          Hire Me &rsaquo;
        </a>
      </div>
    </section>
  );
}
