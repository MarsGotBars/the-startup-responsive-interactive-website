// theme stuff
const bodyTheme = document.body;
// Get initial theme from localStorage or system preference
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) return savedTheme;
  // Media query check in js
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

// Set theme and save to localStorage
const setTheme = (theme) => {
  bodyTheme.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
};

// Initial setup
setTheme(getInitialTheme());

// Toggle scheme on click
// bodyTheme.addEventListener("click", () => {
//   const current = bodyTheme.getAttribute("data-theme");
//   setTheme(current === "dark" ? "light" : "dark");
// });
// rotation stuff, only if on laptop or larger screen
window.onload = () => {
  if (window.screen.width > 1024) {
    
    const circle = document.getElementById("circle");
    let isDragging = false;
    let startAngle = 0;

    function calculateAngle(e, element) {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      // making use of atan2 here to calculate the speed/rotation force necessary based on how close/far the mouse is from the center
      return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    }

    circle.addEventListener("mousedown", (e) => {
      isDragging = true;
      startAngle =
        calculateAngle(e, circle) - (parseFloat(circle.dataset.rotation) || 0);
      // Pause animation
      circle.style.animationPlayState = "paused";
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const currentAngle = calculateAngle(e, circle);
      const rotation = currentAngle - startAngle;
      // set rotation
      circle.style.transform = `rotate(${rotation % 360}deg)`;
      // storing rotation for next click/use
      circle.dataset.rotation = rotation % 360;
      // set property to correct for newly added/removed degrees
      document.body.style.setProperty(
        "--rotation",
        `${360 + (rotation % 360)}deg`
      );
    });

    document.addEventListener("mouseup", () => {
      if (isDragging) {
        isDragging = false;
        // Resume animation
        circle.style.animationPlayState = "running";
      }
    });
  }
};
