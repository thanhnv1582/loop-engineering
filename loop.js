import { execFileSync } from 'node:child_process';

const MAX_ATTEMPTS = 5;

const GOAL = `Fix the bug in calculateTotal().

Requirements:
- Make all tests pass.
- Do NOT modify test files.
- Only modify the implementation necessary to fix the bug.`;

function buildPrompt(attempt, previousFailureOutput) {
  return `${GOAL}

Iteration: ${attempt}/${MAX_ATTEMPTS}

${previousFailureOutput
    ? `The previous attempt failed verification.

Here is the exact test output:

${previousFailureOutput}`
    : 'This is the first attempt. Inspect the current implementation.'}

Inspect src/order.js and make the necessary implementation change.

Rules:
- Do NOT modify anything in the test/ directory.
- Do NOT read any file inside the test/ directory. You only know the
  requirements from this prompt and from the failure output above (if any).
- Do NOT run tests yourself.
- Only modify the implementation.
- Stop after making the code change.`;
}

function runClaude(prompt) {
  execFileSync(
    'claude',
    ['-p', prompt, '--allowedTools', 'Read,Edit'],
    {
      stdio: 'inherit',
    }
  );
}

function showDiff() {
  const diff = execFileSync('git', ['diff', '--', 'src/order.js'], {
    encoding: 'utf-8',
  });

  console.log(diff ? diff : '(no changes)');
}

function runTests() {
  try {
    const output = execFileSync('npm', ['test'], {
      encoding: 'utf-8',
      stdio: 'pipe',
    });

    return {
      passed: true,
      output,
    };
  } catch (error) {
    const output = `${error.stdout ?? ''}${error.stderr ?? ''}`;

    return {
      passed: false,
      output,
    };
  }
}

function main() {
  let failureOutput = '';

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    console.log(`\n==============================`);
    console.log(` LOOP ITERATION ${attempt}/${MAX_ATTEMPTS}`);
    console.log(`==============================`);

    console.log('\n[1] Claude: inspect and modify code...');
    runClaude(buildPrompt(attempt, failureOutput));

    console.log('\n[2] Diff: what Claude changed...');
    showDiff();

    console.log('\n[3] Verifier: running npm test...');

    const result = runTests();

    if (result.passed) {
      console.log('\n✅ SUCCESS');
      console.log('All tests passed.');
      return;
    }

    console.log('\n❌ FAILED');
    console.log(result.output);

    failureOutput = result.output;
  }

  console.log(`\n🛑 STOPPED`);
  console.log(`Maximum attempts (${MAX_ATTEMPTS}) reached.`);
}

main();