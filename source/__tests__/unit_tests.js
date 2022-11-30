const functions = require('../scripts/exports.js')

// capitalizeFirstLetter(string)
test('string capitalization 1', () => {
	expect(functions.capitalizeFirstLetter('abcde')).toBe('Abcde')
})

test('string capitalization 2', () => {
	expect(functions.capitalizeFirstLetter('1fghij')).toBe('1fghij')
})

test('string capitalization 3', () => {
	expect(functions.capitalizeFirstLetter('23456')).toBe('23456')
})

test('string capitalization 4', () => {
	expect(functions.capitalizeFirstLetter('')).toBe('')
})

// capitalizeFirstLetterInEachWord(string)
test('string sentence capitalization 1', () => {
	expect(functions.capitalizeFirstLetterInEachWord('ab c de')).toBe('Ab C De')
})

test('string sentence capitalization 2', () => {
	expect(functions.capitalizeFirstLetterInEachWord('1fg hij')).toBe('1fg Hij')
})

test('string sentence capitalization 3', () => {
	expect(functions.capitalizeFirstLetterInEachWord('2 3 4 5 6')).toBe('2 3 4 5 6')
})

test('string sentence capitalization 4', () => {
	expect(functions.capitalizeFirstLetterInEachWord('app  le  ')).toBe('App  Le  ')
})
