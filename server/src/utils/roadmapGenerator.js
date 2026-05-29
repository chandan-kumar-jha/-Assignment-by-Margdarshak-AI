const ROLE_TEMPLATES = {
  "frontend developer": {
    beginner: [
      "Learn HTML fundamentals",
      "Learn CSS and responsive design",
      "Learn JavaScript basics",
      "Understand DOM manipulation",
      "Learn Git and GitHub",
      "Learn React fundamentals",
      "Build small frontend projects",
      "Deploy applications to the web",
    ],
    intermediate: [
      "Master modern JavaScript (ES6+)",
      "Learn TypeScript",
      "Build advanced React applications",
      "Learn Next.js fundamentals",
      "Understand state management",
      "Optimize frontend performance",
      "Write automated tests",
      "Build production-ready projects",
    ],
    advanced: [
      "Master Next.js and SSR",
      "Design scalable frontend architectures",
      "Improve accessibility standards",
      "Optimize web performance deeply",
      "Implement advanced testing strategies",
      "Learn frontend security best practices",
      "Contribute to open source",
      "Lead frontend project development",
    ],
  },

  "backend developer": {
    beginner: [
      "Learn JavaScript fundamentals",
      "Learn Node.js basics",
      "Understand Express.js",
      "Learn REST API development",
      "Learn MongoDB fundamentals",
      "Practice CRUD operations",
      "Implement authentication basics",
      "Build backend projects",
    ],
    intermediate: [
      "Design RESTful APIs",
      "Learn database indexing",
      "Implement authentication and authorization",
      "Handle file uploads",
      "Learn caching concepts",
      "Write backend tests",
      "Improve API security",
      "Deploy backend services",
    ],
    advanced: [
      "Design scalable backend systems",
      "Optimize database performance",
      "Implement microservice concepts",
      "Learn message queues",
      "Improve observability and logging",
      "Handle distributed systems challenges",
      "Apply advanced security practices",
      "Architect production-grade systems",
    ],
  },

  "full stack developer": {
    beginner: [
      "Learn HTML and CSS",
      "Learn JavaScript fundamentals",
      "Learn React basics",
      "Learn Node.js and Express",
      "Learn MongoDB fundamentals",
      "Build full stack CRUD applications",
      "Learn Git and GitHub",
      "Deploy full stack projects",
    ],
    intermediate: [
      "Learn TypeScript",
      "Master React and Next.js",
      "Design RESTful APIs",
      "Implement authentication systems",
      "Optimize database queries",
      "Build scalable applications",
      "Write tests for frontend and backend",
      "Deploy production applications",
    ],
    advanced: [
      "Design scalable architectures",
      "Master cloud deployment",
      "Implement CI/CD pipelines",
      "Optimize application performance",
      "Improve system security",
      "Learn distributed systems concepts",
      "Contribute to open source projects",
      "Lead end-to-end product development",
    ],
  },

  "data scientist": {
    beginner: [
      "Learn Python fundamentals",
      "Learn NumPy and Pandas",
      "Learn data visualization",
      "Understand statistics basics",
      "Learn SQL fundamentals",
      "Work on exploratory data analysis",
      "Build small data projects",
      "Create a portfolio",
    ],
    intermediate: [
      "Learn machine learning fundamentals",
      "Master feature engineering",
      "Work with real-world datasets",
      "Learn model evaluation techniques",
      "Learn data storytelling",
      "Build machine learning projects",
      "Deploy ML models",
      "Create an advanced portfolio",
    ],
    advanced: [
      "Master deep learning concepts",
      "Learn MLOps fundamentals",
      "Optimize machine learning pipelines",
      "Work with large-scale datasets",
      "Improve model interpretability",
      "Research advanced AI techniques",
      "Publish technical work",
      "Lead data science initiatives",
    ],
  },

  "devops engineer": {
    beginner: [
      "Learn Linux fundamentals",
      "Learn networking basics",
      "Understand Git and GitHub",
      "Learn scripting fundamentals",
      "Learn Docker basics",
      "Understand CI/CD concepts",
      "Learn cloud fundamentals",
      "Build DevOps practice projects",
    ],
    intermediate: [
      "Master Docker workflows",
      "Learn Kubernetes basics",
      "Implement CI/CD pipelines",
      "Learn Infrastructure as Code",
      "Monitor applications and services",
      "Automate deployments",
      "Improve cloud skills",
      "Build production DevOps projects",
    ],
    advanced: [
      "Design scalable infrastructure",
      "Master Kubernetes operations",
      "Implement advanced observability",
      "Improve cloud cost optimization",
      "Design disaster recovery strategies",
      "Automate infrastructure management",
      "Implement security best practices",
      "Lead platform engineering efforts",
    ],
  },
};

function filterRelevantSteps(steps, currentSkills = []) {
  const normalizedSkills = currentSkills
    .map((skill) => skill.toLowerCase().trim())
    .filter((skill) => skill.length >= 4);

  return steps.filter((step) => {
    const normalizedStep = step.toLowerCase();

    return !normalizedSkills.some((skill) =>
      normalizedStep.includes(skill)
    );
  });
}

function getGenericRoadmap() {
  return [
    "Understand the fundamentals of your chosen field",
    "Learn the core tools and technologies",
    "Build foundational projects",
    "Study industry best practices",
    "Work on intermediate real-world projects",
    "Create a strong portfolio",
    "Practice problem-solving regularly",
    "Apply for internships and entry-level opportunities",
  ];
}

function generateRoadmap({
  targetRole,
  currentSkills = [],
  experienceLevel,
}) {
  const role = (targetRole || "").toLowerCase().trim();
  const level = (experienceLevel || "beginner").toLowerCase();

  const matchedRole = Object.keys(ROLE_TEMPLATES).find(
    (templateRole) =>
      role.includes(templateRole) || templateRole.includes(role)
  );

  const roadmapSteps = matchedRole
    ? ROLE_TEMPLATES[matchedRole][level] ||
      ROLE_TEMPLATES[matchedRole].beginner
    : getGenericRoadmap();

  const filteredSteps = filterRelevantSteps(
    roadmapSteps,
    currentSkills
  );

  const summary = `You're targeting ${targetRole} at ${experienceLevel} level with experience in: ${
    currentSkills.length ? currentSkills.join(", ") : "none"
  }. Here's your roadmap:`;

  return [summary, ...filteredSteps];
}

module.exports = {
  generateRoadmap,
  filterRelevantSteps,
  ROLE_TEMPLATES,
};