// 1. Core React & DOM (Pinned to specific RC version)
import React, { useState, useEffect, useRef, useMemo } from "https://esm.sh/react@19.0.0-rc-69d4b800-20241021";
import { createRoot } from "https://esm.sh/react-dom@19.0.0-rc-69d4b800-20241021/client?deps=react@19.0.0-rc-69d4b800-20241021";

// 2. Framer Motion (Pinned to same React RC)
import { motion, useScroll, useTransform, AnimatePresence } from "https://esm.sh/framer-motion@11.11.11?deps=react@19.0.0-rc-69d4b800-20241021,react-dom@19.0.0-rc-69d4b800-20241021";

// 3. Icons (Pinned to same React RC)
import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  Cpu, 
  Database, 
  Smartphone, 
  Layers,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Maximize2,
  Code2,
  ArrowRight,
  BarChart3,
  Network,
  Binary,
  CircuitBoard,
  BookOpen,
  Briefcase,
  Router,
  MonitorSpeaker,
  ShieldCheck,
  Calendar,
  Hexagon
} from "https://esm.sh/lucide-react@0.453.0?deps=react@19.0.0-rc-69d4b800-20241021,react-dom@19.0.0-rc-69d4b800-20241021";

// --- Types & Data ---

type Project = {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  category: "data" | "hardware" | "app";
  link: string;
  github: string;
  features: string[];
};

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Predictive Modeling Analysis",
    shortDescription: "End-to-end Machine Learning workflow analyzing complex datasets.",
    fullDescription: "A comprehensive data science project focused on predictive modeling. This project involves a rigorous data pipeline including extensive cleaning, feature engineering, and the implementation of various regression and classification algorithms. It demonstrates the ability to translate raw data into accurate future predictions.",
    techStack: ["Python", "Scikit-Learn", "Pandas", "Matplotlib", "Jupyter"],
    category: "data",
    link: "https://github.com/Lohan6/Predictive-Modeling-Coursera-",
    github: "https://github.com/Lohan6/Predictive-Modeling-Coursera-",
    features: [
      "Advanced data cleaning and preprocessing pipelines",
      "Feature selection and hyperparameter tuning",
      "Model evaluation using precision/recall metrics",
      "Visual analysis of model performance"
    ]
  },
  {
    id: 2,
    title: "Layoff Trends EDA",
    shortDescription: "Exploratory Data Analysis visualizing global tech layoff impacts.",
    fullDescription: "An in-depth Exploratory Data Analysis (EDA) investigating the economic impact of layoffs across the tech industry. This project utilizes advanced visualization libraries to uncover geographic distribution, company-size correlations, and temporal trends in workforce reductions.",
    techStack: ["Python", "Seaborn", "Plotly", "Pandas", "Geospatial Analysis"],
    category: "data",
    link: "https://github.com/Lohan6/EDA-Layoff-impacts",
    github: "https://github.com/Lohan6/EDA-Layoff-impacts",
    features: [
      "Interactive time-series visualizations",
      "Geospatial mapping of global impact",
      "Statistical correlation analysis",
      "Actionable insights derived from unstructured data"
    ]
  },
  {
    id: 3,
    title: "Embedded Systems & IoT",
    shortDescription: "Foundational knowledge integration of Hardware and Software.",
    fullDescription: "While my focus is Data Science, my background in Computer Engineering provides me with a deep understanding of the hardware that powers our models. This portfolio of academic work includes basic Verilog implementations, Assembly optimizations, and ESP32 IoT sensor networks.",
    techStack: ["C/C++", "Assembly", "Verilog", "IoT", "Sensors"],
    category: "hardware",
    link: "#",
    github: "#",
    features: [
      "Low-level memory management",
      "Hardware-software interface understanding",
      "Basic circuit design and logic",
      "Sensor data acquisition for analysis"
    ]
  }
];

// Reorganized Skills to emphasize Data Science
const PRIMARY_SKILLS = [
  { name: "Python", icon: <Binary size={18} /> },
  { name: "Data Science", icon: <BarChart3 size={18} /> },
  { name: "Machine Learning", icon: <Network size={18} /> },
  { name: "SQL & NoSQL", icon: <Database size={18} /> },
  { name: "Pandas / NumPy", icon: <Layers size={18} /> },
  { name: "Data Visualization", icon: <Maximize2 size={18} /> },
];

const FOUNDATIONAL_SKILLS = [
  "C", "C++", "Java", "HTML/CSS", "JavaScript", 
  "Flutter", "React Native", "Redis", "Assembly", "Hardware Design"
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// --- Components ---

const AnimatedLogo = () => {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
       <motion.div
         animate={{ rotate: 360 }}
         transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
         className="absolute inset-0 text-primary/20"
       >
         <Hexagon size={40} strokeWidth={1} />
       </motion.div>
       <motion.div
         animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
         transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
         className="absolute inset-0 flex items-center justify-center text-primary"
       >
         <Hexagon size={32} strokeWidth={2} className="fill-primary/10" />
       </motion.div>
       <motion.div
         className="absolute inset-0 flex items-center justify-center text-white font-bold font-mono text-xs"
       >
         DS
       </motion.div>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Profile", href: "#about" },
    { name: "Expertise", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Connect", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'glass py-3 border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-medium tracking-tight flex items-center gap-3 text-text group cursor-pointer"
        >
          <AnimatedLogo />
          <span className="font-sans font-semibold tracking-tight group-hover:text-primary transition-colors">
            Lohan<span className="text-secondary font-light group-hover:text-primary/70">.DS</span>
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm text-secondary hover:text-primary transition-colors font-medium relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-text" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass border-t border-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-secondary hover:text-primary py-2 block border-b border-white/5 last:border-0"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Animations ---

const DataNetworkAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use a resize observer or just resize on init to match parent
    const resize = () => {
        const parent = canvas.parentElement;
        if (parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        } else {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    };
    
    // Initial resize
    resize();

    let width = canvas.width;
    let height = canvas.height;

    // --- Nodes Configuration ---
    const nodeCount = Math.floor((width * height) / 18000); 
    const nodes = Array.from({ length: Math.min(nodeCount, 40) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1
    }));

    // --- Particles Configuration (Background) ---
    const particleCount = Math.floor((width * height) / 10000); 
    const particles = Array.from({ length: Math.min(particleCount, 80) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      dx: (Math.random() - 0.5) * 0.2, // Move slower than nodes
      dy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.3 + 0.05,
      targetAlpha: Math.random() * 0.3 + 0.05,
      pulseSpeed: 0.01 + Math.random() * 0.02,
      type: Math.random() > 0.8 ? 'square' : 'circle' // Mixed shapes for data aesthetic
    }));

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // 1. Draw Background Particles (Bits)
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        // Wrap around
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Twinkle effect
        if (Math.abs(p.alpha - p.targetAlpha) < 0.01) {
             p.targetAlpha = Math.random() * 0.4 + 0.05;
        }
        p.alpha += (p.targetAlpha - p.alpha) * p.pulseSpeed;

        ctx.fillStyle = '#38bdf8'; // Primary color
        ctx.globalAlpha = p.alpha * 0.5;

        ctx.beginPath();
        if (p.type === 'square') {
            ctx.rect(p.x, p.y, p.size, p.size);
        } else {
            ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        }
        ctx.fill();
      });

      // 2. Draw Network Nodes
      nodes.forEach(node => {
        node.x += node.dx;
        node.y += node.dy;

        if (node.x < 0 || node.x > width) node.dx *= -1;
        if (node.y < 0 || node.y > height) node.dy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8'; 
        ctx.globalAlpha = 0.4;
        ctx.fill();
      });

      // 3. Draw Connections
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = '#38bdf8';

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.globalAlpha = (1 - (dist / 130)) * 0.3;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
        resize();
        width = canvas.width;
        height = canvas.height;
    };

    window.addEventListener('resize', handleResize);
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full block pointer-events-none" />;
};

const SectionHeading = ({ children, icon: Icon }: { children?: React.ReactNode, icon?: any }) => (
  <motion.h2 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className="text-3xl font-bold mb-12 text-text flex items-center gap-3"
  >
    {Icon && <Icon className="text-primary" size={32} />}
    <span className="relative">
      {children}
      <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gradient-to-r from-primary to-transparent rounded-full" />
    </span>
  </motion.h2>
);

const Hero = () => {
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        {/* Gradients */}
        <div 
          className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.15) 0%, transparent 70%)' }} 
        />
        <div 
          className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at center, rgba(45, 212, 191, 0.1) 0%, transparent 70%)' }}
        />
      </div>

      {/* Animation Canvas - Absolute background to overlap content */}
      <DataNetworkAnimation />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full">
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Mobile backdrop for text readability */}
          <div className="lg:hidden absolute inset-0 -z-10 bg-background/60 blur-3xl scale-125 rounded-full"></div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-primary/30 rounded-full bg-primary/5 text-primary text-xs font-mono tracking-wide"
          >
             <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            AVAILABLE FOR DATA ROLES
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight text-text drop-shadow-sm">
            Making Sense of <br />
            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Complex Data.</span>
          </h1>
          <p className="text-secondary text-lg mb-8 max-w-lg leading-relaxed font-light drop-shadow-md">
            I am a <strong>Data Scientist</strong> with a background in Computer Engineering. I specialize in turning raw data into predictive insights, while keeping a foundational understanding of the full hardware-software stack.
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="bg-primary text-background font-semibold px-8 py-3 rounded-lg flex items-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              View Data Projects <BarChart3 size={18} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#about"
              className="border border-white/10 hover:bg-white/5 text-text px-8 py-3 rounded-lg transition-colors bg-background/50 backdrop-blur-sm"
            >
              About Me
            </motion.a>
          </div>
        </motion.div>

        {/* Empty div to balance grid on Desktop, allowing animation to be seen clearly on the right */}
        <div className="hidden lg:block h-[500px]"></div>
      </div>

      <motion.a 
        href="#about"
        style={{ opacity: useTransform(scrollY, [0, 200], [1, 0]) }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted"
      >
        <ChevronDown size={24} />
      </motion.a>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-surface relative scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading icon={CircuitBoard}>Expertise</SectionHeading>
            <div className="space-y-6 text-secondary text-lg leading-relaxed font-light">
              <p>
                My academic journey in <strong className="text-primary font-normal">Computer Engineering</strong> has given me a rare perspective in the world of Data Science. Unlike many who strictly focus on high-level algorithms, I have seen what happens "under the hood."
              </p>
              <p>
                However, my true passion is <strong className="text-text font-medium">Data</strong>. I love the process of extracting meaning from chaos, building predictive models, and visualizing stories that drive decision-making.
              </p>
              <p>
                While I am proficient in the tools of data science (Python, SQL, ML), I also maintain a <span className="text-accent">working knowledge</span> of broader engineering concepts—from Assembly language to Mobile App Development—allowing me to collaborate effectively across multidisciplinary teams.
              </p>
            </div>
            
            <div className="mt-8 flex gap-4 text-sm font-mono text-muted">
              <div className="flex items-center gap-2">
                <Code2 size={16} /> Data First
              </div>
              <div className="flex items-center gap-2">
                <CircuitBoard size={16} /> Hardware Aware
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/5 rounded-2xl transform rotate-3" />
            <div className="relative bg-background p-8 rounded-2xl border border-white/5 shadow-2xl">
               <h3 className="font-sans text-xl font-medium mb-6 text-text">Focus Areas</h3>
               <div className="space-y-6">
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="group"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-primary font-medium">Data Science & ML</span>
                      <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">PRIMARY</span>
                    </div>
                    <p className="text-sm text-secondary">Predictive modeling, EDA, statistical analysis, and visualization.</p>
                  </motion.div>
                  
                  <div className="w-full h-px bg-white/5" />

                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="group opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-text font-medium">Computer Engineering</span>
                      <span className="text-xs font-mono text-muted bg-white/5 px-2 py-1 rounded">DEGREE</span>
                    </div>
                    <p className="text-sm text-secondary">Hardware architecture, embedded systems, and low-level logic.</p>
                  </motion.div>

                  <div className="w-full h-px bg-white/5" />

                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="group opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-text font-medium">Full Stack & Mobile</span>
                      <span className="text-xs font-mono text-muted bg-white/5 px-2 py-1 rounded">BASIC</span>
                    </div>
                    <p className="text-sm text-secondary">Flutter, React Native, SQL/NoSQL databases, and API integration.</p>
                  </motion.div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-background scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading icon={Layers}>Technical Arsenal</SectionHeading>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Primary Skills - Takes up 3 columns */}
          <div className="md:col-span-3">
             <h3 className="text-lg font-medium text-primary mb-6 flex items-center gap-2">
               <Database size={20} /> Core Competencies
             </h3>
             <motion.div 
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="grid sm:grid-cols-2 gap-4"
             >
               {PRIMARY_SKILLS.map((skill) => (
                 <motion.div
                   key={skill.name}
                   variants={itemVariants}
                   className="group bg-surface border border-white/5 p-4 rounded-lg flex items-center gap-3 cursor-default transition-all duration-300 hover:scale-[1.02] hover:bg-surface/90 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                 >
                   <div className="text-primary bg-primary/10 p-2 rounded-md transition-all duration-300 group-hover-wiggle">
                     {skill.icon}
                   </div>
                   <span className="text-text font-medium transition-colors duration-300 group-hover:text-primary">{skill.name}</span>
                 </motion.div>
               ))}
             </motion.div>
          </div>

          {/* Secondary Skills - Takes up 2 columns */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-secondary mb-6 flex items-center gap-2">
               <BookOpen size={20} /> Foundational Knowledge
            </h3>
            <div className="flex flex-wrap gap-2">
               {FOUNDATIONAL_SKILLS.map((skill, index) => (
                 <motion.span
                   key={skill}
                   initial={{ opacity: 0, scale: 0.9 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.2 + (index * 0.05) }}
                   className="px-3 py-1.5 bg-surface border border-white/5 rounded-full text-sm text-muted cursor-default transition-all duration-300 hover:scale-110 hover:text-text hover:border-white/20 hover:bg-white/5"
                 >
                   {skill}
                 </motion.span>
               ))}
            </div>
            <p className="mt-6 text-sm text-muted leading-relaxed">
              * These are technologies I have encountered during my Computer Engineering studies and have a basic understanding of, allowing me to interface with hardware and application layers when necessary.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-surface relative overflow-hidden scroll-mt-20">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <CircuitBoard size={300} className="text-primary" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionHeading icon={Briefcase}>Professional Experience</SectionHeading>

        <div className="relative pl-8">
          {/* Animated Timeline Line */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-0 top-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"
          ></motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            {/* Timeline Dot */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="absolute -left-[39px] top-0 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center"
            >
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            </motion.div>

            <div className="mb-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
               <h3 className="text-2xl font-bold text-text">Network & Automation Engineering Intern</h3>
               <span className="text-primary font-mono text-sm bg-primary/10 px-3 py-1 rounded-full w-fit">SIWES</span>
            </div>
            
            <div className="flex items-center gap-4 text-secondary mb-6 text-sm">
               <div className="flex items-center gap-1"><Briefcase size={16}/> Triangle Nigeria Ltd.</div>
               <div className="flex items-center gap-1"><Calendar size={16}/> 8 Weeks</div>
            </div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="group bg-background/40 backdrop-blur-sm border border-white/5 rounded-xl p-8 hover:border-primary/30 transition-colors shadow-xl relative overflow-hidden"
            >
               {/* Hover Glow Effect */}
               <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

               <p className="text-secondary leading-relaxed mb-8 relative z-10">
                 Gained intensive hands-on experience in enterprise networking and smart home automation. Bridged the gap between academic theory and practical implementation by deploying complex network infrastructures and integrated control systems for high-profile clients.
               </p>

               <div className="grid md:grid-cols-2 gap-8 relative z-10">
                  <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{once: true}}>
                     <h4 className="flex items-center gap-2 text-text font-medium mb-4">
                       <Router size={18} className="text-primary"/> Network Infrastructure
                     </h4>
                     <ul className="space-y-3">
                        <motion.li variants={itemVariants} className="flex items-start gap-2 text-sm text-secondary">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0"></span>
                          <span>Built server racks from scratch, including device arrangement, <strong>structured cabling</strong>, and effective cable management (Cat6/Fiber).</span>
                        </motion.li>
                        <motion.li variants={itemVariants} className="flex items-start gap-2 text-sm text-secondary">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0"></span>
                          <span>Configured enterprise-grade <strong>Araknis routers</strong> and managed switches via the <strong>OvrC cloud platform</strong>.</span>
                        </motion.li>
                        <motion.li variants={itemVariants} className="flex items-start gap-2 text-sm text-secondary">
                           <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0"></span>
                           <span>Implemented VLANs, static IPs, and Mesh Wi-Fi systems (Eero) to resolve connectivity bottlenecks in large facilities.</span>
                        </motion.li>
                     </ul>
                  </motion.div>

                  <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{once: true}}>
                     <h4 className="flex items-center gap-2 text-text font-medium mb-4">
                       <MonitorSpeaker size={18} className="text-accent"/> Smart Automation & AV
                     </h4>
                     <ul className="space-y-3">
                        <motion.li variants={itemVariants} className="flex items-start gap-2 text-sm text-secondary">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/50 shrink-0"></span>
                          <span>Programmed <strong>Control4</strong> ecosystems using <em>Composer Pro</em>, integrating automated blinds, Lutron lighting modules, and voice control (Alexa).</span>
                        </motion.li>
                        <motion.li variants={itemVariants} className="flex items-start gap-2 text-sm text-secondary">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/50 shrink-0"></span>
                          <span>Installed and calibrated high-fidelity AV systems (Bluesound), video walls (WyreStorm), and corporate conferencing hardware (Yealink/Crestron).</span>
                        </motion.li>
                        <motion.li variants={itemVariants} className="flex items-start gap-2 text-sm text-secondary">
                           <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/50 shrink-0"></span>
                           <span>Deployed <strong>Ajax smart security</strong> systems including hubs, sirens, and motion detectors.</span>
                        </motion.li>
                     </ul>
                  </motion.div>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Project Components ---

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <div 
        className="absolute inset-0 bg-background/90 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="glass-modal w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl relative z-10 border border-white/10 shadow-2xl"
      >
        <div className="p-8">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-muted hover:text-text hover:bg-white/5 rounded-full transition-colors"
          >
            <X size={24} />
          </button>

          <div className="mb-8">
            <span className={`inline-block px-3 py-1 rounded text-xs font-mono font-medium tracking-wide mb-4 ${
                project.category === "data" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
            }`}>
              {project.category === "data" ? "DATA SCIENCE" : "ENGINEERING"}
            </span>
            <h2 className="text-3xl font-bold text-text mb-2">{project.title}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2 text-secondary leading-relaxed space-y-4">
              <p>{project.fullDescription}</p>
            </div>
            <div className="bg-surface/50 p-6 rounded-lg border border-white/5 h-fit">
              <h4 className="text-sm font-bold text-text mb-4 uppercase tracking-wider">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tag => (
                  <span key={tag} className="text-xs font-mono px-2 py-1 rounded bg-background border border-white/10 text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-text mb-4">Key Highlights</h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-secondary text-sm">
                  <span className="mt-1 text-primary"><ArrowRight size={14} /></span> {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4 pt-6 border-t border-white/10">
            {project.github !== "#" && (
              <a 
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-text text-background hover:bg-white transition-colors font-medium text-sm"
              >
                <Github size={18} /> View Code
              </a>
            )}
            {project.link !== "#" && (
              <a 
                href={project.link}
                target="_blank"
                rel="noreferrer" 
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 text-text transition-colors font-medium text-sm"
              >
                <ExternalLink size={18} /> Project Link
              </a>
            )}
             {project.github === "#" && (
               <span className="text-sm text-muted italic flex items-center">Academic project - Code available upon request</span>
             )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 bg-background scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading icon={BarChart3}>Featured Projects</SectionHeading>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer bg-surface rounded-xl border border-white/5 overflow-hidden hover:border-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/5 flex flex-col"
            >
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-6">
                   <div className={`p-3 rounded-lg ${project.category === 'data' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                      {project.category === 'data' ? <BarChart3 size={24} /> : <Cpu size={24} />}
                   </div>
                   <ExternalLink size={18} className="text-muted group-hover:text-primary transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed mb-6">
                  {project.shortDescription}
                </p>
              </div>
              
              <div className="px-6 py-4 bg-white/[0.02] border-t border-white/5 mt-auto">
                <div className="flex flex-wrap gap-2 text-xs font-mono text-muted">
                  {project.techStack.slice(0, 3).map(tech => (
                    <span key={tech}>{tech}</span>
                  ))}
                  {project.techStack.length > 3 && <span>+</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-surface relative overflow-hidden text-center scroll-mt-20">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-mono text-sm mb-4">What's Next?</p>
          <h2 className="text-4xl md:text-5xl font-bold text-text mb-6">
            Get In Touch
          </h2>
          <p className="text-secondary text-lg mb-10 max-w-xl mx-auto">
            I'm currently looking for new opportunities in Data Science. Whether you have a question about my research or just want to say hi, my inbox is open.
          </p>
          
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:lohanrotesk65@gmail.com"
            className="inline-block bg-transparent border border-primary text-primary font-medium px-8 py-4 rounded-lg hover:bg-primary/10 transition-colors"
          >
            Say Hello
          </motion.a>

          <div className="mt-20 flex justify-center gap-8">
            <a href="https://github.com/Lohan6" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text transition-colors transform hover:-translate-y-1 block">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/david-ojo65/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text transition-colors transform hover:-translate-y-1 block">
              <Linkedin size={24} />
            </a>
            <a href="mailto:lohanrotesk65@gmail.com" className="text-muted hover:text-text transition-colors transform hover:-translate-y-1 block">
              <Mail size={24} />
            </a>
          </div>
          
          <footer className="mt-20 text-muted text-xs font-mono">
            <p>Built with React 19 & Tailwind CSS</p>
          </footer>
        </motion.div>
      </div>
    </section>
  );
};

const App = () => {
  return (
    <div className="bg-background min-h-screen text-text selection:bg-primary/30 selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);