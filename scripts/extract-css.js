const fs = require('fs');
const path = require('path');

// Read the globals.css file
const globalsPath = path.join(__dirname, '../app/globals.css');
const cssContent = fs.readFileSync(globalsPath, 'utf8');

// Define the sections to extract
const sections = {
  'variables': {
    start: ':root {',
    end: '}',
    file: 'styles/utils/variables.css'
  },
  'base': {
    start: '/* Base Styles',
    end: '/* HEADER',
    file: 'styles/utils/base.css'
  },
  'header': {
    start: '/* HEADER',
    end: '/* FOOTER',
    file: 'styles/components/header.css'
  },
  'footer': {
    start: '/* FOOTER',
    end: '/* HOME PAGE',
    file: 'styles/components/footer.css'
  },
  'home': {
    start: '/* HOME PAGE',
    end: '/* PRICING PAGE',
    file: 'styles/pages/home.css'
  },
  'pricing': {
    start: '/* PRICING PAGE',
    end: '/* LEGAL PAGE',
    file: 'styles/pages/pricing.css'
  },
  'legal': {
    start: '/* Legal Page Styles',
    end: '/* MOBILE MENU',
    file: 'styles/pages/legal.css'
  },
  'mobile-menu': {
    start: '/* MOBILE MENU',
    end: '/* FLOATING BACKGROUND',
    file: 'styles/components/mobile-menu.css'
  },
  'floating-background': {
    start: '/* FLOATING BACKGROUND',
    end: '/* INTERACTIVE DEMO',
    file: 'styles/components/floating-background.css'
  },
  'interactive-demo': {
    start: '/* INTERACTIVE DEMO',
    end: '/* GENERATOR CARD',
    file: 'styles/components/interactive-demo.css'
  },
  'generator-card': {
    start: '/* GENERATOR CARD',
    end: '/* FAQ',
    file: 'styles/components/generator-card.css'
  },
  'faq': {
    start: '/* FAQ',
    end: '/* CTA',
    file: 'styles/components/faq.css'
  },
  'cta': {
    start: '/* CTA',
    end: '/* UTILITIES',
    file: 'styles/components/cta.css'
  },
  'utilities': {
    start: '/* UTILITIES',
    end: '/* ANIMATIONS',
    file: 'styles/utils/utilities.css'
  },
  'animations': {
    start: '/* ANIMATIONS',
    end: '/* RESPONSIVE',
    file: 'styles/utils/animations.css'
  },
  'responsive': {
    start: '/* RESPONSIVE',
    end: '/* END OF FILE',
    file: 'styles/utils/responsive.css'
  }
};

// Function to extract section
function extractSection(content, startMarker, endMarker) {
  const startIndex = content.indexOf(startMarker);
  if (startIndex === -1) return '';
  
  const endIndex = content.indexOf(endMarker, startIndex);
  if (endIndex === -1) return content.substring(startIndex);
  
  return content.substring(startIndex, endIndex);
}

// Extract each section
Object.entries(sections).forEach(([name, config]) => {
  const sectionContent = extractSection(cssContent, config.start, config.end);
  
  if (sectionContent.trim()) {
    // Ensure directory exists
    const dir = path.dirname(config.file);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Write the section to its file
    fs.writeFileSync(config.file, sectionContent.trim());
    console.log(`✅ Extracted ${name} to ${config.file}`);
  } else {
    console.log(`⚠️  No content found for ${name}`);
  }
});

console.log('\n🎉 CSS extraction complete!');
