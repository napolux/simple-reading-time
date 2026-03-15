# Contributing to @napolux/simple-reading-time

Thank you for your interest in contributing!

## Getting started

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/napolux/simple-reading-time.git
   cd simple-reading-time
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Build the project**

   ```bash
   npm run build
   ```

4. **Make your changes** on a new branch:

   ```bash
   git checkout -b feat/my-feature
   ```

5. **Commit your changes** following the [Conventional Commits](https://www.conventionalcommits.org/) specification.
   All commits are validated by **commitlint** via a Git hook — commits that don't follow the convention will be rejected.

   Examples of valid commit messages:

   ```
   feat: add support for reading speed profiles
   fix: correct word count for empty strings
   docs: update README with new API options
   ```

6. **Push your branch and open a Pull Request** against `main`.

## Code style

- Write TypeScript.
- Keep changes focused and minimal.
- Add JSDoc comments for any new public exports.
- Code is automatically formatted by **Prettier** via **lint-staged** on every commit — no manual formatting needed.
