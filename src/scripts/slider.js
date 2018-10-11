async function hideShowNavigation() {
    if (!document.getElementById('slider')) {
        return;
    }

    const begin = await document.getElementById('slider').isBeginning();
    const end = await document.getElementById('slider').isEnd();

    document.getElementById('prevSlide').style.visibility = !begin ? 'visible' : 'hidden';
    document.getElementById('prevSlide').style.opacity = !begin ? '1' : '0';
    document.getElementById('nextSlide').style.visibility = !end ? 'visible' : 'hidden';
    document.getElementById('nextSlide').style.opacity = !end ? '1' : '0';
}
async function updateSlider() {
    if (!document.getElementById('slider')) {
        return;
    }

    await document.getElementById('slider').update();

    await document.getElementById('slider').stopAutoplay();

    await hideShowNavigation();
}

async function previousSlide() {
    if (!document.getElementById('slider')) {
        return;
    }

    await document.getElementById('slider').slidePrev();
}

async function nextSlide() {
    if (!document.getElementById('slider')) {
        return;
    }

    await document.getElementById('slider').slideNext();
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
    },
    zoom: false
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

document.addEventListener('ionSlidesDidLoad', updateSlider);
document.addEventListener('ionSlideDidChange', hideShowNavigation);

