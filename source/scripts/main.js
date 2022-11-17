// Wait for window to load
window.addEventListener("DOMContentLoaded", init);

// Initialization function
function init() {

  // Populate page with 2 exercise cards
  const scheduledContainer = document.getElementById("scheduledContainer");
  const completedContainer = document.getElementById("completedContainer");

  let data = [{ 
    completed: "true",
    type: "cycling",    //must be lower case, match case, or implement .tolowercase()
    date: "2023-01-01", //must be in this format to make coding the input of date easier
    duration: 2,
    calories: 222,
    stat1: 222,
    stat2: 222,
    notes: "notes of a graphagra, lionger so it makes sense as a note"
  },
  { 
    completed: "false",
    type: "running",    //must be lower case, match case, or implement .tolowercase()
    date: "2021-01-01", //must be in this format to make coding the input of date easier
    duration: 2,
    calories: 111,
    stat1: 111,
    stat2: 111,
    notes: "notes of a graphagra, lionger so it makes sense as a note"
  }
]
  
  // set exercise data
  data.forEach((element, index) => {
    let exercise = document.createElement('exercise-card')
    exercise.data = element
    if (element.completed === 'true') {
      completedContainer.appendChild(exercise)
    } else {
      scheduledContainer.appendChild(exercise)
    }
  })
}