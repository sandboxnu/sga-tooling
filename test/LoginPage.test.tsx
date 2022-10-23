const mockLoginAPI = require('src/requests.tsx');
const unmockedFetch = global.fetch;

beforeAll(() => {
    global.fetch = () =>
      Promise.resolve({} as Response)
});
  
afterAll(() => {
    global.fetch = unmockedFetch
});


describe('withFetch', () => {
    test('works', async () => {
      const json = await mockLoginAPI(69)
      expect(Array.isArray(json)).toEqual(true)
    })
  })