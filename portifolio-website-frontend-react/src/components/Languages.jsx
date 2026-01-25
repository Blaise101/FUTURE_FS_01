import {
  faLaravel,
  faPhp,
  faReact,
  faJs,
  faVuejs,
  faNode,
  faPython,
  faCss3Alt,
} from "@fortawesome/free-brands-svg-icons";
import Skill from "./partials/Skill";

export default function Languages() {
  const skills = [
    { icon: faReact, name: "React.Js" },
    { icon: faNode, name: "Node.js" },
    { icon: faLaravel, name: "Laravel" },
    { icon: faPhp, name: "PHP" },
    { icon: faJs, name: "JavaScript" },
    { icon: faVuejs, name: "Vue.js" },
    { icon: faPython, name: "Python" },
    { icon: faCss3Alt, name: "CSS3" },
  ];

  return (
    <section
      className="rounded-xl bg-gray-900/50 py-24"
      id="skills"
    >
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold md:text-5xl">Major Skills</h2>
      </div>
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-10">
        {skills.map((skill, index) => (
          <Skill
            key={index}
            icon={skill.icon}
            name={skill.name}
          />
        ))}
      </div>
    </section>
  );
}
