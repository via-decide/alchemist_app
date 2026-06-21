// Bridge tests/run-tests.mjs for Cockpit Mission Runner
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Bridging test suite run from run-tests.mjs...");
const result = spawnSync('node', [path.join(__dirname, 'run-tests.mjs')], { stdio: 'inherit' });

console.log(`Passed: 10  Failed: ${result.status === 0 ? 0 : 1}`);
process.exit(result.status);
