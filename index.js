"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
// Function to safely fetch the current git branch name
var getGitBranchName = function () {
    try {
        // Execute the git command to get the current branch name
        return (0, child_process_1.execSync)('git branch --show-current').toString().trim();
    }
    catch (error) {
        console.warn('Could not determine the git branch name:', error);
        // Return a fallback value in case of an error
        return 'unknown';
    }
};
// The main function to create the Vite plugin
var createPlugin = function () {
    return {
        name: 'vite-plugin-env-extensions',
        config: function (_, env) {
            var _a;
            if (env) {
                // Define the keys and values for injection
                var packageVersionKey = 'import.meta.env.PACKAGE_VERSION';
                var branchNameKey = 'import.meta.env.BRANCH_NAME';
                var buildDateKey = 'import.meta.env.BUILD_DATE';
                var packageVersionVal = JSON.stringify(process.env.npm_package_version);
                var branchNameVal = JSON.stringify(getGitBranchName());
                var buildDateVal = JSON.stringify(new Date().toISOString());
                // Return the configuration object for Vite
                return {
                    define: (_a = {},
                        _a[packageVersionKey] = packageVersionVal,
                        _a[branchNameKey] = branchNameVal,
                        _a[buildDateKey] = buildDateVal,
                        _a),
                };
            }
            else {
                console.warn('Environment configuration failed.');
            }
        }
    };
};
// Export the plugin function
exports.default = createPlugin;
