// perplexity-query.js
const { execSync } = require('child_process');
const fs = require('node:fs');

const prompt = process.argv[2];
const text = execSync(`python3 query-perplexity.py "${prompt.replace(/"/g, '\\"')}"`).toString();

fs.writeFileSync('result.md', text);
console.log(text);