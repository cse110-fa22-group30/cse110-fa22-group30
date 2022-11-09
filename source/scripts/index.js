window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("in init");

  const main = document.getElementById("scheduledContainer");
  const exercise = document.createElement("exercise-card");
  
  exercise.data = { foo: "bar" };

  console.log("main", main);
  main.appendChild(exercise);
}
