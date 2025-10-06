const fs = require('fs');
const path = require('path');

// Read the globals.css file
const globalsPath = path.join(__dirname, '../app/globals.css');
const cssContent = fs.readFileSync(globalsPath, 'utf8');

// Extract mobile menu styles (lines 1423-1932)
const mobileMenuStart = cssContent.indexOf('/* Mobile Menu */');
const mobileMenuEnd = cssContent.indexOf('@media (min-width: 1131px) {', mobileMenuStart);
const mobileMenuContent = cssContent.substring(mobileMenuStart, mobileMenuEnd);

// Write mobile menu styles
fs.writeFileSync('styles/components/mobile-menu.css', mobileMenuContent.trim());
console.log('✅ Extracted mobile menu styles');

// Extract floating background styles
const floatingStart = cssContent.indexOf('/* FLOATING BACKGROUND');
const floatingEnd = cssContent.indexOf('/* INTERACTIVE DEMO', floatingStart);
const floatingContent = cssContent.substring(floatingStart, floatingEnd);

if (floatingContent.trim()) {
  fs.writeFileSync('styles/components/floating-background.css', floatingContent.trim());
  console.log('✅ Extracted floating background styles');
}

// Extract home page styles
const homeStart = cssContent.indexOf('/* HOME PAGE');
const homeEnd = cssContent.indexOf('/* PRICING PAGE', homeStart);
const homeContent = cssContent.substring(homeStart, homeEnd);

if (homeContent.trim()) {
  fs.writeFileSync('styles/pages/home.css', homeContent.trim());
  console.log('✅ Extracted home page styles');
}

// Extract pricing page styles
const pricingStart = cssContent.indexOf('/* PRICING PAGE');
const pricingEnd = cssContent.indexOf('/* LEGAL PAGE', pricingStart);
const pricingContent = cssContent.substring(pricingStart, pricingEnd);

if (pricingContent.trim()) {
  fs.writeFileSync('styles/pages/pricing.css', pricingContent.trim());
  console.log('✅ Extracted pricing page styles');
}

// Extract footer styles
const footerStart = cssContent.indexOf('/* FOOTER');
const footerEnd = cssContent.indexOf('/* HOME PAGE', footerStart);
const footerContent = cssContent.substring(footerStart, footerEnd);

if (footerContent.trim()) {
  fs.writeFileSync('styles/components/footer.css', footerContent.trim());
  console.log('✅ Extracted footer styles');
}

// Extract utilities
const utilitiesStart = cssContent.indexOf('/* UTILITIES');
const utilitiesEnd = cssContent.indexOf('/* ANIMATIONS', utilitiesStart);
const utilitiesContent = cssContent.substring(utilitiesStart, utilitiesEnd);

if (utilitiesContent.trim()) {
  fs.writeFileSync('styles/utils/utilities.css', utilitiesContent.trim());
  console.log('✅ Extracted utilities styles');
}

// Extract animations
const animationsStart = cssContent.indexOf('/* ANIMATIONS');
const animationsEnd = cssContent.indexOf('/* RESPONSIVE', animationsStart);
const animationsContent = cssContent.substring(animationsStart, animationsEnd);

if (animationsContent.trim()) {
  fs.writeFileSync('styles/utils/animations.css', animationsContent.trim());
  console.log('✅ Extracted animations styles');
}

// Extract responsive styles
const responsiveStart = cssContent.indexOf('/* RESPONSIVE');
const responsiveContent = cssContent.substring(responsiveStart);

if (responsiveContent.trim()) {
  fs.writeFileSync('styles/utils/responsive.css', responsiveContent.trim());
  console.log('✅ Extracted responsive styles');
}

console.log('\n🎉 Remaining CSS extraction complete!');
