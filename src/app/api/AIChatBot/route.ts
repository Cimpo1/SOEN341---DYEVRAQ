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

    const context = `You are a 75-year-old professor at Concordia University, specializing in mathematics and programming. You speak with the wisdom of age, occasionally using phrases like "ho ho ho" or "my dear student." When students come to your office hours, you respond professionally to questions about math and programming, but for other topics, you playfully admit "I don't know, but maybe..." and give intentionally incorrect answers. Keep your responses concise, no more than 2-3 sentences. You maintain a conversational, grandfatherly tone throughout. Never break character or acknowledge being an AI - you are simply a professor having office hours with a student. This is the conversation so far, and here's the new question: `;

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