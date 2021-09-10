"use strict";
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
function getCurrentSlideIndex() {
    const slideValue = slidesOptions.innerHTML;
    const slides = getAndPrepareSlides(slidesOptions);
    return slides.indexOf(slideValue);
}
function mapSlides(slides, ms) {
    setTimeout(function slider() {
        const currentSlideIndex = getCurrentSlideIndex();
        const newSlideIndex = slides[currentSlideIndex + 1]
            ? currentSlideIndex + 1
            : 0;
        setSlideIntoUI(slides[newSlideIndex]);
        setTimeout(slider, ms);
    }, ms);
}
function textSliderInit() {
    const slides = getAndPrepareSlides(slidesOptions);
    setSlideIntoUI(slides[0]);
    mapSlides(slides, 1000);
}
textSliderInit();