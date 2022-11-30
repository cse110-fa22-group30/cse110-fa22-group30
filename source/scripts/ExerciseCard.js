// ExerciseCard.js

// import functions from './exports
import * as functions from './exports.js'

// Custom HTML Element Exercise Card
class ExerciseCard extends HTMLElement {
  constructor() {
    super()

    // create shadow dom
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = `<link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />`
    // mainContainer is the always visible section of exercise-card
    const mainContainer = document.createElement('div')
    mainContainer.setAttribute('class', 'mainContainer')
    // header is the always visible section of exercise-card
    const header = document.createElement('span')
    header.setAttribute('class', 'exerciseHeader')
    // header is the collapsible section of exercise-card
    const content = document.createElement('div')
    content.setAttribute('class', 'exerciseContent')
    // append style element to shadow dom
    const styleElem = document.createElement('style')
    styleElem.textContent = `
        .mainContainer {
            background-color: #53cbfb;
            border-radius: 10px;
            margin-bottom: 5px;
            overflow: hidden;
            box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);
        }
        
        .exerciseHeader {
            width: 100%;
            position: static;
            display: flex;
            justify-content: space-between;
            overflow: hidden;
        }
        
        .exerciseHeader > * {
            margin: 10px;
        }
        
        .exerciseContent {
            width: 100%;
            display: none;
            overflow: hidden;
            padding: 5px 10px 5px 10px;
        }
        
        .expand-button {
            cursor: pointer;
        }
        
        .exerciseContent > * {
            position: relative;
            flex: 1;
        }        

        .material-icons {
            cursor: pointer;
        }
        `

    // Attach Elements to Shadow Dom
    shadow.appendChild(mainContainer)
    mainContainer.appendChild(header)
    mainContainer.appendChild(content)
    shadow.appendChild(styleElem)
  }

  checkboxEventListeners() {
    // add event listener to checkbox
    this.shadowRoot
      .getElementById('checkBox')
      .addEventListener('change', () => {
        if (this.shadowRoot.getElementById('checkBox').checked) {
          this.getRootNode().addToCompleted(this)
        } else {
          this.getRootNode().addToScheduled(this)
        }
      })
  }

  /**
   * @param {object} data: data holding the exercise information
   * @param {object} header: header information
   * @param {object} content: content information
   * This changes the formating on the page when a button is used.
   */
  activateEditFunction(data, header, content, strengthOptions, cardioOptions, strengthStats, cardioStats) {
    // header expand and collapse event listener, on click
    const expandButton = header.querySelector('.expand-button')
    expandButton.addEventListener('click', function () {
      if (content.style.display === 'flex') {
        content.style.display = 'none'
        expandButton.textContent = 'expand_more'
      } else {
        content.style.display = 'flex'
        expandButton.textContent = 'expand_less'
      }
    })

    // edit button event listener, change document ui on click
    const editButton = content.querySelector('.edit-button')
    editButton.addEventListener('click', function () {
      const toShow = content.getElementsByClassName('schedule-edit')
      const toShow2 = header.getElementsByClassName('schedule-edit')
      const toHide = content.getElementsByClassName('schedule-show')
      const toHide2 = header.getElementsByClassName('schedule-show')
      for (let i = 0; i < toShow.length; i++) {
        toShow[i].style.display = 'inline-block'
      }
      for (let x = 0; x < toShow2.length; x++) {
        toShow2[x].style.display = 'inline-block'
      }
      for (let y = 0; y < toHide.length; y++) {
        toHide[y].style.display = 'none'
      }
      for (let z = 0; z < toHide2.length; z++) {
        toHide2[z].style.display = 'none'
      }
    })

    // submit button event listener, save to local storage on click
    const submitButton = content.querySelector('.submit-button')
    submitButton.addEventListener('click', function () {
      // save to local storage
      this.getRootNode().host.getRootNode().updateData()

      // scraping information off the document on submit
      data = {
        // duration:
        //     content.getElementsByClassName('duration-input')[0].value,
        calories:
          content.getElementsByClassName('calories-input')[0].value,
        stat1: content.getElementsByClassName('stat1-input')[0].value,
        stat2: content.getElementsByClassName('stat2-input')[0].value,
        notes: content.getElementsByClassName('notes-input')[0].value,
        type: header.getElementsByClassName('type-input')[0].value,
        date: header.getElementsByClassName('date-input')[0].value
      }

      // content.getElementsByClassName('duration-show')[0].innerText =
      //     data.duration
      content.getElementsByClassName('calories-show')[0].innerText =
        data.calories
      content.getElementsByClassName('stat1-show')[0].innerText =
        data.stat1
      content.getElementsByClassName('stat2-show')[0].innerText =
        data.stat2
      content.getElementsByClassName('notes-show')[0].innerText =
        data.notes
      header.getElementsByClassName('type-show')[0].innerText =
        functions.capitalizeFirstLetterInEachWord(data.type)
      header.getElementsByClassName('date-show')[0].innerText = data.date

      const toShow = content.getElementsByClassName('schedule-show')
      const toShow2 = header.getElementsByClassName('schedule-show')
      const toHide = content.getElementsByClassName('schedule-edit')
      const toHide2 = header.getElementsByClassName('schedule-edit')
      for (let i = 0; i < toShow.length; i++) {
        toShow[i].style.display = 'inline-block'
      }
      for (let x = 0; x < toShow2.length; x++) {
        toShow2[x].style.display = 'inline-block'
      }
      for (let y = 0; y < toHide.length; y++) {
        toHide[y].style.display = 'none'
      }
      for (let y = 0; y < toHide2.length; y++) {
        toHide2[y].style.display = 'none'
      }
    })

    // cancel button event listener, reset to original values
    const cancelButton = content.querySelector('.cancel-button')
    cancelButton.addEventListener('click', function () {
      // content.getElementsByClassName('duration-input')[0].value =
      //     data.duration
      content.getElementsByClassName('calories-input')[0].value =
        data.calories
      content.getElementsByClassName('stat1-input')[0].value = data.stat1
      content.getElementsByClassName('stat2-input')[0].value = data.stat2
      content.getElementsByClassName('notes-input')[0].value = data.notes
      header.getElementsByClassName('type-input')[0].value = data.type
      header.getElementsByClassName('date-input')[0].value = data.date

      const toShow = content.getElementsByClassName('schedule-show')
      const toShow2 = header.getElementsByClassName('schedule-show')
      const toHide = content.getElementsByClassName('schedule-edit')
      const toHide2 = header.getElementsByClassName('schedule-edit')
      for (let i = 0; i < toShow.length; i++) {
        toShow[i].style.display = 'inline-block'
      }
      for (let x = 0; x < toShow2.length; x++) {
        toShow2[x].style.display = 'inline-block'
      }
      for (let y = 0; y < toHide.length; y++) {
        toHide[y].style.display = 'none'
      }
      for (let z = 0; z < toHide2.length; z++) {
        toHide2[z].style.display = 'none'
      }
    })

    // delete button event listener, delete from local storage on click
    const deleteButton = header.querySelector('.delete-button')
    deleteButton.addEventListener('click', function () {
      const updateFunc = this.getRootNode().host.getRootNode().updateData

      // remove the card from the document
      this.getRootNode().host.remove()

      // delete from local storage
      updateFunc()
    })

    // change of exercise type event listener, change the document ui
    const typeInput = header.querySelector('.type-input')
    typeInput.addEventListener('change', function () {
      const type = typeInput.value
      const stat1 = content.querySelector('.stats1-label')
      const stat2 = content.querySelector('.stats2-label')
      if (strengthOptions.includes(type)) {
        stat1.innerText = strengthStats.stats1 + ': '
        stat2.innerText = strengthStats.stats2 + ': '
      } else if (cardioOptions.includes(type)) {
        stat1.innerText = cardioStats.stats1 + ': '
        stat2.innerText = cardioStats.stats2 + ': '
      }
    })
  }

  /**
   * getter for the data
   * @returns {Object} data
   */
  getData() {
    return data
  }

  /**
   * @param {Object} data
   * Setter function for exercise-data element
   *
   *  data = {
   *   completed: "boolean",
   *   type: "string",
   *   date: "string",
   *   duration: "number",
   *   calories: "number",
   *   stat1: "number",
   *   stat2: "number",
   *   notes: "string",
   * };
   */
  set data(data) {
    // Returns if data is a falsy value
    if (!data) return

    const options = JSON.parse(localStorage.getItem('options'))
    if (!options) {
      console.error('Options not found in local storage')
    }
    const strengthOptions = options.strengthOptions
    const strengthStats = options.strengthStats
    const cardioOptions = options.cardioOptions
    const cardioStats = options.cardioStats

    // set inner html for initial state (not edit) of the element
    let header = this.shadowRoot.querySelector('.exerciseHeader')
    let content = this.shadowRoot.querySelector('.exerciseContent')
    header.innerHTML =
      `
        <input type="checkbox" class="completedBox checkBox" id="checkBox"` +
      (JSON.parse(data.completed) ? 'checked' : '') +
      `>
        <span class="schedule-show exerciseName type-show">` +
      functions.capitalizeFirstLetterInEachWord(data.type) +
      `</span> 
        <select style="display: none" class="schedule-edit type-input" value="` +
      functions.capitalizeFirstLetterInEachWord(data.type) +
      `">
            ${cardioOptions
        .map(
          (option) =>
            `<option value="${option}">${functions.capitalizeFirstLetterInEachWord(
              option
            )}</option>`
        )
        .join('')}
            ${strengthOptions
        .map(
          (option) =>
            `<option value="${option}">${functions.capitalizeFirstLetterInEachWord(
              option
            )}</option>`
        )
        .join('')}
        </select>
        <span class="schedule-show exerciseDate date-show">` +
      data.date +
      `</span> <input style="display: none" class="schedule-edit date-input" type="date" value="` +
      data.date +
      `"/>
        <span id="expandButton" class="material-icons expand-button schedule-show">expand_more</span>
        <span class='schedule-edit material-icons delete-button' style='display:none;color:red'>delete</span>
    `
    const getStat1Label = (currentData) => {
      if (data.type === '') {
        return cardioStats.stats1 + '/' + strengthStats.stats1
      } else if (cardioOptions.includes(data.type)) {
        return cardioStats.stats1
      } else if (strengthOptions.includes(data.type)) {
        return strengthStats.stats1
      }
    }

    const getStat2Label = (currentData) => {
      if (data.type === '') {
        return cardioStats.stats2 + '/' + strengthStats.stats2
      } else if (cardioOptions.includes(data.type)) {
        return cardioStats.stats2
      } else if (strengthOptions.includes(data.type)) {
        return strengthStats.stats2
      }
    }

    content.innerHTML =
      `
        <div class="stats">
            <div>
            <span style="display:inline-block;width:80px">Calories: </span>
            <span class="schedule-show calories-show details">` +
      data.calories +
      `</span> <input style="display:none;" class="schedule-edit calories-input" type="number" value="` +
      data.calories +
      `"/></div>
            <div>
            <span class="stats1-label" style="display:inline-block;width:80px">${getStat1Label()}: </span>
            <span class="schedule-show stat1-show">` +
      data.stat1 +
      `</span> <input style="display:none;" class="schedule-edit stat1-input" type="number" value="` +
      data.stat1 +
      `"/></div>
            <div>
            <span class="stats2-label" style="display:inline-block;width:80px">${getStat2Label()}: </span>
            <span class="schedule-show stat2-show">` +
      data.stat2 +
      `</span> <input style="display:none;" class="schedule-edit stat2-input" type="number" value="` +
      data.stat2 +
      `"/></div>
        </div>
        <div class="span">
            <p class="schedule-show notes-show">` +
      data.notes +
      `</p>
            <textarea class="schedule-edit notes-input" style="display:none">` +
      data.notes +
      ` </textarea>
            <div style='position:absolute;bottom:0;right:20px'>
                <span id='editButton' class='schedule-show material-icons edit-button' style='color:#ffba52'>edit</span>
                <span class='schedule-edit material-icons submit-button' style='display:none;color:green'>done</span>
                <span class='schedule-edit material-icons cancel-button' style='display:none;color:red'>close</span>
            </div>
        </div>
    `
    this.header = header
    this.content = content
    this.activateEditFunction(data, header, content, strengthOptions, cardioOptions, strengthStats, cardioStats)
    this.checkboxEventListeners()
  }

  /**
   * Getter function for exercise-data element
   * @returns {object} data for a exercise object
   */
  getData() {
    let header = this.header
    let content = this.content
    let data = {
      completed: header.getElementsByClassName('checkBox')[0].checked
        ? 'true'
        : 'false',
      // duration: content.getElementsByClassName('duration-input')[0].value,
      calories: content.getElementsByClassName('calories-input')[0].value,
      stat1: content.getElementsByClassName('stat1-input')[0].value,
      stat2: content.getElementsByClassName('stat2-input')[0].value,
      notes: content.getElementsByClassName('notes-input')[0].value,
      type: header.getElementsByClassName('type-input')[0].value,
      date: header.getElementsByClassName('date-input')[0].value,
    }
    return data
  }
}

// Define custom HTML keyword
customElements.define('exercise-card', ExerciseCard)
