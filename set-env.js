const fs = require('fs');
const path = require('path');

// Legge la variabile da Vercel
const apiKey = process.env['VAL_API_KEY'];

const envConfigFile = `
export const environment = {
  production: true,
  apiKey: '${apiKey}',
  apiUrl: 'https://api.henrikdev.com/valorant'
};
`;

// Percorso del file di produzione
const targetPath = path.join(__dirname, './src/environments/environment.prod.ts');

// Crea la cartella se non esiste (importante per Vercel)
const dir = path.join(__dirname, './src/environments');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(targetPath, envConfigFile);
console.log('File environment.prod.ts generato correttamente.');