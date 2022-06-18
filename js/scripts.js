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

  // Изменение количества товара (плюс минус)
  function counter(block) {
    const counter = document.querySelectorAll(block);
    if (counter) {
      counter.forEach(element => {
        const minus = element.querySelector('.js-counter-minus');
        const plus = element.querySelector('.js-counter-plus');
        const inputWrap = element.querySelector('.js-counter-input');
        const input = inputWrap.querySelector('input');
        plus.addEventListener('click', () => {
          if (Number(input.value) < 999) {
            input.value = Number(input.value) + 1;
          }
        })
        minus.addEventListener('click', () => {
          if (Number(input.value) > 1) {
            input.value = Number(input.value) - 1;
          }
        })
        input.addEventListener('keyup', () => {
          input.value = input.value.replace(/[^\d]/g, '');
        })
        input.addEventListener('blur', () => {
          if (input.value == '' || input.value == 0) {
            input.value = 1;
          }
        })
      });
    }
  }
  counter('.js-counter');

  // Кнопка цены в карточке товара
	function clickToggle(block) {
		if (block.length) {
			block.on('click', function () {
				$(this).addClass('active');
			});
		}
	}
	clickToggle($('.js-click'));

});