
// function to hide the navbar after 5 seconds of inactivity
function setNavbarHiding() {
  let timeout;
  let prevScrollPos = window.pageYOffset;
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    clearTimeout(timeout);
    navbar.style.top = '0';
    
    const currentScrollPos = window.pageYOffset;
    if (prevScrollPos < currentScrollPos) {
      navbar.style.top = '-50px'; // Adjust this value based on the navbar height
    }
    
    prevScrollPos = currentScrollPos;
    
    timeout = setTimeout(() => {
      navbar.style.top = '-50px'; // Adjust this value based on the navbar height
    }, 3000); // Set the timeout value (in milliseconds) before the navbar hides
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
    root.style.setProperty(first, secondaryColor);
    root.style.setProperty(second, primaryColor);
}

function setNightModeListener() {
  document.querySelector('input[name="black-and-white"]').addEventListener('change',(e)=>{
    switchCSSVariables('--background-night-mode','--text-night-mode')
    switchCSSVariables('--background-first-section','--text-first-section')
    switchCSSVariables('--background-second-section','--text-second-section')
  });
}

setNavbarHiding()
setNavLinksListeners()
setNightModeListener()