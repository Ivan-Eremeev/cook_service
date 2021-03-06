$(document).ready(function () {
  
  // Swiper
	if ($('#sliderBanners').length) {
		const sliderBanners = new Swiper('#sliderBanners', {
			slidesPerView: 1.16,
			speed: 1000,
			autoplay: {
				delay: 3000,
			},
			pagination: {
				el: '.slider__pagination',
				clickable: true,
			},
			breakpoints: {
				1200: {
					slidesPerView: 1,
					spaceBetween: 40
				}
			}
		});
	}

	if ($('#filterSlider').length) {
		const filterSlider = new Swiper('#filterSlider', {
			slidesPerView: 'auto',
			freeMode: true,
		});	

		// Делает активным пункт меню при скролле до блока
		function menuItemActive(menu) {
			var lastId,
				topMenu = menu,
				topMenuHeight = topMenu.outerHeight(),
				menuItems = topMenu.find("a"),
				scrollItems = menuItems.map(function () {
					var item = $($(this).attr("href"));
					if (item.length) { return item; }
				});
			menuItems.click(function (e) {
				var href = $(this).attr("href"),
					offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight - 100;
				$('html, body').stop().animate({
					scrollTop: offsetTop
				}, 300);
				e.preventDefault();
			});
			$(window).scroll(function () {
				var fromTop = $(this).scrollTop() + topMenuHeight;
				var cur = scrollItems.map(function () {
					if ($(this).offset().top < fromTop + 101)
						return this;
				});
				var index = cur.length;
				cur = cur[cur.length - 1];
				var id = cur && cur.length ? cur[0].id : "";
				if (lastId !== id) {
					lastId = id;
					menuItems
						.removeClass("active")
						.filter("[href='#" + id + "']").addClass("active");
					filterSlider.slideTo(index);
				}
			});
		};
		menuItemActive($('#filterSlider'));
		
	}

	if ($('#reccomendSlider').length) {
		const reccomendSlider = new Swiper('#reccomendSlider', {
			slidesPerView: 'auto',
			freeMode: true,
			spaceBetween: 10,
		});
	}

	if ($('#sliderDate').length) {
		const sliderDate = new Swiper('#sliderDate', {
			direction: "vertical",
			slidesPerView: 5,
			watchSlidesProgress: true,
			mousewheel: true,
		});
	}

	if ($('#sliderTime').length) {
		const sliderTime = new Swiper('#sliderTime', {
			direction: "vertical",
			slidesPerView: 5,
			watchSlidesProgress: true,
			mousewheel: true,
		});
	}

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

  // Stiky menu // Липкое меню. При прокрутке к элементу #menu добавляется класс .stiky который и стилизуем
  function stikyMenu() {
    const header = document.querySelector('#menu');

    if (header) {
      setNavbarPosition();

      window.addEventListener('scroll', () => {
        setNavbarPosition();
      });
    }

    function setNavbarPosition() {

      if (window.scrollY > header.offsetTop) {
        header.classList.add('stiky');
      } else {
        header.classList.remove('stiky');
      }

    }
  }
  stikyMenu();

  // Кнопка цены в карточке товара
	function clickToggle(block) {
		if (block.length) {
			block.on('click', function () {
				$(this).addClass('active');
			});
		}
	}
	clickToggle($('.js-click'));

  // Выпадайки при клике по кнопке
	// Задать блокам выпадайкам айдишник совпадающий с data-drop="" в кнопке для этого блока
	// Задать кнопкам .js-drop-btn и data-drop="" с айдишником блока выпадайки
	function dropBlock(btn) {
		var $this = undefined,
				drop = undefined,
				close = $('.js-drop-close');
		btn.on('click', function () {
			$this = $(this);
			drop = $('#' + $this.data('drop'));
			$this.toggleClass('is-active');
			drop.toggleClass('open');
			$(document).mouseup(function (e) {
				if (!$this.is(e.target)
					&& $this.has(e.target).length === 0
					&& !drop.is(e.target)
					&& drop.has(e.target).length === 0) {
					$this.removeClass('is-active');
					drop.removeClass('open');
				}
			});
		})
		close.on('click', function () {
			$('[data-drop="' + $(this).data('drop') +'"]').removeClass('is-active');
			$('#' + $(this).data('drop')).removeClass('open');
		})
	}
	dropBlock($('.js-drop-btn'));

  // Табы
	function tabs(tabs) {
		if (tabs.length) {
			tabs.each(function() {
				var trigger = $(this).find('.js-tabs-triggers').children(),
						content = $(this).find('.js-tabs-content').children(),
						time = 300;
				trigger.click(function () {
					var $this = $(this),
							index = $this.index();
					if (!$this.hasClass('active')) {
						trigger.removeClass('active');
						$this.addClass('active');
						content.removeClass('open').hide();
						content.eq(index).fadeIn(time, function () {$(this).addClass('open')});
					}else {
						return false;
					}
				});
			});
		}
	}
	tabs($('.js-tabs'));

	// JQuery Inputmask
	if ($('.js-cardNum-mask').length) {
		$('.js-cardNum-mask').inputmask("9999 9999 9999 9999");
	}
	if ($('.js-cardExpired-mask').length) {
		$('.js-cardExpired-mask').inputmask("99/99");
	}
	if ($('.js-phone-mask')) {
		$('.js-phone-mask').inputmask("+7(999)999-99-99");
	}
	if ($('.js-phone-code')) {
		$('.js-phone-code').inputmask("9 9 9 9");
	}


	// Плавающий placeholder в textarea
	function placeholderInTextarea() {
		const textarea = $('.js-textarea').find('textarea');
		textarea.each(function () { 
			let $this = $(this);
			$this.on('focus', function () {
				$(this).siblings('.js-textareaLabel').addClass('active');
			})
			$this.on('blur', function () {
				if ($(this).val() == "") {
					$(this).siblings('.js-textareaLabel').removeClass('active');
				}
			})
		});
	}
	placeholderInTextarea();

	function paySelect() {
		var input = $('.fillorder__dropinput');
		var text = $('.fillorder__val span');
		var icon = $('.fillorder__val-icon');
		input.on('change', function () {
			var $this = $(this);
			text.html($this.siblings('label').find('.fillorder__droptext').text());
			icon.html($this.siblings('label').find('.fillorder__dropicon').html());
			var id = $this.closest('.fillorder__drop').attr('id');
			$this.closest('.fillorder__drop').removeClass('open');
			$('[data-drop=' + id +']').removeClass('is-active');
		})
	}
	paySelect();

	// Модальное окно
	function modal(modal) {
		$('.modal-trigger').on('click', function(e) {
			var $this = $(this),
					data = $this.data('modal'),
					thisModal = $(data),
					exception = $('.js-exception');
			if (!exception.is(e.target)
				&& exception.has(e.target).length === 0) {
					modalShow(thisModal);
				}else {
					return false;
				}
		});
	};
	// Открытие модального окна
	function modalShow(thisModal) {
		var modalClose = thisModal.find('.js-modal-close'),
				modalBody = thisModal.find('.modal_body'),
				page = $('.page'),
				body = $('body');
		thisModal.addClass('open');
		body.addClass('lock');
		page.addClass('blur');
		modalClose.on('click', function() {
			modalHide(thisModal);
		});
		modalBody.on('click', function(e) {
			if ($(this).has(e.target).length === 0) {
				modalHide(thisModal);
			}
		});
	};
	// Закрытие модального окна
	function modalHide(thisModal) {
		var page = $('.page'),
				body = $('body');
		thisModal.removeClass('open');
		body.removeClass('lock');
		page.removeClass('blur');
	};
	modal($('.js-modal'));

	// Появление слайдера выбора даты доставки
	function dateSliderShow() {
		var timeNow = $('#timeNow')
		var timeAfter = $('#timeAfter');
		var sliders = $('.fillorder__dark-block--slider');
		timeAfter.on('change', function () {
			sliders.addClass('visible');
		});
		timeNow.on('change', function () {
			sliders.removeClass('visible');
		});
	}
	dateSliderShow();

	function textaraAutoheight() {
		$("textarea").each(function () {
			var textarea = $(this);
			this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
			var scrollHeight = this.scrollHeight;
			textarea.on("input", function () {
				console.log(scrollHeight);
				if (this.scrollHeight > scrollHeight) {
					this.style.height = "auto";
					this.style.height = (this.scrollHeight) + "px";
				}
			});
		});
	}
	textaraAutoheight();

});