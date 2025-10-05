#!/usr/bin/env node

/**
 * Open Graph Image Generator for SlohGPT
 * Generates optimized OG images for social media sharing
 */

const fs = require('fs');
const path = require('path');

// OG Image Configuration
const ogConfig = {
  // Main homepage OG image
  homepage: {
    title: 'SlohGPT - AI Pre Slohy',
    subtitle: 'Napíš sloh za 5 minút pomocou AI',
    description: 'AI nástroj pre slovenské slohy',
    background: '#0B0E1A',
    textColor: '#ffffff',
    accentColor: '#6366f1',
    logo: '/white-outline.png',
    dimensions: { width: 1200, height: 630 }
  },
  
  // Pricing page OG image
  pricing: {
    title: 'Ceny SlohGPT',
    subtitle: 'AI Pre Slohy - Cenník',
    description: 'Kompletný sloh za 7,99€',
    background: '#0B0E1A',
    textColor: '#ffffff',
    accentColor: '#10b981',
    logo: '/white-outline.png',
    dimensions: { width: 1200, height: 630 }
  },
  
  // Generic AI slohy OG image
  generic: {
    title: 'AI Slohy',
    subtitle: 'AI Pre Slohy | AI Na Slohy',
    description: 'Slovenské slohy pomocou AI',
    background: '#0B0E1A',
    textColor: '#ffffff',
    accentColor: '#f59e0b',
    logo: '/white-outline.png',
    dimensions: { width: 1200, height: 630 }
  }
};

// Generate OG image HTML template
function generateOGImageHTML(config, filename) {
  return `
<!DOCTYPE html>
<html lang="sk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.title}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      width: ${config.dimensions.width}px;
      height: ${config.dimensions.height}px;
      background: linear-gradient(135deg, ${config.background} 0%, #0F172A 100%);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    
    .container {
      text-align: center;
      z-index: 2;
      position: relative;
    }
    
    .logo {
      width: 120px;
      height: 120px;
      margin: 0 auto 40px;
      background: url('${config.logo}') no-repeat center;
      background-size: contain;
    }
    
    .title {
      font-size: 64px;
      font-weight: 800;
      color: ${config.textColor};
      margin-bottom: 20px;
      line-height: 1.1;
    }
    
    .subtitle {
      font-size: 36px;
      font-weight: 600;
      color: ${config.accentColor};
      margin-bottom: 30px;
      line-height: 1.2;
    }
    
    .description {
      font-size: 24px;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.8);
      max-width: 800px;
      margin: 0 auto;
    }
    
    .background-pattern {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.1;
      background-image: 
        radial-gradient(circle at 20% 80%, ${config.accentColor} 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, ${config.accentColor} 0%, transparent 50%);
    }
    
    .floating-elements {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    
    .floating-element {
      position: absolute;
      width: 4px;
      height: 4px;
      background: ${config.accentColor};
      border-radius: 50%;
      animation: float 6s ease-in-out infinite;
    }
    
    .floating-element:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
    .floating-element:nth-child(2) { top: 60%; left: 80%; animation-delay: 2s; }
    .floating-element:nth-child(3) { top: 40%; left: 70%; animation-delay: 4s; }
    .floating-element:nth-child(4) { top: 80%; left: 20%; animation-delay: 1s; }
    .floating-element:nth-child(5) { top: 30%; left: 90%; animation-delay: 3s; }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) scale(1); opacity: 0.7; }
      50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
    }
  </style>
</head>
<body>
  <div class="background-pattern"></div>
  <div class="floating-elements">
    <div class="floating-element"></div>
    <div class="floating-element"></div>
    <div class="floating-element"></div>
    <div class="floating-element"></div>
    <div class="floating-element"></div>
  </div>
  
  <div class="container">
    <div class="logo"></div>
    <h1 class="title">${config.title}</h1>
    <h2 class="subtitle">${config.subtitle}</h2>
    <p class="description">${config.description}</p>
  </div>
</body>
</html>`;
}

// Generate all OG images
function generateOGImages() {
  const publicDir = path.join(__dirname, 'public');
  
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Generate homepage OG image
  const homepageHTML = generateOGImageHTML(ogConfig.homepage, 'og-image');
  fs.writeFileSync(path.join(publicDir, 'og-image.html'), homepageHTML);
  
  // Generate pricing OG image
  const pricingHTML = generateOGImageHTML(ogConfig.pricing, 'og-pricing');
  fs.writeFileSync(path.join(publicDir, 'og-pricing.html'), pricingHTML);
  
  // Generate generic OG image
  const genericHTML = generateOGImageHTML(ogConfig.generic, 'og-generic');
  fs.writeFileSync(path.join(publicDir, 'og-generic.html'), genericHTML);
  
  console.log('✅ OG Images generated successfully!');
  console.log('📁 Files created:');
  console.log('   - /public/og-image.html (Homepage)');
  console.log('   - /public/og-pricing.html (Pricing)');
  console.log('   - /public/og-generic.html (Generic)');
  console.log('');
  console.log('💡 Next steps:');
  console.log('   1. Convert HTML files to PNG using a service like Puppeteer');
  console.log('   2. Optimize images for web (compress, resize)');
  console.log('   3. Upload to your CDN or public folder');
  console.log('   4. Update meta tags to reference the PNG files');
}

// Run the generator
if (require.main === module) {
  generateOGImages();
}

module.exports = { generateOGImages, ogConfig };
