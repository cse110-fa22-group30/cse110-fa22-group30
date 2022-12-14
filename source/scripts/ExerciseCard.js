// ExerciseCard.js
/* global HTMLElement, localStorage, customElements */

// import functions from './exports
import * as functions from './exports.js'

// Custom HTML Element Exercise Card
/**
 * @class ExerciseCard
 */
class ExerciseCard extends HTMLElement {
  /**
   * Setter function for exercise-data element
   */
  constructor () {
    super()

    // add data member variable to the element
    this._data = {}

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
            box-shadow: 3px 3px 5px gray;
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

        .notes {
          width: 80%;
        }
        `

    // Attach Elements to Shadow Dom
    shadow.appendChild(mainContainer)
    mainContainer.appendChild(header)
    mainContainer.appendChild(content)
    shadow.appendChild(styleElem)
  }

  checkboxEventListeners () {
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
  activateEditFunction (data, header, content, strengthOptions, cardioOptions, strengthStats, cardioStats) {
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
      const toHide2 = header.getElementsByClassName('schedule-show') // clone is found here (115-127), please try to find a better way to do this, e.g. by using fuctions or variables

      showHideElements(toShow, toShow2, toHide, toHide2)
    })

    /**
     * Function that shows or hides elements after closing the edit interface
     *
     * @param {Object} toShow - the elements to show
     * @param {Object} toShow2 - the elements to show
     * @param {Object} toHide - the elements to hide
     * @param {Object} toHide2 - the elements to hide
     */
    function showHideElements (toShow, toShow2, toHide, toHide2) {
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
    }

    // submit button event listener, save to local storage on click
    const submitButton = content.querySelector('.submit-button')
    submitButton.addEventListener('click', function () {
      // scraping information off the document on submit
      data = {
        calories: // clone found here, please try to find a better way to do this, e.g. by using fuctions or variables
          content.getElementsByClassName('calories-input')[0].value,
        stat1: content.getElementsByClassName('stat1-input')[0].value,
        stat2: content.getElementsByClassName('stat2-input')[0].value,
        notes: content.getElementsByClassName('notes-input')[0].value,
        type: header.getElementsByClassName('type-input')[0].value,
        date: header.getElementsByClassName('date-input')[0].value
      }

      // temporary fix for the value
      header.getElementsByClassName('type-input')[0].setAttribute('value', header.getElementsByClassName('type-input')[0].value)

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
      header.getElementsByClassName('date-show')[0].innerText = data.date // clone is found here (20 lines), please try to find a better way to do this, e.g. by using fuctions or variables

      const toShow = content.getElementsByClassName('schedule-show')
      const toShow2 = header.getElementsByClassName('schedule-show')
      const toHide = content.getElementsByClassName('schedule-edit')
      const toHide2 = header.getElementsByClassName('schedule-edit') // clone is found here (166-178), please try to find a better way to do this, e.g. by using fuctions or variables

      showHideElements(toShow, toShow2, toHide, toHide2)

      // save to local storage
      this.getRootNode().host.getRootNode().updateData()
    })

    // cancel button event listener, reset to original values
    const cancelButton = content.querySelector('.cancel-button')
    cancelButton.addEventListener('click', function () {
      content.getElementsByClassName('calories-input')[0].value =
        data.calories
      content.getElementsByClassName('stat1-input')[0].value = data.stat1
      content.getElementsByClassName('stat2-input')[0].value = data.stat2
      content.getElementsByClassName('notes-input')[0].value = data.notes
      header.getElementsByClassName('type-input')[0].value = data.type
      header.getElementsByClassName('date-input')[0].value = data.date // clone is found here (20 lines), please try to find a better way to do this, e.g. by using fuctions or variables

      const toShow = content.getElementsByClassName('schedule-show')
      const toShow2 = header.getElementsByClassName('schedule-show')
      const toHide = content.getElementsByClassName('schedule-edit')
      const toHide2 = header.getElementsByClassName('schedule-edit')

      showHideElements(toShow, toShow2, toHide, toHide2)
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
      const units1 = content.querySelector('.stats1-units')
      const units2 = content.querySelector('.stats2-units')
      // stats dependent on strength or cardio
      if (strengthOptions.includes(type)) {
        stat1.innerText = strengthStats.stats1 + ': '
        stat2.innerText = strengthStats.stats2 + ': '
        units1.innerText = ''
        units2.innerText = ''
      } else if (cardioOptions.includes(type)) {
        stat1.innerText = cardioStats.stats1 + ': '
        stat2.innerText = cardioStats.stats2 + ': '
        units1.innerText = ' (meters)'
        units2.innerText = ' (seconds)'
      }
    })
  }

  /**
   * Getter function for exercise-data element
   * @returns {Object} data
   */
  get data () {
    return this._data
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
  set data (data) {
    // Returns if data is a falsy value
    if (!data) return

    // Sets the data
    this._data = data

    const options = JSON.parse(localStorage.getItem('options'))
    if (!options) {
      console.error('Options not found in local storage')
    }
    const strengthOptions = options.strengthOptions
    const strengthStats = options.strengthStats
    const cardioOptions = options.cardioOptions
    const cardioStats = options.cardioStats

    // set inner html for initial state (not edit) of the element
    const header = this.shadowRoot.querySelector('.exerciseHeader')
    const content = this.shadowRoot.querySelector('.exerciseContent')
    header.innerHTML =
      `
        <input type="checkbox" class="completedBox checkBox" id="checkBox"` +
      (JSON.parse(data.completed) ? 'checked' : '') +
      `>
        <span class="schedule-show exerciseName type-show" style="width:200px">` +
      functions.capitalizeFirstLetterInEachWord(data.type) +
      `</span> 
        <select style="display: none" class="schedule-edit type-input" value="` +
      data.type +
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
      '</span> <input style="display: none" class="schedule-edit date-input" type="date" value="' +
      data.date +
      `"/>
        <span id="expandButton" class="material-icons expand-button schedule-show">expand_more</span>
        <span class='schedule-edit material-icons delete-button' style='display:none;color:red'>delete</span>
    `
    // stat labels dependent on strength or cardio
    const getStat1Label = () => {
      if (cardioOptions.includes(data.type) || (data.type === '')) {
        return cardioStats.stats1
      } else if (strengthOptions.includes(data.type)) {
        return strengthStats.stats1
      }
    }

    const getStats1Units = () => {
      if (cardioOptions.includes(data.type)) {
        return ' (meters)'
      } else {
        return ''
      }
    }

    const getStats2Units = () => {
      if (cardioOptions.includes(data.type)) {
        return ' (minutes)'
      } else {
        return ''
      }
    }

    const getStat2Label = () => {
      if (cardioOptions.includes(data.type) || (data.type === '')) {
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
      '</span> <input style="display:none;" class="schedule-edit calories-input" type="number" value="' +
      data.calories +
      `"/></div>
            <div>
            <span class="stats1-label" style="display:inline-block;width:80px">${getStat1Label()}: </span>
            <span class="schedule-show stat1-show">` +
      data.stat1 +
      '</span> <input style="display:none;" class="schedule-edit stat1-input" type="number" value="' +
      data.stat1 +
      `"/><div class="stats1-units" style='display:inline-block'>${getStats1Units()}</div></span></div>
            <div>
            <span class="stats2-label" style="display:inline-block;width:80px">${getStat2Label()}: </span>
            <span class="schedule-show stat2-show">` +
      data.stat2 +
      '</span> <input style="display:none;" class="schedule-edit stat2-input" type="number" value="' +
      data.stat2 +
      `"/><div class="stats2-units" style='display:inline-block'>${getStats2Units()}</div></span></div>
        </div>
        <div class="span">
            <p class="schedule-show notes-show notes">` +
      data.notes +
      `</p>
            <textarea class="schedule-edit notes-input notes" style="display:none">` +
      data.notes +
      ` </textarea>
            <div style='position:absolute;bottom:0;right:20px'>
                <span id='editButton' class='schedule-show material-icons edit-button' style='color:#ffba52'>edit</span>
                <img src='source/assets/saveIcon.png' class='schedule-edit material-icons submit-button' style='display:none;color:green;width:24px'>
                <img src='source/assets/undoIcon.png' class='schedule-edit material-icons cancel-button' style='display:none;color:red;width:24px'>
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
  getData () {
    const header = this.header
    const content = this.content
    const data = {
      completed: header.getElementsByClassName('checkBox')[0].checked
        ? 'true'
        : 'false',
      calories: content.getElementsByClassName('calories-input')[0].value,
      stat1: content.getElementsByClassName('stat1-input')[0].value,
      stat2: content.getElementsByClassName('stat2-input')[0].value,
      notes: content.getElementsByClassName('notes-input')[0].value,
      type: header.getElementsByClassName('type-input')[0].getAttribute('value'),
      date: header.getElementsByClassName('date-input')[0].value
    }
    return data
  }
}

// Define custom HTML keyword
customElements.define('exercise-card', ExerciseCard)
