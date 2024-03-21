# Vite Plugin Environment Extensions

This Vite plugin automatically injects environment variables for the package version, current git branch name, build date, and the last commit's short hash into your Vite project. This can be particularly useful for versioning, build tracking, and displaying relevant build information within your application.

## Features

- Injects `PACKAGE_VERSION` from `package.json`.
- Injects `BRANCH_NAME` using the current git branch.
- Injects `BUILD_DATE` with the current date and time.
- Injects `LAST_COMMIT_HASH` with the short hash of the latest commit.

## Installation

First, install the plugin via npm or yarn:

```bash
npm install --save-dev vite-plugin-env-extensions
# or
yarn add --dev vite-plugin-env-extensions
```

## Usage
Add the plugin to your vite.config.js or vite.config.ts file:

```javascript
import { defineConfig } from 'vite';
import envExtensionsPlugin from 'vite-plugin-env-extensions';

export default defineConfig({
  plugins: [envExtensionsPlugin()],
});

```

## Accessing Environment Variables
Within your application, you can access the injected environment variables as follows:
```javascript
console.log(import.meta.env.PACKAGE_VERSION); // Outputs the package version
console.log(import.meta.env.BRANCH_NAME); // Outputs the current git branch name
console.log(import.meta.env.BUILD_DATE); // Outputs the build date
console.log(import.meta.env.LAST_COMMIT_HASH); // Outputs the last commit's short hash

```

## Requirements
- Your project must be a Git repository as the plugin utilizes git commands to retrieve branch and commit information.
- Git must be installed in the environment where the Vite build process is run.

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License.