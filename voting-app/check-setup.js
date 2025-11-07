// Simple test file to verify React is working
console.log("React voting app loading...");

// Check if required files exist
const requiredFiles = [
  'src/main.jsx',
  'src/App.jsx', 
  'src/components/common/Header.jsx',
  'src/components/common/Footer.jsx',
  'src/pages/Home.jsx',
  'public/index.html'
];

requiredFiles.forEach(file => {
  if (!require('fs').existsSync(file)) {
    console.warn(`Missing file: ${file}`);
  } else {
    console.log(`✓ ${file} exists`);
  }
});
