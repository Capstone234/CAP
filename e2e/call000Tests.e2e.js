describe('Example', () => {
    beforeAll(async () => {
      await device.launchApp();
    });
  
    beforeEach(async () => {
      await device.reloadReactNative();
      await element(by.text('I understand')).tap();
      await element(by.text('Begin Check')).tap();
      await element(by.text('OK')).tap();
      await element(by.type('RCTRootContentView')).tap({x: 50, y: 550});
      await element(by.text('Submit')).tap();
    });

    // Check that if any elements are ticked off, user gets taken to "call 000" page
    it('should be taken to 000 page if symptoms are ticked off', async () => {
        await expect(element(by.text('The injured individual is showing severe symptoms and should seek medical attention immediately.'))).toBeVisible();
        await expect(element(by.text('Call 000'))).toBeVisible();
        await expect(element(by.text('Return Home'))).toBeVisible(); 
    });

    // Check that if user presses "return home", they get taken to the home page
    it('should be taken to 000 page if symptoms are ticked off', async () => {
        await element(by.text('Return Home')).tap();
        await expect(element(by.text('Concussion Check'))).toBeVisible();
        await expect(element(by.text('Begin Check'))).toBeVisible();
        await expect(element(by.text('View Reports'))).toBeVisible();
    });
  });