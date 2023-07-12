
// function to hide the navbar after 5 seconds of inactivity
function setNavbarHiding() {
  let timeout;
  let prevScrollPos = window.pageYOffset;
  const navbar = document.querySelector('.navbar');

  if (prevScrollPos == 0) {
    navbar.style.position = 'static'
  } else {
    navbar.style.position = 'fixed'
  }
  window.addEventListener('scroll', () => {
    clearTimeout(timeout);
    navbar.style.top = '0';
    
    const currentScrollPos = window.pageYOffset;
    if (prevScrollPos < currentScrollPos && currentScrollPos != 0) {
      navbar.style.top = '-50px'; // Adjust this value based on the navbar height
    } else if (currentScrollPos == 0) {
      navbar.style.position = 'static'
    } else {
      navbar.style.position = 'fixed'
    }
    
    console.log(`prevScrollPos = ${prevScrollPos}`)
    prevScrollPos = currentScrollPos;
    console.log(`currentScrollPos = ${currentScrollPos}`)
    
    timeout = setTimeout(() => {
      navbar.style.top = '-50px'; // Adjust this value based on the navbar height
    }, 5000); // Set the timeout value (in milliseconds) before the navbar hides
  });
}

function setNavLinksListeners() {
  document.querySelectorAll(".navbar-content a").forEach(a=>{
    a.addEventListener('click',(e)=>{
      document.querySelector('.active').classList.remove('active')
      a.classList.add('active');
    });
  })
}

function switchCSSVariables(first,second) {
    // Get the root element to access CSS variables
    const root = document.documentElement;
    
    // Get the current values of the CSS variables
    const primaryColor = getComputedStyle(root).getPropertyValue(first);
    const secondaryColor = getComputedStyle(root).getPropertyValue(second);
    
    // Swap the values of the CSS variables
    root.style.setProperty(first, firstOppositeColor);
    root.style.setProperty(second, secondOppositeColor);
}

function setNightModeListener() {
  document.querySelector('input[name="black-and-white"]').addEventListener('change',(e)=>{
    // switchCSSVariables('--background-night-mode','--text-night-mode')
    // switchCSSVariables('--background-first-section','--text-first-section')
    // switchCSSVariables('--background-second-section','--text-second-section')
    debugger
    switchToOppositeColor('--background')
    switchToOppositeColor('--text')
    switchToOppositeColor('--background-night-mode')
    switchToOppositeColor('--text-night-mode')
    switchToOppositeColor('--background-first-section')
    switchToOppositeColor('--text-first-section')
    switchToOppositeColor('--background-second-section')
    switchToOppositeColor('--text-second-section')
    switchToOppositeColor('--background-header-begin')
    switchToOppositeColor('--background-header-end')
    switchToOppositeColor('--background-card-begin')
    switchToOppositeColor('--background-card-end')
    switchToOppositeColor('--background-home')
    switchToOppositeColor('--background-selected')
    switchToOppositeColor('--background-footer-begin')
    switchToOppositeColor('--background-footer-end')
    switchToOppositeColor('--link-text')
    switchToOppositeColor('--hover-text')
    switchToOppositeColor('--text-home')
    switchToOppositeColor('--text-skills')
  });
}

function invertColor(rgbColor) {
  const bracketIndex = rgbColor.indexOf('(')+1
  debugger

  // Remove the "rgb(" and ")" parts of the color string
  const colorValues = rgbColor.slice(bracketIndex, -1).split(", ");
    
  // Convert the color values to integers
  const red = parseInt(colorValues[0]);
  const green = parseInt(colorValues[1]);
  const blue = parseInt(colorValues[2]);

  // Calculate the inverse color values
  const invertedRed = 255 - red;
  const invertedGreen = 255 - green;
  const invertedBlue = 255 - blue;

  // Return the inverse color as an RGB string
  if (bracketIndex==5) { // if color is rgba
    return `rgba(${invertedRed}, ${invertedGreen}, ${invertedBlue}, ${colorValues[3]})`;
  } else {// if color is rgb
    return `rgb(${invertedRed}, ${invertedGreen}, ${invertedBlue})`;
  }
}

function switchToOppositeColor(variable) {
  // Get the root element to access CSS variables
  const root = document.documentElement;
  
  // Get the current values of the CSS variables
  const primaryColor = getComputedStyle(root).getPropertyValue(variable);

  const firstOppositeColor = invertColor(primaryColor)

  root.style.setProperty(variable,firstOppositeColor)
}


setNavbarHiding()
setNavLinksListeners()
setNightModeListener()