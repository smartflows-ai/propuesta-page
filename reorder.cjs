const fs = require('fs');

const content = fs.readFileSync('src/App.jsx', 'utf8');

const extractSection = (marker) => {
    const escapedMarker = marker.replace(/\//g, '\\/');
    const regex = new RegExp(`\\{\\/\\* ─── ${escapedMarker} ─── \\*\\/\\}[\\s\\S]*?(?=\\{\\/\\* ───|\\<\\/\\>)`);
    const match = content.match(regex);
    if (!match) throw new Error(`Section ${marker} not found`);
    return match[0];
};

const header = extractSection('HEADER');
const hero = extractSection('HERO');
const entendemos = extractSection('ENTENDEMOS');
const problema = extractSection('SITUACIÓN ACTUAL / PROBLEMA');
const issues = extractSection('PROBLEMÁTICA TÉCNICA');
const solucion = extractSection('SOLUCIÓN');
const alcance = extractSection('ALCANCE');
const cronograma = extractSection('CRONOGRAMA');
const oportunidad = extractSection('OPORTUNIDAD');
const evolucion = extractSection('EVOLUCIÓN');
const intencion = extractSection('INTENCIÓN');
const cta = extractSection('CTA');
const footer = extractSection('FOOTER');

const topPartRegex = /([\s\S]*?)\{\/\* ─── HEADER ─── \*\/\}/;
const topPart = content.match(topPartRegex)[1];
const bottomPart = `</>\n  );\n}\n\nexport default App;\n`;

// Eliminar el scroll hint (Explorar)
const newHero = hero.replace(/<div className="scroll-hint">[\s\S]*?<\/div>\s*/, '');

// Aplicar el orden del Funnel "Visión Compartida"
const newContent = `${topPart}${header}${newHero}${entendemos}${oportunidad}${problema}${issues}${solucion}${alcance}${cronograma}${evolucion}${intencion}${cta}${footer}${bottomPart}`;

fs.writeFileSync('src/App.jsx', newContent);
console.log('Reordered according to Visión Compartida and removed Explorar successfully');
