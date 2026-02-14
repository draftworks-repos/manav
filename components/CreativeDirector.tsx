import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  generateVisualTreatment,
  VisualTreatmentResponse,
} from "../services/geminiService";
import {
  Cpu,
  Terminal,
  Zap,
  Palette,
  Layers,
  Command,
  Upload,
  Download,
  RefreshCw,
  Camera,
  Activity,
  Scan,
  ChevronRight,
} from "lucide-react";

const CreativeDirector: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [sourceMime, setSourceMime] = useState<string>("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [treatment, setTreatment] = useState<VisualTreatmentResponse | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(",")[1];
        setSourceImage(base64String);
        setSourceMime(file.type);
        setTreatment(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceImage || !prompt.trim()) return;
    setLoading(true);
    try {
      const result = await generateVisualTreatment(
        sourceImage,
        sourceMime,
        prompt,
      );
      setTreatment(result);
    } catch (error) {
      console.error(error);
      alert("LAB_PROTOCOL_ERROR: Connection timed out or processing failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="ai-lab"
      className="min-h-screen bg-[#020202] text-white py-40 px-6 md:px-24 relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#111_0%,_transparent_100%)]" />
        <div className="noise" />
      </div>

      <div className="max-w-[1800px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* CONTROL INTERFACE */}
          <div className="lg:col-span-5 flex flex-col space-y-12 lg:sticky lg:top-40">
            <div className="flex items-center gap-6">
              <div className=" w-8 h-8 md:w-12 md:h-12 bg-white flex items-center justify-center rounded-none shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <Scan size={20} className="text-black" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-600 block mb-[-5px] md:mb-1">
                  AI Research Lab
                </span>
                <span className="text-[8px] font-mono text-zinc-800 uppercase tracking-widest">
                  v2.5.0-FLASH-VISUAL
                </span>
              </div>
            </div>

            <div>
              <h1 className="text-6xl md:text-8xl font-syncopate font-bold tracking-tighter uppercase leading-[0.85] mb-8">
                Thumbnail <br />
                <span className="text-zinc-800">Generate</span>
              </h1>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-sm uppercase tracking-widest font-bold">
                Upload a reference image and let the AI generate a thumbnail
                with it.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* IMAGE UPLOAD */}
              <div
                className={`relative group border border-zinc-900 bg-zinc-950/50 transition-all duration-500 flex flex-col items-center justify-center p-12 cursor-pointer ${
                  sourceImage
                    ? "border-zinc-700 bg-zinc-900/10"
                    : "border-dashed hover:border-white"
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
                  <div className="relative w-full aspect-video overflow-hidden">
                    <img
                      src={`data:${sourceMime};base64,${sourceImage}`}
                      className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-80 transition-opacity"
                      alt="Source Reference"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <div className="bg-white text-black p-4 flex items-center gap-3">
                        <RefreshCw size={16} className="animate-spin-slow" />
                        <span className="text-[8px] font-bold uppercase tracking-widest">
                          REPLACE_SOURCE
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center">
                    <Camera
                      size={40}
                      strokeWidth={1}
                      className="text-zinc-800 mb-6 group-hover:text-white transition-colors"
                    />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">
                      Load Reference Frame
                    </span>
                    <span className="text-[8px] text-zinc-800 mt-2 font-mono">
                      PNG / JPG / WEBP
                    </span>
                  </div>
                )}
              </div>

              {/* PROMPT INPUT */}
              <div className="relative">
                <div className="absolute top-4 left-4 text-zinc-800">
                  <Terminal size={14} />
                </div>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="DIRECTIVE_INPUT: e.g. Transform this into a moody cyberpunk noir with heavy anamorphic flare and deep emerald shadows..."
                  className="interactive w-full h-40 bg-zinc-950/30 border border-zinc-900 rounded-none p-8 pl-12 text-xs font-mono placeholder:text-zinc-800 focus:outline-none focus:border-white transition-all resize-none leading-relaxed"
                  data-cursor="DIRECT"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !sourceImage}
                className="interactive w-full py-8 bg-white text-black font-bold uppercase tracking-[0.6em] text-[10px] hover:bg-zinc-200 transition-all flex items-center justify-center gap-6 disabled:opacity-20 disabled:cursor-not-allowed"
                data-cursor="SYNTHESIZE"
              >
                {loading ? (
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                      className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                    />
                    <span>RENDERING_VISUALS...</span>
                  </div>
                ) : (
                  <>
                    <Cpu size={18} />
                    <span>SYNTHESIZE TREATMENT</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-12 border-t border-zinc-900 flex flex-wrap gap-8 text-[8px] font-mono text-zinc-700 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Activity
                  size={10}
                  className="text-emerald-500 animate-pulse"
                />{" "}
                SYSTEM_ONLINE
              </div>
              <div>GP_CORE_ACTIVE</div>
              <div>LATENCY: 1.2S</div>
            </div>
          </div>

          {/* OUTPUT MONITOR */}
          <div className="lg:col-span-7 w-full h-full">
            <div className="min-h-[700px] h-full border border-zinc-900 bg-black/40 backdrop-blur-3xl relative overflow-hidden flex flex-col">
              {/* MONITOR HEADER */}
              <div className="p-4 px-8 bg-zinc-950/80 border-b border-zinc-900 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-6">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-red-500/50 rounded-full" />
                    <div className="w-2 h-2 bg-zinc-800 rounded-full" />
                    <div className="w-2 h-2 bg-zinc-800 rounded-full" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    OUTPUT::MONITOR_01
                  </span>
                </div>
                <div className="hidden md:flex gap-8 text-[8px] font-mono text-zinc-700">
                  <span>RES: 2.5K_UPSCALED</span>
                  <span>BIT: 16-BIT_RAW</span>
                </div>
              </div>

              <div className="flex-1 p-8 lg:p-20 flex flex-col gap-12 overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                  {treatment ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-16"
                    >
                      {/* GENERATED IMAGE */}
                      <div className="relative group shadow-2xl">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-800 to-zinc-900 opacity-20 group-hover:opacity-40 transition-opacity blur" />
                        <div className="relative overflow-hidden aspect-video bg-zinc-950">
                          <img
                            src={treatment.image}
                            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                            alt="AI Treatment Result"
                          />
                          <div className="absolute top-6 right-6 flex gap-3">
                            <a
                              href={treatment.image}
                              download="visuedit-treatment.png"
                              className="w-12 h-12 bg-black/80 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                            >
                              <Download size={18} />
                            </a>
                          </div>
                          {/* Corner Decorations */}
                          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/20" />
                          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/20" />
                        </div>
                      </div>

                      {/* TECHNICAL METADATA */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-zinc-900">
                        <div className="md:col-span-2">
                          <h3 className="text-4xl font-syncopate font-bold uppercase tracking-tighter text-white mb-2">
                            {treatment.analysis.title}
                          </h3>
                          <div className="h-[1px] w-24 bg-zinc-800 mt-4 mb-10" />
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">
                            <Zap size={14} className="text-zinc-400" />{" "}
                            Cinematography
                          </div>
                          <p className="text-sm font-light text-zinc-400 leading-relaxed border-l border-zinc-900 pl-6">
                            {treatment.analysis.cinematography}
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">
                            <Palette size={14} className="text-zinc-400" />{" "}
                            Color Philosophy
                          </div>
                          <p className="text-sm font-light text-zinc-400 leading-relaxed border-l border-zinc-900 pl-6">
                            {treatment.analysis.colorGrading}
                          </p>
                        </div>

                        <div className="space-y-4 md:col-span-2">
                          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">
                            <Layers size={14} className="text-zinc-400" />{" "}
                            Editorial Logic
                          </div>
                          <p className="text-sm font-light text-zinc-400 leading-relaxed border-l border-zinc-900 pl-6">
                            {treatment.analysis.postProduction}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end pt-8">
                        <button className="flex items-center gap-3 text-[8px] font-bold uppercase tracking-[0.5em] text-zinc-700 hover:text-white transition-colors">
                          RE-INITIALIZE SEQUENCE <ChevronRight size={12} />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center py-40 text-center">
                      <div className="relative mb-12">
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{ repeat: Infinity, duration: 3 }}
                          className="w-32 h-32 bg-white/5 rounded-full absolute -inset-10 blur-3xl"
                        />
                        <Terminal
                          size={80}
                          strokeWidth={1}
                          className="text-zinc-900 relative z-10"
                        />
                      </div>
                      <p className="text-[10px] uppercase tracking-[1em] font-bold text-zinc-800 max-w-xs leading-loose">
                        {loading
                          ? "CALIBRATING_OPTICAL_SENSORS..."
                          : "AWAITING_REFERENCE_INPUT_FOR_SIMULATION"}
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* FOOTER BAR */}
              <div className="p-4 bg-zinc-950/80 border-t border-zinc-900 flex justify-between items-center text-[7px] font-mono text-zinc-800 px-8 uppercase">
                <div className="flex gap-10">
                  <span>BUFF_SIZE: 1024MB</span>
                  <span>KERN_PROC: 0x884</span>
                </div>
                <span>STABILITY_NOMINAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativeDirector;
