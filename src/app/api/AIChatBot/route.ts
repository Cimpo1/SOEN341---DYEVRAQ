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

    const response = await cohere.generate({
      model: "command",
      prompt: question,
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