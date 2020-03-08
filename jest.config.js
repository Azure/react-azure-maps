module.exports = {
  transform: {
    '.(ts|tsx)': 'ts-jest'
  },
  globals: {
    window: {}
  },
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(tsx?|ts?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js'
  },
  coveragePathIgnorePatterns: ['/node_modules/', '/test/', `/src/my-example-lib.ts`],
  // coverageThreshold: {
  //   global: {
  //     branches: 90,
  //     functions: 95,
  //     lines: 95,
  //     statements: 95
  //   }
  // },
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}']
}
