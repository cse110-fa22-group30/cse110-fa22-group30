// Wait for window to load
window.addEventListener("DOMContentLoaded", init);

// Initialization function
function init() {

  // Populate page with 2 exercise cards
  const main = document.getElementById("scheduledContainer");
  const exercise = document.createElement("exercise-card");
  const exercise2 = document.createElement("exercise-card");
  
  // set exercise data
  exercise.data = { 
    completed: "true",
    type: "running",    //must be lower case, match case, or implement .tolowercase()
    date: "2021-01-01", //must be in this format to make coding the input of date easier
    duration: 2,
    calories: 100,
    stat1: 123,
    stat2: 456,
    notes: "notes of a graphagra, lionger so it makes sense as a note"
  };

  exercise2.data = { 
    completed: "true",
    type: "cycling",    //must be lower case, match case, or implement .tolowercase()
    date: "2021-01-01", //must be in this format to make coding the input of date easier
    duration: 2,
    calories: 100,
    stat1: 123,
    stat2: 456,
    notes: "notes of a graphagra, lionger so it makes sense as a note"
  };

  // Append to page
  main.appendChild(exercise);
  main.appendChild(exercise2);
}