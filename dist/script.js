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

function reInitSlider() {
  textSliderDestroy();
  const sliderParams = getInitSliderParams();
  textSliderInit(sliderParams);
}

animationTypeCustomizeElem.addEventListener("change", () => {
  reInitSlider();
});

slideDurationCustomizeElem.addEventListener("change", () => {
  reInitSlider();
});

animationDurationCustomizeElem.addEventListener("change", () => {
  reInitSlider();
});

//!!! SLIDER SCRIPTS, YOU NEED THEM
const ANIMATION_TYPES = {
  none: "none",
  opacity: "opacity",
  vertical: "vertical",
  right: "right" };


const sliderTimeouts = [];

function getAndPrepareSlides(slidesOptions) {
  const slidesOptionsList = slidesOptions.dataset.options;
  const slidesFromOptions = slidesOptionsList.split(", ");
  return slidesFromOptions;
}

function getSlideClassByAnimationType(animationType) {
  switch (animationType) {
    default:
      return "slide--animation-none";}

}

function setSlideIntoUI(slide, animationDuration, animationType) {
  console.log(animationType);
  const newSlideNode = document.createElement("span");
  newSlideNode.textContent = slide;

  newSlideNode.classList.add("slide");
  const slideAnimationClass = getSlideClassByAnimationType(animationType);
  newSlideNode.classList.add(slideAnimationClass);

  slidesOptions.innerHTML = "";
  slidesOptions.appendChild(newSlideNode);
  setTimeout(() => {
    newSlideNode.classList.add("is-visible");
  }, 0);
}

function removeSlideFromUI(slideDuration, animationDuration, animationType) {
  const slide = slidesOptions.querySelector("span");
  const msToOutSlide = slideDuration - animationDuration;
  setTimeout(() => {
    slide.classList.remove("is-visible");
  }, msToOutSlide);
}

function getCurrentSlideIndex() {
  const slideValue = slidesOptions.textContent;
  const slides = getAndPrepareSlides(slidesOptions);
  return slides.indexOf(slideValue);
}

function mapSlides(slides, slideDuration, animationDuration, animationType) {
  const outerTimeoutID = setTimeout(function slider() {
    const currentSlideIndex = getCurrentSlideIndex();
    const newSlideIndex = slides[currentSlideIndex + 1] ?
    currentSlideIndex + 1 :
    0;

    setSlideIntoUI(slides[newSlideIndex], animationDuration, animationType);
    removeSlideFromUI(slideDuration, animationDuration, animationType);

    const innerTimeoutID = setTimeout(slider, slideDuration);
    sliderTimeouts.push(innerTimeoutID);
  }, slideDuration);

  sliderTimeouts.push(outerTimeoutID);
}

function textSliderInit({ animationDuration, slideDuration, animationType }) {
  const slides = getAndPrepareSlides(slidesOptions);
  setSlideIntoUI(slides[0]);

  mapSlides(slides, slideDuration, animationDuration, animationType);
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