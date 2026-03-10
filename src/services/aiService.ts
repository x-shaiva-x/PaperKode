import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface AnalysisRequest {
  classLevel: string;
  subject: string;
  years: string;
  mode: string;
  extraQuery?: string;
}

export async function analyzePaper(request: AnalysisRequest) {
  const { classLevel, subject, years, mode, extraQuery } = request;

  const systemInstructions = {
    "Topic Frequency": `You are an expert CBSE Paper Analyst. Analyze the topic frequency for Class ${classLevel} ${subject} based on the last ${years} years of papers. 
    Identify the most important chapters, recurring concepts, and weightage. 
    Format your response in clean Markdown with headers, bullet points, and a summary table if applicable.`,
    
    "Predict 2025": `You are a CBSE Exam Predictor. Based on trends from the last ${years} years for Class ${classLevel} ${subject}, predict the likely important questions and topics for the 2025 board exams. 
    Focus on high-probability areas and emerging patterns. 
    Format your response in clean Markdown.`,
    
    "Study Plan": `You are a Student Success Coach. Create a highly effective study plan for Class ${classLevel} ${subject} focusing on the most important areas from the last ${years} years. 
    Provide a day-by-day or week-by-week breakdown. 
    Format your response in clean Markdown.`,
    
    "Practice Questions": `You are a CBSE Question Bank Generator. Generate a set of high-quality practice questions for Class ${classLevel} ${subject} that mirror the difficulty and style of the last ${years} years. 
    Include a mix of MCQs, short answers, and long answers. 
    Format your response in clean Markdown.`
  };

  const prompt = `
    Mode: ${mode}
    Class: ${classLevel}
    Subject: ${subject}
    Years to consider: ${years}
    Additional Request: ${extraQuery || "None"}
    
    Please provide a detailed analysis based on the mode selected.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        systemInstruction: systemInstructions[mode as keyof typeof systemInstructions] || "You are a helpful CBSE academic assistant.",
      }
    });

    return response.text;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw new Error("Failed to generate analysis. Please try again.");
  }
}
