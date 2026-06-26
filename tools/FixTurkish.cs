using System;
using System.IO;
using System.Text;
using System.Collections.Generic;

class FixTurkish
{
    static void Main()
    {
        var replacements = new Dictionary<string, string>
        {
            {"\u00C4\u00B0", "\u0130"}, // Ä° -> İ
            {"\u00C4\u00B1", "\u0131"}, // Ä± -> ı
            {"\u00C4\u009E", "\u011E"}, // Äž -> Ğ
            {"\u00C4\u009F", "\u011F"}, // ÄŸ -> ğ
            {"\u00C3\u0096", "\u00D6"}, // Ã– -> Ö
            {"\u00C3\u00B6", "\u00F6"}, // Ã¶ -> ö
            {"\u00C3\u0087", "\u00C7"}, // Ã‡ -> Ç
            {"\u00C3\u00A7", "\u00E7"}, // Ã§ -> ç
            {"\u00C3\u009C", "\u00DC"}, // Ãœ -> Ü
            {"\u00C3\u00BC", "\u00FC"}, // Ã¼ -> ü
            {"\u00C3\u00A2", "\u00E2"}, // Ã¢ -> â
            {"\u00C3\u00AE", "\u00EE"}, // Ã® -> î
            {"\u00C3\u00BB", "\u00FB"}, // Ã» -> û
            {"\u00C5\u009E", "\u015E"}, // Åž -> Ş
            {"\u00C5\u009F", "\u015F"}  // ÅŸ -> ş
        };

        string targetFile = @"js\modules\i18n.js";
        if (!File.Exists(targetFile))
        {
            Console.WriteLine("File not found: " + targetFile);
            return;
        }

        try
        {
            string content = File.ReadAllText(targetFile, Encoding.UTF8);
            string original = content;

            foreach (var kvp in replacements)
            {
                content = content.Replace(kvp.Key, kvp.Value);
            }

            if (content != original)
            {
                File.WriteAllText(targetFile, content, Encoding.UTF8);
                Console.WriteLine("Successfully repaired Turkish encoding in " + targetFile);
            }
            else
            {
                Console.WriteLine("No changes needed for " + targetFile);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error: " + ex.Message);
        }
    }
}
