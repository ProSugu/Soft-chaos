export const VERTICAL_SLIDER_CONFIG = {
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    vertical: true,
    dots: false,
    nav: false,
    infinite: false,
    verticalSwiping: true,
    centerPadding: '75px',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1.2,
        }
      },
      {
        breakpoint: 767,
        settings: {
          vertical: false,
          verticalSwiping: false,
          slidesToShow: 1.2,
        }
      },
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          vertical: false,
          verticalSwiping: false,
          slidesToShow: 1,
          centerMode: false
        }
      }
    ]
  };

  export const HORIZONTAL_SLIDER_CONFIG = {
    slidesToShow: 2.5,
    slidesToScroll: 1,
    centerMode: true,
    vertical: false,
    dots: true,
    infinite: false,
    adaptiveHeight: false,
    centerPadding: '30',
    variableWidth: true,
    variableHeight: true,
    speed: 1000,
    responsive: [
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 1.2,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 556,
        settings: {
          slidesToShow: 1.6,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.2,
        }
      }
    ],
    prevArrow: "<button type='button' matRipple class='slick-prev pull-left'><img width='30px' height='30px' src='assets/images/arrow-left.jpeg'></button>",
    nextArrow: "<button type='button' matRipple class='slick-next pull-right'><img width='30px' height='30px' src='assets/images/arrow-right.jpeg'></button>",
  };