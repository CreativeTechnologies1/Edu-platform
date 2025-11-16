
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, LearningPath, LearningStepType } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Using a placeholder. Please provide a valid API key for the app to function.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "YOUR_API_KEY_HERE" });

const responseSchema: any = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A catchy and encouraging title for the personalized learning path.",
    },
    description: {
        type: Type.STRING,
        description: "A short, motivating paragraph summarizing the learning journey."
    },
    steps: {
      type: Type.ARRAY,
      description: "A list of learning modules or steps.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
            description: "Title of the learning step.",
          },
          description: {
            type: Type.STRING,
            description: "A brief description of what the user will learn.",
          },
          type: {
            type: Type.STRING,
            enum: Object.values(LearningStepType),
            description: "The type of content for this step.",
          },
          duration: {
            type: Type.STRING,
            description: "Estimated time to complete this step, e.g., '45 minutes' or '3 hours'."
          },
          isPro: {
            type: Type.BOOLEAN,
            description: "Set to true for advanced topics, projects, or mentorship sessions that would be part of a premium subscription.",
          },
        },
        required: ["title", "description", "type", "duration", "isPro"],
      },
    },
  },
  required: ["title", "description", "steps"],
};


export const generateLearningPath = async (
  profile: UserProfile
): Promise<LearningPath> => {
  const prompt = `
    Analyze the following user profile and generate a personalized upskilling learning path based on current job market trends.
    The user wants to transition from their current role to their desired career goal.
    The path should be broken down into clear, actionable steps with various content types.
    Some steps, especially advanced ones like real-world projects or mentorship, should be marked as 'Pro' content.

    User Profile:
    - Current Role: ${profile.currentRole}
    - Career Goal: ${profile.careerGoal}
    - Existing Skills: ${profile.skills.join(', ')}

    Generate a response in JSON format that strictly follows the provided schema.
    The learning path should be realistic and highly relevant to achieving the user's career goal.
    Ensure the descriptions are concise and motivational.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    // Validate that the response is not empty
    if (!jsonText) {
        throw new Error("Received an empty response from the AI.");
    }
    const parsedResponse = JSON.parse(jsonText);

    // Basic validation to ensure the parsed object matches the expected structure
    if (!parsedResponse.title || !parsedResponse.steps || !Array.isArray(parsedResponse.steps)) {
      throw new Error("AI response is missing required fields 'title' or 'steps'.");
    }

    return parsedResponse as LearningPath;
  } catch (error) {
    console.error("Error generating learning path:", error);
    // Provide a more informative error message to the user
    if (error instanceof Error && error.message.includes('json')) {
        throw new Error("Failed to generate a valid learning path. The AI's response was not in the correct format. Please try again.");
    }
    throw new Error("An unexpected error occurred while generating your learning path. Please check your API key and try again later.");
  }
};
