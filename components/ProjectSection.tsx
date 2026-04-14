import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROJECTS } from "../constants";
import { ArrowUpRight } from "lucide-react";

interface ProjectSectionProps {
  setView: (view: string) => void;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ setView }) => {
  return (
    <div className="flex flex-col gap-[5vh] lg:gap-[10vh]">
      <div className="mb-20">
        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-700">
          Selected / Feature
        </span>
      </div>
      <div className="flex flex-col gap-[20vh] lg:gap-[30vh]">
        {PROJECTS.slice(0, 6).map((project, idx) => {
          const ref = useRef(null);
          const { scrollYProgress } = useScroll({
            target: ref,
            offset: ["start end", "end start"],
          });

          const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
          const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

          return (
            <motion.div
              ref={ref}
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-20 items-center w-full`}
            >
              {/* Image Wrapper */}
              <div
                className="interactive relative flex-[1.4] w-full overflow-hidden bg-zinc-900 aspect-[16/10] cursor-pointer"
                data-cursor="VIEW"
                onClick={() => setView(`project/${project.id}`)}
              >
                <motion.img
                  style={{ scale: imgScale }}
                  src={project.thumbnail}
                  className="w-full h-full object-cover grayscale transition-all duration-700 hover:grayscale-0 brightness-75 hover:brightness-100"
                  alt={project.title}
                />
                <div className="absolute top-8 right-8">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center">
                    <ArrowUpRight size={20} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Text Wrapper */}
              <motion.div
                style={{ y }}
                className="flex-1 w-full max-w-xl space-y-8"
              >
                <div className="flex items-center gap-6">
                  <span className="text-[10px] font-bold text-zinc-700 tracking-[0.5em]">
                    {project.year}
                  </span>
                  <div className="h-[1px] w-12 bg-zinc-900" />
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-3xl md:text-7xl font-syncopate font-bold tracking-tighter uppercase leading-[1]">
                  {project.title}
                </h3>

                <p className="text-zinc-500 text-lg leading-relaxed font-light">
                  {project.description}
                </p>

                <button
                  onClick={() => setView(`project/${project.id}`)}
                  className="interactive text-[10px] font-bold uppercase tracking-[0.4em] border-b border-zinc-800 pb-2 hover:border-white transition-all"
                  data-cursor="OPEN"
                >
                  View Details
                </button>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectSection;
