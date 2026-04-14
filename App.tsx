import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { FaXTwitter } from "react-icons/fa6";
import {
  ArrowUpRight,
  MoveRight,
  ArrowLeft,
  Quote,
  Plus,
  Instagram,
  Linkedin,
  YoutubeIcon,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProjectSection from "./components/ProjectSection";
import CreativeDirector from "./components/CreativeDirector";
import { PROJECTS, SERVICES, REVIEWS } from "./constants";
import SmoothScrollProvider from "./smooth-scroll-provider.tsx";

gsap.registerPlugin(ScrollTrigger);

// --- Custom Cursor ---
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("button, a, .interactive");
      if (interactive) {
        setIsHovering(true);
        setCursorText(interactive.getAttribute("data-cursor") || "");
      } else {
        setIsHovering(false);
        setCursorText("");
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[9999] mix-blend-difference hidden lg:flex items-center justify-center rounded-full bg-white"
      animate={{
        x: position.x - 8,
        y: position.y - 8,
        scale: isHovering ? 5 : 1,
      }}
      transition={{
        x: { duration: 0 },
        y: { duration: 0 },
        scale: { type: "spring", damping: 20, stiffness: 300, mass: 0.5 },
      }}
    >
      {isHovering && cursorText && (
        <span className="text-[2px] font-bold uppercase tracking-tighter text-black select-none text-center px-1">
          {cursorText}
        </span>
      )}
    </motion.div>
  );
};

// --- Reusable Animated Text Section ---
const AnimatedRevealText = ({
  text,
  className = "",
  stagger = 0.08,
  sizeClass = "text-xl md:text-3xl lg:text-4xl",
  triggerStart = "top 90%",
}: {
  text: string;
  className?: string;
  stagger?: number;
  sizeClass?: string;
  triggerStart?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const wordSpans = containerRef.current?.querySelectorAll(".word");
      if (!wordSpans || wordSpans.length === 0) return;

      gsap.to(wordSpans, {
        opacity: 1,
        color: "#ffffff",
        stagger: stagger,
        immediateRender: false,
        scrollTrigger: {
          trigger: containerRef.current,
          start: triggerStart,
          end: "bottom 50%",
          scrub: true,
          // Re-calculate markers when this trigger is created
          refreshPriority: 1,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, [text, stagger, triggerStart]);

  return (
    <div ref={containerRef} className={className}>
      <h3 className={`${sizeClass} font-light leading-tight tracking-tight`}>
        {words.map((word, i) => (
          <span
            key={i}
            className="word inline-block mr-[0.2em] opacity-10 text-zinc-700 transition-colors"
          >
            {word}
          </span>
        ))}
      </h3>
    </div>
  );
};

// --- About Section (Viewport Contained Redesign) ---
const AboutSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { scale: 1.15 },
        {
          scale: 1,
          filter: "grayscale(60%) brightness(0.75)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="h-[140vh] md:h-[110vh] lg:h-screen w-full bg-black overflow-hidden relative border-y border-zinc-900 flex flex-col lg:flex-row"
    >
      {/* Decorative Technical Layer */}

      <a
        href="https://www.instagram.com/manaav.fx/"
        target="_blank"
        data-cursor="INSTA"
      >
        <div className="absolute top-10 left-10 flex items-center gap-4 opacity-30 z-20 pointer-events-none">
          <Instagram size={16} className="text-white" />
          <span className="text-[8px] font-mono tracking-[0.5em] text-white uppercase">
            @manaav.edits
          </span>
        </div>
      </a>

      {/* Media Column - New Image */}
      <div className="relative flex-1 h-[40vh] lg:h-full border-b lg:border-b-0 lg:border-r border-zinc-900 overflow-hidden">
        <img
          ref={imgRef}
          src="/manav-2.jpeg"
          className="w-full h-full object-cover"
          alt="Cinematic Camera Detail"
        />
        <div className="absolute bottom-10 left-10 z-20">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-zinc-500">
              Identity / Profile
            </span>
            <span className="text-xl font-syncopate font-bold uppercase tracking-tighter">
              Manav Edits
            </span>
          </div>
        </div>
      </div>

      {/* Narrative Column */}
      <div className="flex-1 lg:h-full bg-[#030303] flex flex-col justify-center px-8 md:px-12 lg:px-20 relative">
        <div className="w-full lg:max-w-4xl my-10">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="mb-10"
          >
            <span className="text-[10px] font-bold uppercase tracking-[1em] text-zinc-700 block mb-6">
              Archive — Core
            </span>
            <h2 className="text-4xl md:text-8xl font-syncopate font-bold uppercase tracking-tighter leading-[1] md:leading-[0.85] mb-8">
              MANAV <br />
              <span className="text-zinc-800">HALDER</span>
            </h2>
          </motion.div>

          <AnimatedRevealText
            text="I craft high-retention content for creators and brands, specializing in long-form YouTube videos, short-form social edits, UGC ads, motion graphics, and cinematic finishing combining storytelling precision with platform strategy to deliver engaging, conversion-driven results consistently."
            className="mb-12"
            sizeClass="text-lg md:text-2xl lg:text-3xl"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 pt-12 border-t border-zinc-900">
            {/* CONTACT */}
            <div className="space-y-4">
              <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-zinc-700">
                Get in Touch
              </span>
              <p className="text-[12px] font-mono tracking-widest text-zinc-500 hover:text-white transition-colors">
                <a
                  href="mailto:workwithmanaav@gmail.com"
                  className="interactive"
                  data-cursor="EMAIL"
                >
                  workwithmanaav@gmail.com
                </a>
              </p>
            </div>

            {/* NETWORK */}
            <div className="space-y-4">
              <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-zinc-700">
                Network
              </span>

              <div className="flex items-center gap-8 text-zinc-600">
                <a
                  href="https://www.instagram.com/manaav.edits/"
                  target="_blank"
                  className="interactive hover:text-white transition-colors"
                  data-cursor="INSTAGRAM"
                >
                  <Instagram size={18} strokeWidth={1.5} />
                </a>

                <a
                  href="https://www.linkedin.com/in/manav-halder-b20ba639a/"
                  target="_blank"
                  className="interactive hover:text-white transition-colors"
                  data-cursor="LINKEDIN"
                >
                  <Linkedin size={18} strokeWidth={1.5} />
                </a>

                <a
                  href="https://x.com/manavcreates?s=21"
                  target="_blank"
                  className="interactive hover:text-white transition-colors"
                  data-cursor="X.COM"
                >
                  <FaXTwitter size={17} />
                </a>

                <a
                  href="https://www.youtube.com/@ManavCreates"
                  target="_blank"
                  className="interactive hover:text-white transition-colors"
                  data-cursor="YOUTUBE"
                >
                  <YoutubeIcon size={18} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Reviews Section ---
const ReviewsSection = () => {
  return (
    <section className="py-20 md:py-40 lg:py-60 px-6 md:px-12 lg:px-20 bg-black ">
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-32 gap-12">
          <div className="space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-[1em] text-zinc-700 block">
              Critical Acclaim
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-syncopate font-bold uppercase tracking-tighter">
              Words by
              <br />
              <span className="text-zinc-800">our clients</span>
            </h2>
          </div>
          <div className="pb-4">
            <div className="flex gap-4">
              <Plus className="text-zinc-800" size={24} />
              <Plus className="text-zinc-800" size={24} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 px-1 bg-zinc-900/50 border border-zinc-900">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="bg-[#030303] p-10 md:p-12 flex flex-col justify-between aspect-square relative group overflow-hidden"
            >
              <div className="relative z-10">
                <Quote
                  size={24}
                  className="text-zinc-800 mb-8 group-hover:text-white group-hover:scale-110 transition-all duration-500"
                />
                <p className="text-xl md:text-2xl font-light text-zinc-400 leading-snug tracking-tight group-hover:text-white transition-colors duration-500">
                  {review.quote}
                </p>
              </div>

              <div className="relative z-10 pt-8 border-t border-zinc-900 flex items-center justify-between">
                <div>
                  <h4 className="text-[9px] font-bold uppercase tracking-[0.5em] mb-1">
                    {review.author}
                  </h4>
                  <span className="text-[7px] font-mono text-zinc-700 uppercase tracking-widest">
                    {review.title}
                  </span>
                </div>
                <div className="w-6 h-6 rounded-full border border-zinc-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={10} className="text-zinc-500" />
                </div>
              </div>

              <div className="absolute inset-0 bg-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Dynamic Views ---
const HomeView: React.FC<{ setView: (v: string) => void }> = ({ setView }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <Hero />

    <section className="py-40 lg:py-40 2xl:py-80 px-6 md:px-12 lg:px-20 flex flex-col items-center border-b border-zinc-900 bg-zinc-950/20">
      <div className="w-full text-center">
        <AnimatedRevealText
          text="I bridge the gap between raw emotion and technical perfection. In the editing suite, we don't just find the cut; we find the soul of the story."
          sizeClass="text-3xl md:text-6xl lg:text-[7vw]"
          stagger={0.05}
          triggerStart="top 70%"
        />
      </div>
    </section>

    <section className="pt-10 pb-40 px-6 md:px-12 lg:px-20">
      <ProjectSection setView={setView} />
    </section>

    <AboutSection />

    <ReviewsSection />
  </motion.div>
);

const WorkView: React.FC<{ setView: (v: string) => void }> = ({ setView }) => (
  <motion.section
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    className="pt-40 pb-20 px-6 md:px-12 lg:px-20 w-full"
  >
    <div className="mb-20">
      <span className="text-[10px] uppercase tracking-[1em] text-zinc-500 mb-6 block">
        Archive
      </span>
      <h1 className="text-5xl md:text-[12vw] font-syncopate font-bold uppercase tracking-tighter leading-none">
        All <br />
        <span className="text-zinc-800">Projects</span>
      </h1>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
      {PROJECTS.map((p) => (
        <div
          key={p.id}
          className="interactive group cursor-pointer"
          data-cursor="OPEN"
          onClick={() => setView(`project/${p.id}`)}
        >
          <div className="aspect-video overflow-hidden bg-zinc-900 mb-8 relative">
            <img
              src={p.thumbnail}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              alt={p.title}
            />
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="text-white" size={32} />
            </div>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-syncopate font-bold uppercase">
                {p.title}
              </h3>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mt-2">
                {p.category} / {p.year}
              </p>
            </div>
            <span className="text-[10px] font-mono text-zinc-700">
              0{p.id.length}
            </span>
          </div>
        </div>
      ))}
    </div>
  </motion.section>
);

const ServicesView = () => (
  <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="pt-40 px-6 md:px-12 lg:px-20 w-full"
  >
    <div className="mb-24 md:mb-40">
      <h1 className="text-5xl md:text-[12vw] font-syncopate font-bold uppercase tracking-tighter leading-none mb-12 md:mb-20">
        Core <br />
        <span className="text-zinc-800">Services</span>
      </h1>
      <div className="max-w-4xl">
        <AnimatedRevealText text="Full-service post-production across edit, color, sound, and VFX delivering consistency, precision, and refined final output." />
      </div>
    </div>

    <div className="space-y-12 md:space-y-40 mb-20 md:mb-60">
      {SERVICES.map((s, idx) => (
        <div
          key={idx}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-zinc-900 pt-20"
        >
          <div className="lg:col-span-4">
            <span className="text-zinc-700 font-mono text-xs block mb-4">
              0{idx + 1}
            </span>
            <h2 className="text-4xl font-syncopate font-bold uppercase">
              {s.name}
            </h2>
          </div>
          <div className="lg:col-span-8 flex flex-col md:flex-row gap-12 md:gap-20">
            <p className="text-xl text-zinc-400 font-light flex-1">
              {s.description}
            </p>
            <div className="flex-1 space-y-4">
              {s.details.map((d, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-zinc-600 font-bold border-b border-zinc-900 pb-2"
                >
                  <div className="w-1 h-1 bg-white" /> {d}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </motion.section>
);

const ProjectDetailView: React.FC<{
  id: string;
  setView: (v: string) => void;
}> = ({ id, setView }) => {
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) return <div>Project not found</div>;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-40"
    >
      <div className="relative h-screen w-full bg-black overflow-hidden flex items-end p-6 md:px-12 lg:px-20">
        <div className="w-full flex items-end h-full pb-24">
          <div className="absolute inset-0 z-0">
            <img
              src={project.thumbnail}
              className="w-full h-full object-cover grayscale opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>

          <div className="relative z-10 w-full">
            <motion.button
              onClick={() => setView("work")}
              className="interactive flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-12 hover:text-white transition-colors"
              data-cursor="BACK"
            >
              <ArrowLeft size={14} /> Return to Work Page
            </motion.button>
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl md:text-[9vw] font-syncopate font-bold uppercase tracking-tighter leading-none"
            >
              {project.title}
            </motion.h1>
            <div className="mt-12 flex flex-wrap gap-12 border-t border-zinc-900 pt-12">
              <div>
                <span className="text-[8px] uppercase tracking-widest text-zinc-700 block mb-2">
                  Client
                </span>
                <span className="text-xs font-bold uppercase">
                  {project.client}
                </span>
              </div>
              <div>
                <span className="text-[8px] uppercase tracking-widest text-zinc-700 block mb-2">
                  Role
                </span>
                <span className="text-xs font-bold uppercase">
                  {project.role}
                </span>
              </div>
              <div>
                <span className="text-[8px] uppercase tracking-widest text-zinc-700 block mb-2">
                  Year
                </span>
                <span className="text-xs font-bold uppercase">
                  {project.year}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-20 mt-40 grid grid-cols-1 lg:grid-cols-12 gap-24">
        <div className="lg:col-span-7">
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-zinc-700 mb-10 block">
            Synopsis
          </h2>
          <p className="text-2xl md:text-3xl font-light text-zinc-300 leading-relaxed mb-16">
            {project.longDescription}
          </p>
          {project.videoUrls && project.videoUrls.length > 0 ? (
            <div
              className={`grid grid-cols-1 ${
                project.isVertical ? "md:grid-cols-2" : "md:grid-cols-1"
              } gap-8 mb-20`}
            >
              {project.videoUrls.map((url, idx) => (
                <div
                  key={idx}
                  className={`${
                    project.isVertical ? "aspect-[9/16]" : "aspect-video"
                  } bg-zinc-900 w-full overflow-hidden group relative border border-zinc-900`}
                >
                  <iframe
                    src={`${url}?autoplay=0&controls=1`}
                    className="w-full h-full border-0"
                    allow="autoplay; fullscreen"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full aspect-video bg-zinc-950 border border-dashed border-zinc-900 flex items-center justify-center mb-20">
              <span className="text-4xl md:text-7xl font-syncopate font-bold text-zinc-900 uppercase tracking-tighter mix-blend-difference">
                Coming Soon
              </span>
            </div>
          )}
        </div>
        <div className="lg:col-span-5">
          <div className="bg-zinc-950 border border-zinc-900 p-12 lg:p-16 sticky top-40">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-zinc-700 mb-10 block">
              Workflow
            </h2>
            <div className="space-y-8">
              {project.specs.map((spec, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-zinc-900 pb-4"
                >
                  <span className="text-[10px] font-mono text-zinc-700">
                    STEP_0{i + 1}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest">
                    {spec}
                  </span>
                </div>
              ))}
            </div>
            <a
              href={`https://wa.me/918436265042?text=Hi%20I%20would%20like%20to%20discuss%20about%20"${project.description}"%20project`}
              target="_blank"
            >
              <motion.button
                whileHover={{ backgroundColor: "#fff", color: "#000" }}
                className="w-full mt-12 py-5 border border-zinc-800 text-[10px] font-bold uppercase tracking-[0.3em] transition-all"
              >
                Inquire About Post
              </motion.button>
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

// --- Main App Component ---
const App: React.FC = () => {
  const [view, setView] = useState("home");
  const { scrollYProgress } = useScroll();
  const whatsappY = useTransform(scrollYProgress, [0, 0.01], [100, 0]);
  const whatsappOpacity = useTransform(scrollYProgress, [0, 0.01], [0, 1]);

  useLayoutEffect(() => {
    // Refresh ScrollTrigger after any view changes
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => clearTimeout(timer);
  }, [view]);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "about") {
        setView("home");
        // Small delay to ensure view is mounted before scrolling
        setTimeout(() => {
          const el = document.getElementById("about");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      } else if (hash) {
        setView(hash);
      } else {
        setView("home");
      }
    };
    window.addEventListener("hashchange", handleHash);
    handleHash();
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const navigate = (v: string) => {
    if (v === "about") {
      if (window.location.hash !== "#home" && view !== "home") {
        window.location.hash = "about";
      } else {
        const el = document.getElementById("about");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    window.location.hash = v;
    window.scrollTo(0, 0);
  };

  return (
    <SmoothScrollProvider>
      <div className="bg-black text-white relative selection:bg-white selection:text-black min-h-screen">
        <CustomCursor />

        <Navbar setView={navigate} currentView={view} />

        <main>
          <AnimatePresence mode="wait">
            {view === "home" && <HomeView key="home" setView={navigate} />}
            {view === "work" && <WorkView key="work" setView={navigate} />}
            {view === "services" && <ServicesView key="services" />}
            {view === "director" && (
              <motion.div
                key="director"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CreativeDirector />
              </motion.div>
            )}
            {view.startsWith("project/") && (
              <ProjectDetailView
                key="detail"
                id={view.split("/")[1]}
                setView={navigate}
              />
            )}
          </AnimatePresence>
        </main>

        {/* Fixed WhatsApp Button */}
        <motion.a
          href="https://wa.me/918436265042?text=Hi%20I%20would%20like%20to%20discuss%20a%20project"
          target="_blank"
          rel="noopener noreferrer"
          style={{ y: whatsappY, opacity: whatsappOpacity }}
          whileHover={{ scale: 0.9, y: 10 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="interactive fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[200] flex items-center gap-3 p-3 md:px-6 md:py-4 bg-black border border-zinc-800 rounded-full shadow-2xl hover:border-white transition-all duration-300"
          data-cursor="CHAT"
        >
          <img
            src="/whatsapp-white.png"
            alt="WhatsApp"
            className="w-4 h-4 md:w-4 md:h-4 object-contain"
          />
          <span className="text-[10px] font-syncopate font-bold uppercase tracking-[0.2em] text-white hidden md:block">
            Chat now
          </span>
        </motion.a>

        {!view.includes("director") && (
          <footer
            id="contact"
            className="relative bg-black pt-32 lg:pt-60 pb-28 px-6 md:px-12 lg:px-20 overflow-hidden border-t border-zinc-900"
          >
            <div className="w-full relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-700 block mb-12">
                  New Collaborations
                </span>
                <a
                  href="mailto:workwithmanaav@gmail.com"
                  className="interactive group flex items-center gap-10 text-5xl md:text-[10vw] font-syncopate font-bold tracking-tighter leading-none hover:italic"
                  data-cursor="EMAIL"
                >
                  LET'S TALK
                  <MoveRight
                    size={60}
                    strokeWidth={1}
                    className="text-zinc-800 group-hover:text-white transition-colors hidden md:block"
                  />
                </a>
              </motion.div>

              <div className="mt-24 lg:mt-40 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16 pt-20 border-t border-zinc-900/50 w-full">
                <div className="flex flex-col items-start gap-8">
                  <div className="text-3xl font-syncopate font-bold">
                    MANAV<span className="text-zinc-700">EDIT</span>
                  </div>
                  <div className="flex flex-col gap-2 text-xs uppercase tracking-widest text-zinc-500">
                    <span>New Town, Kolkata</span>
                    <span>West Bengal, India</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">
                  <a
                    href="https://www.linkedin.com/in/manav-halder-b20ba639a/"
                    target="_blank"
                    className="hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://www.instagram.com/manaav.edits/"
                    target="_blank"
                    className="hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://x.com/manavcreates?s=21"
                    target="_blank"
                    className="hover:text-white transition-colors"
                  >
                    X.Com
                  </a>
                  <a
                    href="https://www.youtube.com/@ManavCreates"
                    className="hover:text-white transition-colors"
                  >
                    YOUTUBE
                  </a>
                </div>
              </div>

              <div className="mt-24 lg:mt-32 flex flex-col lg:flex-row justify-between items-start gap-6 text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">
                <span>
                  © 2026 MANAVEDIT — Portfolio designed & developed by
                  <span className="text-white ml-1">Kunal Paraye</span>
                </span>
                <span className="flex gap-6">
                  <span className="text-zinc-700">DEVELOPMENT /</span>
                  <a
                    href="mailto:draftworks000@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    EMAIL
                  </a>
                  <a
                    href="https://wa.me/918959690529"
                    className="hover:text-white transition-colors"
                  >
                    WHATSAPP
                  </a>
                </span>
              </div>
            </div>
          </footer>
        )}
      </div>
    </SmoothScrollProvider>
  );
};

export default App;
