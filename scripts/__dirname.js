import { fileURLToPath } from 'url';
import path from 'path';

// Definir __filename y __dirname en un módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ahora puedes usar __dirname como de costumbre
let rootDir = path.resolve(__dirname, '../');
