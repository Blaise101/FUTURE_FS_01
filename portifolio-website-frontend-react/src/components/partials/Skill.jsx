import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Skill = ({ icon, name }) => {
  return (
    <div className="group flex flex-col items-center gap-3">
      <div className="h-16 w-16 text-gray-400 skills-icons transition-all duration-300 group-hover:scale-110 group-hover:text-lime-400">
        <FontAwesomeIcon
          icon={icon}
          size="lg"
        />
      </div>
      <span className="text-sm font-medium text-gray-400 transition-colors duration-300 group-hover:text-white">
        {name}
      </span>
    </div>
  );
};

export default Skill;
