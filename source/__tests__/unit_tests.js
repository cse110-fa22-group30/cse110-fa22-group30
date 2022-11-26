const functions = require('../scripts/exports');

// capitalizeFirstLetter(string)
test('string capitalization 1', () => {
    expect(functions.capitalizeFirstLetter('abcde')).toBe('Abcde');
});

test('string capitalization 2', () => {
    expect(functions.capitalizeFirstLetter('1fghij')).toBe('1fghij');
});

test('string capitalization 3', () => {
    expect(functions.capitalizeFirstLetter('23456')).toBe('23456');
})

test('string capitalization 4', () => {
    expect(functions.capitalizeFirstLetter('')).toBe('');
})

// capitalizeFirstLetterInEachWord(string)
test('string capitalization 1', () => {
    expect(functions.capitalizeFirstLetter('ab c de')).toBe('Ab C De');
});

test('string capitalization 2', () => {
    expect(functions.capitalizeFirstLetter('1fg hij')).toBe('1fg Hij');
});

test('string capitalization 3', () => {
    expect(functions.capitalizeFirstLetter('2 3 4 5 6')).toBe('2 3 4 5 6');
})

test('string capitalization 4', () => {
    expect(functions.capitalizeFirstLetter('app  ')).toBe('App  ');
})