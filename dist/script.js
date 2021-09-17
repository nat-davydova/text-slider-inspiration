const slider = document.querySelector(".text-slider");
const slidesOptions = slider.querySelector("[data-options]");

function getAndPrepareSlides(slidesOptions) {
  const slidesOptionsList = slidesOptions.dataset.options;
  const slidesFromOptions = slidesOptionsList.split(", ");
  return slidesFromOptions;
}

function setInitialSlideStyles(slide, animat) {}

function setSlideIntoUI(slide) {
  const newSlideNode = document.createElement("span");
  newSlideNode.textContent = slide;

  newSlideNode.style.opacity = 0;
  newSlideNode.style.transition = "opacity .2s linear 0s";

  slidesOptions.innerHTML = "";
  slidesOptions.appendChild(newSlideNode);
  setTimeout(() => {
    newSlideNode.style.opacity = 1;
  }, 0);
}

function removeSlideFromUI() {
  const slide = slidesOptions.querySelector("span");
  setTimeout(() => {
    slide.style.opacity = 0;
  }, 1200);
}

function getCurrentSlideIndex() {
  const slideValue = slidesOptions.textContent;
  const slides = getAndPrepareSlides(slidesOptions);
  return slides.indexOf(slideValue);
}

function mapSlides(slides, ms) {
  setTimeout(function slider() {
    const currentSlideIndex = getCurrentSlideIndex();
    const newSlideIndex = slides[currentSlideIndex + 1] ?
    currentSlideIndex + 1 :
    0;

    setSlideIntoUI(slides[newSlideIndex]);
    removeSlideFromUI();

    setTimeout(slider, ms);
  }, ms);
}

function textSliderInit() {
  const slides = getAndPrepareSlides(slidesOptions);
  setSlideIntoUI(slides[0]);

  mapSlides(slides, 1500);
}

textSliderInit();