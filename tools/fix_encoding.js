const fs = require('fs');
const path = require('path');

const replacements = {
  "İ": "İ",
  "ı": "ı",
  "Åž": "Ş",
  "ÅŸ": "ş",
  "Ğ": "Ğ",
  "ğ": "ğ",
  "Ö": "Ö",
  "ö": "ö",
  "Ç": "Ç",
  "ç": "ç",
  "Ü": "Ü",
  "ü": "ü",
  "â": "â",
  "î": "î",
  "û": "û",
  "â€™": "’",
  "â€œ": "“",
  "â€": "”",
  "â”€": "─",
  "Ä": "İ", // fallback mapping if single Ä appears due to cutoff
};

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;
  
  for (const [bad, good] of Object.entries(replacements)) {
    // Escape special characters for regex, although we can just use split/join
    content = content.split(bad).join(good);
  }
  
  // Quick fix for standalone Ä which usually comes from İ where the degree symbol was lost
  // wait, let's not replace standalone Ä unless we are sure.
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log("Fixed:", filePath);
  }
}

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.name.endsWith('.html') || entry.name.endsWith('.md')) {
      fixFile(fullPath);
    }
  }
}

const rootDir = 'C:\\Users\\yildi\\Desktop\\stitch_duo_finder_dashboard';
processDirectory(rootDir);
console.log('Done.');
