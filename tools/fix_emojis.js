const fs = require('fs');
const path = require('path');

const replacements = {
    '💻': '💻',
    '🎮': '🎮',
    '🕹️': '🕹️',
    '🕹️': '🕹️',
    '🗡️': '🗡️',
    '🗡️': '🗡️',
    '🛡️': '🛡️',
    '🛡️': '🛡️',
    '🏋️': '🏋️',
    '🏋️': '🏋️',
    '🎯': '🎯',
    '🔒': '🔒',
    '💎': '💎',
    '🌿': '🌿',
    '💾': '💾',
    '💬': '💬',
    '🚀': '🚀',
    '🇹🇷': '🇹🇷',
    '🎁': '🎁',
    '🟢': '🟢',
    '👑': '👑',
    '🥈': '🥈',
    '🥉': '🥉',
    '🌍': '🌍',
    '🌙': '🌙',
    '🔥': '🔥',
    '🏆': '🏆',
    '📩': '📩',
    '🎉': '🎉',
    '🔧': '🔧',
    '👤': '👤',
    '📨': '📨',
    '📋': '📋',
    'ℹ️': 'ℹ️',
    'ℹ️': 'ℹ️',
    '⚠️': '⚠️',
    '⚠️': '⚠️',
    '—': '—',
    '✅': '✅',
    '✨': '✨',
    'İ': 'İ',
    'ı': 'ı',
    'Ğ': 'Ğ',
    'ğ': 'ğ',
    'Ö': 'Ö',
    'ö': 'ö',
    'Ç': 'Ç',
    'ç': 'ç',
    'Ü': 'Ü',
    'ü': 'ü',
    'â': 'â',
    'î': 'î',
    'û': 'û',
    'DİĞER': 'DİĞER',
    'ETKİNLİĞİ': 'ETKİNLİĞİ',
    'EŞLEŞME': 'EŞLEŞME'
};

let count = 0;

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            results.push(file);
        }
    });
    return results;
}

const allFiles = walk('.');

allFiles.forEach(file => {
    if (file.endsWith('.html') || file.endsWith('.js')) {
        let content = fs.readFileSync(file, 'utf8');
        let origContent = content;

        for (const [key, value] of Object.entries(replacements)) {
            // Replace all occurrences using split-join
            content = content.split(key).join(value);
        }

        if (content !== origContent) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Fixed ${file}`);
            count++;
        }
    }
});

console.log(`Total files fixed: ${count}`);
