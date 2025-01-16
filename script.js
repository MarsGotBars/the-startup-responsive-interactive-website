const selectElement = document.querySelector("select");

// theme stuff
const bodyTheme = document.body;
// Get initial theme from localStorage or system preference
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  const savedSelection = localStorage.getItem("selected");
  if (savedSelection) {
    selectElement.value = savedSelection;
  } else selectElement.selectedIndex = 2;

  if (savedTheme) return savedTheme;
  // Media query check in js in case of no localstorage present
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

// Set theme and save to localStorage
const setTheme = (theme) => {
  bodyTheme.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  // randomize on each call
  setRandomSecondaryColor();
};

// Listen for changes on the select element
selectElement.addEventListener("change", (event) => {
  const selectedValue = event.target.value; // Get the index of the selected option

  if (selectedValue === "os") {
    getOsTheme();
  } else {
    setTheme(selectedValue);
  }
  localStorage.setItem("selected", selectedValue);
});

const getOsTheme = () => {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(isDarkMode ? "dark" : "light");
};

// Listen for changes in system theme
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
systemTheme.addEventListener("change", (e) => {
  if (selectElement.value === "os")
    setTheme(e.target.matches ? "dark" : "light");
});

// Random color arrays
const lightThemeColors = ["--purple", "--blue", "--orange"];
const darkThemeColors = ["--green", "--yellow", "--pink"];

// Get a random color from the array
function getRandomColor(colorArray) {
  return colorArray[Math.floor(Math.random() * colorArray.length)];
}

// Apply random colors to the body --secondary property
function setRandomSecondaryColor() {
  // Main body (dark theme)
  const darkTheme = getRandomColor(darkThemeColors);
  document.body.style.setProperty("--secondary", `var(${darkTheme})`);
  document.body.style.setProperty("--selection", `var(${darkTheme})`);

  // Light theme body
  const lightBody = document.querySelector('body[data-theme="light"]');
  if (lightBody) {
    const lightTheme = getRandomColor(lightThemeColors);
    lightBody.style.setProperty("--secondary", `var(${lightTheme})`);
    lightBody.style.setProperty("--selection", `var(${lightTheme})`);
  }
}

// Run the function to set random colors
setRandomSecondaryColor();

// Quick access to the current theme, in case I need to expand on it in the future
const bodyThemeChecker = () => {
  const current = bodyTheme.getAttribute("data-theme");
  return current;
};

// Initial setup
setTheme(getInitialTheme());

// rotation stuff, only if on laptop or larger screen
const mediaQuery = window.matchMedia("(min-width: 1024px)");
const circle = document.getElementById("circle");
let isDragging = false;
let startAngle = 0;

function calculateAngle(e, element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const deltaX = e.clientX - centerX;
  const deltaY = e.clientY - centerY;
  return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
}

function handleMouseDown(e) {
  isDragging = true;
  startAngle =
    calculateAngle(e, circle) - (parseFloat(circle.dataset.rotation) || 0);
  circle.style.animationPlayState = "paused";
}

function handleMouseMove(e) {
  if (!isDragging) return;
  const currentAngle = calculateAngle(e, circle);
  const rotation = currentAngle - startAngle;
  circle.style.transform = `rotate(${rotation % 360}deg)`;
  circle.dataset.rotation = rotation % 360;
  document.body.style.setProperty("--rotation", `${360 + (rotation % 360)}deg`);
}

function handleMouseUp() {
  if (isDragging) {
    isDragging = false;
    circle.style.animationPlayState = "running";
  }
}

function addListeners() {
  circle.addEventListener("mousedown", handleMouseDown);
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
}

function removeListeners() {
  circle.removeEventListener("mousedown", handleMouseDown);
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
  // Reset any existing state
  isDragging = false;
  circle.style.animationPlayState = "running";
}

function handleScreenChange(e) {
  if (e.matches) {
    addListeners();
  } else {
    removeListeners();
  }
}

// Initial setup
handleScreenChange(mediaQuery);
mediaQuery.addEventListener("change", handleScreenChange);

// slider stuff
const sliderFigure = document.querySelector(".slider");
console.log(sliderFigure.children);

// get both buttons and set them on backward & forward
const [backwardButton, forwardButton] =
  sliderFigure.querySelectorAll(":scope > button");
backwardButton.addEventListener("click", () => {
  console.log("back to the future");
});
forwardButton.addEventListener("click", () => {
  console.log("forwards to the future");
});

const images = document.querySelectorAll(".slider img");
const caption = document.querySelector(".slide");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let currentSlide = Array.from(images).indexOf(entry.target);
        const imgNumber = currentSlide;
        const img = entry.target;
        caption.textContent = `${(imgNumber % 9) + 1}/9`;
        if (img.dataset.imageNumber === 9) {
          document.cloneNode.img;
        }
      }
    });
  },
  { threshold: 0.5 }
); // Trigger when 50% of the image is in view

images.forEach((img) => {
  observer.observe(img);
});
