
if (typeof isMobile == "undefined") {
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
};


if (document.querySelector('.header')) {

   let headerNav = document.querySelector('.header__nav');
   let fonMenu = document.querySelector('.header__nav-fon-menu');
   let fonMenuIn = document.querySelector('.header__nav-fon-menu-in');
   let fonMenuArrow = document.querySelector('.header__nav-fon-menu-arrow');
   let newSubmenu = document.querySelectorAll('.new-submenu');
   /* открывает меню при наведении мышкой 'hover' */
   if (document.querySelector('.header__nav')) {
      headerNav.addEventListener('mouseover', openNavMenu);
      headerNav.addEventListener('mouseleave', closeNavMenu);
   }
   /* открывает меню при клике */
   const mediaQuery = window.matchMedia('(max-width: 766.98px)'); /* медиазапрос для меню */

   function openMenu(event) {
      let siseSubmenuX = event.target.closest('._with-submenu').querySelector('.new-submenu__wrapper').clientHeight;
      let siseSubmenuY = event.target.closest('._with-submenu').querySelector('.new-submenu__wrapper').clientWidth;
      fonMenu.style.opacity = "1";
      fonMenu.style.pointerEvents = "all";
      fonMenuIn.style.height = siseSubmenuX + 40 + 'px';
      fonMenuIn.style.width = siseSubmenuY + 40 + 'px';
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
      fonMenu.style.pointerEvents = "none";
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
      window.addEventListener('resize', function () {
         langMove();
      })
   }

}
/* модальное окно "язык/валюта" */
if (document.querySelector('.lang_list')) {
   let inputSearch = document.forms.search_language.elements.input_search;
   let modalTabs = document.querySelectorAll('.modal_tabs');
   let currencyListLink = document.querySelectorAll('.currency__list-link');
   let modal_title_button = document.querySelectorAll('.modal_title_button');
   document.body.addEventListener('click', (event) => {
      if (event.target.closest('.currency__list-link')) {
         currencyListLink.forEach((e) => {
            e.classList.toggle('currency__check', e == event.target.closest('.currency__list-link'));
         })
      }
      if (event.target.closest('.modal_title_button')) {
         let dataNamber = event.target.closest('.modal_title_button').dataset.modalnamber;
         modal_title_button.forEach(e => { e.classList.toggle('modal_title_button-active', e == event.target.closest('.modal_title_button')) })
         modalTabs.forEach(e => { e.classList.toggle('modal_tabs-visible', e.dataset.modal == dataNamber) });
      }
      if (event.target.closest('.modal_search_clear-icon')) {
         inputSearch.value = '';
      }
   })

}

if (document.querySelector('.review-bitcoin')) {
   // let reviewBitcoinTabsItem = document.querySelectorAll('.review-bitcoin__tabs-item');
   let reviewBitcoinSchedule = document.querySelectorAll('.review-bitcoin__schedule');
   document.body.addEventListener('click', (event) => {
      /* открывает модальное "обзор bitcoin" */
      if (event.target.closest('.cr_item')) {
         document.querySelector('.review-bitcoin').style.display = 'block';
         document.querySelector('body').style.overflow = 'hidden';
      } else if (!event.target.closest('.review-bitcoin__shell') || event.target.closest('.btn_close_modal')) {
         document.querySelector('.review-bitcoin').style.display = 'none';
         document.querySelector('body').style.overflow = 'visible';
      }
      /* переключение табов в модальном окне */
      if (event.target.closest('.review-bitcoin__tabs-item')) {
         let namber = event.target.closest('.review-bitcoin__tabs-item').dataset.review;
         reviewBitcoinSchedule.forEach(e => { e.classList.toggle('review-bitcoin__schedule-hidden', e.dataset.schedule == namber) })
      }
   })
}


if (document.querySelector('#block_scroll')) {
   let blockScroll = document.querySelector('#block_scroll');
   let scrollArrows = document.querySelector('#scroll_arrows');
   scrollArrows.addEventListener('click', (event) => {
      if (event.target.closest('#block-scroll__arrow-up')) {
         blockScroll.scrollTo({
            top: blockScroll.scrollTop + 200,
            behavior: "smooth"
         })
      }
      if (event.target.closest('#block-scroll__arrow-down')) {
         blockScroll.scrollTo({
            top: blockScroll.scrollTop - 200,
            behavior: "smooth"
         })
      }
   })
}

if (document.querySelector('#contact-form')) {

   let returnValue = document.querySelector('#return-value');
   let returnInput = document.forms.contact_form;
   //  let valueChecked = document.querySelector('#return-value-checked');
   let valueBlock = document.querySelector('#return-value-block');
   let contactFormBlock = document.querySelector('#contact_form-block');
   document.body.addEventListener('click', (event) => {
      valueBlock.classList.toggle('active', event.target.closest('#return-value-button'));
      if (event.target.closest('#contact-form-open')) {
         contactFormBlock.style.display = 'flex';
         document.body.style.overflow = "hidden";
      }
      if (event.target.closest('.btn_close_modal')) {
         contactFormBlock.style.display = 'none';
         document.body.style.overflow = "";
      }
   })
   returnInput.addEventListener('change', (event => {
      if (event.target.getAttribute('name') == 'return') {
         returnValue.innerHTML = event.target.dataset.val;
         //    valueBlock.classList.remove('active');
      }
   }))
}

if (document.querySelector('.search-site__wrapper')) {
   let searchSiteInput = document.querySelector('.search-site__input');
   let searchSiteModal = document.querySelector('#search-site-modal')
   document.body.addEventListener('click', (event) => {
      if (event.target.closest('#search-site__clear')) {
         searchSiteInput.value = '';
      }
      if (event.target.closest('#button-search-open')) {
         searchSiteModal.style.display = "flex"
         document.querySelector('body').style.overflow = 'hidden';
      }
      if (event.target.closest('#button-search-close')) {
         searchSiteModal.style.display = "none"
         document.querySelector('body').style.overflow = '';
      }
      //  #button-search-open

   })
}







/* import { createChart } from './lightweight-charts.standalone.development.js';

console.log(createChart); */


/* const Chart_1 = createChart(document.getElementById('test'), { width: 1000, height: 700 });

const series = Chart_1.addAreaSeries({
   topColor: '#1ffc02',
   bottomColor: '#1ffc0218',
   lineColor: 'red',
});

series.setData([
   { time: '2019-04-11', value: 80.01 },
   { time: '2019-04-12', value: 96.63 },
   { time: '2019-04-13', value: 76.64 },
   { time: '2019-04-14', value: 81.89 },
   { time: '2019-04-15', value: 74.43 },
   { time: '2019-04-16', value: 80.01 },
   { time: '2019-04-17', value: 90.63 },
   { time: '2019-04-18', value: 76.64 },
   { time: '2019-04-19', value: 81.89 },
   { time: '2019-04-20', value: 74.43 },
]);
 */
