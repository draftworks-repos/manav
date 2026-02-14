
export interface Project {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
  year: string;
}

export interface CreativeTreatment {
  title: string;
  visualStyle: string;
  pacing: string;
  colorPalette: string[];
  audioStrategy: string;
  keyTechniques: string[];
}

export interface ImageProcessResult {
  imageUrl: string;
  explanation: string;
}
