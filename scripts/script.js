// Hamburger Menu
const btn = document.getElementById("menu-btn");
const nav = document.getElementById("menu");

// Slider
const sliderContainer = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelector(".dots");

const testimonial = document.querySelectorAll(".testimonial");
const testimonials = document.querySelector(".testimonials");

btn.addEventListener("click", () => {
  btn.classList.toggle("open");
  nav.classList.toggle("flex");
  nav.classList.toggle("hidden");
});

// Slider
const slider = function () {
  // Functions
  const createDots = function () {
    dots.innerHTML = ""; // Clear existing dots
    slides.forEach(function (_, i) {
      dots.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot dot-remove" data-slide="${i}"></button>`,
      );
    });
  };

  const activateDot = function (slide) {
    // Remove active class and reset background color for all dots
    document.querySelectorAll(".dots__dot").forEach((dot) => {
      dot.classList.remove("dots__dot--active");
      dot.style.backgroundColor = "";
    });
    // Add active class and set background color for the active dot
    const activeDot = document.querySelector(
      `.dots__dot[data-slide="${slide}"]`,
    );
    if (activeDot) {
      activeDot.classList.add("dots__dot--active");
      activeDot.style.backgroundColor = "red";
    }
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`),
    );
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();

  // Event handlers
  dots.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

// Store original styles
const originalStyles = new Map();

// Function to add or remove classes and styles based on viewport width
const toggleClassesAndStyles = (width) => {
  const elements = [
    ...slides,
    sliderContainer,
    ...document.querySelectorAll(".dots__dot"),
  ];

  if (width >= 768) {
    elements.forEach((el) => {
      // Remove classes
      el.classList.remove("slider", "slide", "dots__dot", "dots__dot--active");

      // Store and remove styles
      if (!originalStyles.has(el)) {
        originalStyles.set(el, el.getAttribute("style"));
      }
      el.removeAttribute("style");
    });
  } else {
    slides.forEach((el) => {
      el.classList.add("slide");
      // Restore original style if it exists
      if (originalStyles.has(el)) {
        el.setAttribute("style", originalStyles.get(el) || "");
      }
    });
    sliderContainer.classList.add("slider");
    document.querySelectorAll(".dot-remove").forEach((el) => {
      el.classList.add("dots__dot");
      // Restore original style if it exists
      if (originalStyles.has(el)) {
        el.setAttribute("style", originalStyles.get(el) || "");
      }
    });
    const firstDot = document.querySelector('.dots__dot[data-slide="0"]');
    if (firstDot) {
      firstDot.classList.add("dots__dot--active");
      firstDot.style.backgroundColor = "red";
    }
  }
};

// Create a ResizeObserver
const resizeObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    const width = entry.contentRect.width;
    toggleClassesAndStyles(width);

    if (width < 768) {
      slider();
    }
  }
});

// Start observing the document's body
resizeObserver.observe(document.body);

// Initial call to set up the correct state
toggleClassesAndStyles(document.body.clientWidth);
if (document.body.clientWidth < 768) {
  slider();
}
