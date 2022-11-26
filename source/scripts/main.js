// Wait for window to load
window.addEventListener('DOMContentLoaded', init)

/**
 * Local storage initialization to set and return in 'cards'
 * @returns json representation of what is stored in 'cards'
 */
function initializeStorage() {
    // Check if storage is available
    let options = {
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
            'stairmaster',
        ],
        cardioStats: {
            stats1: 'Distance',
            stats2: 'Time',
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
            'deadlifts',
        ],
        strengthStats: {
            stats1: 'Sets',
            stats2: 'Reps',
        },
    }

    let data = [
        // initial data sets
        {
            completed: 'true',
            type: 'cycling', //must be lower case, match case, or implement .tolowercase()
            date: '2023-01-01', //must be in this format to make coding the input of date easier
            // duration: 2,
            calories: 222,
            stat1: 222,
            stat2: 222,
            notes: 'notes of a graphagra, lionger so it makes sense as a note',
        },
        {
            completed: 'false',
            type: 'running', //must be lower case, match case, or implement .tolowercase()
            date: '2021-01-01', //must be in this format to make coding the input of date easier
            // duration: 2,
            calories: 111,
            stat1: 111,
            stat2: 111,
            notes: 'notes of a graphagra, lionger so it makes sense as a note',
        },
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
function addExerciseListener(scheduledContainer) {
    document
        .getElementById('fixedAddButton')
        .addEventListener('click', function () {
            let exercise = document.createElement('exercise-card')
            let yourDate = new Date()

            exercise.data = {
                completed: 'false',
                type: '', //must be lower case, match case, or implement .tolowercase()
                date: yourDate.toISOString().split('T')[0], //must be in this format to make coding the input of date easier
                // duration: '',
                calories: '',
                stat1: '',
                stat2: '',
                notes: '',
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
function init() {
    // Populate page with 2 exercise cards
    const scheduledContainer = document.getElementById('scheduledContainer')
    const completedContainer = document.getElementById('completedContainer')

    let data = initializeStorage()

    // set exercise data
    data.forEach((element, index) => {
        let exercise = document.createElement('exercise-card')
        exercise.data = element
        if (element.completed === 'true') {
            completedContainer.appendChild(exercise)
        } else {
            scheduledContainer.appendChild(exercise)
        }
        exercise.shadowRoot
            .getElementById('checkBox')
            .addEventListener('change', document.updateData)
    })

    addExerciseListener(scheduledContainer)
}

// function: add to scheduled exercises
document.addToScheduled = function (exercise) {
    let scheduledContainer = document.getElementById('scheduledContainer')
    scheduledContainer.insertBefore(
        exercise,
        document.getElementById('insertPoint')
    )
}

// function: add to completed exercises
document.addToCompleted = function (exercise) {
    let completedContainer = document.getElementById('completedContainer')
    completedContainer.appendChild(exercise)
}

// function: saves current state of page & put it in local storage
document.updateData = function () {
    const scheduledContainer = document.getElementById('scheduledContainer')
    const completedContainer = document.getElementById('completedContainer')

    scheduledList = scheduledContainer.getElementsByTagName('exercise-card')
    completedList = completedContainer.getElementsByTagName('exercise-card')

    let newData = []

    for (var i = 0; i < scheduledList.length; i++) {
        newData.push(scheduledList[i].getData())
    }
    for (var i = 0; i < completedList.length; i++) {
        newData.push(completedList[i].getData())
    }

    localStorage.setItem('cards', JSON.stringify(newData))
}
