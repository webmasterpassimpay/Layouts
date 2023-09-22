const choosenCryptos = document.querySelector('.choosen-cryptos');
let paymentBody1 = document.querySelector('.payment-body');
let paymentBody2 = document.querySelector('.payment-body2');
let paymentBody3 = document.querySelector('.payment-body3');
let paymentBody4 = document.querySelector('.payment-body4');
if (paymentBody1) {
    let currencyLi = document.querySelectorAll('.currency_list li');
    let choosenCryptosArr = [];
    function isCryptosChoosen() {
        if (choosenCryptosArr.length < 1) {
            choosenCryptos.style.display = 'none';
        } else {
            choosenCryptos.style.display = 'flex';
        }
    }
    isCryptosChoosen();
    currencyLi.forEach(li => {
        li.addEventListener('click', function (e) {
            let thisText = e.target.closest('.currency_list li').querySelector('b');
            if (choosenCryptosArr.includes(thisText.textContent)) {
                return;
            }
            let div = document.createElement('div');
            div.classList.add('choosen-cryptos__item');

            let thisImage = e.target.closest('.currency_list li').querySelector('img');
            let thisImageClone = thisImage.cloneNode();
            div.appendChild(thisImageClone);


            choosenCryptosArr.push(thisText.textContent);
            isCryptosChoosen();
            let thisTextClone = thisText.cloneNode(true);
            div.appendChild(thisTextClone);
            div.addEventListener('click', function (e) {
                choosenCryptos.removeChild(div);
                choosenCryptosArr.splice(choosenCryptosArr.indexOf(thisText.textContent), 1);
                isCryptosChoosen();
            })
            choosenCryptos.appendChild(div);
        })
    })

}

if (paymentBody2) {
    let formTitle = document.querySelector('.form_title');
    let fileInput = document.querySelector('.input__wrapper');
    let cmsChecker = document.querySelector('.cms_checker');
    let cmsContainer = document.querySelector('.wrp_select_cms');
    cmsChecker.value = 'false';
    cmsContainer.style.display = 'none';
    formTitle.style.display = 'inline';
    fileInput.style.display = 'none';
    cmsChecker.addEventListener('click', function () {
        if (cmsChecker.value == 'false') {
            cmsChecker.value = 'true';
            cmsContainer.style.display = 'block';
            formTitle.style.display = 'none';
            fileInput.style.display = 'block';
        } else {
            cmsChecker.value = 'false';
            cmsContainer.style.display = 'none';
            formTitle.style.display = 'inline';
            fileInput.style.display = 'none';
        }
    });

    let popupOpenBtn = document.querySelector('.btn_open_popup');
    const popupWrapper = document.querySelector('.payment_popup_wrapper');
    const popupBackground = document.querySelector('.payment_popup_bg');
    const popupCloseBtn = document.querySelector('.payment_popup-close');
    const paymentForm = document.querySelector('#payment-form');
    const paymentPopup = {
        popupShow: function () {
            popupWrapper.style.display = 'block';
            popupWrapper.style.overflow = 'auto';
            document.body.style.overflow = 'hidden';
        },
        popupHide: function () {
            popupWrapper.style.display = 'none';
            document.body.style.overflow = 'auto';

        },
    };
    paymentForm.addEventListener('submit', function (e) {
        e.preventDefault();
        paymentPopup.popupShow();
    })
    paymentPopup.popupHide();
    popupCloseBtn.addEventListener('click', paymentPopup.popupHide);
}


if (paymentBody3) {
    let cmsChecker = document.querySelectorAll('.cms_checker');
    cmsChecker.forEach(el => {
        setTimeout(function () {
            if (el.checked) {

                let dot = el.parentNode.querySelector('.stage3_cms_checker-dot');
                dot.style.backgroundColor = '#33CC66';
            } else {
                let dot = el.parentNode.querySelector('.stage3_cms_checker-dot');
                dot.style.backgroundColor = '#9FA8B1';
            }

        }, 1500);

        el.addEventListener('click', function () {
            if (el.checked) {
                let dot = this.parentNode.querySelector('.stage3_cms_checker-dot');
                dot.style.backgroundColor = '#33CC66';
            } else {
                let dot = this.parentNode.querySelector('.stage3_cms_checker-dot');
                dot.style.backgroundColor = '#9FA8B1';
            }
        })

    })
}
if (paymentBody4) {

    let currencyLi = document.querySelectorAll('.currency_list-li_crypto');
    let choosenCryptosArr = [];
    function isCryptosChoosen() {
        if (choosenCryptosArr.length < 1) {
            choosenCryptos.style.display = 'none';
        } else {
            choosenCryptos.style.display = 'flex';
        }
    }
    isCryptosChoosen();
    currencyLi.forEach(li => {
        li.addEventListener('click', function (e) {
            let thisText = e.target.closest('.currency_list li').querySelector('b');
            if (choosenCryptosArr.includes(thisText.textContent)) {
                return;
            }
            let div = document.createElement('div');
            div.classList.add('choosen-cryptos__item');

            let thisImage = e.target.closest('.currency_list li').querySelector('img');
            let thisImageClone = thisImage.cloneNode();
            div.appendChild(thisImageClone);


            choosenCryptosArr.push(thisText.textContent);
            isCryptosChoosen();
            let thisTextClone = thisText.cloneNode(true);
            div.appendChild(thisTextClone);
            div.addEventListener('click', function (e) {
                choosenCryptos.removeChild(div);
                choosenCryptosArr.splice(choosenCryptosArr.indexOf(thisText.textContent), 1);
                isCryptosChoosen();
            })
            choosenCryptos.appendChild(div);
        })
    })

    let cmsChecker = document.querySelector('.cms_checker');
    let cmsContainer = document.querySelector('.wrp_select_cms');
    cmsChecker.value = 'false';
    cmsContainer.style.display = 'none';
    cmsChecker.addEventListener('click', function () {
        if (cmsChecker.value == 'false') {
            cmsChecker.value = 'true';
            cmsContainer.style.display = 'block';
        } else {
            cmsChecker.value = 'false';
            cmsContainer.style.display = 'none';
        }
    });
    $('body').on('click', '.currency_list li', function () {
        console.log('hehe')
        var btn = $(this).closest('.wrp_select_currency').find('.currency_selected');
        btn.find('input').val($(this).data('id'));
        btn.find('span').html($(this).find('b').html());
        btn.find('.balance_icon').remove();
        btn.prepend($(this).find('.balance_icon').clone());
        $('.wrp_select_currency').removeClass('show');
        var code = $(this).data('code');
        if (code == 'xrp' || code == 'xlm' || code == 'bnb_bep2') {
            $(this).closest('form').find('.tag_field').show();
            $('.warning_text_xrp').show();
        } else {
            $(this).closest('form').find('.tag_field').hide();
            $('.warning_text_xrp').hide();
        }
    });
    let popupOpenBtn = document.querySelector('#btn_open_popup-delete');
    const popupWrapper = document.querySelector('.payment_popup_wrapper');
    const popupBackground = document.querySelector('.payment_popup_bg');
    const popupCloseBtn = document.querySelector('.payment_popup-close');
    const paymentForm = document.querySelector('#payment-form');
    let paymentPopup = {
        popupShow: function () {
            popupWrapper.style.display = 'block';
            // popupWrapper.style.top = window.scrollTop + 'px';
            document.body.style.overflow = 'hidden';
        },
        popupHide: function () {
            popupWrapper.style.display = 'none';
            document.body.style.overflow = 'auto';
        },
    };
    popupOpenBtn.addEventListener('click', function (e) {
        paymentPopup.popupShow();
    })
    paymentPopup.popupHide();


    popupCloseBtn.addEventListener('click', () => paymentPopup.popupHide());
    let inputDarkEditBtns = document.querySelectorAll('.input-dark__btn');
    inputDarkEditBtns.forEach(el => {
        el.addEventListener('click', function (e) {
            el.previousElementSibling.focus();
        });
    });
}

function cutApiField() {
    let apiFields = document.querySelectorAll('.stage3_apis_item-apiField');
    apiFields.forEach(apiField => {
        let apiFieldParent = apiField.parentNode;
        let apiFieldWidth = apiField.offsetWidth;
        let apiFieldParentWidth = apiFieldParent.offsetWidth;
        while ((apiFieldParentWidth - apiFieldWidth) < 20) {
            apiField.textContent = apiField.textContent.slice(0, -1);
            apiFieldWidth = apiField.offsetWidth;
            apiFieldParentWidth = apiFieldParent.offsetWidth;
        }
    });
}
if (paymentBody4) {
    let popupOpenBtn = document.querySelector('#btn_open_popup-delete');
    const popupWrapper = document.querySelector('.payment_popup_wrapper');
    const popupBackground = document.querySelector('.payment_popup_bg');
    const popupCloseBtn = document.querySelector('.payment_popup-close');
    const paymentForm = document.querySelector('#payment-form');
    let paymentPopup = {
        popupShow: function () {
            popupWrapper.style.display = 'block';
            popupWrapper.style.top = window.scrollTop + 'px';
            document.body.style.overflow = 'hidden';
        },
        popupHide: function () {
            popupWrapper.style.display = 'none';
            document.body.style.overflow = 'auto';
        },
    };
    popupOpenBtn.addEventListener('click', function (e) {
        console.log(document.body.offsetHeight);
        paymentPopup.popupShow();

    })
    paymentPopup.popupHide();


    popupCloseBtn.addEventListener('click', () => paymentPopup.popupHide());
    let inputDarkEditBtns = document.querySelectorAll('.input-dark__btn');
    inputDarkEditBtns.forEach(el => {
        el.addEventListener('click', function (e) {
            el.previousElementSibling.focus();
        });
    });
}

cutApiField();
window.addEventListener('resize', cutApiField);




// console.log($('window').scrollTop(300))
// console.log($('.popupOpenBtn').scrollTop(300))