const subtraction = require('../src/subtraction');
test('subtracts 4 - 2 to equal 2', () => {
   expect(subtraction(4, 2)).toBe(2);
});