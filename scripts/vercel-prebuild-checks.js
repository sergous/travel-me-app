const { execSync } = require("child_process");

// Compute Vercel environment variables once
const prLink = process.env.VERCEL_GIT_PULL_REQUEST_ID
	? `[PR Link](https://github.com/${process.env.VERCEL_GIT_REPO_OWNER}/${process.env.VERCEL_GIT_REPO_SLUG}/pull/${process.env.VERCEL_GIT_PULL_REQUEST_ID})`
	: "PR not available";
const commitLink = process.env.VERCEL_GIT_COMMIT_REF
	? `[Commit Ref](https://github.com/${process.env.VERCEL_GIT_REPO_OWNER}/${process.env.VERCEL_GIT_REPO_SLUG}/commit/${process.env.VERCEL_GIT_COMMIT_REF})`
	: "Commit ref not available";
const author = process.env.VERCEL_GIT_COMMIT_AUTHOR_LOGIN
	? process.env.VERCEL_GIT_COMMIT_AUTHOR_LOGIN
	: "Unknown";
const ref = process.env.VERCEL_GIT_COMMIT_REF || "N/A";
const message = process.env.VERCEL_GIT_COMMIT_MESSAGE
	? process.env.VERCEL_GIT_COMMIT_MESSAGE.split("\n")[0]
	: "N/A";
const envVar = process.env.VERCEL_TARGET_ENV || "N/A";

function runCheck(checkName, command) {
	try {
		console.log(`Running ${checkName}...`);
		execSync(command);
	} catch (error) {
		const output = error.stdout ? error.stdout.toString() : "No output";
		const errOutput = error.stderr
			? error.stderr.toString()
			: "No error output";
		const failureMessage = `❌ Vercel pre-build check *${checkName}* failed. Env: *${envVar}* Commit by *${author}*. Ref: *${ref}*. Message: *${message}*. PR: ${prLink}. Commit: ${commitLink}. \n*Stderr:* _${errOutput}_ *Stdout:* _${output}_`;
		execSync(
			`node scripts/notify-telegram.js "${failureMessage.replace(/"/g, '\\"')}"`,
			{
				stdio: "inherit",
			},
		);
		process.exit(1);
	}
}

// Run each check
runCheck("lint check", "bun run lint");
runCheck("typecheck", "bun run typecheck");
runCheck("jest tests", "bun run test:jest -- --silent --ci --noStackTrace");

// TODO: Re-enable playwright tests when they pass
// try {
//   runCheck('tests', 'bun run test')
// } catch (error) {
//   console.log('Playwright tests failed. Attempting to install browsers...')
//   try {
//     execSync('bun run test:install', { stdio: 'inherit' })
//     console.log('Browser installation complete. Retrying tests...')
//     runCheck('tests', 'bun run test')
//   } catch (retryError) {
//     console.error('Tests still failing after browser installation:', retryError)
//     throw error // Re-throw the original error to maintain the same exit behavior
//   }
// }

// All checks passed, notify success
const successMessage = `✅ Vercel pre-build checks passed successfully. Env: *${envVar}* Commit by *${author}*. Ref: *${ref}*. Message: *${message}*. PR: ${prLink}. Commit: ${commitLink}`;
execSync(
	`node scripts/notify-telegram.js "${successMessage.replace(/"/g, '\\"')}"`,
	{
		stdio: "inherit",
	},
);
process.exit(0);
