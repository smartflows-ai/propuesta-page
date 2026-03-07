const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('index.backup.html', 'utf8');

// Extraer el CSS
const cssMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (cssMatch) {
    fs.writeFileSync('src/index.css', cssMatch[1].trim());
}

// Extraer el Body HTML
let bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/);
if (bodyMatch) {
    let body = bodyMatch[1];

    // Quitar la sección de scripts interactivos del final
    body = body.replace(/<script>([\s\S]*?)<\/script>/g, '');

    // Reemplazos de JSX generales
    body = body.replace(/class=/g, 'className=');
    body = body.replace(/<img(.*?)>/g, (match, contents) => {
        if (match.endsWith('/>')) return match;
        return `<img${contents} />`;
    });
    body = body.replace(/<br>/g, '<br />');

    // Convertir style="prop:val;prop:val;" a objetos de estilo en JSX
    body = body.replace(/style="([^"]*)"/g, (match, stylesStr) => {
        const rules = stylesStr.split(';').filter(Boolean);
        const rulesObj = {};
        for (const rule of rules) {
            const [key, val] = rule.split(':').map(s => s.trim());
            if (!key) continue;
            // Convertir kebab-case a camelCase (ej: text-align -> textAlign)
            const camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
            rulesObj[camelKey] = val;
        }
        return `style={${JSON.stringify(rulesObj)}}`;
    });

    const appComponent = `import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('in'), i * 80);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    
    return () => io.disconnect();
  }, []);

  return (
    <>
      ${body.trim()}
    </>
  );
}

export default App;
`;

    fs.writeFileSync('src/App.jsx', appComponent);
    console.log("Migración exitosa de App.jsx e index.css");
}
