const ToBeTested = require('../src/index');

describe('ToBeTested Class', ()=> {
    it(`should return fakeData`, () => {
        const testObject = new ToBeTested();

        const outputData = testObject.getFakeData();

        expect(outputData).toBe(`fakeData`);
    });
});