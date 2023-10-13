const isMobile = {
   Android: function () {
      return navigator.userAgent.match(/Android/i);
   },
   BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
   },
   iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   },
   Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
   },
   any: function () {
      return (
         isMobile.Android() ||
         isMobile.BlackBerry() ||
         isMobile.iOS() ||
         isMobile.Opera() ||
         isMobile.Windows());
   }
};
if (isMobile.any()) {
   document.body.classList.add('_touch');
} else {
   document.body.classList.add('_pc');
};

/* hover эффект */
if (document.querySelectorAll('.hover_effect_1').length > 0) {
   document.querySelectorAll('.hover_effect_1').forEach(e => {
      e.addEventListener('mousemove', function (event) {
         if (event.target.closest('.hover_effect_1')) {
            event.target.closest('.hover_effect_1').style.setProperty('--x', event.layerX + 'px');
            event.target.closest('.hover_effect_1').style.setProperty('--y', event.layerY + 'px');
         }
      })
   })
}


if (document.querySelector('.header')) {

   let headerNav = document.querySelector('.header__nav');
   let fonMenu = document.querySelector('.header__nav-fon-menu');
   let fonMenuIn = document.querySelector('.header__nav-fon-menu-in');
   let fonMenuArrow = document.querySelector('.header__nav-fon-menu-arrow');
   let newSubmenu = document.querySelectorAll('.new-submenu');

   if (document.querySelector('.header__nav')) {
      headerNav.addEventListener('mouseover', openNavMenu);
      headerNav.addEventListener('mouseleave', closeNavMenu);
   }

   const mediaQuery = window.matchMedia('(max-width: 766.98px)'); /* медиазапрос (для меню) */

   function openMenu(event) {
      let siseSubmenu = event.target.closest('._with-submenu').querySelector('.new-submenu-lists').clientHeight;
      fonMenu.style.opacity = "1";
      fonMenuIn.style.height = siseSubmenu + 28 + 'px';
      fonMenuArrow.style.left = -fonMenu.offsetLeft + event.target.closest('._with-submenu-button').offsetLeft + event.target.closest('._with-submenu-button').clientWidth / 2 + 'px';
      newSubmenu.forEach(e => {
         if (e == event.target.closest('._with-submenu').querySelector('.new-submenu')) {
            e.style.opacity = '1';
            e.style.transform = 'translate(0px, 0px)';
            e.style.pointerEvents = 'all';
         } else {
            e.style.opacity = '0';
            e.style.pointerEvents = 'none';
            if (e.classList.contains('submenu-left')) {
               e.style.transform = 'translate(-30px, 0px)';
            } else {
               e.style.transform = 'translate(30px, 0px)';
            }
         }
      })
   }
   function closeMenu(event) {
      newSubmenu.forEach(e => {
         e.style.opacity = '';
         e.style.pointerEvents = '';
         e.style.transform = '';
      })
      fonMenu.style.opacity = "0";
   }
   function openNavMenu(event) {
      /* больше 766,98 px */
      if (!mediaQuery.matches) {
         if (event.target.closest('._with-submenu-button')) {
            openMenu(event);
         }
      }
   }
   function closeNavMenu(event) {
      if (!mediaQuery.matches) {
         closeMenu(event);
      }
   }

   /* копирование HTML ссылки с значком passimpay */
   if (document.querySelector('.passimpay-icons__item-button-copy')) {
      let iconsButtonCopy = document.querySelectorAll('.passimpay-icons__item-button-copy');
      document.querySelector('.passimpay-icons').addEventListener('click', (event) => {
         if (event.target.closest('.passimpay-icons__item-button-copy')) {
            let textCopy = `<a href="https://passimpay.io/">${event.target.closest('.passimpay-icons__item').querySelector('.passimpay-icons__item-image').innerHTML}</a>`;
            navigator.clipboard.writeText(textCopy)
               .then(() => {
                  console.log('Text copied to clipboard');
               })
               .catch(err => {
                  console.error('Error in copying text: ', err);
               });
         }
      })
   }
   /* перемещение кнопки "язык/валюта" */
   function langMove() {
      if (mediaQuery.matches) {
         document.querySelector('.header__logo').after(document.querySelector('.header__lang'))
      } else if (!mediaQuery.matches && window.innerWidth < 1257) {
         document.querySelector('.mobile-header__inner').prepend(document.querySelector('.header__lang'))
      }
   }
   if (document.querySelector('.header__lang')) {
      langMove();
      window.addEventListener('resize', () => langMove());
   }
}
/* модальное окно "язык/валюта" */
if (document.querySelector('#language')) {
   let inputSearch = document.forms.search_language.elements.input_search;
   let modalTabs = document.querySelectorAll('.modal_tabs');
   let currencyListLink = document.querySelectorAll('.currency__list-link');
   let languageModalTitle = document.querySelector('.language-modal_title');
   let modalTitleButton = document.querySelectorAll('.modal_title_button');
   let modalTabsWrapper = document.querySelector('.modal-tabs__wrapper');
   /* полоса подчёркивания */
   function languageModal() {
      languageModalTitle.style.setProperty('--l', document.querySelector('.modal_title_button-active').offsetLeft + 'px');
      languageModalTitle.style.setProperty('--w', document.querySelector('.modal_title_button-active').clientWidth + 'px');
   }
   /* высота табов */
   function modalTabsVisible() { modalTabsWrapper.style.height = document.querySelector('.modal_tabs-visible').clientHeight + parseInt(getComputedStyle(document.querySelector('.modal_tabs-visible')).marginTop) + parseInt(getComputedStyle(document.querySelector('.modal_tabs-visible')).marginBottom) + 'px'; }
   window.addEventListener('resize', e => {
      setTimeout(languageModal, 400);
      modalTabsVisible();
   });
   document.body.addEventListener('click', (event) => {
      if (event.target.closest('.lang')) {
         setTimeout(languageModal, 0);
         setTimeout(modalTabsVisible, 0);
      }
      /* выбор валюты */
      if (event.target.closest('.currency__list-link')) {
         currencyListLink.forEach((e) => { e.classList.toggle('currency__check', e == event.target.closest('.currency__list-link')) })
      }
      /* смена табов */
      if (event.target.closest('.modal_title_button')) {
         let dataNamber = event.target.closest('.modal_title_button').dataset.modalnamber;
         /* смена заголовка табов */
         modalTitleButton.forEach(e => { e.classList.toggle('modal_title_button-active', e == event.target.closest('.modal_title_button')) })
         setTimeout(languageModal, 400)
         /* смена вкладки табов */
         modalTabs.forEach(e => {
            if (e.dataset.modal == dataNamber) {
               e.classList.add('modal_tabs-visible');
            } else {
               e.classList.remove('modal_tabs-visible');
            }
         });
         modalTabsVisible();
      }
      /* очистка поля поиска */
      if (event.target.closest('.modal_search_clear-icon')) {
         inputSearch.value = '';
      }
   })
}

if (document.querySelector('.review-bitcoin')) {
   let reviewBitcoinSchedule = document.querySelectorAll('.review-bitcoin__schedule');
   document.body.addEventListener('click', (event) => {
      /* открывает модальное "обзор bitcoin" */
      if (event.target.closest('.cr_item')) {
         document.querySelector('.review-bitcoin').classList.add('review-bitcoin-visible');
         document.querySelector('body').style.overflow = 'hidden';
      } else if (!event.target.closest('.review-bitcoin__shell') || event.target.closest('.btn_close_modal')) {
         document.querySelector('.review-bitcoin').classList.remove('review-bitcoin-visible');
         document.querySelector('body').style.overflow = 'visible';
      }
      /* переключение табов в модальном окне */
      if (event.target.closest('.review-bitcoin__tabs-item')) {
         let namber = event.target.closest('.review-bitcoin__tabs-item').dataset.review;
         reviewBitcoinSchedule.forEach(e => { e.classList.toggle('review-bitcoin__schedule-hidden', e.dataset.schedule == namber) })
      }
   })
}


/* перемещение ссылки пользователького соглашения */
window.addEventListener('resize', function () {
   if (document.querySelector('.agreement')) {
      if (document.body.clientWidth <= 1100) {
         document.querySelector('.wrap_main').after(document.querySelector('.agreement'));
      } else {
         document.querySelector('.left-shell').append(document.querySelector('.agreement'));
      }
   }
})

/* обучалка в payments.html */
if (document.querySelector('.education__body')) {
   let educationBody = document.querySelector('.education__body');
   let educationElement = document.querySelectorAll('.education-element');
   let educationCard = document.querySelectorAll('.education__card');
   function cardShow(edcard) {
      let card;
      /* открывает нужное окно */
      educationCard.forEach((e) => {
         if (e.dataset.edcard == edcard) {
            card = e;
            e.style.display = 'block';
         } else { e.style.display = 'none' }
      });
      educationElement.forEach((e) => {
         if (e.dataset.edelement == edcard) {
            /* координаты и размер области которую описывает карточка */
            let coordinatesX = e.offsetLeft;
            let coordinatesY = e.offsetTop;
            let blockW = e.clientWidth;
            let blockH = e.clientHeight;
            /*  позиционирование карточки */
            card.style.left = coordinatesX + 'px';
            card.style.top = coordinatesY + blockH + 10 + 'px';
            /* если карточка не помещается внизу общего блока, то отображается сверху области */
            if (coordinatesX + card.clientWidth >= educationBody.clientWidth) {
               card.style.left = '5px';
            }
            /* перемещение треугольника, указателя в карточки, вниз */
            if (coordinatesY + blockH + 10 + card.clientHeight >= educationBody.clientHeight) {
               card.style.top = coordinatesY - card.clientHeight - 20 + 'px';
               card.querySelector('.education__card-triangle').style.transform = 'rotate(180deg)';
               card.querySelector('.education__card-triangle').style.top = card.clientHeight - 9 + 'px';
            } else {
               card.querySelector('.education__card-triangle').style = '';
            }
            /* подсвeтка области */
            educationBody.style.cssText = `
            --hole-sl:${coordinatesX}px;
            --hole-el:${coordinatesX + blockW}px;
            --hole-st:${coordinatesY}px;
            --hole-et:${coordinatesY + blockH}px;
            `;
            if (card.getBoundingClientRect().top < 0) {
               card.scrollIntoView(true)
            }
            if (card.getBoundingClientRect().top + card.clientHeight > window.innerHeight) {
               card.scrollIntoView(false)
            }
         }
      })
   }

   cardShow("0");

   educationBody.addEventListener('click', function (event) {

      if (event.target.closest('.education__card-buttons-right')) {
         let edcard = event.target.closest('.education__card').dataset.edcard;
         edcard = +edcard + 1;
         if (edcard <= educationCard.length - 1) {
            cardShow(edcard);
         } else {
            educationBody.style.display = 'none';
         }
      }
      if (event.target.closest('.education__card-buttons-left')) {
         let edcard = event.target.closest('.education__card').dataset.edcard;
         edcard = +edcard - 1;
         if (edcard >= 0) {
            cardShow(edcard);
         } else {
            cardShow('0');
         }
      }
      if (event.target.closest('.education__back')) {
         educationBody.style.display = 'none';
      }
      if (event.target.closest('.education__card-header-close-button')) {
         educationBody.style.display = 'none';
      }
   })
}

/* отображение количества символов в input "input-lenght" */
if (document.querySelectorAll('.input-lenght')) {
   const inputLenght = document.querySelectorAll('.input-lenght');
   inputLenght.forEach(e => e.addEventListener('input', function (event) {
      let n = event.target.getAttribute('maxlength');
      if (event.target.value.length > n) { event.target.value = event.target.value.slice(0, n) }
      event.target.closest('.input-lenght-dody').querySelector('.input-lenght-namber').innerHTML = event.target.value.length;

   }))
}

/* не даёт удалить из input начало строки  в "Отображать социальные ссылки" */
if (document.querySelector('.minvalue')) {
   let minvalue = document.querySelectorAll('.minvalue');
   function setValue(e) {
      let v = e.dataset.minvalue;
      let c;
      return () => {
         if (e.selectionStart < v.length || e.value.search(v) !== 0) { e.value = c ? c : v; }
         if (e.value.search(v) == 0) { c = e.value };
      }
   }
   minvalue.forEach((e) => { e.addEventListener('input', setValue(e)) });
}

if (document.querySelector('.story-body')) {
   let storyBody = document.querySelector('.story-body')
   let storyTabs = document.querySelector('.story-tabs');
   let storyContentBody = document.querySelectorAll('.story-content__body');
   let storyPageTabsItem = document.querySelectorAll('.story-page__tabs-item');
   let storyPageContent = document.querySelectorAll('.story-page__content');
   let storyPageTabs = document.querySelector('.story-page__tabs');
   let storyPageKeyCode = document.querySelector('.story-page__key-code');
   let storyPageKeyHidden = document.querySelector('.story-page__key-hidden');
   let storyPageKeyVisible = document.querySelector('.story-page__key-visible');
   let storyEventsShell = document.querySelector('.story-events-shell');
   let blockSelectImage;
   function lineTabsStory() {
      storyPageTabs.style.setProperty('--l', document.querySelector('.story-tab-active').offsetLeft + 'px');
      storyPageTabs.style.setProperty('--w', document.querySelector('.story-tab-active').clientWidth + 'px');
   }
   storyBody.addEventListener('click', function (event) {
      /* главные табы */
      if (event.target.closest('.story-tabs__button')) {
         let n = event.target.closest('.story-tabs__button').dataset.tabsbutton;
         storyContentBody.forEach((e) => {
            if (e.dataset.storycontent == n) {
               e.style.display = 'block';
               lineTabsStory();
            } else {
               e.style.display = 'none';
            }
         })
      }
      /* табы в "страница донат" */
      if (event.target.closest('.story-page__tabs-item')) {
         let n = event.target.closest('.story-page__tabs-item').dataset.pagetab;
         storyPageContent.forEach((e) => {
            if (e.dataset.pagecontent == n) {
               e.style.display = 'block';
            } else {
               e.style.display = 'none';
            }
         })
         storyPageTabsItem.forEach((e) => {
            e.classList.toggle('story-tab-active', e == event.target.closest('.story-page__tabs-item'))
         })
         lineTabsStory()
      }
      /* открывает gallery */
      if (event.target.closest('.open-gallery')) {
         document.querySelector('.gallery').style.display = 'flex';
         /* записывает путь к блоку, в котором отрывалась галерея */
         blockSelectImage = event.target.closest('.story-decor__select-image');
         lineTabsGalery();
         document.documentElement.style.overflow = 'hidden';
      }

      /* удаление картинки выбора файла (оранжевая кнопка) */
      if (event.target.closest('.story-decor__select-image-button-delete')) {
         let block = event.target.closest('.story-decor__select-image');
         block.querySelector('.story-decor__select-image-img').innerHTML = '';
         block.querySelector('.story-decor__select-image-img').style.display = 'none';
         block.querySelector('.story-decor__select-image-shell').style.display = 'none';
         block.querySelector('.story-decor__select-image-button').style.display = 'block'
      }
      /* Ключ трансляции */
      if (event.target.closest('.story-page__key-hidden')) {
         storyPageKeyCode.type = 'password';
         storyPageKeyHidden.style.display = 'none';
         storyPageKeyVisible.style.display = 'block';
      } else if (event.target.closest('.story-page__key-visible')) {
         storyPageKeyCode.type = 'text';
         storyPageKeyHidden.style.display = 'block';
         storyPageKeyVisible.style.display = 'none';
      }
      /* кнопка сброс */
      // if (event.target.closest('.story-page__key-reset')) { document.querySelector('.story-page__key-code').value = '' }


      /* валюты и суммы, отключение ввода суммы */
      if (event.target.closest('.story-page__currency-item .story-decor__check')) {
         let element = event.target.closest('.story-page__currency-item');
         paymentСonnection(element);
      }
      /* дополнительные способы донат, отключение ввода суммы */
      if (event.target.closest('.story-page__currency-additionally-item .story-decor__check')) {
         let element = event.target.closest('.story-page__currency-additionally-item');
         paymentAdditionallyСonnection(element);
      }

      /* сохранение ссылки */
      if (event.target.closest('.copy-link-hidden')) { }
   })
   window.addEventListener('resize', e => {
      lineTabsStory();
      widthTable();
   });

   /* ширина таблицы собыдий */
   function widthTable() {
      storyEventsShell.style.setProperty('--w', storyBody.clientWidth + 'px');
      storyEventsShell.style.setProperty('--l', - (storyTabs.clientWidth + 40) + 'px');
   }
   widthTable();

   /* подкючение способов оплаты в "валюты и суммы", "дополнительные способы донат"  */
   if (document.querySelector('.story-page__currency-item')) {
      let storyPageCurrencyItem = document.querySelectorAll('.story-page__currency-item');
      storyPageCurrencyItem.forEach((e) => {
         paymentСonnection(e)
      })
   }
   if (document.querySelector('.story-page__currency-additionally-item')) {
      let storyPageCurrencyAdditionallyItem = document.querySelectorAll('.story-page__currency-additionally-item');
      storyPageCurrencyAdditionallyItem.forEach((e) => {
         paymentAdditionallyСonnection(e)
      })
   }
   function paymentСonnection(element) {
      if (!element.querySelector('.story-page__currency-block input').checked) {
         element.querySelector('.story-page__currency-well').style.display = 'none';
         element.querySelector('.story-page__currency-input input').setAttribute('disabled', '');
      } else {
         element.querySelector('.story-page__currency-well').style.display = 'block';
         element.querySelector('.story-page__currency-input input').removeAttribute('disabled');
      }
   }
   function paymentAdditionallyСonnection(element) {
      if (!element.querySelector('.story-decor__check input').checked) {
         element.querySelector('.story-page__currency-additionally-input input').setAttribute('disabled', '');
         element.querySelector('.story-page__currency-additionally-input input').value = '';
      } else {
         element.querySelector('.story-page__currency-additionally-input input').removeAttribute('disabled');
      }
   }


   /* копирование QR */
   let qrCopyButton = document.querySelector('.QR-copy-button');
   qrCopyButton.addEventListener('click', (event) => {
      if (event.target.closest('.QR-copy-button')) {
         let qrCopy = `<div">${event.target.closest('.QR-block').querySelector('.QR-img').innerHTML}</div>`;
         navigator.clipboard.writeText(qrCopy)
            .then(() => {
               console.log('Text copied to clipboard');
            })
            .catch(err => {
               console.error('Error in copying text: ', err);
            });
      }
   })



   /* аватарка */
   const formStory = document.forms.form_story;
   const avatar = formStory.avatar;
   const avatarImg = document.querySelector('.story-decor__avatar-image');
   avatar.addEventListener('change', function (event) {
      let selectedFile = avatar.files[0];
      let urlImage = URL.createObjectURL(selectedFile);
      avatarImg.innerHTML = `<img src="${urlImage}" alt="">`;
   })


   /* список ненормативной лексики */
   let storyFilterInput = document.querySelector('#story-filter');
   if (storyFilterInput) {
      let storyVocabulary = document.querySelector('.story-decor__vocabulary');
      let storyShowFilter = document.querySelector('.story-decor__vocabulary-filter');
      let storyArrayFilter = []; //  массив со списком слов
      /* добавляет слова  */
      function addFilter(event) {
         let inputValue = storyFilterInput.value;
         if (inputValue.length !== 0) {
            if (inputValue[inputValue.length - 1] == ' ') {
               inputValue = inputValue.substring(0, inputValue.length - 1);
               storyArrayFilter.push(inputValue);
               storyFilterInput.value = '';
               showFilter();
            }
         }
      }
      /* показать добавленный элемент */
      function showFilter() {
         storyShowFilter.insertAdjacentHTML(
            'beforeend',
            `<span class="story-decor__vocabulary-filter-element">
            <span class="tory-decor__vocabulary-filter-element-text">${storyArrayFilter[storyArrayFilter.length - 1]}</span>
            <span>
               <svg class="story-delete" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="0" width="10" height="10" rx="5" fill="#DCEAF7"/>
               <g clip-path="url(#clip0_5424_32122)"><path d="M6.97358 6.97059C6.92553 7.01863 6.86553 7.03668 6.80553 7.03668C6.74553 7.03668 6.68553 7.01277 6.63748 6.97059L4.99966 5.33253L3.3616 6.97059C3.31356 7.01863 3.25356 7.04254 3.19356 7.04254C3.13356 7.04254 3.07356 7.01863 3.02551 6.97644C2.93551 6.88644 2.93551 6.73644 3.02551 6.64644L4.66963 5.00256L3.02575 3.3645C2.93575 3.2745 2.93575 3.1245 3.02575 3.0345C3.11575 2.9445 3.26575 2.9445 3.35575 3.0345L4.99963 4.67256L6.63769 3.02868C6.72769 2.93868 6.87769 2.93868 6.96769 3.02868C7.05769 3.11868 7.05769 3.26868 6.96769 3.35868L5.32963 5.00256L6.97351 6.64062C7.06351 6.73062 7.06351 6.88062 6.97351 6.97062L6.97358 6.97059Z" fill="black"/></g>
               <defs><clipPath id="clip0_5424_32122"><rect width="6" height="6" fill="none" transform="translate(2 2.0022)"/></clipPath>
               </defs></svg>
            </span>
         </span>`
         )
      }
      storyFilterInput.addEventListener('input', addFilter);
      /* удаление елемента из фильтра */
      storyVocabulary.addEventListener('click', function (event) {
         storyFilterInput.focus();
         if (event.target.closest('.story-decor__vocabulary-filter-element')) {
            let text = event.target.closest('.story-decor__vocabulary-filter-element').querySelector('.tory-decor__vocabulary-filter-element-text').innerHTML;
            let indexElement = storyArrayFilter.findIndex(function (element, index, array) {
               return element == text;
            })
            storyArrayFilter.splice(indexElement, 1);
            event.target.closest('.story-decor__vocabulary-filter-element').remove();
         }
      });
   }

   /* выбор цвета */
   let storyColor = document.querySelector('#story-color');
   let storyColorCode = document.querySelector('.story-decor__color-code');
   let storyColorShow = document.querySelector('.story-decor__color-show');
   storyColor.addEventListener('input', function (event) {
      let col = event.target.value;
      storyColorShow.style.setProperty('--color-background', col)
      storyColorCode.innerHTML = col;
   })

   /* для горизонтального scroll */
   class HorizontalScroll {
      coordinatesMouseX;
      coordinatesDocumentX;
      constructor(element) {
         this.body = document.body;
         this.element = document.querySelector(element);
      }
      initScroll = () => {
         /* отключение Drag'n'Drop браузера */
         this.element.ondragstart = function () {
            return false;
         };
         this.mousedownEvent();
         this.mouseupEvent();
         this.mouseoverEvent();
         this.mouseoutEvent();
      }
      /* кроссбраузерное подключение события whell */
      addEvent = () => {
         if (this.body.addEventListener) {
            if ('onwheel' in document) {         // IE9+, FF17+, Ch31+
               this.body.addEventListener("wheel", this.onWheel);
            } else if ('onmousewheel' in document) {       // устаревший вариант события
               this.body.addEventListener("mousewheel", this.onWheel);
            } else {             // Firefox < 17
               this.body.addEventListener("MozMousePixelScroll", this.onWheel);
            }
         } else {               // IE8-
            this.body.elemem.attachEvent("onmousewheel", this.onWheel);
         }
      }
      removeEvent = () => {
         if (this.body.removeEventListener) {
            if ('onwheel' in document) {         // IE9+, FF17+, Ch31+
               this.body.removeEventListener("wheel", this.onWheel);
            } else if ('onmousewheel' in document) {       // устаревший вариант события
               this.body.removeEventListener("mousewheel", this.onWheel);
            } else {             // Firefox < 17
               this.body.removeEventListener("MozMousePixelScroll", this.onWheel);
            }
         } else {               // IE8-
            this.body.attachEvent("onmousewheel", this.onWheel);
         }
      }
      onWheel = (e) => {
         e = e || window.event;
         var delta = e.deltaY || e.detail || e.wheelDelta;
         delta > 0 ? this.autoScroll(true) : this.autoScroll(false);
      }
      mouseoverEvent = () => {
         this.element.addEventListener('mouseover', (event) => {
            this.body.style.paddingRight = `${window.innerWidth - this.body.clientWidth}px`;
            this.body.style.overflow = 'hidden';
            this.addEvent();
         });
      }
      mouseoutEvent = () => {
         this.element.addEventListener('mouseout', (event) => {
            this.body.style.overflow = '';
            this.body.style.paddingRight = ``;
            this.removeEvent();
         })
      }
      autoScroll = (y) => {
         if (y) {
            this.element.scrollBy(50, 0);
         } else {
            this.element.scrollBy(-50, 0);
         }
      }
      /* горизонтальный drag & drop */
      mousedownEvent = () => {
         this.element.addEventListener('mousedown', (event) => {
            this.coordinatesDocumentX = this.element.scrollLeft;
            this.coordinatesMouseX = event.clientX;
            window.addEventListener('mousemove', this.drag);
         })
      }
      mouseupEvent = () => {
         this.body.addEventListener('mouseup', (event) => {
            window.removeEventListener('mousemove', this.drag);
            this.body.style.paddingRight = ``;
         })
      }
      drag = (event) => {
         this.element.scrollTo(this.coordinatesDocumentX + this.coordinatesMouseX - event.clientX, 0);
      }
   }
   if (document.querySelector('.story-content__top-donations-slider')) {
      /* подключение скролинга для "топ 10 донатеров" */
      let storyDonations = new HorizontalScroll('.story-content__top-donations-slider');
      storyDonations.initScroll();
   }
   if (document.querySelector('.story-events-table__block')) {
      /* подключение скролинга для "недавние события" */
      let storyTable = new HorizontalScroll('.story-events-table__block');
      storyTable.initScroll();
   }





   /* галерея */
   /* подчёркивание кнопок табов */
   function lineTabsGalery() {
      if (document.querySelector('.gallery')) {
         document.querySelector('.gallery').style.setProperty('--l', document.querySelector('.galery-tab-active').offsetLeft + 'px');
         document.querySelector('.gallery').style.setProperty('--w', document.querySelector('.galery-tab-active').clientWidth + 'px');
      }
   }

   if (document.querySelector('.gallery')) {
      let gallery = document.querySelector('.gallery');
      // let galleryTabs = document.querySelector('.gallery__tabs');
      let galleryTabsBlock = document.querySelectorAll('.gallery__tabs-block');
      let galleryContent = document.querySelectorAll('.gallery__content');
      window.addEventListener('resize', e => { lineTabsGalery() });
      gallery.addEventListener('click', function (event) {
         /* переключение табов */
         if (event.target.closest('.gallery__tabs-block')) {
            let n = event.target.closest('.gallery__tabs-block').dataset.gallerytabs;
            galleryContent.forEach((e) => {
               if (e.dataset.gallerycontent == n) {
                  e.classList.add('gallery-active')
               } else {
                  e.classList.remove('gallery-active')
               }
            })
            galleryTabsBlock.forEach((e) => {
               e.classList.toggle('galery-tab-active', e == event.target.closest('.gallery__tabs-block'))
            })
            lineTabsGalery()
         }
         if (event.target.closest('.gallery__content-default') &&
            !event.target.closest('.gallery__content-default-image-delete')) {
            let path = event.target.closest('.gallery__content-default').querySelector('img').getAttribute('src');
            let nameImg = event.target.closest('.gallery__content-default').querySelector('.gallery__content-default-name').innerHTML;
            let img = blockSelectImage.querySelector('.story-decor__select-image-img');
            let button = blockSelectImage.querySelector('.story-decor__select-image-button');
            let name = blockSelectImage.querySelector('.story-decor__select-image-shell');
            let text = blockSelectImage.querySelector('.story-decor__select-image-text');
            button.style.display = 'none';
            img.style.display = 'flex';
            name.style.display = 'flex';
            text.innerHTML = nameImg;
            img.innerHTML = `<img src="${path}" alt="">`;
            gallery.style.display = 'none';
            document.documentElement.style.overflow = '';
         }
         /* закрытие gallery */
         if (event.target.closest('.btn_close_modal') || !event.target.closest('.gallery__body')) {
            gallery.style.display = 'none';
            document.documentElement.style.overflow = '';
         }
         /* удаление картинок в пользовательской галерее */
         if (event.target.closest('.gallery__content-default-image-delete')) {
            let q = event.target.closest('.gallery__content-default');
            calcSizeDown(q);
            q.remove();
            showInfo();
         }
      })
      /* пользовательская галерея */
      let galleryAddInput = document.querySelector('.gallery__content-add-input');
      let galleryItems = document.querySelector('.gallery__content-items');
      let galleryInfo = document.querySelector('.gallery__content-info');
      let gallerySizeSum = document.querySelector('#gallery-size-sum');
      let galleryPercent = document.querySelector('.gallery__content-percent');
      let gallerySizeDimension = document.querySelector('#gallery-size-dimension');
      let gallerySizeCalc = 0;
      let gallerySizeShow;
      let maxSize = 250000000; // максимальный суммарный размер файлов
      galleryAddInput.addEventListener('change', function (event) {
         let selectedFile = galleryAddInput.files[0];
         let nameFile = galleryAddInput.files[0].name;
         let siseFile = galleryAddInput.files[0].size;
         let urlImage = URL.createObjectURL(selectedFile);
         if (gallerySizeCalc + siseFile <= maxSize) {
            gallerySizeCalc = gallerySizeCalc + siseFile;
            calcSizeLine(gallerySizeCalc);
            showSize(gallerySizeCalc);
            galleryItems.insertAdjacentHTML(
               'beforeend',
               `<div class="gallery__content-default" data-size="${siseFile}">
            <button type="button" class="gallery__content-default-image-delete">
               <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
               <g clip-path="url(#clip0_5_4772)">
               <path d="M13.7267 3.15922H11.7539C11.6062 2.44103 11.2154 1.79572 10.6474 1.33204C10.0794 0.868372 9.36896 0.614695 8.63574 0.61377L7.36301 0.61377C6.62979 0.614695 5.91931 0.868372 5.35131 1.33204C4.78331 1.79572 4.39253 2.44103 4.24483 3.15922H2.27211C2.10333 3.15922 1.94147 3.22627 1.82213 3.34561C1.70279 3.46495 1.63574 3.62681 1.63574 3.79559C1.63574 3.96436 1.70279 4.12622 1.82213 4.24556C1.94147 4.36491 2.10333 4.43195 2.27211 4.43195H2.90847V12.7047C2.90948 13.5482 3.24503 14.357 3.84152 14.9534C4.43801 15.5499 5.24673 15.8855 6.09029 15.8865H9.90847C10.752 15.8855 11.5608 15.5499 12.1572 14.9534C12.7537 14.357 13.0893 13.5482 13.0903 12.7047V4.43195H13.7267C13.8954 4.43195 14.0573 4.36491 14.1766 4.24556C14.296 4.12622 14.363 3.96436 14.363 3.79559C14.363 3.62681 14.296 3.46495 14.1766 3.34561C14.0573 3.22627 13.8954 3.15922 13.7267 3.15922V3.15922ZM7.36301 1.8865H8.63574C9.03046 1.88698 9.41537 2.00955 9.73768 2.23742C10.06 2.46528 10.3039 2.78726 10.436 3.15922H5.56274C5.69484 2.78726 5.93877 2.46528 6.26108 2.23742C6.58339 2.00955 6.96829 1.88698 7.36301 1.8865V1.8865ZM11.8176 12.7047C11.8176 13.211 11.6164 13.6966 11.2584 14.0546C10.9004 14.4126 10.4148 14.6138 9.90847 14.6138H6.09029C5.58397 14.6138 5.09838 14.4126 4.74036 14.0546C4.38233 13.6966 4.1812 13.211 4.1812 12.7047V4.43195H11.8176V12.7047Z" fill="#343434"/>
               <path d="M6.72718 12.0678C6.89596 12.0678 7.05782 12.0008 7.17716 11.8814C7.2965 11.7621 7.36355 11.6002 7.36355 11.4315V7.61329C7.36355 7.44452 7.2965 7.28266 7.17716 7.16332C7.05782 7.04397 6.89596 6.97693 6.72718 6.97693C6.55841 6.97693 6.39655 7.04397 6.27721 7.16332C6.15787 7.28266 6.09082 7.44452 6.09082 7.61329V11.4315C6.09082 11.6002 6.15787 11.7621 6.27721 11.8814C6.39655 12.0008 6.55841 12.0678 6.72718 12.0678Z" fill="#343434"/>
               <path d="M9.27211 12.0678C9.44088 12.0678 9.60275 12.0008 9.72209 11.8814C9.84143 11.7621 9.90848 11.6002 9.90848 11.4315V7.61329C9.90848 7.44452 9.84143 7.28266 9.72209 7.16332C9.60275 7.04397 9.44088 6.97693 9.27211 6.97693C9.10333 6.97693 8.94147 7.04397 8.82213 7.16332C8.70279 7.28266 8.63574 7.44452 8.63574 7.61329V11.4315C8.63574 11.6002 8.70279 11.7621 8.82213 11.8814C8.94147 12.0008 9.10333 12.0678 9.27211 12.0678Z" fill="#343434"/>
               </g><defs><clipPath id="clip0_5_4772"><rect width="15.2727" height="15.2727" fill="white" transform="translate(0.363281 0.61377)"/></clipPath></defs>
               </svg>
            </button>
            <div class="gallery__content-default-shell">
               <div class="gallery__content-default-image">
               <img src="${urlImage}" alt="">
            </div>
         </div>
         <div class="gallery__content-default-name">${nameFile}</div>
         <div class="gallery__content-default-size">
            <span>${siseFile}</span>
            <span>Кб</span>
         </div>
         </div>`
            )
            showInfo();
         }
         galleryAddInput.value = '';
      })
      function calcSizeLine(x) {
         let i = x / maxSize * 100;
         galleryPercent.style.setProperty('--w', i + "%")
      }
      function calcSizeDown(q) {
         let i = q.dataset.size;
         gallerySizeCalc = gallerySizeCalc - i;
         showSize(gallerySizeCalc);
      }
      function showSize(gallerySizeCalc) {
         calcSizeLine(gallerySizeCalc);
         gallerySizeShow = gallerySizeCalc;
         gallerySizeDimension.innerHTML = 'KB';
         if (gallerySizeCalc > 999999) {
            gallerySizeShow = Math.round(gallerySizeCalc / 10000) / 100;
            gallerySizeDimension.innerHTML = 'MB';
         }
         gallerySizeSum.innerHTML = gallerySizeShow;
      }
      function showInfo() {
         if (galleryItems.children.length > 0) {
            galleryInfo.style.display = 'none';
         } else {
            galleryInfo.style.display = '';
         }
      }
   }
}


/* окно донат */
if (document.querySelector('.modal-donat__value-donat-item')) {
   let modalDonat = document.querySelector('.modal-donat');
   let modalDonatValueItem = document.querySelectorAll('.modal-donat__value-donat-item');
   let donatGratitudeShell = document.querySelector('.donat-gratitude__shell');
   let modalDonatBody = document.querySelector('.modal-donat__body');
   let modalDonatMinSumValue = document.querySelector('#modal-donat__min-sum-value');
   let modalВonatSelectСurrency = document.querySelector('.modal-donat_select-currency');
   let donatValueInput = document.querySelector('#donat-value-input');

   modalDonat.addEventListener('click', function (event) {
      if (event.target.closest('.modal-donat__value-donat-item')) {
         modalDonatValueItem.forEach(e => {
            e.classList.toggle('value-active', event.target.closest('.modal-donat__value-donat-item') == e);
         })
         changeValueDonat();
      }
      if (event.target.closest('.modal-donat__send-button')) {
         donatGratitudeShell.style.display = 'flex';
         modalDonatBody.style.display = 'none';
      }
      if (event.target.closest('.btn_close_modal') ||
         !event.target.closest('.donat-gratitude__shell') &&
         !event.target.closest('.modal-donat__body')) {
         donatGratitudeShell.style.display = 'none';
         modalDonatBody.style.display = 'flex';
         modalDonat.style.display = 'none';
      }
      /* смена суммы донат в валюте */
      if (event.target.closest('.modal-donat_select-currency li')) {
         changeValueDonat();
      }
   })
   donatValueInput.addEventListener('input', function (event) {
      if (donatValueInput.value.length > 0) {
         modalDonatValueItem.forEach(e => {
            e.classList.remove('value-active');
         })
         changeValueDonat();
      }
   })
   donatValueInput.addEventListener('blur', function (event) {
      if (donatValueInput.value < 10) { donatValueInput.value = '10' }
      changeValueDonat()
   })

   function changeValueDonat() {
      let v = document.querySelector('.value-active') ? document.querySelector('.value-active').dataset.vd :
         donatValueInput.value > 0 ? donatValueInput.value : modalDonatMinSumValue.innerHTML;
      setTimeout(function changeValueCurrency() {
         if (document.querySelector('.value-active')) { donatValueInput.value = '' }
         if (modalВonatSelectСurrency.querySelector('.name2 span')) {
            modalВonatSelectСurrency.querySelector('.name2 span').innerHTML = '$' + v;
         }
      }, 0)
   }
}




