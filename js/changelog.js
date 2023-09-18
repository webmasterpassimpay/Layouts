const dots = document.querySelectorAll('.changelog-scrollbar__dot');

const scroll = document.querySelector('.changelog-scrollbar');
const changelog = {
    blurImages: function () {
        dots.forEach(dot => {
            let thisDotContent = dot.parentNode.parentNode.parentNode.querySelector('.changelog-body__item-container');
            // thisDotContent.style.opacity = '0.25';
            thisDotContent.classList.add('changelog-blured');
            thisDotContent.classList.remove('changelog-unblured');
        })
    },
    blurOnScroll: function () {
        let activeDot;
        dots.forEach(dot => {
        })
        for (let i = 0; i < dots.length; i++) {
            if ($(dots[i]).position().top > 0) {
                activeDot = dots[i];
            }
        }
        let thisDotContent = activeDot.parentNode.parentNode.parentNode.querySelector('.changelog-body__item-container');
        this.blurImages();
        // thisDotContent.style.opacity = '1';

        thisDotContent.classList.remove('changelog-blured');
        thisDotContent.classList.add('changelog-unblured');

    },
    whiteScrollbar: function () {
        dots.forEach(dot => {


            // console.log($(dot).position().top);
            // console.log(dot.previousElementSibling)
            dot.previousElementSibling.style.height = `${$(dot).position().top}px`;
        });
    }
}

document.addEventListener('scroll', () => {
    // console.log($('#scrollbar-dot1').position());
    changelog.blurOnScroll();
    changelog.whiteScrollbar();
})

document.addEventListener('wheel', () => {
    changelog.whiteScrollbar();
    setTimeout(changelog.whiteScrollbar, 1);
    setTimeout(changelog.whiteScrollbar, 10);
    setTimeout(changelog.whiteScrollbar, 100);
})


