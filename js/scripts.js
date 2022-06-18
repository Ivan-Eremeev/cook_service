$(document).ready(function () {
  
  // Swiper
  const sliderBanners = new Swiper('#sliderBanners', {
    slidesPerView: 1.16,
    pagination: {
      el: '.slider__pagination',
    },
    breakpoints: {
      1200: {
        slidesPerView: 1,
        spaceBetween: 40
      }
    }
  });

});