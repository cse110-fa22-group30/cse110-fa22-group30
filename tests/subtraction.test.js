const subtraction = require('./subtraction');

test('subtracts 4 - 2 to equal 2', () => {
   expect(subtraction(4, 2)).toBe(2);
});

test('subtracts 5 - 7 to equal -2', () => {
   expect(subtraction(5, 7)).toBe(-2);
})