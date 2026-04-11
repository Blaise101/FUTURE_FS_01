import campusLink from "/projects/campuslink/landing.png";
import iremeSupermarket from "/projects/ireme-supermarket/ireme-supermarket.png";
import ucepLanding from "/projects/UCEP/Landing Page.png";
import byuzuyeImage from "/projects/byuzuye/image.png";
import lunaThread from "/projects/future-interns/dashboard.png";
import lostButFound from "/projects/lostbutfound/lostbutfound.png"
import cats from "/projects/CATS/login.png"
// import miniCRM from "/projects/future-interns/crm.png"


export const projects = [
  {
    title: "CATS (Computer Assets Tracking System)",
    description: "The system is intended to replace manual, paper-based and Excel-based tracking of computers with a centralized, digital, and QR-code-based asset management solution.",
    src: cats,
    tech: ["React", "Laravel", "Postgresql", "Tailwind CSS"],
    alt: "Luna Thread Dashboard",
    live: "#projects",
    github: "https://github.com/Blaise101/UPDATED-NESA-CATS-FRONTEND",
  },
  {
    title: "Lost But Found",
    description: "A software that allows students to post, save, and find lost items through their own personal store.",
    src: lostButFound,
    tech: ["Laravel", "MySql", "Tailwind CSS"],
    alt: "Luna Thread Dashboard",
    live: "#projects",
    github: "https://github.com/Blaise101/Lost-But-Found",
  },
  {
    title: "Luna Thread",
    description: "A full-stack e-commerce application designed for a luxury women's fashion brand. It features a sophisticated, minimalist public-facing storefront and a robust administrative dashboard for inventory and customer relationship management",
    src: lunaThread,
    tech: ["React", "Laravel", "MySql", "Tailwind CSS"],
    alt: "Luna Thread Dashboard",
    live: "https://future-fs-03-30g875kcq-blaise-izerimanas-projects.vercel.app/",
    github: "https://github.com/Blaise101/FUTURE_FS_03/",
  },
  {
    title: "Campus Link",
    description:
      "A community board that unites academic tasks, club events, and opportunities (internships, scholarships, etc.) under one simple interface.",
    tech: ["Laravel", "JavaScript", "MySql", 'Tailwind CSS'],
    src: campusLink,
    alt: "CampusLink Landing Page",
    live: "#projects",
    github: "https://github.com/Blaise101/CampusLink-MVP",
  },
  {
    title: "Ireme Supermarket",
    description: " Supermarket Management System with Product management, Stock management (stock-in, stock-out, damaged goods tracking), Sales and checkout system with receipt generation.",
    src: iremeSupermarket,
    tech: ["Laravel", "JavaScript", "Mysql", "Bootstrap CSS"],
    alt: "Ireme Supermarket",
    live: "#projects",
    github: "https://github.com/Blaise101/IREME-SUPERMARKET-MANAGER",
  },
  {
    title: "Iteme Shop",
    description: "Sales Management System using Laravel Handled backend logic, authentication, and user-friendly interfaces for sales tracking and reporting.",
    src: ucepLanding,
    tech: ["Laravel", "MySql", "Bootstrap CSS", "Paystack"],
    alt: "UCEP Landing Page",
    live: "#projects",
    github: "https://github.com/Blaise101/Iteme-UCEP",
  },
  {
    title: "Byuzuye Pivot",
    description: "Byuzuye Pivot Organization's website",
    src: byuzuyeImage,
    tech: ["HTML", "JavaScript", "CSS", "Google Maps"],
    alt: "Byuzuye Website",
    live: "#projects",
    github: "https://github.com/Blaise101/byuzuye-pivot-organisation",
  },
  // {
  //   title: "Mini CRM System",
  //   description: "A simple CRM to manage client leads generated from website contact forms.",
  //   src: miniCRM,
  //   tech: ["React", "Node.Js", "MongoDB", "Tailwind CSS"],
  //   alt: "Luna Thread Dashboard",
  //   live: "https://future-fs-02-kphyy71vy-blaise-izerimanas-projects.vercel.app",
  //   github: "https://github.com/Blaise101/FUTURE_FS_02/",
  // },
];
