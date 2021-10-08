const slider = document.querySelector(".text-slider");
const slidesOptions = slider.querySelector("[data-options]");
const animationTypeCustomizeElem = document.querySelector("#animation-type");
const slideDurationCustomizeElem = document.querySelector("#slide-duration");
const animationDurationCustomizeElem = document.querySelector(
"#animation-duration");


//!!! DEMO SCRIPTS, YOU DON'T NEED THEM
function getDropdownValue(input) {
  return input.value;
}

function getInitSliderParams() {
  const animationDuration = getDropdownValue(animationDurationCustomizeElem);

  const animationType = getDropdownValue(animationTypeCustomizeElem);

  const slideDuration = getDropdownValue(slideDurationCustomizeElem);

  return {
    animationDuration,
    animationType,
    slideDuration };

}

animationTypeCustomizeElem.addEventListener("change", () => {});

slideDurationCustomizeElem.addEventListener("change", () => {
  const currentValue = getDropdownValue(slideDurationCustomizeElem);
});

animationDurationCustomizeElem.addEventListener("change", () => {
  textSliderDestroy();
  const sliderParams = getInitSliderParams();
  textSliderInit(sliderParams);
});

//!!! SLIDER SCRIPTS, YOU NEED THEM
const sliderTimeouts = [];

function getAndPrepareSlides(slidesOptions) {
  const slidesOptionsList = slidesOptions.dataset.options;
  const slidesFromOptions = slidesOptionsList.split(", ");
  return slidesFromOptions;
}

function setSlideIntoUI(slide, animationDuration) {
  const newSlideNode = document.createElement("span");
  newSlideNode.textContent = slide;

  newSlideNode.style.opacity = 0;
  newSlideNode.style.transition = `opacity ${animationDuration}ms linear 0s`;

  slidesOptions.innerHTML = "";
  slidesOptions.appendChild(newSlideNode);
  setTimeout(() => {
    newSlideNode.style.opacity = 1;
  }, 0);
}

function removeSlideFromUI(slideDuration, animationDuration) {
  const slide = slidesOptions.querySelector("span");
  const msToOutSlide = slideDuration - animationDuration;
  setTimeout(() => {
    slide.style.opacity = 0;
  }, msToOutSlide);
}

function getCurrentSlideIndex() {
  const slideValue = slidesOptions.textContent;
  const slides = getAndPrepareSlides(slidesOptions);
  return slides.indexOf(slideValue);
}

function mapSlides(slides, slideDuration, animationDuration) {
  const outerTimeoutID = setTimeout(function slider() {
    const currentSlideIndex = getCurrentSlideIndex();
    const newSlideIndex = slides[currentSlideIndex + 1] ?
    currentSlideIndex + 1 :
    0;

    setSlideIntoUI(slides[newSlideIndex], animationDuration);
    removeSlideFromUI(slideDuration, animationDuration);

    const innerTimeoutID = setTimeout(slider, slideDuration);
    sliderTimeouts.push(innerTimeoutID);
  }, slideDuration);

  sliderTimeouts.push(outerTimeoutID);
}

function textSliderInit({ animationDuration }) {
  const slides = getAndPrepareSlides(slidesOptions);
  setSlideIntoUI(slides[0]);

  mapSlides(slides, 1500, animationDuration);
}

function clearTimeouts() {
  sliderTimeouts.forEach(timeoutID => clearTimeout(timeoutID));
}

function textSliderDestroy() {
  clearTimeouts();
  slidesOptions.innerHTML = "";
}

// INITING SLIDER
const sliderParams = getInitSliderParams();
textSliderInit(sliderParams);