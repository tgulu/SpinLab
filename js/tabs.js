// add a listener to buttons
const tabsButtonElement = document.querySelectorAll('.tabs-buttons')
tabsButtonElement.forEach(addPlanetButtonListener)

function addtabButtonListener(tabsButtonElement) {
  tabsButtonElement.addEventListener('click', tabButtonClick)
}

function tabButtonClick(event) {
  const clickedButton = event.currentTarget

  // generate the class of the selected planet's details element
  // for example: ".planet-details-Venus" or ".planet-details-Earth"
  const detailsElementCssSelector =
    '.planet-details-' + clickedButton.textContent

  // find this element
  const detailsElement = document.querySelector(detailsElementCssSelector)

  // remove selected state from all buttons
  tabsButtonElements.forEach(updateClickedButtonState)

  // remove selected state from all details elements
  const planetDetailElements = document.querySelectorAll('.planet-details')
  planetDetailElements.forEach(updatePlanetDetailState)

  // add selected state just to the clicked button
  detailsElement.classList.add('currently-selected-planet')
  clickedButton.classList.add('currently-selected-button')
}

function updateClickedButtonState(planetButtonElement) {
  planetButtonElement.classList.remove('currently-selected-button')
}

function updatePlanetDetailState(planetDetailElement) {
  planetDetailElement.classList.remove('currently-selected-planet')
}
