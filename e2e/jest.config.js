module.exports = {
    maxWorkers: 1,
    testTimeout: 150000,
    rootDir: '..',
    testMatch: ['<rootDir>/e2e/*.e2e.js'],
    verbose: true,
    reporters: ['detox/runners/jest/reporter'],
    globalSetup: 'detox/runners/jest/globalSetup',
    globalTeardown: 'detox/runners/jest/globalTeardown',
};
