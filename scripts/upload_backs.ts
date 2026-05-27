import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Parse .env.local manually
const envPath = path.resolve('.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env: Record<string, string> = {};
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx).trim();
  const value = trimmed.slice(eqIdx + 1).trim();
  env[key] = value;
}

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = env['SUPABASE_SERVICE_ROLE_KEY'] || env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

const backs = [
  'standard.webp',
  'standard-flip.webp',
  'event.webp'
];

async function main() {
  for (const back of backs) {
    const url = `https://ezplay.org/cards/backs/${back}`;
    console.log(`Downloading ${url}...`);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`Failed to download ${back}: ${response.statusText}`);
        continue;
      }
      const buffer = await response.arrayBuffer();
      
      const filePath = `backs/${back}`;
      console.log(`Uploading to Supabase: ${filePath}...`);
      
      const { data, error } = await supabase.storage
        .from('cards')
        .upload(filePath, buffer, {
          contentType: 'image/webp',
          upsert: true
        });
        
      if (error) {
        console.error(`Upload failed for ${back}:`, error.message);
      } else {
        console.log(`Successfully uploaded ${back}!`);
      }
    } catch (err) {
      console.error(`Error processing ${back}:`, err);
    }
  }
}

main();
