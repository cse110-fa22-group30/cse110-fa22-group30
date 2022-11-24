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
  if (localStorage.getItem('cards') == null) {
    localStorage.setItem('cards', JSON.stringify(data));
  }
  data = JSON.parse(localStorage.getItem("cards"))
  
  // set exercise data
  data.forEach((element, index) => {
    let exercise = document.createElement('exercise-card');
    exercise.data = element;
    if (element.completed === 'true') {
      completedContainer.appendChild(exercise)
    } else {
      scheduledContainer.appendChild(exercise)
    }
    exercise.shadowRoot.getElementById("checkBox").addEventListener("change", document.updateNReload);
  })

  document.getElementById("fixedAddButton").addEventListener("click", function() {
    let exercise = document.createElement('exercise-card');
    let yourDate = new Date()

    exercise.data = {
      completed: "false",
      type: "",    //must be lower case, match case, or implement .tolowercase()
      date: yourDate.toISOString().split('T')[0], //must be in this format to make coding the input of date easier
      duration: "",
      calories: "",
      stat1: "",
      stat2: "",
      notes: ""
      
    };
    exercise.shadowRoot.getElementById("checkBox").addEventListener("change", document.updateNReload);
    exercise.shadowRoot.getElementById("expandButton").click();
    exercise.shadowRoot.getElementById("editButton").click();
    scheduledContainer.insertBefore(exercise, document.getElementById("insertPoint"));
  })
}


//function: saves current state of page & put it in local storage, reloads
document.updateNReload = function() {
  
  const scheduledContainer = document.getElementById("scheduledContainer");
  const completedContainer = document.getElementById("completedContainer");

  scheduledList = scheduledContainer.getElementsByTagName("exercise-card");
  completedList = completedContainer.getElementsByTagName("exercise-card");

  let newData = [];
  
  for (var i = 0; i < scheduledList.length; i++) {
    console.log(scheduledList);
    newData.push(scheduledList[i].getData());
  }
  for (var i = 0; i < completedList.length; i++) {
    newData.push(completedList[i].getData());
  }

  console.log(newData);
  localStorage.setItem("cards", JSON.stringify(newData));
  setTimeout(() => {location.reload()}, 100);
}

//