// Centralized portfolio data - customize this with your information

export const personalInfo = {
  name: "Romain Clemencon",
  title: "Software Engineer",
  tagline: "Strong foundation in full-stack development and a passion for solving complex problems. Skilled at breaking down intricate systems and communicating technical concepts clearly.",
  email: "romain.clemen@gmail.com",
  location: "Your City, Country",
};

export const socialLinks = {
  github: "https://github.com/RomainClem",
  linkedin: "https://linkedin.com/in/romainclemencon",
};

export const skills = {
  languages: ["C#","TypeScript", "JavaScript", "Python"],
  frontend: ["React"],
  backend: ["DotNet"],
  tools: ["Git", "Docker", "Azure", "CI/CD"],
};

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
//   Add your projects here
  {
    id: "1",
    title: "cyli",
    description: "A simple interactive Cypress CLI wrapper for an easier interaction with your Cypress tests directly from a Command line.",
    image: "/projects/project-1.png",
    tags: ["Python", "Cypress"],
    liveUrl: "https://project.com",
    githubUrl: "https://github.com/RomainClem/cyli",
    featured: true,
  },
];

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string[];
  technologies: string[];
}

export const experience: Experience[] = [
  // Add your work experience here
  {
    id: "1",
    company: "Novo Nordisk Engineering",
    position: "Advanced System developer",
    duration: "Oct 2023 - Present",
    description: [
      "Led development of the digitalization of engineering tools.",
      "Improved performance by...",
    ],
    technologies: ["C#", "DotNet", "SQL Server", "TypeScript", "React"],
  },
];
