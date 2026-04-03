const fs = require('fs');
const path = require('path');

const apiKey = process.env.VAL_API_KEY; // Cerca la variabile chiamata VAL_API_KEY

const envConfigFile = `export const environment = {
  production: true,
  apiKey: '${apiKey}',
  apiUrl: 'https://api.henrikdev.com/valorant'
};`;

const envDir = path.join(__dirname, 'src', 'environment');
const targetPath = path.join(envDir, 'environment.ts');
const prodPath = path.join(envDir, 'environment.prod.ts');
if (!fs.existsSync(envDir)) { fs.mkdirSync(envDir, { recursive: true }); }

fs.writeFileSync(targetPath, envConfigFile);
fs.writeFileSync(prodPath, envConfigFile);
console.log('✅ Environment pronto!');