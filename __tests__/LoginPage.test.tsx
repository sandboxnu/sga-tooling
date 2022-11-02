export {}
const getUserInfo = require('../src/requests.tsx');
const unmockedFetch = global.fetch;

beforeAll(() => {
    global.fetch = () =>
      Promise.resolve({} as Response)
});
  
afterAll(() => {
    global.fetch = unmockedFetch
});

// We are testing that the response from the api we mocked works
describe('withFetch', () => {
    test('works', async () => {
      const response = await getUserInfo(69)
        expect(response).toEqual({} as Response)
    })
})