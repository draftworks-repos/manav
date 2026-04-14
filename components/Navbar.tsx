import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

interface NavbarProps {
  setView: (view: string) => void;
  currentView: string;
}

const Navbar: React.FC<NavbarProps> = ({ setView, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when view changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentView]);

  const navItems = [
    { label: "Home", view: "home" },
    { label: "Work", view: "work" },
    { label: "About", view: "about" },
    { label: "Services", view: "services" },
    // { label: "AI Lab", view: "director" },
  ];

  const handleNavClick = (view: string) => {
    setView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 w-full z-[150] transition-all duration-500 ease-in-out ${
          isScrolled || isMobileMenuOpen
            ? "py-4 bg-black/80 backdrop-blur-xl"
            : "py-10 bg-transparent"
        }`}
      >
        <div className="px-6 md:px-12 lg:px-20 w-full flex justify-between items-center">
          {/* Brand */}
          <div
            onClick={() => handleNavClick("home")}
            className="interactive flex items-center gap-4 cursor-pointer"
            data-cursor="HOME"
          >
            <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm">
              <Zap size={16} className="text-black" fill="black" />
            </div>
            <span className="text-xl font-syncopate font-bold tracking-tighter uppercase">
              Manav<span className="text-zinc-600">edits</span>
            </span>
          </div>

          {/* Desktop Links - Visible only on LG and up */}
          <div className="hidden lg:flex gap-12 text-[9px] font-bold uppercase tracking-[0.5em] text-zinc-500">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => setView(item.view)}
                className={`interactive hover:text-white transition-colors relative group py-2 ${
                  currentView === item.view ? "text-white" : ""
                }`}
                data-cursor="GO"
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-[1px] bg-white transition-all duration-500 ${
                    currentView === item.view
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4 lg:gap-10">
            <button
              className="interactive hidden lg:block px-8 py-3 border border-zinc-800 bg-black hover:bg-white hover:text-black text-[8px] font-bold uppercase tracking-[0.5em] transition-all rounded-sm"
              data-cursor="TALK"
            >
              <a href="https://calendly.com/manavhalder911/30min">
                Book a Meeting
              </a>
            </button>

            {/* Mobile/Tablet Menu Button - Visible on anything below LG */}
            <button
              className="lg:hidden p-2 text-white hover:text-zinc-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X size={24} strokeWidth={1.5} />
              ) : (
                <Menu size={24} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* Subtle Progress Divider - Only visible when scrolled */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5 overflow-hidden"
        >
          <motion.div
            className="h-full bg-white/20 origin-left"
            style={{ scaleX }}
          />
        </motion.div>
      </motion.nav>

      {/* Mobile/Tablet Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[140] bg-black flex flex-col items-center justify-center"
          >
            <div className="flex flex-col gap-8 text-center px-6">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.view}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                  onClick={() => handleNavClick(item.view)}
                  className={`text-4xl md:text-6xl font-syncopate font-bold uppercase tracking-tighter ${
                    currentView === item.view ? "text-white" : "text-zinc-800"
                  } hover:text-white transition-colors`}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 px-12 py-5 border border-zinc-800 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all"
              >
                Inquiry
              </motion.button>
            </div>

            {/* Decorative Label */}
            <div className="absolute bottom-12 left-0 w-full text-center">
              <span className="text-[8px] font-mono text-zinc-900 tracking-[1em] uppercase">
                Navigation_Override_v1.0
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
