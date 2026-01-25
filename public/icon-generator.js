/**
 * Icon Generator Script
 * Converts SVG icons to PNG format
 * Run with: node icon-generator.js
 */

// Note: This requires a Node.js environment with canvas support
// Alternative: Use the HTML generator (generate-icons.html) in a browser

const fs = require('fs');
const path = require('path');

// SVG content for 192x192 icon
const svg192 = `<svg width="192" height="192" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="192" height="192" rx="32" fill="#FAFAFA"/>
  <circle cx="96" cy="96" r="68" fill="#C7B8FF" stroke="#1A1A2E" stroke-width="6"/>
  <circle cx="96" cy="96" r="50" stroke="#4B2E83" stroke-width="4" fill="none" opacity="0.3"/>
  <circle cx="96" cy="96" r="34" stroke="#4B2E83" stroke-width="3" fill="none" opacity="0.5"/>
  <circle cx="96" cy="96" r="18" stroke="#4B2E83" stroke-width="2.5" fill="none" opacity="0.6"/>
  <line x1="96" y1="96" x2="144" y2="48" stroke="#4B2E83" stroke-width="5" stroke-linecap="round"/>
  <line x1="144" y1="48" x2="144" y2="20" stroke="#1A1A2E" stroke-width="5" stroke-linecap="round"/>
  <path d="M144 20 L144 48 L176 34 L144 20 Z" fill="#FF5A5F" stroke="#1A1A2E" stroke-width="5" stroke-linejoin="round"/>
  <circle cx="96" cy="96" r="6" fill="#4B2E83"/>
</svg>`;

// SVG content for 512x512 icon
const svg512 = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="80" fill="#FAFAFA"/>
  <circle cx="256" cy="256" r="180" fill="#C7B8FF" stroke="#1A1A2E" stroke-width="14"/>
  <circle cx="256" cy="256" r="134" stroke="#4B2E83" stroke-width="10" fill="none" opacity="0.3"/>
  <circle cx="256" cy="256" r="90" stroke="#4B2E83" stroke-width="8" fill="none" opacity="0.5"/>
  <circle cx="256" cy="256" r="48" stroke="#4B2E83" stroke-width="6" fill="none" opacity="0.6"/>
  <line x1="256" y1="256" x2="384" y2="128" stroke="#4B2E83" stroke-width="12" stroke-linecap="round"/>
  <line x1="384" y1="128" x2="384" y2="54" stroke="#1A1A2E" stroke-width="12" stroke-linecap="round"/>
  <path d="M384 54 L384 128 L470 91 L384 54 Z" fill="#FF5A5F" stroke="#1A1A2E" stroke-width="12" stroke-linejoin="round"/>
  <circle cx="256" cy="256" r="16" fill="#4B2E83"/>
</svg>`;

// Save SVG files
fs.writeFileSync(path.join(__dirname, 'public', 'icon-192.svg'), svg192);
fs.writeFileSync(path.join(__dirname, 'public', 'icon-512.svg'), svg512);

console.log('✅ SVG icons created!');
console.log('📝 Next steps:');
console.log('   1. Open generate-icons.html in a browser');
console.log('   2. Click download buttons to generate PNGs');
console.log('   3. Or use an online SVG to PNG converter');
console.log('   4. Place PNG files in public/ folder');

