"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProviderProps {
  children: ReactNode;
}

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Make Lenis instance globally available
    window.lenis = lenis;

    // Synchronize Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Handle global pause/resume via custom events
    const handleToggleNavMenu = (e: Event) => {
      if (!window.lenis) return;
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      const isOpen = customEvent?.detail?.isOpen;

      if (isOpen) {
        window.lenis.stop();
        const scrollY = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.overflow = "hidden";
        (document.body.dataset as Record<string, string>).scrollY =
          String(scrollY);
        document.body.style.touchAction = "none";
        document.documentElement.style.touchAction = "none";
      } else {
        window.lenis.start();
        const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
        document.documentElement.style.touchAction = "";
        window.scrollTo(0, scrollY);
      }
    };

    window.addEventListener("toggleNavMenu", handleToggleNavMenu);

    // Cleanup function
    return () => {
      window.removeEventListener("toggleNavMenu", handleToggleNavMenu);
      gsap.ticker.remove(lenis.raf);
      if (window.lenis) {
        window.lenis.destroy();
        delete window.lenis;
      }
    };
  }, []);

  return <>{children}</>;
}
