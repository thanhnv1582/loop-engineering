import { copyFileSync } from 'node:fs';
import path from 'node:path';

const SCENARIOS = {
  1: '1-one-shot',
  2: '2-two-shot',
  3: '3-impossible',
};

const choice = process.argv[2];

if (!choice || !SCENARIOS[choice]) {
  console.log('Usage: node use-scenario.js <1|2|3>');
  console.log('  1  one-shot     Claude fixes it on the first try');
  console.log('  2  two-shot     Claude fails once, then fixes it on retry');
  console.log('  3  impossible   spec is unsatisfiable, loop stops at MAX_ATTEMPTS');
  process.exit(1);
}

const dir = path.join('scenarios', SCENARIOS[choice]);

copyFileSync(path.join(dir, 'order.js'), path.join('src', 'order.js'));
copyFileSync(path.join(dir, 'order.test.js'), path.join('test', 'order.test.js'));

console.log(`Loaded scenario ${choice} (${SCENARIOS[choice]}) into src/order.js and test/order.test.js`);
