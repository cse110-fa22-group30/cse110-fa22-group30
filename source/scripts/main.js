// Wait for window to load
window.addEventListener('DOMContentLoaded', init)

/**
 * Local storage initialization to set and return in 'cards'
 * @returns json representation of what is stored in 'cards'
 */
function initializeStorage () {
  // Check if storage is available
  const options = {
    // cardio or strength for exercise
    cardioOptions: [
      'running',
      'cycling',
      'swimming',
      'walking',
      'hiking',
      'skating',
      'skiiing',
      'rowing',
      'elliptical',
      'stairmaster'
    ],
    cardioStats: {
      stats1: 'Distance',
      stats2: 'Time'
    },
    strengthOptions: [
      'squats',
      'bench press',
      'pull ups',
      'push ups',
      'sit ups',
      'lunges',
      'jumping jacks',
      'crunches',
      'leg raises',
      'bicep curls',
      'tricep dips',
      'shoulder press',
      'deadlifts'
    ],
    strengthStats: {
      stats1: 'Sets',
      stats2: 'Reps'
    }
  }

  const data = [
    // initial data sets
    {
      completed: 'true',
      type: 'cycling', // must be lower case, match case, or implement .tolowercase()
      date: '2023-01-01', // must be in this format to make coding the input of date easier
      // duration: 2,
      calories: 580,
      stat1: 7500,
      stat2: 85,
      notes: 'Tour de France here I come!'
    },
    {
      completed: 'false',
      type: 'bench press', // must be lower case, match case, or implement .tolowercase()
      date: '2021-01-01', // must be in this format to make coding the input of date easier
      // duration: 2,
      calories: 135,
      stat1: 5,
      stat2: 5,
      notes: 'Remember not to skip leg day!!!'
    }
  ]
  if (localStorage.getItem('cards') == null) {
    localStorage.setItem('cards', JSON.stringify(data))
  }
  localStorage.setItem('options', JSON.stringify(options))

  return JSON.parse(localStorage.getItem('cards'))
}

/**
 * function that detects add button in scheduledContainer
 * @param {*} scheduledContainer contains exercise elements to be completed
 */
function addExerciseListener (scheduledContainer) {
  document
    .getElementById('fixedAddButton')
    .addEventListener('click', function () {
      const exercise = document.createElement('exercise-card')
      const yourDate = new Date()

      exercise.data = {
        completed: 'false',
        type: '', // must be lower case, match case, or implement .tolowercase()
        date: yourDate.toISOString().split('T')[0], // must be in this format to make coding the input of date easier
        // duration: '',
        calories: '',
        stat1: '',
        stat2: '',
        notes: ''
      }
      exercise.shadowRoot
        .getElementById('checkBox')
        .addEventListener('change', document.updateData)
      exercise.shadowRoot.getElementById('expandButton').click()
      exercise.shadowRoot.getElementById('editButton').click()
      scheduledContainer.insertBefore(
        exercise,
        document.getElementById('insertPoint')
      )
    })
}

// Initialization function
function init () {
  // Populate page with 2 exercise cards
  const scheduledContainer = document.getElementById('scheduledContainer')

  const data = initializeStorage()

  // set exercise data
  data.forEach((element, index) => {
    const exercise = document.createElement('exercise-card')
    exercise.data = element
    if (element.completed === 'true') {
      document.addToCompleted(exercise)
    } else {
      document.addToScheduled(exercise)
    }
    exercise.shadowRoot
      .getElementById('checkBox')
      .addEventListener('change', document.updateData)
  })

  addExerciseListener(scheduledContainer)
}

// function: add to scheduled exercises in a order sorted by date
document.addToScheduled = function (exercise) {
  const scheduledContainer = document.getElementById('scheduledContainer')
  const scheduledList = scheduledContainer.getElementsByTagName('exercise-card')

  // add elemenet to scheduled list based on date
  if (scheduledList.length === 0) {
    scheduledContainer.appendChild(exercise)
  } else {
    for (let i = 0; i < scheduledList.length; i++) {
      if (exercise.data.date < scheduledList[i].data.date) {
        scheduledContainer.insertBefore(exercise, scheduledList[i])
        break
      } else if (i === scheduledList.length - 1) {
        scheduledContainer.appendChild(exercise)
        break
      }
    }
  }
}

// function: add to completed exercises in a order sorted by date
document.addToCompleted = function (exercise) {
  const completedContainer = document.getElementById('completedContainer')
  const completedList = completedContainer.getElementsByTagName('exercise-card')

  // add elemenet to completed list based on date
  if (completedList.length === 0) {
    completedContainer.appendChild(exercise)
  } else {
    for (let i = 0; i < completedList.length; i++) {
      if (exercise.data.date < completedList[i].data.date) {
        completedContainer.insertBefore(exercise, completedList[i])
        break
      } else if (i === completedList.length - 1) {
        completedContainer.appendChild(exercise)
        break
      }
    }
  }
}

// function: saves current state of page & put it in local storage
document.updateData = function () {
  const scheduledContainer = document.getElementById('scheduledContainer')
  const completedContainer = document.getElementById('completedContainer')

  const scheduledList = scheduledContainer.getElementsByTagName('exercise-card')
  const completedList = completedContainer.getElementsByTagName('exercise-card')

  const newData = []

  for (let i = 0; i < scheduledList.length; i++) {
    newData.push(scheduledList[i].getData())
  }
  for (let x = 0; x < completedList.length; x++) {
    newData.push(completedList[x].getData())
  }

  localStorage.setItem('cards', JSON.stringify(newData))
}
