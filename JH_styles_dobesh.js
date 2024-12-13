/**
 * (c) Copyright by Daniel Dobeš
 **/

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
        const swiperHTML = `
            <div class="banner-swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <a href="https://www.justhoney.cz/produkty-zamereni-nachlazeni/">
                            <div class="image-container">
                                <div class="banner-image">
                                    <img src="https://www.justhoney.cz/user/documents/upload/Bannery/1stBanner.png">
                                    <div class="image-overlay">
                                        <p class="overlay-text">MĀNUKA NA NACHLAZENÍ A IMUNITU</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="swiper-slide">
                        <a href="https://www.justhoney.cz/produkty-znacky-primal-by-nature/">
                            <div class="image-container">
                                <div class="banner-image">
                                    <img src="https://www.justhoney.cz/user/documents/upload/Bannery/2ndBanner.png">
                                    <div class="image-overlay">
                                        <p class="overlay-text">MĀNUKA K DENNÍMU UŽÍVÁNÍ</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="swiper-slide">
                        <a href="https://www.justhoney.cz/m--nuka-na-infekci-rany-a-popaleniny/">
                            <div class="image-container">
                                <div class="banner-image">
                                    <img src="https://www.justhoney.cz/user/documents/upload/Bannery/3rdBanner.png">
                                    <div class="image-overlay">
                                        <p class="overlay-text">MĀNUKA A PÉČE O PLEŤ</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="swiper-slide">
                        <a href="https://www.justhoney.cz/nejlepsi-zpusoby--jak-nahradit-cukr-medem/">
                            <div class="image-container">
                                <div class="banner-image">
                                    <img src="https://www.justhoney.cz/user/documents/upload/Bannery/4thBanner.png">
                                    <div class="image-overlay">
                                        <p class="overlay-text">NEJLEPŠÍ ZPŮSOBY, JAK NAHRADIT CUKR MEDEM</p>
                                    </div>
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
                1100: {
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

//-----------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    if (!document.body.classList.contains("admin-bar")) {
        var newElement = document.createElement("div");
        newElement.className = "the-one-whose-name-we-shall-not-say";

        var headerElement = document.getElementById("header");
        if (headerElement) {
            headerElement.parentNode.insertBefore(newElement, headerElement);
        }
    }
});

		const mainBackground = document.getElementById("main-background");
    const bannerSwiper = document.querySelector(".banner-swiper");

    function updateMarginTop() {
        if (mainBackground && bannerSwiper) {
            const mainBackgroundHeight = mainBackground.offsetHeight;
            bannerSwiper.style.marginTop = `${mainBackgroundHeight}px`;
        }
    }

    updateMarginTop();

    window.addEventListener("resize", updateMarginTop);

if (window.location.href != 'https://www.justhoney.cz/' && window.location.href != 'http://www.justhoney.cz/') {
    document.addEventListener("DOMContentLoaded", function () {
        const header = document.getElementById("header");
        const contentWrapper = document.querySelector(".content-wrapper");

        function updateMarginTop() {
            if (header && contentWrapper) {
                const headerHeight = header.offsetHeight;
                contentWrapper.style.marginTop = `${headerHeight}px`;
            }
        }

        updateMarginTop();

        window.addEventListener("resize", updateMarginTop);

        const observer = new MutationObserver(updateMarginTop);
        observer.observe(header, { attributes: true, childList: true, subtree: true });

				//header + bar override mimo main page
        //header.style.backgroundColor = 'transparent';
    });
}

// bannery pod produkty
if (window.location.href != 'https://www.justhoney.cz/' && window.location.href != 'http://www.justhoney.cz/' && 
document.querySelector('.p-detail-full-width')) {
	const swiperHTML = `
            <div class="banner-swiper" style="margin-top: 30px;margin-bottom: 30px;">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <a href="https://www.justhoney.cz/produkty-zamereni-nachlazeni/">
                            <div class="image-container">
                                <div class="banner-image">
                                    <img src="https://www.justhoney.cz/user/documents/upload/Bannery/1stBanner.png">
                                    <div class="image-overlay">
                                        <p class="overlay-text">MĀNUKA NA NACHLAZENÍ A IMUNITU</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="swiper-slide">
                        <a href="https://www.justhoney.cz/produkty-znacky-primal-by-nature/">
                            <div class="image-container">
                                <div class="banner-image">
                                    <img src="https://www.justhoney.cz/user/documents/upload/Bannery/2ndBanner.png">
                                    <div class="image-overlay">
                                        <p class="overlay-text">MĀNUKA K DENNÍMU UŽÍVÁNÍ</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="swiper-slide">
                        <a href="https://www.justhoney.cz/m--nuka-na-infekci-rany-a-popaleniny/">
                            <div class="image-container">
                                <div class="banner-image">
                                    <img src="https://www.justhoney.cz/user/documents/upload/Bannery/3rdBanner.png">
                                    <div class="image-overlay">
                                        <p class="overlay-text">MĀNUKA A PÉČE O PLEŤ</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="swiper-slide">
                        <a href="https://www.justhoney.cz/nejlepsi-zpusoby--jak-nahradit-cukr-medem/">
                            <div class="image-container">
                                <div class="banner-image">
                                    <img src="https://www.justhoney.cz/user/documents/upload/Bannery/4thBanner.png">
                                    <div class="image-overlay">
                                        <p class="overlay-text">NEJLEPŠÍ ZPŮSOBY, JAK NAHRADIT CUKR MEDEM</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
            `;
				
        const detailWrapper = document.querySelector('.p-detail-full-width')
        detailWrapper.insertAdjacentHTML('afterend', swiperHTML);

        const swiper = new Swiper('.banner-swiper', {
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            loop: true,
            slidesPerView: 1,
            spaceBetween: 50,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            speed: 600,
            breakpoints: {
                1400: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
            },
        });
}

//----------------------------------------------

document.addEventListener("DOMContentLoaded", () => { 
 		const sidebar = document.querySelector(".sidebar.sidebar-left");
    if (sidebar) {
        sidebar.style.opacity = "1";
        sidebar.style.transform = "translateY(0)";
    }
    
    const content = document.getElementById("content");
    if (content) {
        setTimeout(() => {
            content.style.opacity = "1";
            content.style.transform = "translateY(0)";
        }, 500);
    }
    
    const productsWrapper = document.querySelector("#content > .products-wrapper");
		if (productsWrapper) {
        const parallaxDiv = document.createElement("div");
        parallaxDiv.classList.add("additional-background1");

        const textBlock = document.createElement("div");
        textBlock.classList.add("text-block");

        const smallHeadline = document.createElement("h5");
        smallHeadline.textContent = "ODHALTE TAJEMSTVÍ NOVÉHO ZÉLANDU";
        textBlock.appendChild(smallHeadline);

        const bigHeadline = document.createElement("h1");
        bigHeadline.textContent = "MĀNUKA A ZPŮSOB UŽÍVÁNÍ";
        textBlock.appendChild(bigHeadline);

        const paragraph = document.createElement("p");
        paragraph.textContent = "Zjistěte, jak můžete našimi produkty přispět svému zdraví. ";
        textBlock.appendChild(paragraph);
				
        parallaxDiv.appendChild(textBlock);
        
        const containerDiv = document.createElement("div");
        containerDiv.style.display = "flex";
        containerDiv.style.justifyContent = "center";
        containerDiv.appendChild(parallaxDiv);

        productsWrapper.parentNode.insertBefore(containerDiv, productsWrapper.nextSibling);
        
        const button = document.createElement('a');
        button.className = 'btn-elegant';
        button.innerText = 'PROZKOUMAT';
        button.href = 'https://www.justhoney.cz/manuka/';

        paragraph.parentNode.appendChild(button);
		}
    
    // MAKE SURE IT'S MAIN PAGE!!!
    const mainBackground = document.getElementById("main-background");
    const bannerSwiper = document.querySelector(".banner-swiper");

    if (mainBackground && bannerSwiper) {
        const backgroundHeight = mainBackground.offsetHeight;

        bannerSwiper.style.marginTop = `${backgroundHeight}px`;
    }
});

window.addEventListener("resize", function () {
    if (mainBackground && bannerSwiper) {
        const backgroundHeight = mainBackground.offsetHeight;
        bannerSwiper.style.marginTop = `${backgroundHeight}px`;
    }
});

document.addEventListener('DOMContentLoaded', () => {
  const targetElement = document.querySelector('.homepage-latest-contribution-full-width') || document.querySelector('.p-detail-full-width');
  
  if (targetElement) {
    const timelineContainer = document.createElement('div');

    timelineContainer.innerHTML = 
      `<div class="timeline">
        <div class="timeline-list-item">
            <div class="timeline-item" data-index="0">
                <div class="timeline-image-container">
                    <img class="is-visible" src="https://image.pobo.cz/images/cg8cb4d29834/aciyu8vhjd6jao5yp1vs-original.jpeg" alt="Image 1" data-index="0">
                    <img class="mod-1" src="https://image.pobo.cz/images/cg8cb4d29834/d1j173k2js9g5z3wrutc-md.webp" alt="Image 2" data-index="1">
                    <img src="https://image.pobo.cz/images/cg8cb4d29834/ixx65pq70owejnewyphy-original.jpeg" alt="Image 3" data-index="2">
                </div>
                <div class="timeline-content">
                    <div class="timeline-inner is-visible" data-index="0">
                        <header class="timeline-header">
                            <h3 class="section-header-sub-heading">recepty</h3>
                            <h2 class="section-header-heading">oslaďte jídelníček</h2>
                            <div class="section-header-description">
                                <p>Prozkoumejte způsoby, kterými si můžete zdravě osladit život...</p>
                                <a class="btn-elegant-2" href="https://www.justhoney.cz/recepty-2/">PROZKOUMAT</a>
                            </div>
                        </header>
                    </div>
                    <div class="timeline-inner" data-index="1">
                        <header class="timeline-header">
                            <h3 class="section-header-sub-heading">garance kvality</h3>
                            <h2 class="section-header-heading">jenom to nejlepší</h2>
                            <div class="section-header-description">
                                <p>Nabízíme jen ty nejkvalitnější medy z Nového Zélandu...</p>
                                <a class="btn-elegant-2" href="https://www.justhoney.cz/produkty-znacky/">PROZKOUMAT</a>
                            </div>
                        </header>
                    </div>
                    <div class="timeline-inner" data-index="2">
                        <header class="timeline-header">
                            <h3 class="section-header-sub-heading">vybírejte dle zaměření</h3>
                            <h2 class="section-header-heading">různé možnosti aplikace</h2>
                            <div class="section-header-description">
                                <p>Kvalitní med lze využít všelijakými způsoby...</p>
                                <a class="btn-elegant-2" href="https://www.justhoney.cz/produkty-zamereni/">PROZKOUMAT</a>
                            </div>
                        </header>
                    </div>
                </div>
            </div>
        </div>
        <div class="timeline-nav">
            <div>
                <button type="button" class="timeline-nav-item is-selected" data-index="0">
                    <span class="timeline-nav-label">recepty</span>
                </button>
                <button type="button" class="timeline-nav-item" data-index="1">
                    <span class="timeline-nav-label">kvalita</span>
                </button>
                <button type="button" class="timeline-nav-item" data-index="2">
                    <span class="timeline-nav-label">využití</span>
                </button>
            </div>
        </div>
    </div>`
    ;

    targetElement.insertAdjacentElement('afterend', timelineContainer);

    const parallaxDiv = document.createElement("div");
        parallaxDiv.classList.add("additional-background1");

        const textBlock = document.createElement("div");
        textBlock.classList.add("text-block");

        const smallHeadline = document.createElement("h5");
        smallHeadline.textContent = "ODHALTE TAJEMSTVÍ NOVÉHO ZÉLANDU";
        textBlock.appendChild(smallHeadline);

        const bigHeadline = document.createElement("h1");
        bigHeadline.textContent = "MĀNUKA A ZPŮSOB UŽÍVÁNÍ";
        textBlock.appendChild(bigHeadline);

        const paragraph = document.createElement("p");
        paragraph.textContent = "Zjistěte, jak můžete našimi produkty přispět svému zdraví. ";
        textBlock.appendChild(paragraph);
				
        parallaxDiv.appendChild(textBlock);
        
        const containerDiv = document.createElement("div");
        containerDiv.style.display = "flex";
        containerDiv.style.justifyContent = "center";
        containerDiv.style.marginTop = '30px';
        containerDiv.style.marginBottom = '30px';
        containerDiv.appendChild(parallaxDiv);

        targetElement.insertAdjacentElement('afterend', containerDiv);
        
        const button = document.createElement('a');
        button.className = 'btn-elegant';
        button.innerText = 'PROZKOUMAT';
        button.href = 'https://www.justhoney.cz/manuka/';

        paragraph.parentNode.appendChild(button);
  } else {
    console.error('Target element not found');
  }
});

document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".timeline-nav-item");
    const images = document.querySelectorAll(".timeline-image-container img");
    const innerContents = document.querySelectorAll(".timeline-inner");
    let currentIndex = 0;

    navItems.forEach((navItem) => {
        navItem.addEventListener("click", () => {
            const newIndex = parseInt(navItem.getAttribute("data-index"));

            if (newIndex === currentIndex) return;

            const currentImage = images[currentIndex];
            const newImage = images[newIndex];
            const currentInner = innerContents[currentIndex];
            const newInner = innerContents[newIndex];

            navItems.forEach((item) => item.classList.remove("is-selected"));
            navItem.classList.add("is-selected");

            currentImage.classList.remove("is-visible");
            currentImage.classList.add("is-fading-out");

            newImage.classList.add("is-visible");

            currentInner.classList.remove("is-visible");
            newInner.classList.add("is-visible");

            currentImage.addEventListener(
                "transitionend",
                function handleTransitionEnd() {
                    currentImage.classList.remove("is-fading-out");
                    currentImage.removeEventListener("transitionend", handleTransitionEnd);
                }
            );

            currentIndex = newIndex;
        });
    });
});
