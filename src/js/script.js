const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    nav: false,
    /* navPosition: 'bottom', */
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


// реализуем табы
$(document).ready(function(){
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
        /* добавляет catalog__tab_active на нажатуй таб и удаляет его у остальных */
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        /* в ближайшем container найти catalog__content, удалить catalog__content_active, eq($(this).index() - получить номкр таба на который нажали, и добавляем класс активности соответствующему контенту */
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    // **********************************************************************************************
    // раелизуем слайд: описание пульсометра, ссылки ПОДРОБНЕЕ и НАЗАД
    // при клике на ссцлку с классом catalog-item__link, each - для каждого элемента будемчто тоделать i - номер элемента 
    /* $('.catalog-item__link').each(function(i) {
        // this ссылается на каждую ссылку. которую перебираем, при клике на ссылку выполняем действие
        $(this).on('click', function(e) {
            e.preventDefault(); // отменяем стандарное поведение браузера при клике на ссылку (# - переход в начало страницы) 
            // toggleClass - если класс есть он удаляется, если нет - добавляется 
            // eq9(i) получаем элемент по определенномй индексу 
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
    })

    $('.catalog-item__back').each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
    }) */

    // Оптимизациия реализации выше
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        })
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');
});