import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Hero: React.FC = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const yVideo = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scaleText = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={container}
      className="pt-16 lg:pt-0 relative h-screen w-full bg-black overflow-hidden flex items-center justify-center"
    >
      {/* Background Layer */}
      <motion.div style={{ y: yVideo }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover grayscale brightness-50"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-cinematographer-taking-video-with-a-camera-41712-large.mp4"
            type="video/mp4"
          />
        </video>
      </motion.div>

      {/* Typography Layer */}
      <motion.div
        style={{ opacity, scale: scaleText }}
        className="relative z-20 text-center w-full px-6 md:px-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <span className="flex justify-center flex-col md:flex-row text-[10px] md:text-xs font-bold uppercase text-zinc-500 tracking-[1.5em]">
            Manav Edit<span className="hidden md:block">—</span> Portfolio
          </span>
        </motion.div>

        <h1 className="flex flex-col items-center leading-[0.8] font-syncopate font-bold uppercase">
          <motion.span
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className="text-[12vw] md:text-[13vw] tracking-tighter"
          >
            PRECISION
          </motion.span>
          <motion.span
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "circOut", delay: 0.1 }}
            className="text-[12vw] md:text-[13vw] tracking-tighter text-mask"
          >
            IS ART
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 flex flex-col lg:flex-row items-center justify-center gap-12 md:gap-16"
        >
          <div className="max-w-xs text-zinc-500 text-[10px] font-bold uppercase tracking-[0.4em] leading-relaxed">
            Crafting award-winning narratives for global brands and directors.
          </div>
          <div className="h-[1px] w-24 bg-zinc-800 hidden lg:block" />
          <a href="#work">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="interactive px-14 py-6 bg-white text-black font-bold uppercase tracking-[0.3em] text-[10px] cursor-pointer"
              data-cursor="WORK"
            >
              View Work
            </motion.div>
          </a>
        </motion.div>

        {/* Lottie Animation - Mobile & Tablet Only */}
        <div className="block lg:hidden mt-8 flex justify-center">
          <DotLottieReact
            src="https://lottie.host/a684ee74-9980-4629-8e9d-6dafb454c0a0/n8ed1dwM1q.lottie"
            loop
            autoplay
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      </motion.div>

      {/* Floating Meta Data */}
      <div className="absolute bottom-12 left-12 hidden lg:flex flex-col gap-1">
        <span className="text-[8px] font-bold text-zinc-700 tracking-[0.8em] uppercase">
          Status: Available
        </span>
        <div className="w-12 h-[1px] bg-zinc-900" />
      </div>

      <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-end gap-1">
        <span className="text-[8px] font-bold text-zinc-700 tracking-[0.8em] uppercase">
          Scroll / Discover
        </span>
        <div className="w-12 h-[1px] bg-zinc-900" />
      </div>
    </section>
  );
};

export default Hero;
