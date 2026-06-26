using System;
using System.IO;
using System.Text;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        var replacements = new Dictionary<string, string>
        {
            {"Ä°", "İ"},
            {"Ä±", "ı"},
            {"Åž", "Ş"},
            {"ÅŸ", "ş"},
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
            {"â€™", "’"},
            {"â€œ", "“"},
            {"â€ ", "”"},
            {"â”€", "─"}
        };

        string dir = @"C:\Users\yildi\Desktop\stitch_duo_finder_dashboard";
        string[] files = Directory.GetFiles(dir, "*.*", SearchOption.AllDirectories);

        foreach (string file in files)
        {
            if (file.EndsWith(".html") || file.EndsWith(".md"))
            {
                string content = File.ReadAllText(file, Encoding.UTF8);
                string original = content;

                foreach (var kvp in replacements)
                {
                    content = content.Replace(kvp.Key, kvp.Value);
                }

                if (content != original)
                {
                    File.WriteAllText(file, content, new UTF8Encoding(false)); // UTF-8 without BOM
                    Console.WriteLine("Fixed: " + file);
                }
            }
        }
        Console.WriteLine("Done.");
    }
}
