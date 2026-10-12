import {readFile, writeFile} from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const read = name => readFile(new URL(name, root), 'utf8');
let html = await read('index.html');
const css = await read('style.css');
const model = (await read('model.js')).replace(/export /g, '');
const viewport = (await read('viewport.js')).replace(/export /g, '');
const game = (await read('game.js')).replace(/^import[^\n]*\n/gm, '');
html = html.replace('<link rel="stylesheet" href="style.css">', `<style>${css}</style>`)
  .replace('<script type="module" src="game.js"></script>', `<script type="module">${model}\n${viewport}\n${game}</script>`);
await writeFile(new URL('A-Little-Warmth.html', root), html);
console.log('Built A-Little-Warmth.html (offline, no dependencies).');
