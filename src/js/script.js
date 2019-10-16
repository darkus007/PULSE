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
                $('.catalog-item__details').eq(i).toggleClass('catalog-item__details_active');
            })
        })
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');


    /* Пишем скрипты для модальных окон используя jQuery *************************************************/
    /* data-modal="consultation" - так можно в HTML задавать атрибуты для нужных компонентов */
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow'); // делаем элементы видимыми
    });

    // пишем код для крестика закрывающего модальные окна
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    // для моодального окна купить
    /* $('.button_mini').on('click', function() {
        $('.overlay, #order').fadeIn('slow'); // делаем элементы видимыми
    }); */

    // для моодального окна купить с подстановкой товара в окно
    // text() - как читает. так и записывает 
    // eq(i) - обращается к i-тому элементу
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });


    // Валидация форм использую jQuery *************************************************
    //$('.feed-form').validate(); // работает только на первом элементе с селектором '.feed-form'
    // https://jqueryvalidation.org/category/plugin/
    function validateForms(form) {
        $(form).validate({
            rules: {
                name: "required", // получаем из идентификатора name="name"
                phone: "required", // получаем из идентификатора name="phone"
                email: {            // получаем из идентификатора name="email"
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста, введите свое имя",
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свой почтовый адрес",
                    email: "Неправильно введен адрес почты"
                }
            }
        }); 
    };
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');


    // Применеие масок ввода используя jQuery ************************************
    $('input[name=phone]').mask("+7 (999) 999-99-99"); // для его работы необходимо убрать type="number" в HTML коде


    // Подключаем и настраиваем mailer *******************************************
    // $('form') - обращаемся ко всем формам
    // $('.button_mini') - обращаемся к конкретному классу
    // .submit - когда форма подтверждена, выполняем function()...
    $('form').submit(function(e) {
        e.preventDefault(); // отменяем стандартное поведение браузера, что бы страница не перезагружалась
        // отправляем форму на сервер через метод ajax(), который есть в jQuery
        $.ajax({
            type: "POST",                       // POST - отправить данные (не получить, там другой ключ)
            url: "mailer/smart.php",            // указываем обработчик который будет обрабатывать данные
            data: $(this).serialize()           // указываем данные, которые отправляем 
        }).done(function() {                    // после отправки запроса выполняем:
            $(this).find("input").val("");      // внутри формы находим все input-ы ии устанавливаем их значения в ноль ""
            $('#consultation, #order').fadeOut();   // скрываем модальные окна отправки форм
            $('.overlay, #thanks').fadeIn('slow');  // отображаем окно thanks
            $('form').trigger('reset');             // сбрасываем формы
        });
        return false;                               // так надо...
    });


    // Стрелка возврата в начало страницы *****************************************
    // window - все наше окно браузера
    $(window).scroll(function() {
        if($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    
    
    // Плавная прокрутка от ссылки до места куда она ссылается, работает не только со стрелкой, н и со всеми ссылками
    // Для работы должна быть подключена библиотека jQuery.
    // $("a[href^='#']").click(function(){

    // для валидации формы и исключения ошибок в консоле, переписываем первую строку 
    // на действие по конкретной ссылке с "up":
    
    $("a[href='#up']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });


    // Плавная анимация окон на примере отзывов **************************************
    // Подключаем WOW
    new WOW().init();
});