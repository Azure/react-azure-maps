# npm-package-seed

This repository serves as a boilerplate for creating our internal, shared, company packages. It was bootstrapped with `typescript-library-starter`. Please refer to the original repository for known bugs and guides.

In order to make the packages the most practical for developers, we write them in TypeScript, and thus provide typings for the 'consumer projects'.

# Configuration & Setup

## Change the library name

First, change your library name in all of the project files. The default name is `my-example-lib` - just search & replace those:

- In `package.json` change the `name` field. Remember to include `@acaisoft/` prefix to ensure the package will be published in our npm scope.
- In `package.json` change the name in `main`, `module`, `typings`, and `repository.url`.
- In `rollup.config.ts` change the value of the `libraryName` variable.
- In `jest.config.js` change the path under the `coveragePathIgnorePatterns` key.
- Rename `src/my-example-lib.ts` file accordingly.

## Frameworks

### React

If you want to include any React components in this library, make sure you follow these steps:

1. Install `react` and `react-dom` packages as **devDependencies**. It's important not to include them in the final bundle (`dependencies`) - your app will have its own!

```bash
yarn add --dev react react-dom @types/react @types/react-dom
```

Afterwards, add them to `peerDependencies` in your `package.json`:

```
  "peerDependencies": {
    "react": ">= 16.8.0",
    "react-dom": ">= 16.8.0"
  }
```

Don't be too specific about the version number, unless you use some kind of features that have been added in a particular version. Otherwise, fall back to the lowest possible version that will still work with your package.

2. Add both package names to the `rollup.config.ts` as external libraries:

```
  external: ['react', 'react-dom'],
```

3. Add support for JSX syntax in TypeScript. In `tsconfig.json` add:

```json
{
  "compilerOptions": {
    // ...
    "jsx": "react"
  }
}
```

4. Install `@testing-library/react` for the best and reliable unit/integration tests.

```bash
yarn add --dev @testing-library/react
```
