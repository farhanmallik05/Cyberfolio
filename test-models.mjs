/* global process, console */
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  try {
    console.log("Testing gemini-embedding-2...");
    const response = await ai.models.embedContent({
      model: 'gemini-embedding-2',
      contents: "Hello world"
    });
    console.log("Success with gemini-embedding-2!", response.embeddings[0].values.length);
  } catch (e) {
    console.error("Error with gemini-embedding-2:", e.message);
  }
}

run();
