/* global page, localStorage */
describe('Basic user flow for Website', () => {
  // First, visit the team website
  beforeAll(async () => {
    await page.goto('https://cse110-fa22-group30.github.io/cse110-fa22-group30/')
  })

  // Next, check to make sure that no <exercise-card> elements are present
  it('Initial Home Page - Check for 0 logged exercises', async () => {
    console.log('Checking for empty log...')
    // Query select all of the <exercise-card> elements and return the length of that array
    // TODO: change from lab 8
    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length
    })
    // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
    expect(numProducts).toBe(20)
  })

  // Check that "+" button an <exercise-card> in edit mode in the "Scheduled" section
  it('Checking that the "+" button adds an exercise in edit mode', async () => {
    console.log('Clicking the "+" button...')
    // TODO: change from lab 8
    // Query a <product-item> element using puppeteer ( checkout page.$() and page.$$() in the docs )
    const prodItem = await page.$('product-item')
    // Grab the shadowRoot of that element (it's a property), then query a button from that shadowRoot.
    const shadow = await prodItem.getProperty('shadowRoot')
    const button = await shadow.$('button')
    // Once you have the button, you can click it and check the innerText property of the button.
    await button.click()
    const text = await button.getProperty('innerText')
    // Once you have the innerText property, use innerText.jsonValue() to get the text value of it
    const plainValue = await text.jsonValue()
    expect(plainValue).toBe('Remove from Cart')
    await button.click()
  }, 1000)

  // Check that after filling in <exercise-card>, the save button (check-mark) works.
  // Data is saved. Log is in the "Scheduled" section. Card dropdown is still open. No longer in edit mode.
  it('Checking the exercise card is saved properly', async () => {
    console.log('Checking number of items in cart on screen...')
    // TODO: change from lab 8
    // Query select all of the <product-item> elements, then for every single product element
    const prodItems = await page.$$('product-item')
    for (const item of prodItems) {
      // get the shadowRoot and query select the button inside, and click on it.
      const shadow = await item.getProperty('shadowRoot')
      const button = await shadow.$('button')
      await button.click()
    }
    // Check to see if the innerText of #cart-count is 20
    const counter = await page.$('#cart-count')
    const count = await counter.getProperty('innerText')
    const plainValue = await count.jsonValue()
    expect(plainValue).toBe('20')
  }, 10000)

  // Check that dropdown can be collapsed.
  it('Checking dropdown button to collapse the exercise card', () => {
    // TODO:
  })

  // Check that local storage works by page reload not deleting exercises.
  it('Checking that local storage persists page reload', async () => {
    // TODO: change from lab 8
    // At this point the item 'cart' in localStorage should be
    // '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]', check to make sure it is
    const cart = await page.evaluate(() => localStorage.getItem('cart'))
    expect(cart).toBe('[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]')
  })

  // Check that dropdown can be opened.
  it('Checking dropdown button to reveal exercise details', () => {
    // TODO:
  })

  // Check that the edit button (pencil) opens edit mode for the card.
  it('Checking edit button to open edit mode', () => {
    // TODO:
  })

  // Check that changes are NOT saved when changes are rejected.
  it('Checking for stats to stay the same when "X" is pressed in edit mode.', async () => {
    console.log('Checking number of items in cart on screen...')
    // TODO: change from lab 8
    // Go through and click "Remove from Cart" on every single <product-item>, just like above.
    const prodItems = await page.$$('product-item')
    for (const item of prodItems) {
      const shadow = await item.getProperty('shadowRoot')
      const button = await shadow.$('button')
      await button.click()
    }
    // Once you have, check to make sure that #cart-count is now 0
    const counter = await page.$('#cart-count')
    const count = await counter.getProperty('innerText')
    const plainValue = await count.jsonValue()
    expect(plainValue).toBe('0')
  }, 10000)

  // Check that marking an exercise as complete moves it to the "Completed" section.
  // Data should remain intact.
  it('Checking complete button', async () => {
    console.log('Checking number of items in cart on screen after reload...')
    // TODO: change from lab 8
    // Reload the page, then select all of the <product-item> elements, and check every
    await page.reload()
    const prodItems = await page.$$('product-item')
    // element to make sure that all of their buttons say "Remove from Cart".
    for (const item of prodItems) {
      const shadow = await item.getProperty('shadowRoot')
      const button = await shadow.$('button')
      const text = await button.getProperty('innerText')
      const plainValue = await text.jsonValue()
      expect(plainValue).toBe('Remove from Cart')
    }
    // Also check to make sure that #cart-count is still 20
    const counter = await page.$('#cart-count')
    const count = await counter.getProperty('innerText')
    const plainValue = await count.jsonValue()
    expect(plainValue).toBe('20')
  }, 10000)

  // Check that the delete button works (trash can in edit mode)
  it('Checking that delete button removes card', async () => {
    console.log('Checking number of items in cart on screen after reload...')
    // TODO: change from lab 8
    // Reload the page once more, then go through each <product-item> to make sure that it has remembered nothing
    await page.reload()
    const prodItems = await page.$$('product-item')
    for (const item of prodItems) {
      // is in the cart - do this by checking the text on the buttons so that they should say "Add to Cart".
      const shadow = await item.getProperty('shadowRoot')
      const button = await shadow.$('button')
      const text = await button.getProperty('innerText')
      const plainValue = await text.jsonValue()
      expect(plainValue).toBe('Add to Cart')
    }
    // Also check to make sure that #cart-count is still 0
    const counter = await page.$('#cart-count')
    const count = await counter.getProperty('innerText')
    const plainValue = await count.jsonValue()
    expect(plainValue).toBe('0')
  }, 10000)

  // Check that local storage remembers the deletion by reloading the page.
  it('Checking that card deletions persist page reload', async () => {
    console.log('Checking the localStorage...')
    // TODO: change from lab 8
    // At this point the item 'cart' in localStorage should be '[]', check to make sure it is
    const cart = await page.evaluate(() => localStorage.getItem('cart'))
    expect(cart).toBe('[]')
  })
})
