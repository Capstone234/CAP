describe('Example', () => {
    beforeAll(async () => {
      await device.launchApp();
    });
  
    beforeEach(async () => {
      await device.reloadReactNative();
      await element(by.text('I understand')).tap();
      await element(by.text('Begin Check')).tap();
    });

    // Check that alert message pops up
    it('alert message should be displayed when pressing Begin Check', async () => {
        await expect(element(by.text('We strongly recommend you have someone else do the concussion check for you'))).toBeVisible();
        await expect(element(by.text('Cancel'))).toBeVisible();
        await expect(element(by.text('OK'))).toBeVisible(); 
        await expect(element(by.text('Alert'))).toBeVisible(); 
    });

    // Check that even after navigating through app and going back to Start, the alert message still pops up
    it('alert message should be displayed when pressing Begin Check', async () => {
        await element(by.text('OK')).tap(); 
        await element(by.type('RCTRootContentView')).swipe('right', 'fast', 0.5, 0.01, 0.01);
        await element(by.text('VOMS Tests')).tap();
        await element(by.type('RCTRootContentView')).swipe('right', 'fast', 0.5, 0.01, 0.01);
        await element(by.text('Start')).tap();
        await element(by.text('I understand')).tap();
        await element(by.text('Begin Check')).tap();
        await expect(element(by.text('We strongly recommend you have someone else do the concussion check for you'))).toBeVisible();
        await expect(element(by.text('Cancel'))).toBeVisible();
        await expect(element(by.text('OK'))).toBeVisible(); 
        await expect(element(by.text('Alert'))).toBeVisible(); 
    });
  });