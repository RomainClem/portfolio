// Centralized portfolio data - customize this with your information


// Companies I've worked for
export interface Company {
  name: string;
  url: string;
}

export const companies: Record<string, Company> = {
  bankOfAmerica: {
    name: "Bank of America",
    url: "https://www.bankofamerica.com",
  },
  huawei: {
    name: "Huawei",
    url: "https://www.huawei.com",
  },
  trellix: {
    name: "Trellix",
    url: "https://www.trellix.com",
  },
  novoNordisk: {
    name: "Novo Nordisk Engineering",
    url: "https://www.nne.com",
  },
};

export const socials: Record<string, Company> = {
  github: {
    name: "GitHub",
    url: "https://github.com/RomainClem",
  },
  linkedin: {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/romainclemencon",
  },
  mail: {
    name: "hi@romain.dk",
    url: "mailto:hi@romain.dk",
  },
  resume: {
    name: "resume",
    url: "/cv.pdf",
  },
};

export const personalInfo = {
  name: "Romain Clémençon",
  title: "c' should be pronounced as a soft 's' (/s/) rather than a hard 'k' (/k/) or you'll call me a Moron.",
  tagline: "Hey! I'm Romain, a software engineer and you might have already called me a moron (cf. title).",
  email: "romain.clemen@gmail.com",
  location: "Copenhagen, Denmark",
  resumeUrl: "/cv.pdf",
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
