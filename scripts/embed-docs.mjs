import fs from 'node:fs';
import path from 'node:path';

// This script chunks the generated llms.txt and uploads the embeddings to Cloudflare Vectorize.
// It requires CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN environment variables.

const LLMS_TXT_PATH = './dist/llms.txt';
const VECTORIZE_INDEX_NAME = 'flight-manual-docs';
const EMBEDDING_MODEL = '@cf/baai/bge-base-en-v1.5';

async function run() {
  console.log('🤖 Starting AI Vector Ingestion...');

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !apiToken) {
    console.log('⚠️ Skipping vector ingestion: CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN not found in environment.');
    console.log('ℹ️ To enable the AI Chatbot, create a Vectorize index and provide your Cloudflare credentials.');
    return;
  }

  if (!fs.existsSync(LLMS_TXT_PATH)) {
    console.log(`⚠️ Could not find ${LLMS_TXT_PATH}. Please run 'npm run build' first.`);
    return;
  }

  const content = fs.readFileSync(LLMS_TXT_PATH, 'utf8');
  
  // Very simple chunking strategy: split by markdown headers
  const chunks = content.split(/(?=^## )/m).filter(c => c.trim().length > 0);
  console.log(`📦 Chunked documentation into ${chunks.length} segments.`);

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    
    try {
      // 1. Generate Embedding via REST API
      const aiResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${EMBEDDING_MODEL}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: [chunk] })
      });

      const aiData = await aiResponse.json();
      if (!aiData.success) {
        console.error('❌ Failed to embed chunk:', aiData.errors);
        continue;
      }

      const vector = aiData.result.data[0];

      // 2. Insert into Vectorize via REST API
      const vectorizeResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/vectorize/indexes/${VECTORIZE_INDEX_NAME}/insert`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/x-ndjson'
        },
        body: JSON.stringify({
          id: `chunk-${i}`,
          values: vector,
          metadata: { text: chunk.substring(0, 500) } // Store snippet for context
        })
      });

      const vecData = await vectorizeResponse.json();
      if (vecData.success) {
        console.log(`✅ Uploaded chunk ${i + 1}/${chunks.length}`);
      } else {
        console.error(`❌ Failed to upload chunk ${i + 1}:`, vecData.errors);
      }
    } catch (error) {
      console.error(`❌ Error processing chunk ${i + 1}:`, error.message);
    }
  }

  console.log('✨ Vector Ingestion complete!');
}

run();
