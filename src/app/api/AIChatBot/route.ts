import { NextResponse } from 'next/server';
import { CohereClient } from 'cohere-ai';

// Initialize the Cohere client with your API key
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY || '',
});

export async function POST(request: Request) {
  try {
    const { question } = await request.json();

    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    const context = `You are an expert AI assistant specializing in providing clear, detailed, and step-by-step answers to user questions. Your goal is to help users understand complex topics and guide them through processes when needed.

    ### User question ###
    ${question}

    ---
    Based on the user's instruction, please think step by step
    Also, give a description of the answer and provide a list of steps if the user is asking how to do something.

    Return your answer in the following format if steps are needed:
    - Step 1: [First action]
    - Step 2: [Second action]
    - Step 3: [Third action]
    ...`;

    const response = await cohere.generate({
      model: "command",
      prompt: context + question,
      maxTokens: 300,
      temperature: 0.7,
      k: 0,
      stopSequences: [],
      returnLikelihoods: "NONE"
    });

    return NextResponse.json({
      response: response.generations[0].text.trim()
    });

  } catch (error) {
    console.error('Error calling Cohere API:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
} 