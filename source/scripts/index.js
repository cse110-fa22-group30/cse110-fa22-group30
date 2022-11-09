window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("in init");

  const main = document.getElementById("scheduledContainer");
  const exercise = document.createElement("exercise-card");
  
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

  console.log("main", main);
  main.appendChild(exercise);
}
