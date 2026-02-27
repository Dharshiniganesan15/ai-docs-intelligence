import axios from 'axios';
import { env } from '../config/env.js';
import { withRetry } from './retry.js';

export async function generateWithGemini({ system, user }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${env.geminiModel}:generateContent?key=${env.geminiApiKey}`;

  return withRetry(async () => {
    const resp = await axios.post(
      url,
      {
        contents: [
          {
            role: 'user',
            parts: [{ text: `${system}\n\n${user}` }]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topP: 0.9,
          maxOutputTokens: 2048
        }
      },
      { timeout: 60000 }
    );

    const text = resp?.data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || '';
    return { text };
  });
}
