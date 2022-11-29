window.addEventListener('DOMContentLoaded', init)

function init () {
  console.log('in init')
  console.log('test')

  const main = document.getElementById('scheduledContainer')
  const exercise = document.createElement('exercise-card')

  //   exercise.setAttribute('data', { foo: 'bar'})
  exercise.data = { foo: 'bar' }

  console.log('main', main)
  main.appendChild(exercise)
}
