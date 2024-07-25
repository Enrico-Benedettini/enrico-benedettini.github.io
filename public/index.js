let timeout;

function createMobileButton() {
  // Check if the button already exists
  if (document.getElementById('navbar-toggle')) return;

  // Create the button element
  const toggleButton = document.createElement('button');
  toggleButton.classList.add('navbar-toggle');
  toggleButton.id = 'navbar-toggle';

  // Create the span elements for the bars
  for (let i = 0; i < 3; i++) {
    const bar = document.createElement('span');
    bar.classList.add('bar');
    toggleButton.appendChild(bar);
  }

  // Add the button to the navbar header
  const navbarHeader = document.querySelector('.navbar-header');
  navbarHeader.appendChild(toggleButton);

  // Add event listener to toggle the navbar links
  toggleButton.addEventListener('click', function() {
    const navbarLinks = document.getElementById('navbar-links');
    navbarLinks.classList.toggle('drop');
  });
}

function checkWindowSize() {
  if (window.innerWidth <= 768) {
    createMobileButton();
    setCardTurnListener();
  } else {
    // Remove the button if it exists and the window is resized to a larger size
    const toggleButton = document.getElementById('navbar-toggle');
    if (toggleButton) {
      toggleButton.remove();
      const navbarLinks = document.getElementById('navbar-links');
      navbarLinks.classList.remove('drop');
    }
  }
}

function handleScroll() {
  let prevScrollPos = window.pageYOffset;
  const navbar = document.querySelector('.navbar');
  // if (window.innerWidth > 768) {
    clearTimeout(timeout);
    navbar.style.top = '0';
    
    const currentScrollPos = window.pageYOffset;
    if (prevScrollPos < currentScrollPos && currentScrollPos != 0) {
      navbar.style.top = '-100px'; 
    } else if (currentScrollPos == 0) {
      navbar.style.position = 'static'
      navbar.classList.remove('shadow')
    } else {
      navbar.style.position = 'fixed'
      navbar.classList.add('shadow')
    }
    
    prevScrollPos = currentScrollPos;
    
    timeout = setTimeout(() => {
      navbar.style.top = '-100px'; 
    }, 5000); // Set the timeout value (in milliseconds) before the navbar hides

    const sections = document.querySelectorAll('section');
    // Section visibility logic
    sections.forEach(section => {
      if (section.id != 'contact') {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (currentScrollPos >= sectionTop - window.innerHeight && currentScrollPos < sectionTop + sectionHeight) {
          if (!section.classList.contains('fade-in')) {
            section.classList.add('fade-in');
            let ps = section.querySelectorAll('p');
            if (section.id!='skills'){
              ps.forEach((p, index) => {
                let delay = index * 1000;
                if (section.id == 'experience' || 'projects') {
                  delay = index * 200;
                }
                setTimeout(() => {
                  p.classList.add('typing-text');
                  setTimeout(() => {
                    p.style.borderRight = "0";
                  }, 2500); 
                }, delay);
              });
            }
          }
        }
      }
    });
  // }
}

// function to hide the navbar after 5 seconds of inactivity
function setNavbarHiding() {
  const navbar = document.querySelector('.navbar');

  if (window.innerWidth > 768) {
    if (window.pageYOffset == 0) {
      navbar.style.position = 'static'
    } else {
      navbar.style.position = 'fixed'
    }
  }

  window.addEventListener('scroll', handleScroll);
}

function setNavLinksListeners() {
  document.querySelectorAll(".navbar-links a").forEach(a=>{
    a.addEventListener('click',(e)=>{
      document.querySelector('.active').classList.remove('active')
      a.classList.add('active');
    });
  })
}

function setDropdownListeners() {
  let btns = document.querySelectorAll('.btn-dropdown');
  let dropdowns = document.querySelectorAll('.dropdown');
  for(let i=0; i<btns.length; i++) {
    btns[i].addEventListener('click', () => {
      showOrHideContent(btns[i],dropdowns[i]);
    });
  }
}

function showOrHideContent(btn, content) {
  if(btn.querySelector('i').classList.contains('fa-ellipsis')) {
    btn.innerHTML = `<i class="fa-solid fa-caret-up"></i>`;
    content.classList.remove('hidden');
    content.classList.add('fade-in');
    let ps = content.querySelectorAll('p');
    if (content.id!='skills'){
      ps.forEach((p, index) => {
        let delay = index * 1000;
        setTimeout(() => {
          p.classList.add('typing-text');
          setTimeout(() => {
            p.style.borderRight = "0";
          }, 2500);
        }, delay);
      });
    }
    if (content.classList.contains('fade-out')) {  
      content.classList.remove('fade-out');
    }
  } else {
    btn.innerHTML = `<i class="fa-solid fa-ellipsis"></i>`;
    content.classList.add('fade-out');
    if (content.classList.contains('fade-in')) {  
      content.classList.remove('fade-in');
    }
    let ps = content.querySelectorAll('p');
    if (content.id!='skills'){
      ps.forEach((p) => {
        p.classList.remove('typing-text')
      })
    }
    content.classList.add('hidden');
  }
}

function setNightModeListener() {
  let btn = document.querySelector('.night-mode-container')
  btn.addEventListener('click',(e)=>{
    let icon = btn.querySelector('i')
    if (icon.classList.contains("fa-moon")) {
      icon.classList.remove('fa-moon')
      icon.classList.add('fa-sun')
    } else {
      icon.classList.remove('fa-sun')
      icon.classList.add('fa-moon')
    }
    switchToOppositeColor('--background')
    switchToOppositeColor('--text')
    switchToOppositeColor('--background-night-mode')
    switchToOppositeColor('--text-night-mode')
    switchToOppositeColor('--text-first-section')
    switchToOppositeColor('--background-second-section')
    switchToOppositeColor('--text-second-section')
    switchToOppositeColor('--background-header-begin')
    switchToOppositeColor('--background-header-end')
    switchToOppositeColor('--background-card-begin')
    switchToOppositeColor('--background-card-end')
    switchToOppositeColor('--background-home')
    switchToOppositeColor('--background-hover')
    switchToOppositeColor('--background-selected')
    switchToOppositeColor('--background-footer-begin')
    switchToOppositeColor('--background-footer-end')
    switchToOppositeColor('--link-text')
    switchToOppositeColor('--hover-text')
    switchToOppositeColor('--text-home')
    switchToOppositeColor('--border-line')
    switchToOppositeColor('--background-minigames')
    switchToOppositeColor('--text-minigames')
    switchToOppositeColor('--background-button')
    switchToOppositeColor('--background-button-hover')
    switchToOppositeColor('--text-button')
  });
}

function invertColor(rgbColor) {
  const bracketIndex = rgbColor.indexOf('(')+1

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
  } else { // if color is rgb
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

function setToggleListener() {
  const toggleButton = document.getElementById('navbar-toggle');
  const navbarLinks = document.getElementById('navbar-links');

  if (toggleButton) { 
    toggleButton.addEventListener('click', function() {
      navbarLinks.classList.toggle('drop');
    });
  }
}

function setCardTurnListener() {
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      card.querySelector('.card-inner').classList.toggle('is-flipped');
    })
  });
}


checkWindowSize()
handleScroll()

window.addEventListener('resize', checkWindowSize);

document.addEventListener('DOMContentLoaded', function() {
  setNavbarHiding()
  setNavLinksListeners()
  setNightModeListener()
  setDropdownListeners()
  setCardTurnListener()
});