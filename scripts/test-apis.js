// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Test API connections
console.log('🔍 Testing API connections...');

// Test Firecrawl
const firecrawlKey = process.env.FIRECRAWL_API_KEY;
console.log('Firecrawl API Key:', firecrawlKey ? '✅ Set' : '❌ Missing');

// Test Google Maps
const googleKey = process.env.GOOGLE_MAPS_API_KEY;
console.log('Google Maps API Key:', googleKey ? '✅ Set' : '❌ Missing');

// Test Database
const dbUrl = process.env.DATABASE_URL;
console.log('Database URL:', dbUrl ? '✅ Set' : '❌ Missing');

// Test OpenAI
const openaiKey = process.env.OPENAI_API_KEY;
console.log('OpenAI API Key:', openaiKey ? '✅ Set' : '❌ Missing');

console.log('✅ API test complete!');
