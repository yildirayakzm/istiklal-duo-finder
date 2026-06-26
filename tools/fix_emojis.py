import os
import glob

replacements = {
    'ğŸ’»': '💻',
    'ğŸŽ®': '🎮',
    'ğŸ•¹ï¸ ': '🕹️',
    'ğŸ•¹': '🕹️',
    'ğŸ—¡ï¸ ': '🗡️',
    'ğŸ—¡': '🗡️',
    'ğŸ›¡ï¸ ': '🛡️',
    'ğŸ›¡': '🛡️',
    'ğŸ ‹ï¸ ': '🏋️',
    'ğŸ ‹': '🏋️',
    'ğŸŽ¯': '🎯',
    'ğŸ”’': '🔒',
    'ğŸ’Ž': '💎',
    'ğŸŒ¿': '🌿',
    'ğŸ’¾': '💾',
    'ğŸ’¬': '💬',
    'ğŸš€': '🚀',
    'ğŸ‡¹ğŸ‡·': '🇹🇷',
    'ğŸŽ ': '🎁',
    'ğŸŸ¢': '🟢',
    'ğŸ‘‘': '👑',
    'ğŸ¥ˆ': '🥈',
    'ğŸ¥‰': '🥉',
    'ğŸŒ ': '🌍',
    'ğŸŒ™': '🌙',
    'ğŸ”¥': '🔥',
    'ğŸ †': '🏆',
    'ğŸ“©': '📩',
    'ğŸŽ‰': '🎉',
    'ğŸ”§': '🔧',
    'ğŸ‘¤': '👤',
    'ğŸ“¨': '📨',
    'ğŸ“‹': '📋',
    'â„¹ï¸ ': 'ℹ️',
    'â„¹': 'ℹ️',
    'âš ï¸ ': '⚠️',
    'âš ': '⚠️',
    'â€”': '—',
    'âœ…': '✅',
    'âœ¨': '✨',
    'Ä°': 'İ',
    'Ä±': 'ı',
    'Äž': 'Ğ',
    'ÄŸ': 'ğ',
    'Ã–': 'Ö',
    'Ã¶': 'ö',
    'Ã‡': 'Ç',
    'Ã§': 'ç',
    'Ãœ': 'Ü',
    'Ã¼': 'ü',
    'Ã¢': 'â',
    'Ã®': 'î',
    'Ã»': 'û',
    'DİÄžER': 'DİĞER',
    'ETKİNLİÄžİ': 'ETKİNLİĞİ',
    'EÅžLEÅžME': 'EŞLEŞME'
}

count = 0
for root, dirs, files in os.walk('.'):
    for name in files:
        if name.endswith('.html') or name.endswith('.js'):
            filepath = os.path.join(root, name)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            orig_content = content
            for k, v in replacements.items():
                content = content.replace(k, v)
            
            if content != orig_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f'Fixed {filepath}')
                count += 1

print(f'Total files fixed: {count}')
