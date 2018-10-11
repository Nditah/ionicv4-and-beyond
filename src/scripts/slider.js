document.addEventListener("ionSlidesDidLoad", updateSlider);

async function updateSlider() {
    await document.getElementById('slider').update();

    await document.getElementById('slider').stopAutoplay();
}

const slidesOptions = {
    autoplay: false,
    pagination: {
        el: '.swiper-pagination',
        type: 'progressbar'
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
};

document.getElementById('slider').options = slidesOptions;
document.getElementById('slider').pager = true;

document.addEventListener("keydown", async (e) => {
    if (e.key === 'ArrowLeft') {
        await document.getElementById('slider').slidePrev();
    } else if (e.key === 'ArrowRight') {
        await document.getElementById('slider').slideNext();
    }
});
