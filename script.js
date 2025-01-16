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

// Slider stuff
const slider = document.querySelector(".slider");
const images = document.querySelectorAll(".slider img");
const imageContainer = document.querySelector(".slider .container")
const caption = document.querySelector(".slide");
const slideAmount = images.length;

let globalCurrentSlide = 0;
const [backwardButton, forwardButton] = slider.querySelectorAll(":scope > button");

// Utility to set the active slide
const setActiveSlide = (slideIndex) => {
  images.forEach((img, index) => {
    img.classList.toggle("active", index === slideIndex);
  });
  updateCaption(slideIndex);
};

// Slide function
const slideFunc = (direction) => {
  globalCurrentSlide = (globalCurrentSlide + direction + slideAmount) % slideAmount;
  setActiveSlide(globalCurrentSlide);

  images[globalCurrentSlide].scrollIntoView({
    // Weirdly setting this to smooth fixes the jitter
    behavior: "smooth",
    block: "nearest",
    inline: "center",
  });
};

// Update caption text
const updateCaption = (slideIndex) => {
  caption.textContent = `${slideIndex + 1}/${slideAmount}`;
};

// Intersection observer to track visibility
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentSlide = Array.from(images).indexOf(entry.target);
        if (currentSlide !== globalCurrentSlide) {
          globalCurrentSlide = currentSlide;
          setActiveSlide(globalCurrentSlide);
        }
      }
    });
  },
  { threshold: 0.5 }
);

// Attach event listeners and initialize
backwardButton.addEventListener("click", () => slideFunc(-1));
forwardButton.addEventListener("click", () => slideFunc(1));
images.forEach((img) => observer.observe(img));

// Initialize initial state (First slide)
setActiveSlide(globalCurrentSlide);

let isMouseDown = false;
let startX;

// Only able to initiate when you click on the container
imageContainer.addEventListener('mousedown', (e) => {
  isMouseDown = true;
  startX = e.pageX;
  e.preventDefault();
});

document.addEventListener('mouseup', () => {
  isMouseDown = false;
});

// Set to document so you can keep mouse moving across the page
document.addEventListener('mousemove', (e) => {
  if (!isMouseDown) return;
  const moveX = e.pageX - startX;
  if (moveX > 100) {
    slideFunc(-1);
    // Reset the position
    startX = e.pageX;
  } else if (moveX < -100) {
    slideFunc(1);
    // Reset the position
    startX = e.pageX;
  }
});