describe('Example', () => {
    beforeAll(async () => {
      await device.launchApp();
    });
  
    beforeEach(async () => {
      await device.reloadReactNative();
      await element(by.text('I understand')).tap();
      await element(by.text('Begin Check')).tap();
    });

    // Check that if we tap "Cancel" after alert message, we will be taken to home page
    it('if pressing cancel on alert message, take back to homepage', async () => {
        await element(by.text('Cancel')).tap();
        await expect(element(by.text('Concussion Check'))).toBeVisible();
        await expect(element(by.text('Begin Check'))).toBeVisible();
        await expect(element(by.text('View Reports'))).toBeVisible();
    });

    // Check that red flag checklist displays
    it('red flag checklist should display all symptoms', async () => {
        await element(by.text('OK')).tap();
        await expect(element(by.text('Red Flag Checklist'))).toBeVisible();
        await expect(element(by.text('Neck pain or tenderness'))).toBeVisible();
        await expect(element(by.text('Double vision'))).toBeVisible();
        await expect(element(by.text('Weakness or tingling/burning in the arms or legs'))).toBeVisible();
        await expect(element(by.text('Severe or increasing headache'))).toBeVisible();
        await expect(element(by.text('Seizures or convulsions'))).toBeVisible();
        await expect(element(by.text('Loss of consciousness'))).toBeVisible();
        await expect(element(by.text('Deteriorating conscious state'))).toBeVisible();
        await expect(element(by.text('Vomiting'))).toBeVisible();
        await expect(element(by.text('Increasing restlessness'))).toBeVisible();
        await expect(element(by.text('Agitation or combativeness'))).toBeVisible();
        await expect(element(by.text('Submit'))).toBeVisible();
    });
  });