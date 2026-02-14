import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { applyAiImageFilter } from "../services/geminiService";
import {
  Sparkles,
  Image as ImageIcon,
  Upload,
  Download,
  RefreshCw,
  Command,
} from "lucide-react";

const ImageStudio: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [sourceMime, setSourceMime] = useState<string>("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(",")[1];
        setSourceImage(base64String);
        setSourceMime(file.type);
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceImage || !prompt.trim()) return;
    setLoading(true);
    try {
      const result = await applyAiImageFilter(sourceImage, sourceMime, prompt);
      setResultImage(result);
    } catch (error) {
      console.error(error);
      alert("AI Processing Error. Please try a different prompt or image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="director"
      className="py-40 px-6 md:px-24 bg-[#050505] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Column: Input & Controls */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-6 h-6 md:w-10 md:h-10 bg-zinc-900 flex items-center justify-center border border-zinc-800 rounded">
                <Command size={16} className="text-zinc-400" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-600">
                AI / Grading Lab
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-syncopate font-bold mb-12 tracking-tighter uppercase leading-[0.9]">
              Visual <br />
              <span className="text-zinc-700">Alchemy</span>
            </h2>

            <p className="text-zinc-500 text-lg mb-12 leading-relaxed max-w-md">
              Upload a still from your project and describe the grade or effect
              you desire. Our Gemini-powered engine will render the cinematic
              vision instantly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div
                className={`relative group border-2 border-dashed transition-all duration-500 rounded-sm flex flex-col items-center justify-center p-8 cursor-pointer ${
                  sourceImage
                    ? "border-zinc-700 bg-zinc-900/20"
                    : "border-zinc-800 hover:border-zinc-500 bg-black"
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                {sourceImage ? (
                  <div className="relative w-full aspect-video overflow-hidden group-hover:opacity-70 transition-opacity">
                    <img
                      src={`data:${sourceMime};base64,${sourceImage}`}
                      className="w-full h-full object-cover rounded-sm"
                      alt="Source"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <RefreshCw
                        size={24}
                        className="text-white animate-spin-slow"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload
                      size={32}
                      className="text-zinc-700 mb-4 group-hover:text-white transition-colors"
                    />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                      Drop frame or click to upload
                    </span>
                  </>
                )}
              </div>

              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="STYLIZATION PARAMETERS: e.g. Add 35mm grain, heavy halation, and a warm cyan-orange grade..."
                  className="interactive w-full h-32 bg-zinc-950 border border-zinc-900 rounded-sm p-8 text-sm font-mono placeholder:text-zinc-800 focus:outline-none focus:border-white transition-all resize-none"
                  data-cursor="TYPE"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !sourceImage}
                className="interactive w-full py-6 bg-white text-black font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-zinc-200 transition-all flex items-center justify-center gap-4 disabled:opacity-30 disabled:cursor-not-allowed"
                data-cursor="PROCESS"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Sparkles size={14} /> GENERATE GRADE
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Output Window */}
          <div className="lg:col-span-7 w-full">
            <div className="min-h-[500px] lg:min-h-[700px] border border-zinc-900 bg-black/50 backdrop-blur-3xl relative overflow-hidden rounded-sm flex flex-col">
              <div className="p-1 px-4 bg-zinc-900 flex items-center justify-between shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  <div className="w-2 h-2 rounded-full bg-zinc-700" />
                </div>
                <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">
                  OUTPUT_MONITOR_v4.2
                </span>
              </div>

              <div className="flex-1 p-8 lg:p-16 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {resultImage ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      className="relative w-full group"
                    >
                      <img
                        src={resultImage}
                        className="w-full h-auto rounded-sm shadow-2xl grayscale transition-all duration-1000 hover:grayscale-0"
                        alt="Result"
                      />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <a
                          href={resultImage}
                          download="visuedit-grade.png"
                          className="p-3 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full hover:bg-white hover:text-black transition-all"
                        >
                          <Download size={18} />
                        </a>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center opacity-20 py-20"
                    >
                      <ImageIcon
                        size={60}
                        strokeWidth={1}
                        className="text-zinc-800 mb-8"
                      />
                      <p className="text-[10px] uppercase tracking-[0.8em] font-bold text-zinc-800">
                        {loading
                          ? "PROCESSING FRAME DATA..."
                          : "Awaiting input frame for stylization"}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageStudio;
