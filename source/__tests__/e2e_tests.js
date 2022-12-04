/* global page */
describe('Basic user flow for Website', () => {
  // First, visit the team website
  beforeAll(async () => {
    await page.goto('https://cse110-fa22-group30.github.io/cse110-fa22-group30/')
  })

  // Next, check to make sure that no <exercise-card> elements are present
  it('Initial Home Page - Check for 0 logged exercises', async () => {
    console.log('Checking for empty log...')
    // TODO: 1
    // Query select all of the <exercise-card> elements and return the length of that array
    const numCards = await page.$$eval('exercise-card', (el) => el.length)
    expect(numCards).toBe(2)
    const cards = await page.$$('exercise-card')
    for (const card of cards) {
      const shadRoot = await card.getProperty('shadowRoot')
      const deleteButton = await shadRoot.$('.delete-button')
      await deleteButton.evaluate(b => b.click())
    }
    const numCards2 = await page.$$eval('exercise-card', (el) => el.length)
    expect(numCards2).toBe(0)
  })

  // Check that "+" button creates an <exercise-card> in edit mode in the "Scheduled" section
  it('Checking that the "+" button adds an exercise in edit mode', async () => {
    console.log('Clicking the "+" button...')
    // TODO: 2
    const addBt = await page.$('#fixedAddButton')
    await addBt.evaluate(b => b.click())
    const numCards = await page.$$eval('exercise-card', (el) => el.length)
    expect(numCards).toBe(1)
    const card = await page.$('exercise-card')
    const shadRoot = await card.getProperty('shadowRoot')
    const scheduleCheck = await shadRoot.$('.schedule-edit')
    const style = await scheduleCheck.getProperty('style')
    const display = await style.getProperty('display')
    expect(await display.jsonValue() === 'inline-block').toBe(true)
  })

  // Check that after filling in <exercise-card>, the save button (check-mark) works.
  // Data is saved. Log is in the "Scheduled" section. Card dropdown is still open. No longer in edit mode.
  it('Checking the exercise card is saved properly', async () => {
    console.log('Checking number of items in cart on screen...')
    // TODO: 3* (data-dependent)
  })

  // Check that dropdown can be collapsed.
  it('Checking dropdown button to collapse the exercise card', () => {
    // TODO: 4
  })

  // Check that local storage works by page reload not deleting exercises.
  // Data should remain intact.
  it('Checking that local storage persists page reload', async () => {
    // TODO: 5* (data-dependent)
  })

  // Check that dropdown can be opened.
  it('Checking dropdown button to reveal exercise details', () => {
    // TODO: 6
  })

  // Check that the edit button (pencil) opens edit mode for the card.
  it('Checking edit button to open edit mode', () => {
    // TODO: 7
  })

  // Check that changing exercise with different stats also changes metrics descriptions. (running => push ups)
  // Changed metrics descriptions should be saved.
  it('Checking for updated metrics with certain exercises', async () => {
    // TODO: 8* (data-dependent)
  })

  // Reopen edit mode

  // Check that changes are NOT saved when changes are rejected.
  it('Checking for stats to stay the same when "X" is pressed in edit mode.', async () => {
    // TODO: 9* (data-dependent)
  })

  // Check that marking an exercise as complete moves it to the "Completed" section.
  // Data should remain intact.
  it('Checking complete button', async () => {
    console.log('Checking number of items in cart on screen after reload...')
    // TODO: 10* (data-dependent)
  })

  // Check that the delete button works (trash can in edit mode)
  it('Checking that delete button removes card', async () => {
    // TODO: 11
  })

  // Check that local storage remembers the deletion by reloading the page.
  it('Checking that card deletions persist page reload', async () => {
    // TODO: 12
  })
})
