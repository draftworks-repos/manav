
import { GoogleGenAI, Type } from "@google/genai";

export interface VisualTreatmentResponse {
  image: string; // base64
  analysis: {
    title: string;
    cinematography: string;
    colorGrading: string;
    postProduction: string;
  };
}

/**
 * Generates a high-end cinematic visual treatment with technical analysis.
 * Fix: Moved AI instantiation inside the function to ensure the most up-to-date API key is used.
 */
export const generateVisualTreatment = async (
  base64Image: string, 
  mimeType: string, 
  prompt: string
): Promise<VisualTreatmentResponse> => {
  // Always initialize GoogleGenAI inside the function to capture potential key updates
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // We use gemini-2.5-flash-image for image-to-image tasks
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Image,
            mimeType: mimeType,
          },
        },
        {
          text: `Act as a legendary film director and cinematographer. 
          Task: Using the provided reference image and this prompt: "${prompt}", generate a new cinematic frame that represents a high-end visual treatment.
          Additionally, provide a JSON technical analysis of this new frame with the following structure:
          {
            "title": "A cinematic name for this treatment",
            "cinematography": "Briefly describe lighting and lens choice",
            "colorGrading": "Describe the palette and contrast philosophy",
            "postProduction": "Describe specific editing/VFX techniques used"
          }
          IMPORTANT: Your response should contain BOTH the generated image part AND a text part containing only the JSON.`,
        },
      ],
    },
  });

  let imageBase64 = '';
  let analysisJson = '';

  // Properly check candidates and parts structure from GenerateContentResponse
  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        imageBase64 = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      } else if (part.text) {
        analysisJson = part.text;
      }
    }
  }

  if (!imageBase64) throw new Error("Visual engine failed to render frame.");

  try {
    // Clean up potential markdown formatting in JSON string returned by model
    const cleanedJson = analysisJson.replace(/```json/g, '').replace(/```/g, '').trim();
    return {
      image: imageBase64,
      analysis: JSON.parse(cleanedJson)
    };
  } catch (e) {
    return {
      image: imageBase64,
      analysis: {
        title: "Untitled Treatment",
        cinematography: "Analytical error during metadata generation.",
        colorGrading: "Visual data processed successfully.",
        postProduction: "Standard editorial protocol applied."
      }
    };
  }
};

/**
 * Applies a cinematic filter or grade to an image.
 * Fix: Added missing exported function required by components/ImageStudio.tsx.
 */
export const applyAiImageFilter = async (
  base64Image: string,
  mimeType: string,
  prompt: string
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Image,
            mimeType: mimeType,
          },
        },
        {
          text: `Apply the following cinematic visual treatment or color grade to this image: ${prompt}. Return only the modified image part.`,
        },
      ],
    },
  });

  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
  }

  throw new Error("AI visual engine failed to return a processed image.");
};
