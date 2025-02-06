import { NextRequest, NextResponse } from 'next/server';
import { CohereClientV2 } from 'cohere-ai';

const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY, // Ensure this is your actual API key from environment variables
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json(); // Parse incoming JSON request body

    // Call the Cohere API using the client instance
    const response = await cohere.chat({
      model: 'command-light', // Use the model you prefer (adjust if needed)
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    });

    // Log the response for debugging
    console.log('Cohere API response:', response);

    if (response) {
      return NextResponse.json({
        content: response.message?.content?.[0]?.text || 'No response from Cohere API',
      });
    } else {
      return NextResponse.json({ error: 'Error with Cohere response' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}
