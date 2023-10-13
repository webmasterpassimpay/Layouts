//const exchangeId = document.querySelector("#exchange-id");
const transferBlocks = Array.from(document.querySelectorAll(".transfer-block"));
const transferLinks = Array.from(document.querySelectorAll("._transfer-link"));
const transferBlockLinks = Array.from(document.querySelectorAll(".transfer-block__link"));
const transferBlockBlocks = Array.from(document.querySelectorAll(".border_block"));
const exchangeBlocks = Array.from(document.querySelectorAll(".exchange-block"));
const exchangeBlocksBottom = Array.from(document.querySelectorAll(".exchange-block__bottom"));
const exchangeIcon = document.querySelector(".exchange-block__top-animation");
const exchangeStatus = Array.from(document.getElementsByClassName("exchange-block__top-status"));
//const exchangeBack = document.querySelector("#exchange-back");
const exchangeBlockTop = document.querySelectorAll(".exchange-block__top");
const exchangeRight = document.querySelector("#withdraw_right");
const openListPartners = document.querySelectorAll('.btn_open_list_partners');
const withdrawInfoListHidden = document.querySelectorAll(".withdraw_info_list-hidden");
const withdrawInfo = document.querySelectorAll(".withdraw_info");
const exchangeInfoHidden = document.querySelector('.exchange-info-hidden');


exchangeBlocks[0].style.display = "flex";
//exchangeId.style.display = "none";

// Кнопка вернуться на первый экран "Обмен валют"
/*
exchangeBack.onclick = () => {
  exchangeBlocksBottom[index].style.display = "none";
  //exchangeId.style.display = "none";
  exchangeIcon.innerHTML = `
    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    `;
  exchangeIcon.classList.add("animation-playing");
  exchangeIcon.classList.add("follow-the-leader");
  exchangeBlocks[1].style.display = "none";
  exchangeStatus[0].classList.remove("success");
  exchangeRight.style.display = "block";
  exchangeBlocks[0].style.display = "block";
  exchangeStatus[0].innerHTML = "Ожидание депозита";
  index = 0;
};
*/

// Общие стили для переключения табов
function nav(blocks, links, activeClass, secondClass = "") {
  // console.log(links);

  if (links[1]) {
    links[1].classList.add(activeClass);
    blocks[1].style.display = "block";
    // withdrawInfoListHidden[1].style.display = "block";
    links.forEach((link) => {
      link.addEventListener("click", toggleActiveBlock);
    });

    function toggleActiveBlock() {
      hideAllBlock(links, blocks);
      let index = links.indexOf(this);
      this.classList.add(activeClass);
      blocks[index].style.display = "block";

    }

    function hideAllBlock(linksArr, blocksArr) {
      linksArr.forEach((link) => {
        link.classList.remove(activeClass);
      });
      blocksArr.forEach((block) => {
        block.style.display = "none";
      });
    }
  }
}

nav(transferBlocks, transferLinks, "active");
/* nav(
  transferBlockBlocks,
  transferBlockLinks,
  "border_title",
  "exchange-block__item"
); */


/* выбор платёжной карты в exchange */
if (document.querySelector('.oncard__selected')) {
  let oncardSelected = document.querySelectorAll('.oncard__selected');
  document.body.addEventListener('click', function (event) {
    /* открытие списка карточек */
    if (event.target.closest('.oncard__selected-body')) {
      event.target.closest('.oncard__selected').classList.toggle('oncard__storage-show')
    } else {
      oncardSelected.forEach(e => e.classList.remove('oncard__storage-show'))
    }
    /* смена выбранной карточки */
    if (event.target.closest('.oncard__list')) {
      let innerContent = event.target.closest('.oncard__list').innerHTML;
      event.target.closest('.oncard__selected').querySelector('.currency_selected_balance_left').innerHTML = innerContent;

      const selected = $(event.target.closest('.oncard__selected'));

      selected.find('.currency').val(selected.find('.oncard__selected-body .oncard__lists-name').text());

      $(document).trigger('exchange-order-form:change');

      clearInterval(updateTimerId);

      autoUpdateOn = false;
      nextUpdateIn = updateEvery;

      $('#oncard__time-rate').text(`00:${nextUpdateIn.toString().padStart(2, '0')}`);
      $('.oncard__time-rate').text(`00:${nextUpdateIn.toString().padStart(2, '0')}`);

      updateMarket();
    }
  })
}


/* табы exchange */
if (document.querySelector('.exchange-tabs')) {
  //let exchangeSteps = document.querySelector(".exchange-steps");
  let networkSelection = document.querySelectorAll('.network_selection');
  let exchangeTabs = document.querySelector('.exchange-tabs')
  let borderBlock = document.querySelectorAll('.border_block');
  let exchangeTabsItem = document.querySelectorAll('.exchange-tabs__item');
  let step = 1;
  function exchangeLineTabs() {
    let lineWidtch = document.querySelector('.exchange-tabs__item-button-active').clientWidth;
    let lineOffset = document.querySelector('.exchange-tabs__item-button-active').offsetLeft;
    exchangeTabs.style.setProperty('--extab-w', lineWidtch + 'px');
    exchangeTabs.style.setProperty('--extab-l', lineOffset + 'px');
  }
  document.body.addEventListener('click', function (event) {
    if ($(event.target).parent().hasClass('exchange-not-active')) {
      return;
    }

    if (event.target.closest('.exchange-tabs__item-button')) {
      let exchangebuttonNamber = event.target.closest('.exchange-tabs__item').dataset.exchangebutton;
      borderBlock.forEach((e) => {
        if (e.dataset.exchangetabs == exchangebuttonNamber) {
          e.style.display = 'block';
        } else {
          e.style.display = 'none';
        }
      })
      // if (exchangebuttonNamber == 3) {
      //   withdrawInfoListHidden[0].style.display = "none";
      //   withdrawInfoListHidden[2].style.display = "block";
      // } else {
      //   withdrawInfoListHidden[2].style.display = "none";
      //   withdrawInfoListHidden[0].style.display = "block";
      // }
      exchangeTabsItem.forEach((e) => { e.classList.toggle('exchange-tabs__item-button-active', e == event.target.closest('.exchange-tabs__item')) })
      exchangeLineTabs();
      //exchangeSteps.dataset.steps = exchangebuttonNamber;
    }
    // if (document.querySelector(".exchange-tabs__item").classList.contains("exchange-tabs__item-button-active")) {
    //   document.querySelector("#withdraw-info-first").style.display = "grid";
    //   document.querySelector("#withdraw-info-second").style.display = "none";
    // } else {
    //   document.querySelector("#withdraw-info-second").style.display = "block";
    //   document.querySelector("#withdraw-info-first").style.display = "none";
    // }
    exchangeLineTabs();

    /* переключатель "Вы защищены" */
    if (event.target.closest('#checked_vpm')) {
      document.querySelector('.protected').classList.toggle('status_checked', document.querySelector('#checked_vpm').checked == true)
      document.querySelector('.not-protected').classList.toggle('status_checked', document.querySelector('#checked_vpm').checked == false)
    }
    if (event.target.closest('.network_selection')) {
      networkSelection.forEach(e => { e.classList.toggle('active', event.target.closest('.network_selection') == e) })
    }
    /* кнопка в табах "обменять" */
    if (event.target.closest('.exchange-steps')) {
      step = exchangeSteps.dataset.steps;
      if (step == 1 || step == 2) {
        exchangeBlockTop[0].style.display = "flex";
        exchangeBlocks[0].style.display = "none";
        exchangeBlocks[1].style.display = "block";
        exchangeBlocksBottom[0].style.display = "block";
        // withdrawInfoListHidden[0].style.display = "none";
        // withdrawInfoListHidden[1].style.display = "block";
        exchangeSteps.style.display = "none";
      }
      if (step == 3) {
        exchangeBlockTop[2].style.display = "flex";
        exchangeBlockTop[4].style.display = "block";
        exchangeBlocks[0].style.display = "none";
        exchangeBlocks[1].style.display = "block";
        exchangeBlocksBottom[1].style.display = "block";
        // withdrawInfoListHidden.forEach(e => e.style.display = 'none');
        openListPartners.forEach(e => e.style.display = 'none');
        withdrawInfo.forEach(e => e.style.display = 'none');
        exchangeInfoHidden.style.display = 'none';
        withdrawInfoListHidden[3].style.display = "block";
        exchangeSteps.style.display = "none";
      }
    }

    if (event.target.closest('.exchange-button-paid') && event.target.closest('.exchange-button-paid').hasAttribute('step1')) {
      exchangeBlockTop[2].style.display = "none";
      exchangeBlockTop[3].style.display = "flex";
      exchangeBlocksBottom[1].style.display = "none";
      exchangeBlocksBottom[2].style.display = "block";
      document.querySelector("#withdraw-info-second").style.display = "none";
    } else if (event.target.closest('.exchange-button-paid') && event.target.closest('.exchange-button-paid').hasAttribute('step2')) {
      exchangeBlockTop.forEach(e => e.style.display = 'none');
      exchangeBlocksBottom.forEach(e => e.style.display = 'none');
      exchangeBlockTop[5].style.display = "block";
      exchangeRight.style.display = 'none';
    }

    /* !!!!!!! временная кнопка для демонстрации блоков, по готовности удалить !!!!!! */
    if (event.target.closest('.temporary-button') && event.target.closest('.temporary-button').hasAttribute('step1')) {
      exchangeBlockTop[0].style.display = "none";
      exchangeBlockTop[1].style.display = "flex";
      exchangeBlocksBottom[0].style.display = "none";
      exchangeBlocksBottom[3].style.display = "block";
      //exchangeSteps.style.display = "none";
      exchangeRight.style.display = "none";
    } else if (event.target.closest('.temporary-button') && event.target.closest('.temporary-button').hasAttribute('step2') && step == 1) {
      exchangeBlockTop.forEach(e => e.style.display = 'none');
      exchangeBlocksBottom.forEach(e => e.style.display = 'none');
      exchangeBlockTop[5].style.display = "block";
    } else if (event.target.closest('.temporary-button') && event.target.closest('.temporary-button').hasAttribute('step2') && step == 2) {
      exchangeBlockTop.forEach(e => e.style.display = 'none');
      exchangeBlocksBottom.forEach(e => e.style.display = 'none');
      exchangeBlockTop[2].style.display = "flex";
      exchangeBlocksBottom[4].style.display = "block";
    } else if (event.target.closest('.temporary-button') && event.target.closest('.temporary-button').hasAttribute('step3') && step == 2) {
      exchangeBlockTop.forEach(e => e.style.display = 'none');
      exchangeBlocksBottom.forEach(e => e.style.display = 'none');
      exchangeBlockTop[6].style.display = "flex";
      exchangeBlocksBottom[5].style.display = "block";
    }
    /* !!!!!!! конец кода временная кнопка для демонстрации блоков, по готовности удалить !!!!!! */


  })


  window.addEventListener('resize', function () { exchangeLineTabs() })
}

if (document.querySelector('.volatility__slider-percent')) {
  /* "Вернуть активы, если ставки упадут ниже" - ползунок */
  let volatilitySliderPercent = document.querySelector('.volatility__slider-percent');
  let volatilityData = document.querySelector('#volatility-data');
  let volatilityData2 = document.querySelector('#volatility-data-2');
  let volatilityPercent = document.querySelector('#volatility-percent');
  volatilityPercent.addEventListener('input', function (event) {
    volatilityData.value = '';
    volatilityData2.value = '';
    volatilityData.innerHTML = volatilityPercent.value;
    volatilityData2.innerHTML = volatilityPercent.value;
    volatilitySliderPercent.style.setProperty("--vpm-w", volatilityPercent.value * 20 + '%');
  })
}


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
if (document.querySelector('.exchange__conclusion')) {
  let conclusionSearch = document.querySelector('.exchange__conclusion-search-input-item');
  let exchangeConclusionBlock = document.querySelector('.exchange__conclusion-block');
  let exchangeConclusionWindowText = document.querySelector('.exchange__conclusion-window-text');
  let exchangeConclusionSearchClear = document.querySelector('.exchange__conclusion-search-clear');
  document.body.addEventListener('click', function (event) {
    // if (!exchangeConclusionBlock.classList.contains('disabled')) {
      if (event.target.closest('.exchange__conclusion-window')) {
        exchangeConclusionBlock.classList.toggle('exchange__conclusion-actie')
      }
    // }
    
    if (!event.target.closest('.exchange__conclusion-block')) {
      exchangeConclusionBlock.classList.remove('exchange__conclusion-actie')
    }
    if (event.target.closest('.exchange__conclusion-search-clear')) {
      conclusionSearch.value = '';
    }
    if (event.target.closest('.exchange__conclusion-item-button')) {
      exchangeConclusionWindowText.innerHTML = event.target.closest('.exchange__conclusion-item-button').innerHTML;

      let selectedPaymentMethod = $(event.target).closest('.exchange__conclusion-item-button').data('fullname');
          // selectedPaymentMethod = (selectedPaymentMethod.length > 21) ? selectedPaymentMethod.slice(0, 21) : selectedPaymentMethod;

      $('[name=payment_method]').val(selectedPaymentMethod);
      $(document).trigger('exchange-order-form:change');
      exchangeConclusionBlock.classList.remove('exchange__conclusion-actie')
    }
  })
}