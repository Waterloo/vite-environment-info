"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
// Function to safely execute shell commands and return their output
const execShellCommand = (command) => {
    try {
        return (0, child_process_1.execSync)(command).toString().trim();
    }
    catch (error) {
        console.warn(`Could not execute command "${command}":`, error);
        return 'unknown';
    }
};
// The main function to create the Vite plugin
const createPlugin = () => {
    return {
        name: 'vite-plugin-env-extensions',
        config: (_, env) => {
            if (env) {
                // Define keys for environment variables to inject
                const packageVersionKey = 'import.meta.env.PACKAGE_VERSION';
                const branchNameKey = 'import.meta.env.BRANCH_NAME';
                const buildDateKey = 'import.meta.env.BUILD_DATE';
                const lastCommitHashKey = 'import.meta.env.LAST_COMMIT_HASH';

                const packageVersionVal = JSON.stringify(process.env.npm_package_version);
                const branchNameVal = JSON.stringify(execShellCommand('git branch --show-current'));
                const buildDateVal = JSON.stringify(new Date().toISOString());

                const lastCommitHashVal = JSON.stringify(execShellCommand('git rev-parse --short HEAD'));

                return {
                    define: {
                        [packageVersionKey]: packageVersionVal,
                        [branchNameKey]: branchNameVal,
                        [buildDateKey]: buildDateVal,
                        [lastCommitHashKey]: lastCommitHashVal,
                    },
                };
            }
            else {
                console.warn('Environment configuration failed.');
            }
        },
        configResolved(config) {
        },
    };
};
exports.default = createPlugin;
