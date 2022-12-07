/* global page */
describe('Basic user flow for Website', () => {
  // First, visit the team website
  beforeAll(async () => {
    await page.goto('https://cse110-fa22-group30.github.io/cse110-fa22-group30/')
  })

  // Next, check to make sure that no <exercise-card> elements are present
  it('Initial Home Page - Check for 0 logged exercises', async () => {
    console.log('Checking for empty log...')
    // Query select all of the <exercise-card> elements and return the length of that array
    // -------------------- TODO: remove when dummy data is removed from main.js ------------------//
    const numCards = await page.$$eval('exercise-card', (el) => el.length)
    if (numCards === 0) {
      expect(numCards).toBe(0)
      return
    }
    expect(numCards).toBe(2)
    const cards = await page.$$('exercise-card')
    for (const card of cards) {
      const shadRoot = await card.getProperty('shadowRoot')
      const deleteButton = await shadRoot.$('.delete-button')
      await deleteButton.evaluate(b => b.click())
    }
    // -------------------- TODO: remove when dummy data is removed from main.js ------------------//
    const numCards2 = await page.$$eval('exercise-card', (el) => el.length)
    expect(numCards2).toBe(0)
  })

  // Check that "+" button creates an <exercise-card> in edit mode in the "Scheduled" section
  it('Checking that the "+" button adds an exercise in edit mode', async () => {
    console.log('Clicking the "+" button...')
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
    console.log('Filling in log and saving')
    // Get card
    const card = await page.$('exercise-card')
    const shadow = await card.getProperty('shadowRoot')

    // Enter data
    const caloriesInput = await shadow.$('.calories-input')
    await caloriesInput.type('100')

    const distInput = await shadow.$('.stat1-input')
    await distInput.type('1000')

    const timeInput = await shadow.$('.stat2-input')
    await timeInput.type('5')

    const notesInput = await shadow.$('.notes-input')
    await notesInput.type('slow day')

    // Save log
    const saveBtn = await shadow.$('.submit-button')
    await saveBtn.evaluate(b => b.click())

    // Check data
    const caloriesDisplay = await shadow.$('.calories-show')
    const caloriesData = await caloriesDisplay.getProperty('innerText')
    const calories = await caloriesData.jsonValue()
    expect(calories).toBe('100')

    const distDisplay = await shadow.$('.stat1-show')
    const distData = await distDisplay.getProperty('innerText')
    const dist = await distData.jsonValue()
    expect(dist).toBe('1000')

    const timeDisplay = await shadow.$('.stat2-show')
    const timeData = await timeDisplay.getProperty('innerText')
    const time = await timeData.jsonValue()
    expect(time).toBe('5')

    const notesDisplay = await shadow.$('.notes-show')
    const notesData = await notesDisplay.getProperty('innerText')
    const notes = await notesData.jsonValue()
    expect(notes).toBe('slow day')
  })

  // Check that dropdown can be collapsed.
  it('Checking dropdown button to collapse the exercise card', async () => {
    console.log('Collapsing details')
    const card = await page.$('exercise-card')
    const shadow = await card.getProperty('shadowRoot')
    const btn = await shadow.$('.expand-button')
    await btn.evaluate(b => b.click())
    const content = await shadow.$('.exerciseContent')
    const style = await content.getProperty('style')
    const display = await style.getProperty('display')
    const val = await display.jsonValue()
    expect(val).toBe('none')
  })

  // Check that local storage works by page reload not deleting exercises.
  // Data should remain intact.
  it('Checking that local storage persists page reload', async () => {
    // Check that number of cards stays the same
    const numBefore = await page.$$eval('exercise-card', (el) => el.length)
    expect(numBefore).toBe(1)
    await page.reload()
    const numAfter = await page.$$eval('exercise-card', (el) => el.length)
    expect(numAfter).toBe(1)
  })

  // Check that dropdown can be opened.
  it('Checking dropdown button to reveal exercise details', async () => {
    console.log('Opening details')
    const card = await page.$('exercise-card')
    const shadow = await card.getProperty('shadowRoot')
    const btn = await shadow.$('.expand-button')
    await btn.evaluate(b => b.click())
    const content = await shadow.$('.exerciseContent')
    const style = await content.getProperty('style')
    const display = await style.getProperty('display')
    const val = await display.jsonValue()
    expect(val).toBe('flex')
  })

  // Check that the edit button (pencil) opens edit mode for the card.
  it('Checking edit button to open edit mode', async () => {
    console.log('Opening edit mode')
    const card = await page.$('exercise-card')
    const shadow = await card.getProperty('shadowRoot')
    const btn = await shadow.$('.edit-button')
    await btn.evaluate(b => b.click())

    // Check that inputs are showing
    const inputs = await shadow.$$('schedule-edit')
    for (const input of inputs) {
      const style = await input.getProperty('style')
      const display = await style.getProperty('display')
      const val = await display.jsonValue()
      expect(val).toBe('inline-block')
    }

    // Check that displays are hidden
    const fields = await shadow.$$('schedule-show')
    for (const field of fields) {
      const style = await field.getProperty('style')
      const display = await style.getProperty('display')
      const val = await display.jsonValue()
      expect(val).toBe('none')
    }
  })

  // Check that changing exercise with different stats also changes metrics descriptions. (running => push ups)
  // Changed metrics descriptions should be saved.
  it('Checking for updated metrics with certain exercises', async () => {
    console.log('Changing exercise and observing stat metrics')
    const card = await page.$('exercise-card')
    const shadow = await card.getProperty('shadowRoot')
    const selection = await shadow.$('select')
    await selection.select('push ups')
    const saveBtn = await shadow.$('.submit-button')
    await saveBtn.evaluate(b => b.click())

    // Check that exercise was saved
    const exercise = await selection.getProperty('value')
    const exerciseData = await exercise.jsonValue()
    expect(exerciseData).toBe('push ups')

    // Check that units changed
    const stat1Div = await shadow.$('.stats1-label')
    const stat1 = await stat1Div.getProperty('innerText')
    const stat1Text = await stat1.jsonValue()
    expect(stat1Text).toBe('Sets:')
    const stat2Div = await shadow.$('.stats2-label')
    const stat2 = await stat2Div.getProperty('innerText')
    const stat2Text = await stat2.jsonValue()
    expect(stat2Text).toBe('Reps:')
  })

  // Check that changes are NOT saved when changes are rejected.
  it('Checking for stats to stay the same when "X" is pressed in edit mode.', async () => {
    console.log('Make a change, cancel, and check that change is lost')
    const card = await page.$('exercise-card')
    const shadow = await card.getProperty('shadowRoot')
    const editBtn = await shadow.$('.edit-button')
    await editBtn.evaluate(b => b.click())
    const caloriesInput = await shadow.$('.calories-input')
    await caloriesInput.type('1000000')
    const cancelBtn = await shadow.$('.cancel-button')
    await cancelBtn.evaluate(b => b.click())
    const caloriesDisplay = await shadow.$('.calories-show')
    const calories = await caloriesDisplay.getProperty('innerText')
    const caloriesData = await calories.jsonValue()
    expect(caloriesData).toBe('100')
  })

  // Check that marking an exercise as complete moves it to the "Completed" section.
  // Data should remain intact.
  it('Checking complete button', async () => {
    console.log('Checking for exercise card to move to completed section when marked as done')
    const scheduledContainer = await page.$('#scheduledContainer')
    const numScheduledBefore = await scheduledContainer.$$eval('exercise-card', cards => cards.length)
    expect(numScheduledBefore).toBe(1)
    const completedContainer = await page.$('#completedContainer')
    const numCompletedBefore = await completedContainer.$$eval('exercise-card', cards => cards.length)
    expect(numCompletedBefore).toBe(0)

    const card = await page.$('exercise-card')
    const shadow = await card.getProperty('shadowRoot')
    const checkBox = await shadow.$('#checkBox')
    await checkBox.click()

    const numScheduledAfter = await scheduledContainer.$$eval('exercise-card', cards => cards.length)
    expect(numScheduledAfter).toBe(0)
    const numCompletedAfter = await completedContainer.$$eval('exercise-card', cards => cards.length)
    expect(numCompletedAfter).toBe(1)
  })

  // Check that the delete button works (trash can in edit mode)
  it('Checking that delete button removes card', async () => {
    console.log('Delete card')
    const card = await page.$('exercise-card')
    const shadow = await card.getProperty('shadowRoot')
    const editBtn = await shadow.$('.edit-button')
    await editBtn.evaluate(b => b.click())
    const delBtn = await shadow.$('.delete-button')
    await delBtn.evaluate(b => b.click())

    const scheduledContainer = await page.$('#scheduledContainer')
    const numScheduledBefore = await scheduledContainer.$$eval('exercise-card', cards => cards.length)
    expect(numScheduledBefore).toBe(0)
    const completedContainer = await page.$('#completedContainer')
    const numCompletedBefore = await completedContainer.$$eval('exercise-card', cards => cards.length)
    expect(numCompletedBefore).toBe(0)
  })

  // Check that local storage remembers the deletion by reloading the page.
  it('Checking that card deletions persist page reload', async () => {
    console.log('Reload page and make sure no cards exist')
    await page.reload()
    const scheduledContainer = await page.$('#scheduledContainer')
    const numScheduledBefore = await scheduledContainer.$$eval('exercise-card', cards => cards.length)
    expect(numScheduledBefore).toBe(0)
    const completedContainer = await page.$('#completedContainer')
    const numCompletedBefore = await completedContainer.$$eval('exercise-card', cards => cards.length)
    expect(numCompletedBefore).toBe(0)
  })
})
