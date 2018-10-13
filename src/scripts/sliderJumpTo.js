class SlidesList extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {

        const slidesListActions = await buildSlidesListActions();

        this.innerHTML = '<ion-content><ion-list><ion-list-header>Jump to slide</ion-list-header>' + slidesListActions + '</ion-list></ion-content>';
    }
}

function buildSlidesListActions() {
    return new Promise(async (resolve) => {
        const countSlides = await document.getElementById('slider').length();

        let result = '';

        for (let i = 0; i < countSlides; i++) {
            result += '<ion-item ion-item button onclick="jumpToSlide(' + i +')"><ion-label>Slide ' + i + '</ion-label></ion-item>';
        }

        resolve(result);
    });
}

async function jumpToSlide(index) {
    await document.getElementById('slider').slideTo(index, 0);
    await document.querySelector('ion-popover-controller').dismiss();
}

customElements.define('slides-list', SlidesList);

async function presentSlidePicker() {
    const popoverController = document.querySelector('ion-popover-controller');

    if (!popoverController) {
        return;
    }

    await popoverController.componentOnReady();

    const popover = await popoverController.create({
        component: 'slides-list',
        translucent: true
    });

    return await popover.present();
}