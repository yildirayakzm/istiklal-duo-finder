using System;
using System.IO;
using System.Text;
using System.Collections.Generic;

class FixEncoding
{
    static void Main()
    {
        var replacements = new Dictionary<string, string>
        {
            {"ğŸ’»", "💻"},
            {"ğŸŽ®", "🎮"},
            {"ğŸ•¹ï¸ ", "🕹️"},
            {"ğŸ•¹", "🕹️"},
            {"ğŸ—¡ï¸ ", "🗡️"},
            {"ğŸ—¡", "🗡️"},
            {"ğŸ›¡ï¸ ", "🛡️"},
            {"ğŸ›¡", "🛡️"},
            {"ğŸ ‹ï¸ ", "🏋️"},
            {"ğŸ ‹", "🏋️"},
            {"ğŸŽ¯", "🎯"},
            {"ğŸ”’", "🔒"},
            {"ğŸ’Ž", "💎"},
            {"ğŸŒ¿", "🌿"},
            {"ğŸ’¾", "💾"},
            {"ğŸ’¬", "💬"},
            {"ğŸš€", "🚀"},
            {"ğŸ‡¹ğŸ‡·", "🇹🇷"},
            {"ğŸŽ ", "🎁"},
            {"ğŸŸ¢", "🟢"},
            {"ğŸ‘‘", "👑"},
            {"ğŸ¥ˆ", "🥈"},
            {"ğŸ¥‰", "🥉"},
            {"ğŸŒ ", "🌍"},
            {"ğŸŒ™", "🌙"},
            {"ğŸ”¥", "🔥"},
            {"ğŸ †", "🏆"},
            {"ğŸ“©", "📩"},
            {"ğŸŽ‰", "🎉"},
            {"ğŸ”§", "🔧"},
            {"ğŸ‘¤", "👤"},
            {"ğŸ“¨", "📨"},
            {"ğŸ“‹", "📋"},
            {"â„¹ï¸ ", "ℹ️"},
            {"â„¹", "ℹ️"},
            {"âš ï¸ ", "⚠️"},
            {"âš ", "⚠️"},
            {"â€”", "—"},
            {"âœ…", "✅"},
            {"âœ¨", "✨"},
            {"Ä°", "İ"},
            {"Ä±", "ı"},
            {"Äž", "Ğ"},
            {"ÄŸ", "ğ"},
            {"Ã–", "Ö"},
            {"Ã¶", "ö"},
            {"Ã‡", "Ç"},
            {"Ã§", "ç"},
            {"Ãœ", "Ü"},
            {"Ã¼", "ü"},
            {"Ã¢", "â"},
            {"Ã®", "î"},
            {"Ã»", "û"},
            {"DİÄžER", "DİĞER"},
            {"ETKİNLİÄžİ", "ETKİNLİĞİ"},
            {"EÅžLEÅžME", "EŞLEŞME"}
        };

        int count = 0;
        string[] htmlFiles = Directory.GetFiles(".", "*.html", SearchOption.AllDirectories);
        string[] jsFiles = Directory.GetFiles(".", "*.js", SearchOption.AllDirectories);
        
        List<string> allFiles = new List<string>();
        allFiles.AddRange(htmlFiles);
        allFiles.AddRange(jsFiles);

        foreach (string file in allFiles)
        {
            try
            {
                string content = File.ReadAllText(file, Encoding.UTF8);
                string origContent = content;

                foreach (var kvp in replacements)
                {
                    content = content.Replace(kvp.Key, kvp.Value);
                }

                if (content != origContent)
                {
                    File.WriteAllText(file, content, Encoding.UTF8);
                    Console.WriteLine("Fixed " + file);
                    count++;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error fixing " + file + ": " + ex.Message);
            }
        }

        Console.WriteLine("Total files fixed: " + count);
    }
}
