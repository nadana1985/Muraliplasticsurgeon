const fs = require('fs');
const path = require('path');

const targets = ['.next', 'node_modules/.cache'];

targets.forEach(target => {
  const targetPath = path.join(__dirname, target);
  if (fs.existsSync(targetPath)) {
    console.log(`Cleaning ${target}...`);
    try {
      fs.rmSync(targetPath, { recursive: true, force: true });
      console.log(`✓ Cleaned ${target}`);
    } catch (err) {
      console.error(`✗ Failed to clean ${target}:`, err.message);
    }
  } else {
    console.log(`- ${target} does not exist, skipping.`);
  }
});

console.log('Cache flushing complete!');
