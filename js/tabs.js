// Select all tab buttons
const tabButtons = document.querySelectorAll('.tabs-button')
const tabDetails = document.querySelectorAll('.tabs-detail')

// Add click listeners to each tab button
tabButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const clickedButton = event.currentTarget

    // Remove the "currently selected" class from all buttons and tabs
    tabButtons.forEach((btn) =>
      btn.classList.remove('currently-selected-button')
    )
    tabDetails.forEach((detail) =>
      detail.classList.remove('currently-selected-tab')
    )

    // Add the "currently selected" class to the clicked button
    clickedButton.classList.add('currently-selected-button')

    // Determine which tab to show based on button text
    // Example: "DJ Gear" → ".tabs-details-DJ"
    const tabName = clickedButton.textContent.trim().split(' ')[0]
    const selectedTab = document.querySelector(`.tabs-detail-${tabName}`)

    if (selectedTab) {
      selectedTab.classList.add('currently-selected-tab')
    }
  })
})

const reviewButtons = document.querySelectorAll('.reviews-button')
const reviewDetails = document.querySelectorAll('.reviews-details')

reviewButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const reviewId = button.dataset.review

    // Remove active classes
    reviewButtons.forEach((btn) =>
      btn.classList.remove('currently-review-button')
    )
    reviewDetails.forEach((detail) =>
      detail.classList.remove('currently-review-tab')
    )

    // Add active classes to clicked button and matching review
    button.classList.add('currently-review-button')
    document
      .querySelector(`.reviews-details[data-review="${reviewId}"]`)
      .classList.add('currently-review-tab')
  })
})
