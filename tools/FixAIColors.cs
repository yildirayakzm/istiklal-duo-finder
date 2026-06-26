using System;
using System.IO;
using System.Text;

class Program
{
    static void Main()
    {
        string file = @"C:\Users\yildi\Desktop\stitch_duo_finder_dashboard\js\core\nexus-ai.js";
        string content = File.ReadAllText(file, Encoding.UTF8);

        content = content.Replace("#00f2ff", "#8B5CF6");
        content = content.Replace("#00dbe7", "#EC4899");
        content = content.Replace("rgba(0, 242, 255,", "rgba(139, 92, 246,");
        content = content.Replace("rgba(0,242,255,", "rgba(139,92,246,");
        content = content.Replace("rgba(0,219,231,", "rgba(236,72,153,");
        content = content.Replace("#00363a", "#ffffff");

        File.WriteAllText(file, content, new UTF8Encoding(false));
        Console.WriteLine("Done.");
    }
}
