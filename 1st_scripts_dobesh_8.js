if (window.location.href === 'https://www.justhoney.cz/' || window.location.href === 'http://www.justhoney.cz/') {
    const firstCarouselWrapper = document.querySelector('.carousel-wrapper');
    const carouselInner = document.querySelector('.carousel-inner');
    
    if (carouselInner) {
        carouselInner.style.setProperty('width', '50%', 'important');
        carouselInner.style.marginLeft = 'auto';
        carouselInner.style.marginRight = 'auto';
    }

    const headerElement = document.getElementById('header');

    if (headerElement) {
        const backgroundDiv = document.createElement('div');
        backgroundDiv.id = 'main-background';
        backgroundDiv.style.position = 'absolute';
        backgroundDiv.style.width = '100%';
        backgroundDiv.style.zIndex = '-1';
        backgroundDiv.style.overflow = 'hidden';

        const videoElement = document.createElement('video');
        videoElement.setAttribute('autoplay', true);
        videoElement.setAttribute('loop', true);
        videoElement.setAttribute('muted', true);
        videoElement.setAttribute('playsinline', true);
        videoElement.setAttribute('disablePictureInPicture', true);

        videoElement.style.width = '100%';
        videoElement.style.height = 'auto';
        videoElement.style.objectFit = 'cover';

        const sourceElement = document.createElement('source');
        sourceElement.setAttribute('src', 'https://www.justhoney.cz/user/documents/upload/NEW ZEALAND - NATURE - 4KSHORTEST.mp4');
        sourceElement.setAttribute('type', 'video/mp4');

        videoElement.appendChild(sourceElement);
        backgroundDiv.appendChild(videoElement);

        headerElement.parentNode.insertBefore(backgroundDiv, headerElement.nextSibling);
    }

    const mainBackground = document.querySelector("#main-background");
    if (mainBackground) {
        const overlay = document.createElement('div');
        overlay.id = 'video-overlay';
        overlay.style.position = 'absolute';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        overlay.style.zIndex = '2';

        const logo = document.createElement('img');
        logo.style.backdropFilter = 'blur(30px)';
        logo.src = 'https://cdn.myshoptet.com/usr/www.justhoney.cz/user/logos/just_honey_logo.png';
        logo.style.transition = 'transform 2s ease, opacity 1.5s ease';
        logo.style.opacity = '0';
        logo.style.transform = 'scale(3)';

        overlay.appendChild(logo);

        mainBackground.appendChild(overlay);

        setTimeout(() => {
            logo.style.backdropFilter = 'blur(0px)';
            logo.style.opacity = '1';
            logo.style.transform = 'scale(1.5)';
        }, 3000);

        const swiperHTML = `
            <div class="banner-swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <a href="https://www.justhoney.cz/produkty-zamereni-nachlazeni/">
                            <div class="image-container">
                                <div class="banner-image">
                                    <img src="https://www.justhoney.cz/user/documents/upload/Bannery/1stBanner.png">
                                    <div class="image-overlay">
                                        <p class="overlay-text">Nachlazení</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="swiper-slide">
                        <a href="https://www.justhoney.cz/produkty-znacky-primal-by-nature/">
                            <div class="image-container">
                                <img class="banner-image" src="https://www.justhoney.cz/user/documents/upload/Bannery/2ndBanner.png">
                                <div class="image-overlay">
                                    <p class="overlay-text">Primal by Nature</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="swiper-slide">
                        <a href="https://www.justhoney.cz/m--nuka-na-infekci-rany-a-popaleniny/">
                            <div class="image-container">
                                <img class="banner-image" src="https://www.justhoney.cz/user/documents/upload/Bannery/3rdBanner.png">
                                <div class="image-overlay">
                                    <p class="overlay-text">Manuka for Wounds</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="swiper-slide">
                        <a href="https://www.justhoney.cz/nejlepsi-zpusoby--jak-nahradit-cukr-medem/">
                            <div class="image-container">
                                <img class="banner-image" src="https://www.justhoney.cz/user/documents/upload/Bannery/4thBanner.png">
                                <div class="image-overlay">
                                    <p class="overlay-text">Replace Sugar with Honey</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
            `;

        mainBackground.insertAdjacentHTML('afterend', swiperHTML);

        const swiper = new Swiper('.banner-swiper', {
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            loop: true,
            centeredSlides: true,
            slidesPerView: 1,
            spaceBetween: 50,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            speed: 600,
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 0,
                depth: 0,
                slideShadows: false,
                scale: 0.9,
            },
            breakpoints: {
                850: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });

        const bannerSwiper = document.querySelector('.banner-swiper');
        const updateSwiperMargin = () => {
            const mainBackgroundHeight = mainBackground.offsetHeight;
            if (bannerSwiper) {
                bannerSwiper.style.marginTop = `${mainBackgroundHeight - 200}px`;
            }
        };

        updateSwiperMargin();
        window.addEventListener('resize', updateSwiperMargin);

        //firstCarouselWrapper.remove();
    }
}

document.addEventListener("DOMContentLoaded", function () {
  const submenuArrows = document.querySelectorAll('.submenu-arrow');

  submenuArrows.forEach(arrow => {
    arrow.addEventListener('click', function () {
      const menuLevel2 = this.parentElement.parentElement.querySelector('.menu-level-2');
      if (menuLevel2) {
        if (menuLevel2.classList.contains('show')) {
          menuLevel2.classList.remove('show');
        } else {
          setTimeout(() => {
            menuLevel2.classList.add('show');
          }, 25);
        }
      }
    });
  });
});
//
document.addEventListener("DOMContentLoaded", function () {
  const initializeObservers = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth >= 991) {
      const menuItems = document.querySelectorAll('[class^="menu-item-"]');

      menuItems.forEach((menuItem) => {
        const observer = new MutationObserver((mutationsList) => {
          mutationsList.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
              const isExpanded = menuItem.classList.contains('exp');
              const menuLevel2 = menuItem.querySelector('.menu-level-2');
              if (menuLevel2) {
                if (isExpanded) {
                      if (window.location.href === 'https://www.justhoney.cz/' || window.location.href === 'http://www.justhoney.cz/') {
                            menuLevel2.classList.add('opaque-smooth-show');
                        }
                    else {
                         menuLevel2.classList.add('smooth-show');
                    }
                } else {
                  menuLevel2.classList.remove('smooth-show');
                }
              }
            }
          });
        });

        const observerOptions = {
          attributes: true,
          attributeFilter: ['class'],
        };

        observer.observe(menuItem, observerOptions);
      });
    }
  };

  initializeObservers();
});
//
const bodyElement = document.body;

const removeShowClassFromMenuLevel2 = () => {
    const menuLevel2Elements = document.querySelectorAll('#navigation .menu-level-2');
    menuLevel2Elements.forEach((element) => {
        element.classList.remove('show');
    });
};

const removeExpClassFromNavigation = () => {
    const expElements = document.querySelectorAll('#navigation .exp');
    expElements.forEach((element) => {
        element.classList.remove('exp');
    });
};

const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const bodyHasClass = bodyElement.classList.contains('navigation-window-visible');
            const windowWidth = window.innerWidth;
            if (!bodyHasClass && windowWidth < 767) {
                removeShowClassFromMenuLevel2();
                removeExpClassFromNavigation();
            }
        }
    });
});

const observerOptions = {
    attributes: true,
    attributeFilter: ['class'],
};

observer.observe(bodyElement, observerOptions);
