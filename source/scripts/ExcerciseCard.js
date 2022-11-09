// ExerciseCard.js

class ExerciseCard extends HTMLElement {
  constructor() {
    super();

    // create shadow dom
    const shadow = this.attachShadow({ mode: "open" });
    // mainContainer is the always visible section of exercise-card
    const mainContainer = document.createElement("div");
    mainContainer.setAttribute("class", "mainContainer");
    // header is the always visible section of exercise-card
    const header = document.createElement("span");
    header.setAttribute("class", "exerciseHeader");
    // header is the collapsible section of exercise-card
    const content = document.createElement("div");
    content.setAttribute("class", "exerciseContent");
    // import ExerciseCardStyle.css to shadow dom
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "source/style/ExerciseCardStyle.css");

    shadow.appendChild(mainContainer);
    mainContainer.appendChild(header);
    mainContainer.appendChild(content);
    shadow.appendChild(linkElem);
  }

  /**
   * @param {Object} data
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
    if (!data) return;

    // data dictionary for testing
    data = {
      completed: "true",
      type: "Running",
      date: "1/1/2021",
      duration: "duration",
      calories: 100,
      stat1: "stat1",
      stat2: "stat2",
      notes: "notes",
    };

    // set inner html for initial state (not edit) of the element
    let header = this.shadowRoot.querySelector(".exerciseHeader");
    let content = this.shadowRoot.querySelector(".exerciseContent");
    console.log("header", header);
    header.innerHTML = `
        <input type="checkbox" class="completedBox">
        <span class="exerciseName">Exercise</span>
        <span class="exerciseDate">Date</span>
        <button className="expandButton">Edit</button>
    `;
    content.innerHTML = `
        <div class="stats">
            <div>Duration: #minutes</div>
            <div>Calories: #calories</div>
            <div>Stats1: #stats1</div>
            <div>Stats2: #stats2</div>
        </div>
        <div class="span">
            <p>These are there the notes from the </p>
        </div>
    `;
  }
}

customElements.define("exercise-card", ExerciseCard);
