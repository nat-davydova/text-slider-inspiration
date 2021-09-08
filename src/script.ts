const slider = document.querySelector(".text-slider");
const slidesOptions = slider.querySelector("[data-options]");

function getAndPrepareSlides(slidesOptions) {
  const slidesOptionsList = slidesOptions.dataset.options;
  const slidesFromOptions = slidesOptionsList.split(", ");
  return slidesFromOptions;
}

function setSlideIntoUI(slide) {
  slidesOptions.innerHTML = slide;
}

function textSliderInit() {
  const slides = getAndPrepareSlides(slidesOptions);
  setSlideIntoUI(slides[0]);
}

textSliderInit();
