module.exports = {
    // Allows for a label to be printed along side a test while it is running.
    displayName: {
      name: 'THOUGHT_HOROSCOPE',
      color: 'blue',
    },
    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // Flag to indicate if Code Coverage to be collected and reported
    collectCoverage: true,
  
    // An array of glob patterns indicating a set of files for which coverage information should be collected
    collectCoverageFrom: ['src/**/*.{js,jsx,mjs}'],
  
    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // This will be used to configure minimum threshold enforcement for coverage results. 
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": -10
      }
    },
  
    // An array of file extensions your modules use
    moduleFileExtensions: ['js', 'json', 'jsx'],
  
    // The test environment that will be used for testing
    testEnvironment: 'jsdom',
  
    // The glob patterns Jest uses to detect test files
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  
    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  
    // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
    testURL: 'http://localhost',
  
    // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    
    // Indicates whether each individual test should be reported during the run
    verbose: false,
  };
  