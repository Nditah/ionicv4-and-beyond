updateSlider = async function () {
    if (!document.getElementById('slider')) {
        return;
    }

    await document.getElementById('slider').update();

    await document.getElementById('slider').stopAutoplay();

    await lazyLoadImages();
};

previousSlide = async function () {
    if (!document.getElementById('slider')) {
        return;
    }

    await document.getElementById('slider').slidePrev();
};

nextSlide = async function () {
    if (!document.getElementById('slider')) {
        return;
    }

    await document.getElementById('slider').slideNext();
};

firstSlide = async function () {
    await document.getElementById('slider').slideTo(0, 2000);
};

lazyLoadImages = async function () {
    return new Promise(async (resolve) => {
        if (document.getElementById('slider')) {
            let index = await document.getElementById('slider').getActiveIndex();

            if (index === 0) {
                await lazyLoadSlideImages(0);
            }

            // We want to load the images of the next slides
            index++;
            await lazyLoadSlideImages(index);
        }

        resolve();
    });
};

lazyLoadSlideImages = async function (index) {
    return new Promise(async (resolve) => {
        const length = await document.getElementById('slider').length();

        if (index < length) {
            const slides = document.getElementById('slider').getElementsByTagName('ion-slide');

            if (slides && slides.length > index) {
                const allImages = slides[index].getElementsByTagName('img');

                for (let i = 0; i < allImages.length; i++) {
                    if (allImages[i].getAttribute('data-src')) {
                        allImages[i].setAttribute('src', allImages[i].getAttribute('data-src'));
                    }
                }
            }
        }

        resolve();
    });
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
document.addEventListener('ionSlideDidChange', lazyLoadImages);
