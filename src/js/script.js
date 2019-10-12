$(document).ready(function(){ //* jquery библиотека $(document).ready(function() - когда документ готов (загружен) выполнить функцию */
    $('.carousel__inner').slick({ //* запускаем слайдер */
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
  });