updateSlider = async function() {
    if (!document.getElementById('slider')) {
        return;
    }

    await document.getElementById('slider').update();

    await document.getElementById('slider').stopAutoplay();
};

previousSlide = async function() {
    if (!document.getElementById('slider')) {
        return;
    }

    await document.getElementById('slider').slidePrev();
};

nextSlide = async function() {
    if (!document.getElementById('slider')) {
        return;
    }

    await document.getElementById('slider').slideNext();
};

const slidesOptions = {
    autoplay: false,
    pagination: {
        el: '.swiper-pagination',
        type: 'progressbar'
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    zoom: false
};

document.getElementById('slider').options = slidesOptions;
document.getElementById('slider').pager = true;

document.addEventListener("keydown", async (e) => {
    if (e.defaultPrevented) {
        return;
    }

    if (e.key === 'ArrowLeft') {
        await document.getElementById('slider').slidePrev();
    } else if (e.key === 'ArrowRight') {
        await document.getElementById('slider').slideNext();
    }
});

document.addEventListener('ionSlidesDidLoad', updateSlider);

