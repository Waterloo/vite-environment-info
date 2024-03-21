// Import required modules from Vite and Node.js
import type { Plugin } from 'vite';
import { execSync } from 'child_process';

// Function to safely execute shell commands and return their output
const execShellCommand = (command: string): string => {
  try {
    return execSync(command).toString().trim();
  } catch (error) {
    console.warn(`Could not execute command "${command}":`, error);
    return 'unknown';
  }
};

// The main function to create the Vite plugin
const createPlugin = (): Plugin => {
  return {
    name: 'vite-plugin-env-extensions',
    config: (_, env) => {
      if (env) {
        // Define keys for environment variables to inject
        const packageVersionKey = 'import.meta.env.PACKAGE_VERSION';
        const branchNameKey = 'import.meta.env.BRANCH_NAME';
        const buildDateKey = 'import.meta.env.BUILD_DATE';
        const lastCommitHashKey = 'import.meta.env.LAST_COMMIT_HASH';

        // Fetch values for the environment variables
        const packageVersionVal = JSON.stringify(process.env.npm_package_version);
        const branchNameVal = JSON.stringify(execShellCommand('git branch --show-current'));
        const buildDateVal = JSON.stringify(new Date().toISOString());
        // Use --short option to get the short version of the commit hash
        const lastCommitHashVal = JSON.stringify(execShellCommand('git rev-parse --short HEAD'));

        // Return the configuration object for Vite
        return {
          define: {
            [packageVersionKey]: packageVersionVal,
            [branchNameKey]: branchNameVal,
            [buildDateKey]: buildDateVal,
            [lastCommitHashKey]: lastCommitHashVal,
          },
        };
      } else {
        console.warn('Environment configuration failed.');
      }
    },
    configResolved(config) {
    },
  };
};

export default createPlugin;
