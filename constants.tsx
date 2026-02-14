import { Project } from "./types";

export interface ProjectExtended extends Project {
  client: string;
  role: string;
  specs: string[];
  longDescription: string;
}

export const PROJECTS: ProjectExtended[] = [
  {
    id: "talking-head-edits",
    title: "Talking Head Edits",
    category: "Branded & Educational",
    thumbnail:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&q=80&w=1200",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description:
      "High-retention talking head edits with dynamic jump cuts, kinetic captions, and narrative-driven pacing.",
    longDescription:
      "Produced professional talking head content for coaches, founders, and digital educators. Focused on retention optimization through pacing, pattern interrupts, motion captions, and subtle sound design layering. Delivered platform-optimized versions for YouTube, Instagram, and LinkedIn.",
    year: "2026",
    client: "Multiple Creators & Personal Brands",
    role: "Video Editor & Post-Production Lead",
    specs: [
      "Sony FX3 / A7SIII Footage",
      "Adobe Premiere Pro",
      "After Effects",
      "DaVinci Resolve",
    ],
  },
  {
    id: "motion-graphics-videos",
    title: "Motion Graphic Videos",
    category: "Commercial & Explainer",
    thumbnail:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=1200",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description:
      "High-impact motion graphics with clean typography, brand-aligned animations, and cinematic transitions.",
    longDescription:
      "Developed animated explainer and promotional motion graphics for SaaS platforms and digital brands. Integrated kinetic typography, UI animation, and brand-compliant design systems to create visually engaging, conversion-driven video assets.",
    year: "2026",
    client: "SaaS Brands & Digital Startups",
    role: "Motion Designer & Editor",
    specs: ["Adobe After Effects", "Illustrator", "Premiere Pro", "Cinema 4D"],
  },
  {
    id: "ugc-ad-videos",
    title: "UGC Ad Videos",
    category: "Paid Social Advertising",
    thumbnail:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description:
      "Performance-driven UGC ad edits optimized for scroll-stopping hooks and high CTR.",
    longDescription:
      "Edited user-generated style ads tailored for Meta and TikTok campaigns. Focused on fast hooks within the first 3 seconds, dynamic subtitles, native-style pacing, and platform-specific formatting (9:16, 1:1). Built variations for A/B testing to maximize ROAS and engagement.",
    year: "2026",
    client: "E-commerce & DTC Brands",
    role: "Performance Video Editor",
    specs: [
      "iPhone / Creator Footage",
      "Adobe Premiere Pro",
      "After Effects",
      "CapCut Pro",
    ],
  },
  {
    id: "podcast-clip-edits",
    title: "Podcast Clip Edits",
    category: "Social Media Content",
    thumbnail:
      "https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&q=80&w=1200",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description:
      "Short-form podcast repurposing with captions, framing optimization, and viral-ready pacing.",
    longDescription:
      "Transformed long-form podcast episodes into high-performing vertical clips for Instagram Reels, YouTube Shorts, and TikTok. Applied dynamic punch-ins, animated subtitles, waveform elements, and attention hooks to maximize shareability and watch time.",
    year: "2026",
    client: "Podcast Networks & Thought Leaders",
    role: "Short-Form Content Editor",
    specs: [
      "4K Multi-Cam Footage",
      "Premiere Pro",
      "After Effects",
      "Descript",
    ],
  },
  {
    id: "youtube-longform-edits",
    title: "YouTube Long Form Edits",
    category: "Long-Form Content",
    thumbnail:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description:
      "Story-structured long-form edits engineered for retention and audience growth.",
    longDescription:
      "Edited 10–30 minute YouTube videos with structured storytelling, B-roll layering, sound design enhancement, and audience retention strategies. Implemented pattern interrupts, graphics, and chapter structuring to support algorithm performance and subscriber growth.",
    year: "2026",
    client: "YouTube Creators & Online Educators",
    role: "Lead Editor & Story Architect",
    specs: [
      "Sony / Canon 4K Footage",
      "Premiere Pro",
      "After Effects",
      "DaVinci Resolve",
    ],
  },
  {
    id: "color-grading-projects",
    title: "Color Grading Projects",
    category: "Post-Production & Finishing",
    thumbnail:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1200",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description:
      "Professional cinematic color grading with mood-driven LUT design and precise tonal balancing.",
    longDescription:
      "Performed primary and secondary color correction for commercial and creator-led projects. Established consistent brand aesthetics through custom LUTs, skin tone balancing, exposure correction, and cinematic contrast curves.",
    year: "2026",
    client: "Agencies & Independent Creators",
    role: "Colorist",
    specs: [
      "DaVinci Resolve Studio",
      "ARRI LogC / S-Log3",
      "Rec.709 & HDR Delivery",
    ],
  },
];

export const SERVICES = [
  {
    name: "Long-Form Editing",
    description:
      "Strategic story-driven editing designed for retention, clarity, and audience growth.",
    details: [
      "YouTube Long-Form Videos",
      "Narrative Structuring",
      "Multi-Cam Editing",
      "Retention Optimization",
    ],
  },
  {
    name: "Short-Form & Social Edits",
    description:
      "High-impact vertical content engineered for engagement and platform performance.",
    details: [
      "Podcast Clip Repurposing",
      "Reels / Shorts Editing",
      "Dynamic Subtitles",
      "Hook-Driven Pacing",
    ],
  },
  {
    name: "Talking Head Editing",
    description:
      "Clean, professional presenter-led edits with rhythm, clarity, and authority.",
    details: [
      "Jump Cuts & Pattern Interrupts",
      "Kinetic Captions",
      "B-Roll Integration",
      "Platform Formatting",
    ],
  },
  {
    name: "UGC Ad Editing",
    description:
      "Performance-focused ad creatives optimized for paid social campaigns.",
    details: [
      "Scroll-Stopping Hooks",
      "Conversion-Driven Cuts",
      "A/B Test Variations",
      "Meta & TikTok Formats",
    ],
  },
  {
    name: "Motion Graphics & VFX",
    description:
      "Brand-aligned motion design and visual enhancements that elevate production value.",
    details: [
      "Explainer Animations",
      "Title & Lower Third Design",
      "Compositing",
      "UI / Kinetic Typography",
    ],
  },
  {
    name: "Color Grading",
    description:
      "Precision color correction and cinematic look development for consistent brand aesthetics.",
    details: [
      "Primary & Secondary Correction",
      "Custom LUT Creation",
      "Film Emulation",
      "HDR & Rec.709 Delivery",
    ],
  },
  {
    name: "Sound Design",
    description:
      "Polished audio finishing that enhances immersion and perceived production quality.",
    details: [
      "Dialogue Cleanup",
      "Sound Effects Layering",
      "Music Balancing",
      "Mixing & Mastering",
    ],
  },
];

export const REVIEWS = [
  {
    quote:
      "Clean edits and sharp pacing. The video felt tighter and more professional instantly.",
    author: "RAHUL MEHTA",
    title: "AGENCY",
  },
  {
    quote:
      "Understood the brief fast and delivered exactly what was needed. No back and forth.",
    author: "ANKIT SHARMA",
    title: "CREATOR",
  },
  {
    quote:
      "Strong sense of flow and timing. Made raw footage look polished and usable.",
    author: "NITIN VERMA",
    title: "AGENCY",
  },
  {
    quote:
      "Reliable editor with good judgment. Knows what to keep and what to cut.",
    author: "SANDEEP IYER",
    title: "AGENCY",
  },
];
