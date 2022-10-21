import Swiper, { Navigation, Pagination, Autoplay, FreeMode, EffectCreative} from 'swiper';

const jsSlider = new Swiper('.jsSlider .slider__inner', {
	modules: [Navigation, Pagination, Autoplay],
	// autoplay: {
	// 	delay: 5000,
	// },
	pagination: {
		el: ".jsSlider .swiper-pagination",
		clickable: true,
		bulletClass: "slider__pagination-item",
	},
    navigation: {
        nextEl: '.jsSlider .swiper-button-next',
        prevEl: '.jsSlider .swiper-button-prev',
    },

	loop: false,
	slidesPerView: 1,
	speed: 600,

	// breakpoints: {
	// 	0:{
	// 		spaceBetween: 16,
	// 		slidesPerView: 1,
	// 	},
	// 	576: {
	// 		spaceBetween: 16,
	// 		slidesPerView: 1,
	// 	},
	// 	768: {
	// 		slidesPerView: "auto",
	// 		spaceBetween: 24,
	// 	},

	// 	992: {
	// 		spaceBetween: 24,
	// 	},
	// }
});