# XTracker

**XTracker** is a web-based application for tracking and managing user expenses. It aims to provide financial insights and tools to help users better manage their finances. Built using **Next.js** and designed to be scalable and easy to maintain, XTracker follows industry-standard practices.

## Table of Contents

1. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Setup](#setup)
2. [Project Structure](#project-structure)
3. [Features](#features)
4. [Contributing](#-contributing)
   - [Contribution Guidelines](#contribution-guidelines)
   - [Commit Cheat Sheet](#commit-cheat-sheet)
5. [Tech Stack](#tech-stack)

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js 18.19+](https://nodejs.org/)
- [NPM](https://www.npmjs.com/) (or [Yarn](https://yarnpkg.com/) / [PNPM](https://pnpm.io/))
- [Supabase Account](https://supabase.com/)
- [Git](https://git-scm.com/)

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/xtracker.git
   ```

2. **Navigate into the project directory:**

   ```bash
   cd xtracker
   ```

3. **Install project dependencies:**

   ```bash
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env.local` file at the root of your project and add the following:

   ```bash
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   ```

5. **Run the development server:**

   ```bash
   npm run dev
   ```

6. **Open your browser to view the result:**
   - [http://localhost:3000](http://localhost:3000)

## Project Structure

The project follows a **feature-first** folder structure:

```bash
xtracker/
│
├── .husky/              # Husky configuration for pre-commit hooks
├── app/                # App directory for routing and pages
│   ├── api/            # API routes
│   ├── components/      # Reusable components
│   ├── layout.tsx       # Layout component
│   ├── page.tsx         # Main entry point for the app
│   ├── styles/          # Global styles (including Tailwind)
│   ├── middleware.ts    # Middleware for authentication
│   ├── hooks/           # Custom React hooks
│   └── utils/           # Utility functions
├── .eslintignore         # ESLint ignore rules configuration
├── .eslintrc.json        # ESLint configuration
├── .prettierignore       # Prettier ignore rules configuration
├── .prettierrc.json      # Prettier configuration
├── commitlint.config.mjs # Commitlint configuration
├── next-env.d.ts        # TypeScript environment definitions
├── next.config.mjs       # Next.js configuration
├── package-lock.json       # Lockfile for npm dependencies
├── package.json            # Project metadata and npm scripts
├── postcss.config.mjs     # Tailwind Postcss configuration
├── README.md            # Project documentation
├── tailwind.config.ts    # Tailwind configuration
└── tsconfig.json       # TypeScript  configuration
```

## Features

- **User Authentication**: Powered by NextAuth.js with Supabase as the database backend.
- **Expense Categorization**: Track expenses by categories like food, travel, etc.
- **Financial Insights**: Visualize spending trends using charts.
- **Budget Alerts**: Set budgets and receive notifications when close to limits.
- **Export Reports**: Generate reports of your spending.
- **Smart Budgeting**: AI-driven insights to help with budgeting decisions.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Please follow the steps below to contribute:

### Contribution Guidelines

1. **Clone the repository:**

   ```bash
   git clone https://github.com/TRIPLE-ADE/xtracker.git
   ```

2. **Create a new branch from `main`:**

   ```bash
   git checkout -b Feat/{feature-name} origin/main
   ```

3. **Ensure your branch is up to date:**

   ```bash
   git pull origin main
   ```

4. **Make your changes and run tests:**

   ```bash
   npm run test
   ```

5. **Commit your changes with a descriptive message:**

   ```bash
   git commit -m "feat: {describe your feature here}"
   ```

6. **Push your changes:**

   ```bash
   git push -u origin Feat/{feature-name}
   ```

7. **Create a pull request and describe your changes in detail.**

### _Commit Cheat Sheet_

| Type     | Description                                                       |
| -------- | ----------------------------------------------------------------- |
| feat     | A new feature you're adding                                       |
| fix      | A bug fix                                                         |
| docs     | Documentation only changes                                        |
| style    | Changes that do not affect code logic (e.g., formatting, linting) |
| refactor | Code change that neither fixes a bug nor adds a feature           |
| perf     | Code change that improves performance                             |
| test     | Adding or updating tests                                          |
| build    | Changes that affect the build system or external dependencies     |
| ci       | Changes to CI configuration files and scripts                     |
| chore    | Other changes that don't modify source or test files              |
| revert   | Reverts a previous commit                                         |

#### Sample Commit Message

- `feat: Add new expense categorization feature` := Adding a new feature to categorize expenses.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Backend**: [Supabase](https://supabase.com/)
- **Linting**: [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- **Git Hooks**: [Husky](https://typicode.github.io/husky/#/)
- **Commit Guidelines**: [Commitlint](https://commitlint.js.org/)

## Additional Setup

- **Husky**: Pre-commit hooks to ensure code quality.

  ```bash
  npx husky install
  ```

- **Prettier + ESLint**: Ensure consistent code formatting and quality.
  ```bash
  npm run lint
  ```
