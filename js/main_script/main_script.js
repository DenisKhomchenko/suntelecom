/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 5039:
/***/ (function() {

window.animations = {
  documentHeight: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight),
  windowHeight: window.innerHeight,
  items: document.querySelectorAll('.jsAnimate'),
  activeClass: 'is-animate',
  init: function init() {
    var items = window.animations.items;

    for (var index = 0; index < items.length; index++) {
      var item = items[index];
      !item.getAttribute('data-observe-percent') ? item.setAttribute('data-observe-percent', '0') : '';
    }
  },
  update: function update() {
    var items = window.animations.items;
    var windowOffsetTop = window.pageYOffset;
    var windowOffsetBottom = windowOffsetTop + window.animations.windowHeight;

    var _loop = function _loop(index) {
      var item = items[index];
      var mode = item.getAttribute('data-observe-mode') ? item.getAttribute('data-observe-mode') : '1';
      var percent = item.getAttribute('data-observe-percent');
      var triggerPercent = item.getAttribute('data-observe-trigger') ? item.getAttribute('data-observe-trigger') : 25;
      var windowMultiplier = 1; // SIZES 

      var itemHeight = item.offsetHeight;
      var itemOffsetTop = item.offsetTop;
      var itemOffsetBottom = itemOffsetTop + itemHeight;
      var innerTop = itemOffsetBottom - windowOffsetTop;
      var innerBottom = windowOffsetBottom - itemOffsetTop;

      if (window.animations.windowHeight < itemHeight) {
        windowMultiplier = window.animations.windowHeight / itemHeight;
      }

      if (itemOffsetBottom >= windowOffsetTop && windowOffsetBottom >= itemOffsetTop) {
        var resultPercent = percent;

        if (mode == '1') {
          resultPercent = mode1();
        } else if (mode == '2') {
          resultPercent = mode2();
        } else if (mode == '3') {
          resultPercent = mode3();
        } else {
          resultPercent = mode1();
        }

        updateValues(resultPercent);
      }

      function mode1() {
        // MODE UpdateOneTime
        if (innerBottom <= itemHeight * windowMultiplier) {
          var temp = innerBottom / itemHeight * 100 / windowMultiplier;

          if (percent <= temp) {
            percent = temp;
          }
        } else if (innerTop <= itemHeight * windowMultiplier) {
          var _temp = innerTop / itemHeight * 100 / windowMultiplier;

          if (percent <= _temp) {
            percent = _temp;
          }
        } else {
          percent = 100;
        }

        return percent;
      }

      function mode2() {
        // MODE UpdateOnlyDown
        if (innerBottom <= itemHeight) {
          percent = innerBottom / itemHeight * 100 / windowMultiplier;
        } else {
          percent = 100;
        }

        return percent;
      }

      function mode3() {
        // MODE UpdateAlways
        if (innerBottom <= itemHeight * windowMultiplier) {
          percent = innerBottom / itemHeight * 100 / windowMultiplier;
        } else if (innerTop <= itemHeight * windowMultiplier) {
          percent = innerTop / itemHeight * 100 / windowMultiplier;
        } else {
          percent = 100;
        }

        return percent;
      }

      function updateValues(percent) {
        percent = Math.round(percent);
        item.setAttribute('data-observe-percent', percent);
        actions(percent);
      }

      function actions(percent) {
        if (percent >= triggerPercent) {
          item.classList.add(window.animations.activeClass);
        } else {
          item.classList.remove(window.animations.activeClass);
        }
      }
    };

    for (var index = 0; index < items.length; index++) {
      _loop(index);
    }
  }
};
document.addEventListener('DOMContentLoaded', function () {
  window.animations.init();
  setTimeout(function () {
    window.animations.update();
  }, 10);
});
document.addEventListener('scroll', function () {
  window.animations.documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
  window.animations.windowHeight = window.innerHeight;
  window.animations.update();
});

/***/ }),

/***/ 8450:
/***/ (function() {

document.addEventListener('DOMContentLoaded', function () {
  var windowHeight = window.innerHeight;

  if (document.querySelector('.jsHeader')) {
    window.header = {
      main: document.querySelector('.jsHeader'),
      menu: document.querySelector('.jsBurger'),
      burgerTrigger: document.querySelector('.jsBurgerTrigger'),
      burgerClose: document.querySelector('.jsBurgerClose'),
      rotateIndex: 0,
      rotate: function rotate(index) {
        index += 1;
        window.header.burgerTrigger.style.transform = 'rotate(' + index * 360 + 'deg)';
        return index;
      },
      open: function open() {
        window.header.main.classList.add('is-active');
        window.header.menu.classList.add('is-active');
        window.header.burgerTrigger.classList.add('is-active'); // document.querySelector('body').classList.add('_lock');

        window.header.rotateIndex = window.header.rotate(window.header.rotateIndex);
      },
      close: function close() {
        window.header.main.classList.remove('is-active');
        window.header.menu.classList.remove('is-active');
        window.header.burgerTrigger.classList.remove('is-active'); // document.querySelector('body').classList.remove('_lock');

        window.header.rotateIndex = window.header.rotate(window.header.rotateIndex);
      }
    };
    window.header.burgerTrigger.addEventListener('click', function () {
      if (window.header.main.classList.contains('is-active')) {
        window.header.close();
      } else {
        window.header.open();
      }
    });
    window.header.burgerClose.addEventListener('click', function () {
      if (window.header.main.classList.contains('is-active')) {
        window.header.close();
      }
    });
    document.addEventListener('click', function (e) {
      var target = e.target;

      if (window.header.main.classList.contains('is-active')) {
        if (!target.closest('.jsHeader')) {
          window.header.close();
        }
      }
    });
    document.addEventListener('scroll', function () {
      if (window.pageYOffset >= windowHeight * 0.25) {
        window.header.main.classList.add('is-fixed');
      } else {
        window.header.main.classList.remove('is-fixed');
      }
    });
  }
});

/***/ }),

/***/ 2685:
/***/ (function() {

document.addEventListener('DOMContentLoaded', function () {
  var jsTabs = document.querySelectorAll('.jsTabs');

  var _loop = function _loop(index) {
    var item = jsTabs[index];
    var link = item.querySelectorAll('.jsTabLink');
    var body = item.querySelectorAll('.jsTabItem');
    initTabs();

    var _loop2 = function _loop2(_index) {
      var thisLink = link[_index];
      var thisIndex = thisLink.getAttribute('data-tab');
      thisLink.addEventListener('click', function () {
        clear();
        thisLink.classList.add('is-active');

        if (item.querySelector('.jsTabItem[data-tab="' + thisIndex + '"]')) {
          item.querySelector('.jsTabItem[data-tab="' + thisIndex + '"]').classList.add('is-active');
        }
      });

      if (link.length < 2) {
        link[0].classList.add('is-active');

        if (item.querySelector('.jsTabItem[data-tab="' + link[0].getAttribute('data-tab') + '"]')) {
          item.querySelector('.jsTabItem[data-tab="' + link[0].getAttribute('data-tab') + '"]').classList.add('is-active');
        }
      }
    };

    for (var _index = 0; _index < link.length; _index++) {
      _loop2(_index);
    }

    function checkActveLink() {
      var activeLink = item.querySelector('.jsTabLink.is-active');
      var thisIndex = activeLink.getAttribute('data-tab');

      if (item.querySelector('.jsTabItem[data-tab="' + thisIndex + '"]')) {
        item.querySelector('.jsTabItem[data-tab="' + thisIndex + '"]').classList.add('is-active');
      }
    }

    function initTabs() {
      initGroup(link);
      initGroup(body);
      checkActveLink();

      function initGroup(group) {
        for (var _index2 = 0; _index2 < group.length; _index2++) {
          var groupItem = group[_index2];
          groupItem.setAttribute('data-tab', _index2);
        }
      }
    }

    function clear() {
      for (var _index3 = 0; _index3 < link.length; _index3++) {
        var linkItem = link[_index3];
        linkItem.classList.remove('is-active');
      }

      for (var _index4 = 0; _index4 < body.length; _index4++) {
        var bodyItem = body[_index4];
        bodyItem.classList.remove('is-active');
      }
    }
  };

  for (var index = 0; index < jsTabs.length; index++) {
    _loop(index);
  }
});

/***/ }),

/***/ 1465:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(5671);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(3144);
;// CONCATENATED MODULE: ./src/components/cookies/scripts.js



var Cookies = /*#__PURE__*/function () {
  function Cookies() {
    (0,classCallCheck/* default */.Z)(this, Cookies);

    if (!Cookies.hasCookiesAcceptation()) {
      this.initComponent();
    }
  }

  (0,createClass/* default */.Z)(Cookies, [{
    key: "initComponent",
    value: function initComponent() {
      this.buildTemplate();
      this.attachEvents();
    }
  }, {
    key: "buildTemplate",
    value: function buildTemplate() {
      this.element = document.createElement('div');
      this.element.classList.add('cookies');
      this.element.innerHTML = "\n        <div class=\"container\">\n            <div class=\"cookies__inner\">\n                <div class=\"text-lg text-bold cookies__text\">\u041C\u044B \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C cookie \u043D\u0430 \u043D\u0430\u0448\u0435\u043C \u0441\u0430\u0439\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043E\u043D \u0440\u0430\u0431\u043E\u0442\u0430\u043B \u0438\u0441\u043F\u0440\u0430\u0432\u043D\u043E</div>\n                <button class=\"button cookies__button jsCookiesButton\" type=\"button\">\n                    <span>\u0421\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u0438 \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u044E</span>\n                </button>\n            </div>\n        </div>\n        ";
      document.body.append(this.element);
      setTimeout(function () {
        document.querySelector('.cookies').classList.add('is-show');
      }, 2000);
    }
  }, {
    key: "attachEvents",
    value: function attachEvents() {
      var _this = this;

      document.querySelector('.jsCookiesButton').addEventListener('click', function (e) {
        Cookies.createEntity();
        document.querySelector('.cookies').classList.remove('is-show');
        setTimeout(function () {
          _this.element.remove();
        }, 750);
      });
    }
  }], [{
    key: "hasCookiesAcceptation",
    value: function hasCookiesAcceptation() {
      return window.localStorage.getItem('cookiesAcceptation');
    }
  }, {
    key: "createEntity",
    value: function createEntity() {
      window.localStorage.setItem('cookiesAcceptation', 'true');
    }
  }]);

  return Cookies;
}();

/* harmony default export */ var scripts = (Cookies);
// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.js
var jquery = __webpack_require__(9755);
var jquery_default = /*#__PURE__*/__webpack_require__.n(jquery);
// EXTERNAL MODULE: ./src/components/header/scripts.js
var header_scripts = __webpack_require__(8450);
// EXTERNAL MODULE: ./node_modules/bootstrap/dist/js/bootstrap.esm.js + 1 modules
var bootstrap_esm = __webpack_require__(4712);
;// CONCATENATED MODULE: ./src/components/modal/scripts.js

var modals = document.querySelectorAll('.modal');
var modalCallback = new bootstrap_esm/* Modal */.u_(document.querySelector('#callback')); // window.modals.list =  document.querySelectorAll('.modal');

document.addEventListener('DOMContentLoaded', function () {
  window.modal = {
    list: document.querySelectorAll('.modal')
  };

  for (var index = 0; index < window.modal.list.length; index++) {
    var item = window.modal.list[index];
    var id = item.getAttribute('id');
    var itemModal = new bootstrap_esm/* Modal */.u_(item);
    window.modal[id] = itemModal;
  }

  window.modal.list.forEach(function (e) {
    e.addEventListener('shown.bs.modal', function () {
      if (this.querySelector('[autofocus]')) {
        this.querySelector('[autofocus]').focus();
      }
    });
  }); // console.log(window.modal);
  // window.modal.callback.show()
  // window.modal.chanels.show()
  // window.modal.success.show()
  // window.modal.id.hide()
});
;// CONCATENATED MODULE: ./src/components/tooltip/scripts.js

var tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]'); // const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))

for (var index = 0; index < tooltipTriggerList.length; index++) {
  var item = tooltipTriggerList[index];
  var tooltip = new bootstrap_esm/* Tooltip */.u(item, {
    placement: 'top',
    html: true
  });
}
// EXTERNAL MODULE: ./node_modules/imask/esm/index.js + 21 modules
var esm = __webpack_require__(2647);
;// CONCATENATED MODULE: ./src/components/input/scripts.js

var regexpPhone = new RegExp('(7|8)\\s[\(][0-9]{3}[\)]\\s[0-9]{3}[\-][0-9]{2}[\-][0-9]{2}');
var regexpMail = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
var phoneElement = document.querySelectorAll('.jsPhoneMask');
var mailElement = document.querySelectorAll('.jsMailMask');
var phoneMaskSettings = {
  mask: [{
    mask: '8 (000) 000-00-00',
    startsWith: '8',
    lazy: true
  }, {
    mask: '+{7} (000) 000-00-00',
    startsWith: '7',
    lazy: true
  }, {
    mask: '+{7} (000) 000-00-00',
    startsWith: '',
    lazy: true
  }, {
    mask: '+{7} (000) 000-00-00',
    startsWith: '9',
    lazy: true
  }],
  dispatch: function dispatch(appended, dynamicMasked) {
    var number = (dynamicMasked.value + appended).replace(/\D/g, '');
    return dynamicMasked.compiledMasks.find(function (m) {
      return number.indexOf(m.startsWith) === 0;
    }) || this.dynamicMasked.compiledMasks[this.dynamicMasked.compiledMasks.length - 1];
  }
};

if (phoneElement.length > 0) {
  for (var i = 0; i < phoneElement.length; i++) {
    var mask = (0,esm/* default */.ZP)(phoneElement[i], phoneMaskSettings);
  }
}

var jsInput = document.querySelectorAll('.jsInput');

var _loop = function _loop(index) {
  var input = jsInput[index];

  input.onblur = function () {
    window.inputStatusRemove(input, 'focus');
  };

  input.onfocus = function () {
    window.inputStatusAdd(input, 'focus');
    window.inputStatusRemove(input, 'error');
  };
};

for (var scripts_index = 0; scripts_index < jsInput.length; scripts_index++) {
  _loop(scripts_index);
} // let mailInputs = document.querySelectorAll('.jsMailMask');
// for (let index = 0; index < mailInputs.length; index++){
//     let input = mailInputs[index];
//     input.addEventListener('input', function(){
//         let result = window.InputCheckMask(input, 'mail');
//         console.log(result);
//     })
// }
// Input status
// ????????????????:  'focus' ; 'error' ; 'fill' ; 'ok' ;
// window.inputStatusAdd(input, 'error')
// window.inputStatusRemove(input, 'error')


window.inputStatusAdd = function (input, status) {
  if (input.classList.contains('.input')) {
    input.classList.add('is-' + status);
  } else {
    input.closest('.input').classList.add('is-' + status);
  }
};

window.inputStatusRemove = function (input, status) {
  if (input.classList.contains('.input')) {
    input.classList.remove('is-' + status);
  } else {
    input.closest('.input').classList.remove('is-' + status);
  }
}; // Input masks
// ????????????????:  'mail' ; 'phone'
// window.InputCheckMask(input, 'mail')


window.InputCheckMask = function (input, type) {
  if (type === 'mail') {
    // console.log('mail');
    return regexpMail.test(input.value);
  }

  if (type === 'phone') {
    // console.log('phone');
    return regexpPhone.test(input.value);
  }
};

window.runMask = function () {
  var phoneElement = document.querySelectorAll('.jsPhoneMask');
  var phoneMaskSettings = {
    mask: [{
      mask: '8 (000) 000-00-00',
      startsWith: '8',
      lazy: true
    }, {
      mask: '+{7} (000) 000-00-00',
      startsWith: '7',
      lazy: true
    }, {
      mask: '+{7} (000) 000-00-00',
      startsWith: '',
      lazy: true
    }, {
      mask: '+{7} (000) 000-00-00',
      startsWith: '9',
      lazy: true
    }],
    dispatch: function dispatch(appended, dynamicMasked) {
      var number = (dynamicMasked.value + appended).replace(/\D/g, '');
      return dynamicMasked.compiledMasks.find(function (m) {
        return number.indexOf(m.startsWith) === 0;
      }) || this.dynamicMasked.compiledMasks[this.dynamicMasked.compiledMasks.length - 1];
    }
  };

  if (phoneElement.length > 0) {
    for (var _i = 0; _i < phoneElement.length; _i++) {
      var _mask = (0,esm/* default */.ZP)(phoneElement[_i], phoneMaskSettings);
    }
  }
}; // window.runMask() ?????????????????????? ??????????
// EXTERNAL MODULE: ./node_modules/sumoselect/jquery.sumoselect.js
var jquery_sumoselect = __webpack_require__(4102);
;// CONCATENATED MODULE: ./src/components/select/scripts.js



window.initSelect = function () {
  jquery_default()('.jsSelect').each(function () {
    var thisSelect = jquery_default()(this);
    var placeholder = thisSelect.attr('placeholder');
    thisSelect.SumoSelect({
      placeholder: placeholder
    });
  });
};

document.addEventListener('DOMContentLoaded', function () {
  window.initSelect();
});
// EXTERNAL MODULE: ./node_modules/swiper/swiper.esm.js + 88 modules
var swiper_esm = __webpack_require__(7099);
;// CONCATENATED MODULE: ./src/components/slider/scripts.js

var jsSliderPromo = new swiper_esm/* default */.ZP('.jsSliderPromo .slider__inner', {
  modules: [swiper_esm/* Navigation */.W_, swiper_esm/* Pagination */.tl, swiper_esm/* Autoplay */.pt],
  pagination: {
    el: ".jsSliderPromo .swiper-pagination",
    clickable: true,
    bulletClass: "slider__pagination-item"
  },
  navigation: {
    nextEl: '.jsSliderPromo .swiper-button-next',
    prevEl: '.jsSliderPromo .swiper-button-prev'
  },
  loop: true,
  slidesPerView: 1,
  speed: 900,
  breakpoints: {
    0: {
      spaceBetween: 20
    },
    834: {
      spaceBetween: 30
    },
    992: {
      spaceBetween: 40
    },
    1260: {
      spaceBetween: 60
    }
  }
});
var jsSliderArticles = new swiper_esm/* default */.ZP('.jsSliderArticles .slider__inner', {
  modules: [swiper_esm/* Navigation */.W_, swiper_esm/* Pagination */.tl, swiper_esm/* Autoplay */.pt],
  loop: false,
  slidesPerView: 1,
  speed: 900,
  pagination: {
    el: ".jsSliderArticles .swiper-pagination",
    clickable: true,
    bulletClass: "slider__pagination-item"
  },
  navigation: {
    nextEl: '.jsSliderArticles .swiper-button-next',
    prevEl: '.jsSliderArticles .swiper-button-prev'
  },
  breakpoints: {
    0: {
      spaceBetween: 20
    },
    834: {
      spaceBetween: 30
    },
    992: {
      spaceBetween: 40
    },
    1260: {
      spaceBetween: 60
    }
  }
});
var jsSliderArticlesList = new swiper_esm/* default */.ZP('.jsSliderArticlesList .slider__inner', {
  modules: [swiper_esm/* Autoplay */.pt],
  loop: false,
  slidesPerView: 4,
  speed: 750,
  autoplay: {
    delay: 8000
  },
  breakpoints: {
    0: {
      spaceBetween: 5,
      slidesPerView: 'auto',
      autoHeight: true
    },
    834: {
      slidesPerView: 2,
      spaceBetween: 20,
      autoHeight: false
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 24
    },
    1440: {
      slidesPerView: 4,
      spaceBetween: 25
    }
  }
});
var jsSliderListArticle = new swiper_esm/* default */.ZP('.jsSliderListArticle .slider__inner', {
  modules: [swiper_esm/* Pagination */.tl, swiper_esm/* Autoplay */.pt, swiper_esm/* EffectFade */.xW],
  loop: true,
  slidesPerView: 1,
  speed: 750,
  autoplay: {
    delay: 6000
  },
  pagination: {
    el: ".jsSliderListArticle .swiper-pagination",
    clickable: true,
    bulletClass: "slider__pagination-item"
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  }
});
var jsSliderEquipmentThumbs = new swiper_esm/* default */.ZP('.jsSliderEquipmentThumbs .slider__inner', {
  modules: [swiper_esm/* Thumbs */.o3, swiper_esm/* FreeMode */.Rv],
  slidesPerView: 'auto',
  speed: 500,
  direction: 'vertical',
  spaceBetween: 15,
  mousewheel: true,
  freeMode: true,
  breakpoints: {
    0: {
      direction: 'horizontal'
    },
    834: {
      direction: 'vertical'
    },
    992: {
      direction: 'horizontal'
    },
    1260: {
      direction: 'vertical'
    }
  }
});
var jsSliderEquipment = new swiper_esm/* default */.ZP('.jsSliderEquipment .slider__inner', {
  modules: [swiper_esm/* Thumbs */.o3, swiper_esm/* EffectFade */.xW, swiper_esm/* Mousewheel */.Gk],
  slidesPerView: 1,
  speed: 500,
  mousewheel: true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  thumbs: {
    swiper: jsSliderEquipmentThumbs
  }
});
document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('.jsSliderEquipmentThumbs')) {
    var items = document.querySelectorAll('.jsSliderEquipmentThumbs .swiper-slide');

    var _loop = function _loop(index) {
      var item = items[index];
      item.addEventListener('mouseover', function () {
        jsSliderEquipment.slideTo(index, 750);
      });
    };

    for (var index = 0; index < items.length; index++) {
      _loop(index);
    }
  }
}); // window.onload = function (){
//     if(document.querySelector('.jsSliderBadges')){
//         let badges = document.querySelectorAll('.jsSliderBadges');
//         for (let index = 0; index < badges.length; index++) {
//             const badge = badges[index];
//             const slider = new Swiper( badge.querySelector('.slider__inner'), {
//                 modules: [FreeMode],
//                 loop: false,
//                 slidesPerView: "auto",
//                 // spaceBetween: 20,
//                 freeMode: true,
//             });
//             let slides = badge.querySelectorAll('.swiper-slide');
//             for (let index = 0; index < slides.length; index++) {
//                 const slide = slides[index];
//                 let badge = slide.querySelector('.badge')
//                 if(badge.querySelector('input[checked]')){
//                     update(index);
//                 }
//                 if(badge.classList.contains('jsTabLink') && badge.classList.contains('is-active')){
//                     update(index);
//                 }
//             }
//             function update(realIndex){
//                 slider.slideTo(realIndex, 0)
//             }
//         }
//     }
// }
// EXTERNAL MODULE: ./src/components/tabs/scripts.js
var tabs_scripts = __webpack_require__(2685);
// EXTERNAL MODULE: ./node_modules/@fancyapps/ui/dist/fancybox.esm.js
var fancybox_esm = __webpack_require__(2689);
;// CONCATENATED MODULE: ./src/components/gallery/scripts.js

window.Fancybox = fancybox_esm/* Fancybox */.KR;
fancybox_esm/* Fancybox.bind */.KR.bind('[data-fancybox]', {
  Image: {
    zoom: false
  }
});
// EXTERNAL MODULE: ./src/components/animations/scripts.js
var animations_scripts = __webpack_require__(5039);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(4942);
// EXTERNAL MODULE: ./node_modules/gator/gator.js
var gator = __webpack_require__(4140);
var gator_default = /*#__PURE__*/__webpack_require__.n(gator);
// EXTERNAL MODULE: ./node_modules/yup/es/index.js + 23 modules
var es = __webpack_require__(1260);
;// CONCATENATED MODULE: ./src/components/validator/services.js

var MSG_LETTERS = '???????? ???? ?????????? ?????????????????? ??????????';
var MSG_REQUIRED = '???????? ?????????????????????? ?????? ????????????????????';
var MSG_TEXT = '???????? ???? ???????????? ?????????????????? ??????????';
var MSG_TEXT_MIN = '???????????????? ???? ?????????? ???????? ?????????? ????????????????';
var MSG_TEXT_MAX = '???????????????? ???? ?????????? ???????? ?????????? ??????????????';
var MSG_PHONE = '?????????????? ???????????????? ???? ??????????';
var MSG_EMAIL = 'Email ???????????????? ???? ??????????';
var MSG_NUMBER = '???????? ???????????? ?????????????????? ??????????';
var MSG_NUMBER_MIN = '???????????????? ???? ?????????? ???????? ????????????';
var MSG_NUMBER_MAX = '???????????????? ???? ?????????? ???????? ????????????';

var validateLetters = function validateLetters(value, min, max) {
  var lettersRegExp = /^[A-Z??-??a-z??-??\s]*$/;
  var scheme = es/* string */.Z_().trim().required(MSG_REQUIRED).matches(lettersRegExp, MSG_LETTERS).min(min, MSG_TEXT_MIN).max(max, MSG_TEXT_MAX);
  return scheme.isValidSync(value) ? 'valid' : 'invalid';
};

var validateText = function validateText(value, min, max) {
  var scheme = es/* string */.Z_(MSG_TEXT).trim().required(MSG_REQUIRED).min(min, MSG_TEXT_MIN).max(max, MSG_TEXT_MAX);
  return scheme.isValidSync(value) ? 'valid' : 'invalid';
};

var validatePhone = function validatePhone(value) {
  var phoneRegExp = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/;
  var scheme = es/* string */.Z_().trim().required(MSG_REQUIRED).matches(phoneRegExp, MSG_PHONE);
  return scheme.isValidSync(value) ? 'valid' : 'invalid';
};

var validateEmail = function validateEmail(value) {
  var scheme = es/* string */.Z_(MSG_TEXT).trim().required(MSG_REQUIRED).email(MSG_EMAIL);
  return scheme.isValidSync(value) ? 'valid' : 'invalid';
};

var validateNumber = function validateNumber(value, min, max) {
  var scheme = es/* number */.Rx(MSG_NUMBER).required(MSG_REQUIRED).min(min, MSG_NUMBER_MIN).max(max, MSG_NUMBER_MAX);
  return scheme.isValidSync(value) ? 'valid' : 'invalid';
};

var validateCheckbox = function validateCheckbox(value) {
  var scheme = es/* boolean */.O7().oneOf([true]);
  return scheme.isValidSync(value) ? 'valid' : 'invalid';
};

var validatorServices = {
  validateLetters: validateLetters,
  validateText: validateText,
  validatePhone: validatePhone,
  validateEmail: validateEmail,
  validateNumber: validateNumber,
  validateCheckbox: validateCheckbox
};
/* harmony default export */ var services = (validatorServices);
;// CONCATENATED MODULE: ./src/components/validator/view.js
var renderField = function renderField(validationState, node, invalidClass) {
  if (validationState === 'valid') {
    node.classList.remove(invalidClass);
  }

  if (validationState === 'invalid') {
    node.classList.add(invalidClass);
  }
};

var renderError = function renderError(validationState, node, visibilityClass) {
  var message = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

  if (validationState === 'valid') {
    node.classList.remove(visibilityClass);
    node.textContent = '';
  }

  if (validationState === 'invalid') {
    node.classList.add(visibilityClass);
    node.textContent = message;
  }
};

var validatorView = {
  renderField: renderField,
  renderError: renderError
};
/* harmony default export */ var view = (validatorView);
;// CONCATENATED MODULE: ./src/components/formValidator/init.js


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0,defineProperty/* default */.Z)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }




var INVALID_CLASS = 'form__field--invalid';
var ERROR_VISIBILITY_CLASS = 'form__error--visible';
var VALIDATION_SERVICES_MAP = {
  letters: function letters(_ref) {
    var value = _ref.value,
        min = _ref.min,
        max = _ref.max;
    return services.validateLetters(value, min, max);
  },
  number: function number(_ref2) {
    var value = _ref2.value,
        min = _ref2.min,
        max = _ref2.max;
    return services.validateNumber(value, min, max);
  },
  text: function text(_ref3) {
    var value = _ref3.value,
        min = _ref3.min,
        max = _ref3.max;
    return services.validateText(value, min, max);
  },
  phone: function phone(_ref4) {
    var value = _ref4.value;
    return services.validatePhone(value);
  },
  email: function email(_ref5) {
    var value = _ref5.value;
    return services.validateEmail(value);
  },
  check: function check(_ref6) {
    var value = _ref6.value;
    return services.validateCheckbox(value);
  }
};

var validateField = function validateField(input) {
  var inputBox = input.closest('[data-entity="v-field-box"]');
  var inputError = inputBox.querySelector('[data-entity="v-field-error"]');
  var inputValue = input.type !== 'checkbox' ? input.value : input.checked;
  var validator = {
    name: input.dataset.validator,
    options: {
      min: +input.dataset.min || 2,
      max: +input.dataset.max || 200
    }
  };
  var validatorName = validator.name,
      validatorOptions = validator.options;
  var validationService = VALIDATION_SERVICES_MAP[validatorName];
  var validationState = validationService(_objectSpread({
    value: inputValue
  }, validatorOptions));
  view.renderField(validationState, inputBox, INVALID_CLASS);

  if (inputError) {
    view.renderError(validationState, inputError, ERROR_VISIBILITY_CLASS, '???????? ?????????????????? ??????????????????????');
  }

  return validationState;
};

var validateForm = function validateForm(form) {
  var formValidationState = 'idle';
  var fields = Array.from(form.querySelectorAll('[data-entity="v-field"]'));
  fields.forEach(function (input) {
    var fieldValidationState = validateField(input);

    if (fieldValidationState === 'invalid') {
      formValidationState = 'invalid';
    }
  });
  return formValidationState;
};

var registerFormValidator = function registerFormValidator() {
  if (window.spiks) {
    window.spiks.FormManager = {
      attachEvents: function attachEvents(formNode) {
        gator_default()(formNode).on('input', '[data-entity="v-field"]', function (_ref7) {
          var target = _ref7.target;
          validateField(target);
        });
      },
      validate: function validate(formNode) {
        return validateForm(formNode) !== 'invalid';
      }
    };
  }
};

/* harmony default export */ var formValidator_init = (registerFormValidator);
;// CONCATENATED MODULE: ./src/init.js













var init = function init() {
  __webpack_require__.g.spiks = {};
  new scripts();
  formValidator_init();
  __webpack_require__.g.$ = (jquery_default());
};

/* harmony default export */ var src_init = (init);
;// CONCATENATED MODULE: ./src/script.js

src_init();

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/runtimeId */
/******/ 	!function() {
/******/ 		__webpack_require__.j = 940;
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			940: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkmarkup_starter_kit"] = self["webpackChunkmarkup_starter_kit"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [216], function() { return __webpack_require__(1465); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main_script.js.map