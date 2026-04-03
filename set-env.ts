const fs = require('fs');
const path = require('path');

// Carica le variabili d'ambiente (da Vercel o locale)
const apiKey = process.env['VAL_API_KEY'];

const envConfigFile = `
export const environment = {
  production: true,
  apiKey: '${apiKey}',
  apiUrl: 'https://api.henrikdev.com/valorant'
};
`;

const targetPath = path.join(__dirname, './src/enviroments/enviroments.prod.ts');

fs.writeFile(targetPath, envConfigFile, (err: any) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`File environment generato correttamente in ${targetPath}`);
    }
});