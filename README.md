# Weather Wizard

![](/public/merlin.png)

Everything you need to get started with this weather app.

## Table of Contents

- [Overview](#overview)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Testing](#testing)
- [Preparing for Deployment](#preparing-for-deployment)
- [Installed Packages](#installed-packages)

## Overview

Built with type safety, scalability, and developer experience in mind.

- [pnpm](https://pnpm.io) - A strict and efficient alternative to npm with up to 3x faster performance
- [TypeScript](https://www.typescriptlang.org) - A typed superset of JavaScript designed with large scale applications in mind
- [ESLint](https://eslint.org) - Static code analysis to help find problems within a codebase
- [Prettier](https://prettier.io) - An opinionated code formatter
- [Vite](https://vitejs.dev) - Feature rich and highly optimized frontend tooling with TypeScript support out of the box
- [React](https://react.dev) - A modern front-end JavaScript library for building user interfaces based on components
- [Ant Design](https://ant.design/) - An enterprise-class UI design language and React UI library with a set of high-quality React components, one of best React UI library for enterprises.
- [Playwright](https://playwright.dev) - Enables reliable end-to-end testing for modern web apps

## Requirements

- [NodeJS 18+](https://nodejs.org/en)
- [pnpm](https://pnpm.io) (or equivalent)

## Getting Started

Getting started is a simple as cloning the repository

```
git clone git@github.com:vkasharma/weather-wizard.git
```

Changing into the new directory

```
cd weather-wizard
```

Installing dependencies

```
pnpm install
```

And running the setup script (installs playwright)

```
pnpm run test:setup
```

Congrats! You're ready to starting working on that new project!

If you'd rather run the commands above in one go, check out the command below:

```
git clone git@github.com:vkasharma/weather-wizard.git &&\
cd weather-wizard &&\
pnpm install &&\
pnpm run test:setup
```

## Testing

End-to-End (E2E) Testing is conducted by Playwright.

If you'd like to run all tests, execute the following command:

```
pnpm run test
```

If you wish to see the reports, run:

```
pnpm run test:report
```

## Preparing for Deployment

Deploying is as easy as running

```
pnpm run build
```

and pointing your web server to the generated `index.html` file found at `dist/index.html`

## Installed Packages

A simplified list can be found in the [Overview](#overview) section.

### Base

- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)
- [React](https://react.dev)

### Linting & Formatting

- [ESLint](https://eslint.org)
  - [typescript-eslint](https://typescript-eslint.io)
  - [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier#readme)
  - [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react#readme)
  - [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
  - [eslint-plugin-react-refresh](https://github.com/ArnaudBarre/eslint-plugin-react-refresh)
- [Prettier](https://prettier.io)

### UI

- [Ant Design](https://ant.design/)

### Testing

- [Playwright](https://playwright.dev)
