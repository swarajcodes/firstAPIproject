import {GoogleGenAI} from "@google/genai";
import {InferenceClient} from "@huggingface/inference";
import dotenv from "dotenv";
dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey){
    console.error("OpenAI API key is not set. Please set the OPENAI_API_KEY environment variable.");
    process.exit(1);
}

const openai = new InferenceClient(openaiApiKey);

export default openai;