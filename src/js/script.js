/* $(document).ready(function(){ // jquery библиотека $(document).ready(function() - когда документ готов (загружен) выполнить функцию 
     $('.carousel__inner').slick({ // запускаем слайдер 
         speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [{ // адаптация карусели под различные разрешения 
            breakpoint: 768,
            settings: {
                dots: true,
                arrows: false
            }
        }] 
    }); 
  }); */

const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    /* nav: false, */
    navPosition: 'bottom',

    controls: false,
    /* controlsText: ['<img src="icons/left.svg">', '<img src="icons/right.svg">'] */
    responsive: { /* адаптация под разные разрешения */
        640: {
            items: 1,
            slideBy: 'page',
            autoplay: false,
        },
        700: {
            items: 1,
            slideBy: 'page',
            autoplay: false,
        },
        900: {
            items: 1,
            slideBy: 'page',
            autoplay: false,
        }
    }
});

/* document.querySelector('.prev').onclick = function () {
    slider.goTo('prev');
}; */

document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
});
document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
});