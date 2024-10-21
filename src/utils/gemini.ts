import { GoogleGenerativeAI } from '@google/generative-ai';
import { systemPrompt } from './geminiConfig';

const genAI = new GoogleGenerativeAI(import.meta.env.PUBLIC_GEMINI_API_KEY);

/**
 * Generate a description of Halloween themed makeup that is spooky and scary
 *
 * @param prompt - The prompt to generate the description
 * @returns The generated description
 */
export const generateDescription = async (prompt: string): Promise<string> => {
    const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction: systemPrompt,
        generationConfig: {
            temperature: 0.7, // Higher temperature means the model will take more risks
            maxOutputTokens: 250,
        },
    });

    const result = await model.generateContent(prompt);
    return result.response.text();
};
