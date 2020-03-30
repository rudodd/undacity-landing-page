/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/

const sections = document.querySelectorAll('[data-nav]');
const navContainer = document.querySelector('#navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

function createNavItem(id, name) {
  const listItem = document.createElement('li');
  const link = document.createElement('a');
  link.setAttribute('class', 'menu__link');
  link.setAttribute('href', `#${id}`);
  link.innerText = name;
  listItem.appendChild(link);
  return listItem;
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

  // Build the nav
  function buildNav() {
    for (section of sections) {
      const sectionName = section.getAttribute('data-nav');
      const item = createNavItem(section.id, sectionName);
      navContainer.appendChild(item);
    }
  }

  // Add class 'active' to section when near top of viewport
  function setActive() {
    for (section of sections) {
      const sectionPosition = section.offsetTop - 100;
      const siblingPosition = section.nextElementSibling ? section.nextElementSibling.offsetTop - 100 : null;
      if ( sectionPosition < window.scrollY && (!section.nextElementSibling || (section.nextElementSibling && siblingPosition > window.scrollY))) {

        // Highlight section being viewed
        if (!section.classList.contains('active')) {
          section.classList.add('active');
        }

        // Add active state to nav
        if (!document.querySelector(`[href="#${section.id}"`).classList.contains('active')) {
          document.querySelector(`[href="#${section.id}"`).classList.add('active');
        }
      } else {
        section.classList.remove('active');
        document.querySelector(`[href="#${section.id}"`).classList.remove('active');
      }
    }
  }

  // Scroll to anchor ID using scrollTO event
  function scrollToSection(id) {
    const location = document.querySelector(`${id}`).offsetTop;
    window.scrollTo({
      top: location,
      left: 0,
      behavior: 'smooth'
    });
  }

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu
document.addEventListener('DOMContentLoaded', buildNav());

// Scroll to section on link click
window.addEventListener('scroll', function() {
  setActive();
});

// Set sections as active
for (link of document.querySelectorAll('.menu__link')) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    scrollToSection(id);
  });
}

