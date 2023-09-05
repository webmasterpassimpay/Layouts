
// Определение устройства PC / Mobile (mouse / touchScreen)

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

/* открывает блоки в Questions */
if (document.querySelector('.module__questions')) {
   const moduleQuestion = document.querySelectorAll('.module__question');
   function sizeQuestion(e) {
      if (e.classList.contains('module__question-active')) {
         e.querySelector('.module__question-answer').style.height = e.querySelector('.module__question-answer-size').offsetHeight + 'px';
      }
   }
   function closeQuestion(e) {
      e.classList.remove('module__question-active');
      e.querySelector('.module__question-answer').style.height = '0px';
   }
   document.body.addEventListener('click', function (event) {
      if (event.target.closest('.module__question')) {
         moduleQuestion.forEach(e => {
            if (e == event.target.closest('.module__question') && !e.classList.contains('module__question-active')) {
               e.classList.add('module__question-active');
               sizeQuestion(e);
            } else {
               closeQuestion(e)
            }
         })
      } else {
         moduleQuestion.forEach(e => { closeQuestion(e) })
      }
   })
   window.addEventListener('resize', () => { moduleQuestion.forEach(e => { sizeQuestion(e) }) })
}



if (document.querySelector('.learn-more')) {
   document.body.addEventListener('click', (event) => {
      if (event.target.closest('.learn-more')) {
         console.log(event.target.closest('.learn-more-body').querySelector('.annotatio__content'));
         event.target.closest('.learn-more-body').querySelector('.annotatio__content').style.height =
            event.target.closest('.learn-more-body').querySelector('.annotatio__text').offsetHeight + 'px';
         event.target.closest('.learn-more').style.display = 'none';
      }
   })

   let callback = function (entries, observer) {
      entries.forEach(entry => {
         if (!entry.isIntersecting && entry.target.getBoundingClientRect().top > 0) {
            entry.target.querySelector('.annotatio__content').style.height = '0px';
            entry.target.querySelector('.learn-more').style.display = 'inline-block';
         }
      })
   };

   let observer = new IntersectionObserver(callback, { threshold: 0.1 });
   let target = document.querySelectorAll('.learn-more-body');
   target.forEach(function (event) {
      observer.observe(event);
   })

}



$('body').on('mousemove', ' .btn-dashed', function (e) {
   var x = e.pageX - $(this).offset().left;
   var y = e.pageY - $(this).offset().top;
   $(this).css({ '--x': `${x}px`, '--y': `${y}px` });
});

