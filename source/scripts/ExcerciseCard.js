// ExerciseCard.js

class ExerciseCard extends HTMLElement {
  constructor () {
    super()

    const shadow = this.attachShadow({ mode: 'open' })
    const header = document.createElement('span')
    header.setAttribute('class', 'exerciseHeader')
    const content = document.createElement('div')
    content.setAttribute('class', 'exerciseContent')
    const style = document.createElement('style')
    shadow.appendChild(header)
    shadow.appendChild(content)
    shadow.appendChild(style)
  }

  /**
   * getter
   */
  get data () {
    return this._data
  }

  /**
   * setter
   * @param {Object} data - something funny
   */
  set data (data) {
    console.log('inside of setter function')

    // if (!data) return

    //     let data = {
    //       completed: "true",
    //       type: "Running",
    //       date: "1/1/2021",
    //       duration: "duration",
    //       calories: 100,
    //       stat1: "stat1",
    //       stat2: "stat2",
    //       notes: "notes",
    //     };

    //     let header = this.shadowRoot.querySelector(".exerciseHeader");
    //     console.log("header", header);
    //     header.innerHTML = `
    //         <input type="checkbox">
    //         <span>Exercise</span>
    //         <span>Date</span>
    //         <button className="expandButton"></button>
    //     `;
  }
}

// class ExerciseCard extends HTMLElement {
//   constructor() {
//     super();

//     const shadow = this.attachShadow({ mode: "open" });
//     const header = document.createElement("span");
//     header.setAttribute("class", "exerciseHeader");
//     const content = document.createElement("div");
//     content.setAttribute("class", "exerciseContent");
//     const style = document.createElement("style");
//     shadow.appendChild(header);
//     shadow.appendChild(content);
//     shadow.appendChild(style);
//   }

//   /**
//    * Takes in an array of recipes and for each recipe creates a
//    * new <recipe-card> element, adds the recipe data to that card
//    * using element.data = {...}, and then appends that new recipe
//    * to <main>
//    * @param {Object} dataArg An array of recipes
//    */
//   set data(dataArg) {
//     console.log("inside DATA setter");

//     if (!data) return;

//   }
// }

customElements.define('exercise-card', ExerciseCard)
