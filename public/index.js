// JavaScript for hiding the navbar after 5 seconds of inactivity
let timeout;
let prevScrollPos = window.pageYOffset;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  clearTimeout(timeout);
  navbar.style.top = '0';
  
  const currentScrollPos = window.pageYOffset;
  if (prevScrollPos < currentScrollPos) {
    navbar.style.top = '-80px'; // Adjust this value based on the navbar height
  }
  
  prevScrollPos = currentScrollPos;
  
  timeout = setTimeout(() => {
    navbar.style.top = '-80px'; // Adjust this value based on the navbar height
  }, 3000); // Set the timeout value (in milliseconds) before the navbar hides
});