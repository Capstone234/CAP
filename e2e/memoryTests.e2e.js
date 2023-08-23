describe('Example', () => {
    beforeAll(async () => {
      await device.launchApp();
    });
  
    beforeEach(async () => {
      await device.reloadReactNative();
      await element(by.text('I understand')).tap();
      await element(by.text('Begin Check')).tap();
      await element(by.text('OK')).tap();
      await element(by.type('RCTRootContentView')).tap({x: 230, y: 740});
      await element(by.type('RCTRootContentView')).tap({x: 230, y: 600});
      await element(by.text('MAYBE/UNSURE')).tap();
      await element(by.text('Next')).tap();
      await element(by.text('Complete Preliminary Tests')).tap();
      await element(by.text('Start!')).tap();
    });
   
    // Check that memory test disclaimer page shows correct info
    it('memory test should display correct labels/text', async () => {
        await expect(element(by.text('Memory Test'))).toBeVisible();
        await expect(element(by.text('Start!'))).toBeVisible();
    });

    // Check that first memory test displays image and Next button
    it('first memory test should display image, text and button', async () => {
        await element(by.text('Start!')).tap();

        // Check that we can see an image
        await expect(element(by.type('RCTImageView').and(by.label('image')))).toBeVisible();
        await expect(element(by.text('Next'))).toBeVisible();
    });

    // Check that second memory test displays image and text
    it('second memory test should display image, text and button', async () => {
        await element(by.text('Start!')).tap();
        await element(by.text('Next')).tap();

        // Check that we can see an image
        await expect(element(by.type('RCTImageView').and(by.label('image')))).toBeVisible();
        await expect(element(by.text('Next'))).toBeVisible();
    });

    // Check that second memory test displays image and text
    it('third memory test should display image, text and button', async () => {
        await element(by.text('Start!')).tap();
        await element(by.text('Next')).tap();
        await element(by.text('Next')).tap();
        
        // Check that we can see an image
        await expect(element(by.type('RCTImageView').and(by.label('image')))).toBeVisible();
        await expect(element(by.text('Next'))).toBeVisible();
    });

    // Check that user can choose images they remembers
    it('user should be able to choose from checklist after memory tests', async () => {
        await element(by.text('Start!')).tap();
        await element(by.text('Next')).tap();
        await element(by.text('Next')).tap();
        await element(by.text('Next')).tap();
        await expect(element(by.text('Instructions'))).toBeVisible();
        await expect(element(by.text('Please pass the phone to your supervisor so they can input the results.'))).toBeVisible();
        await expect(element(by.text('Next'))).toBeVisible();
        await element(by.text('Next')).tap();
        await expect(element(by.text('What three images does the injured individual remember?'))).toBeVisible();
        await expect(element(by.text('pen'))).toBeVisible();
        await expect(element(by.text('bird'))).toBeVisible();
        await expect(element(by.text('cup'))).toBeVisible();
        await expect(element(by.text('flower'))).toBeVisible();
        await expect(element(by.text('clock'))).toBeVisible();
        await expect(element(by.text('toothbrush'))).toBeVisible();
        await expect(element(by.text('fork'))).toBeVisible();
        await expect(element(by.text('keys'))).toBeVisible();
        await expect(element(by.text('scissors'))).toBeVisible();
        await expect(element(by.text('Submit'))).toBeVisible();
        await element(by.text('Submit')).tap();
    });

    // Check that instructions for reaction test gets displayed after memory tests
    it('further instructions should be shown after memory tests completed', async () => {
        await element(by.text('Start!')).tap();
        await element(by.text('Next')).tap();
        await element(by.text('Next')).tap();
        await element(by.text('Next')).tap();
        await element(by.text('Next')).tap();
        await element(by.text('Submit')).tap();
        await expect(element(by.text('Reaction Test'))).toBeVisible();
        await expect(element(by.text('Next'))).toBeVisible();
    });
  });
  