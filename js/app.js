//use strict mode to handle error
"use strict";
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
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
// selecting all sections in on array
const sections = document.querySelectorAll("section");
const navBarHolder = document.getElementById("navbar__list");
const pageHeader = document.querySelector(".page__header");
const toTopBtn = document.querySelector(".toTop");

//debugging
console.log(sections, navBarHolder);

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the navbar Sections
sections.forEach((section, sectionNumber) => {
  // create li for each section
  const navbarList = document.createElement("li");

  // create ancor tag for each li and add content + Href
  const navbarListAncor = document.createElement("a");
  navbarListAncor.textContent = `${section.dataset.nav}`;
  navbarListAncor.href = `#${section.id}`;

  //add menu__link class to a
  navbarListAncor.classList.add("menu__link");

  // append ancor tag inside each li
  navbarList.appendChild(navbarListAncor);

  // inseret the final li inside ul
  navBarHolder.append(navbarList);
  //debugging
  console.log(navbarList);
});
const menuLinks = document.querySelectorAll(".menu__link");
//varaible to handle setTimout function
let imHide = true;
// Add class 'active' to section when near top of viewport
const addActiveClass = function () {
  //out of context : i add the functionalty of hidding navBar and to top button here for better preformnce not best structure but good result
  //hide navbar if not scrolling so we will check first if it exist
  const pageHeaderHeight = pageHeader.style.top;
  pageHeader.style.top === "0px" ? (imHide = true) : (imHide = false);
  if (!imHide) setTimeout(hideNavBar, "5000");

  pageHeader.style.top = 0;
  //to top hide and appear
  if (window.pageYOffset > 100) {
    toTopBtn.style.bottom = "40px";
    toTopBtn.style.opacity = 100;
  } else {
    toTopBtn.style.bottom = "-50px";
    toTopBtn.style.opacity = 0;
  }
  sections.forEach((section, i) => {
    // getting top and bottom view for section
    const topSpace = section.getBoundingClientRect().top;
    const bottomSpace = section.getBoundingClientRect().bottom;
    // if the scetion in the view highlight both of section and its anchor link
    if (topSpace < 320 && bottomSpace > 300) {
      sections.forEach((nestedSec, i) => {
        // disable any highlight section while i'm scrolling to another section
        nestedSec.classList.remove("your-active-class");

        menuLinks.forEach((link) => {
          link.classList.remove("active__link");
        });
      });
      // active only the target section
      section.classList.add("your-active-class");
      menuLinks[i].classList.add("active__link");
    }
  });
};
//Turn on the function whenever the user scroll
window.addEventListener("scroll", addActiveClass);

// Scroll to anchor ID using scrollTO event
const smoothScrollHandler = function (event) {
  // disable the anchor action from html
  event.preventDefault();
  //store the clicked link id
  const href = this.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;

  scrollTo({
    //given extra space for section
    top: offsetTop - 30,
    behavior: "smooth",
  });
};
menuLinks.forEach((link) => {
  link.addEventListener("click", smoothScrollHandler);
});

// hide navigation bar if user not scroll anymore
function hideNavBar() {
  //store navBar hight
  const navBarHieght = pageHeader.getBoundingClientRect().height;
  // hide it
  pageHeader.style.top = -navBarHieght;
}
setTimeout(hideNavBar, "5000");
/**
 * End Main Functions
 * Begin Events
 *
 */

// to TOP SMOOTH SCROLL
const toTopSmoothScrollHandler = function (event) {
  // disable the anchor action from html
  event.preventDefault();
  //get body offset top

  const offsetTop = document.querySelector("body").offsetTop;

  scrollTo({
    //given extra space for section
    top: offsetTop - 30,
    behavior: "smooth",
  });
};
toTopBtn.addEventListener("click", toTopSmoothScrollHandler);
