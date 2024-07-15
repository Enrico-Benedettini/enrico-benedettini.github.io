// import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
let dropdownContent = 
`
<div class="dropdown hidden">
<p>
    As of une 2024, I am actively looking for a job after completing my studies at <strong>USI</strong> in Lugano, Switzerland.
    Currently I'm located in Lugano, after spending an unhappy semester at <strong>EPFL</strong> in Lausanne,
    and another semester at <strong>ETH</strong> in Zürich, which both are institutions globally renowned for their academic excellence.
    
    Also, I was privileged to have received a <strong>scholarship</strong>
    for academic credit at my home university, <strong>USI</strong>, in Lugano.
    
    This further motivates me to strive for excellence in everything I undertake.
</p>

<br>
  
<p>
    My main interests lie in backend development, with a strong
    focus on <strong>algorithms and data structures</strong>.

    I find immense satisfaction in optimizing algorithms and
    ensuring they perform at their best, as this directly contributes
    to the overall efficiency and effectiveness of software systems.
</p>

<br>
  
<p>
    My ultimate career aspiration is to become a seasoned project manager.
    I am deeply committed to expanding my skills in both development and
    management, with the goal of overseeing and successfully delivering complex projects.
    strong knowledge
    Hard work and continuous improvement are fundamental values that drive me,
    and I am always eager to embrace challenges and seize opportunities for growth.
</p>

<br>
  
<p>
    In summary, I am a highly motivated and driven individual with
    a passion for <strong>programming</strong>, <strong>management</strong>, 
    and continuous learning. I am currently pursuing my studies
    at <strong>EPFL</strong>, leveraging my experiences from <strong>ETH</strong>
    and previous projects to excel in backend development.
    
    My goal is to further enhance my skills and knowledge to become 
    a proficient project manager, contributing
    to the success of ambitious and impactful initiatives.
</p>
</div>
`


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
      navbar.style.top = '-100px'; // Adjust this value based on the navbar height
    } else if (currentScrollPos == 0) {
      navbar.style.position = 'static'
      navbar.classList.remove('shadow')
    } else {
      navbar.style.position = 'fixed'
      navbar.classList.add('shadow')
    }
    
    prevScrollPos = currentScrollPos;
    
    timeout = setTimeout(() => {
      navbar.style.top = '-100px'; // Adjust this value based on the navbar height
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

function setDropdownListeners() {
  let btn = document.querySelector('.btn-dropdown');
  btn.addEventListener('click', () => {
    debugger
    let content = document.querySelector('.dropdown');
    if(content.classList.contains('hidden')) {
      content.classList.remove('hidden');
      btn.classList.add('hidden');
    } else {
      content.classList.add('hidden');
      btn.classList.remove('hidden');
    }
  });
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
    switchToOppositeColor('--text-skills')
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

async function createPdfFromString(content, title, author) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([500, 200]); // Set the page size (width and height)

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const { width, height } = page.getSize();
  const textSize = 12;
  
  const text = page.drawText(content, {
    x: 50,
    y: height - 50,
    size: textSize,
    font: font,
    color: rgb(0, 0, 0),
  });

  // Set metadata (title and author) for the PDF
  pdfDoc.setTitle(title || '');
  pdfDoc.setAuthor(author || '');

  const pdfBytes = await pdfDoc.save();
}

function automatizedWordsReplacer(src,positionName,recipientName,companyName,companyAddress,companyCity,companyState,companyCountry,companyZipCode) {
  // snippet of code found at https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today = dd + '/' + mm + '/' + yyyy;

  console.log(today)
  src = src.replace("[Date]", today)
  src = src.replaceAll("[Recipient's Name]", recipientName);
  src = src.replaceAll("[Position Name]", positionName);
  src = src.replaceAll("[Company Name]", companyName);
  src = src.replaceAll("[Company Address]", companyAddress);
  src = src.replace("[City, State, Country, ZIP Code]", `${companyCity}, ${companyState}, ${companyCountry}, ${companyZipCode}`)
  return src
}

function insertCompanyData() {
  // First, we take all the data from the input tags
  let companyData = document.querySelector('.company-data')
  let positionName = companyData.querySelector('input[name="position-name"]').value
  let recipientName = companyData.querySelector('input[name="recipient-name"]').value
  let companyName = companyData.querySelector('input[name="company-name"]').value
  let companyAddress = companyData.querySelector('input[name="company-address"]').value
  let companyCity = companyData.querySelector('input[name="company-city"]').value
  let companyState = companyData.querySelector('input[name="company-state"]').value
  let companyCountry = companyData.querySelector('input[name="company-country"]').value
  let companyZipCode = companyData.querySelector('input[name="company-zip-code"]').value
  let src = document.querySelector('textarea[name="source"]').value

  let result = automatizedWordsReplacer(src,positionName,recipientName,companyName,companyAddress,companyCity,companyState,companyCountry,companyZipCode)

  document.querySelector('textarea[name="result"]').value = result

  createPdfFromString(result,'CoverLetter','Enrico Benedettini')
}

function setInsertButtonListener() {
  document.querySelector(`input[name="insert"]`).addEventListener('click',()=>{
    insertCompanyData()
  })
}

setNavbarHiding()
setNavLinksListeners()
setNightModeListener()
setDropdownListeners()
// setInsertButtonListener()

let coverLetter = `
Enrico Benedettini
Via Zurigo 3
Lugano, Switzerland, 6900
enrico.benedettini@gmail.com
+39 3453329757
28/07/2023

[Recipient's Name]
[Company Name]
[Company Address]
[City, State, ZIP Code]

Dear [Recipient's Name],

I am writing to express my strong interest in the [Position Name] role at [Company Name]. As a final year student at Università della Svizzera italiana, with a passion for backend development and algorithms optimization, I am excited about the opportunity to contribute my skills and experiences to a dynamic software company like [Company Name].

Throughout my academic journey at ETH and EPFL, I have actively sought to apply my knowledge in real-world settings. At USI, I led a team of 5 developers in implementing authentication with OAuth2 APIs and achieving 97% code coverage with top-quality ratings. I also co-led a team of 14 in developing a Web-App, where I optimized backend performance using SpringBoot and enhanced frontend animations with Vue.js.

My proficiency extends to various technologies, including Java, C#, and frameworks like Vue.js. Additionally, I am currently exploring AI and machine learning, taking an introduction to Machine Learning this semester, which I believe will further complement my skill set.

I find immense joy in collaborating with teams, understanding the importance of the human side in driving successful projects. As I aspire to grow and learn continuously, I am particularly drawn to [Company Name]'s commitment to innovation and technological advancement.

I would welcome the opportunity to discuss how my experiences align with [Company Name]'s vision and how I can contribute to your continued success. Thank you for considering my application. I eagerly look forward to the possibility of joining your talented team.

Sincerely,

[Your Name]
`
