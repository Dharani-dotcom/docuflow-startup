const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'sampleCode.js');
const codeText = fs.readFileSync(filePath, 'utf8');
const commentRegex = /\/\*\*([\s\(\S\)]*?)\*\//g;
let match;

console.log("🚀 DocuFlow Engine: Scanning code workspace...");

while ((match = commentRegex.exec(codeText)) !== null) {
    const blockContent = match[1];
    const titleMatch = blockContent.match(/@title\s+(.*)/);
    const descMatch = blockContent.match(/@description\s+(.*)/);
    const paramMatch = blockContent.match(/@param\s+(.*)/);

    const title = titleMatch ? titleMatch[1].trim() : "Untitled Endpoint";
    const description = descMatch ? descMatch[1].trim() : "No description provided.";
    const param = paramMatch ? paramMatch[1].trim() : "None";

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Documentation</title>
    <script src="https://tailwindcss.com"></script>
    <style>
        body { background-color: #030303; color: #ededed; font-family: system-ui, sans-serif; }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center p-6">
    <div class="max-w-2xl w-full border border-white/5 bg-[#0a0a0a] rounded-xl p-8 shadow-2xl relative overflow-hidden">
        <!-- Linear Glow Effect -->
        <div class="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]"></div>
        
        <div class="relative z-10">
            <span class="text-xs font-mono text-purple-400 uppercase tracking-widest">API Reference</span>
            <h1 class="text-3xl font-bold tracking-tight text-white mt-2 mb-4">${title}</h1>
            
            <h3 class="text-sm font-semibold text-white/60 uppercase tracking-wider mt-6">Description</h3>
            <p class="text-white/80 mt-1 leading-relaxed">${description}</p>
            
            <h3 class="text-sm font-semibold text-white/60 uppercase tracking-wider mt-6">Parameters</h3>
            <div class="mt-2 p-3 bg-black/40 border border-white/5 rounded-lg font-mono text-sm">
                <span class="text-purple-300">${param.split(' - ')[0]}</span> 
                <span class="text-white/40">— ${param.split(' - ')[1] || ''}</span>
            </div>
            
            <div class="mt-8 pt-4 border-t border-white/5 text-center text-xs text-white/30">
                Generated automatically by <span class="text-white/60 font-semibold">DocuFlow</span>
            </div>
        </div>
    </div>
</body>
</html>`;

    const outputDir = path.join(__dirname, 'public');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
    fs.writeFileSync(path.join(outputDir, 'index.html'), htmlContent);
    console.log("✅ Success: Generated premium dark UI in public/index.html!");
}
