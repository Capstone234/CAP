describe('Example', () => {
    beforeAll(async () => {
      await device.launchApp();
    });

    beforeEach(async () => {
        await device.reloadReactNative();
        await element(by.text('I understand')).tap();
    });

    // Check that user can perform reaction tests
    it('User should be able to perform reaction tests', async () => {

        // Check that there are no preliminary test reports
        await element(by.type('RCTRootContentView')).swipe('right', 'fast', 0.5, 0.01, 0.01);
        await element(by.text('Preliminary Tests')).tap();
        await element(by.text('Start!')).tap();
        await element(by.text('Start!')).tap();
        await element(by.text('Next')).tap();
        await element(by.text('Next')).tap();
        await element(by.text('Next')).tap();
        await element(by.text('Next')).tap();
        await element(by.text('Submit')).tap();
        await element(by.text('Next')).tap();
        await element(by.type('RCTRootContentView')).tap({x: 200, y: 500});

        // Perform reaction tests
        await waitFor(element(by.text('Press!'))).toBeVisible().withTimeout(7000).then(async () => {
            await element(by.text('Press!')).tap();
        });
        await element(by.type('RCTRootContentView')).tap({x: 200, y: 500});

        await waitFor(element(by.text('Press!'))).toBeVisible().withTimeout(7000).then(async () => {
            await element(by.text('Press!')).tap();
        });
        await element(by.type('RCTRootContentView')).tap({x: 200, y: 500});

        await waitFor(element(by.text('Press!'))).toBeVisible().withTimeout(7000).then(async () => {
            await element(by.text('Press!')).tap();
        });
    });
});