/**
 * (c) Copyright by Daniel Dobeš
 **/

// --- helpers ---
const isHome = (() => {
  try {
    const { hostname, pathname, search } = window.location;
    const isRoot = pathname === '/' || pathname === '';
    const isJustHoney = hostname.replace(/^www\./, '') === 'justhoney.cz';
    const hasFbclid = /(?:^|[?&])fbclid=/.test(search);
    return (isJustHoney && isRoot) || hasFbclid;
  } catch {
    return false;
  }
})();

const onDomReady = (fn) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn, { once: true });
  } else {
    fn();
  }
};

// --- HOME PAGE: video bg + swiper ---
if (isHome) {
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
    Object.assign(backgroundDiv.style, {
      position: 'absolute',
      width: '100%',
      zIndex: '-1',
      overflow: 'hidden',
    });

    const videoElement = document.createElement('video');
    videoElement.muted = true;
    videoElement.playsInline = true;
    videoElement.autoplay = true;
    videoElement.loop = true;
    videoElement.controls = false;
    videoElement.preload = 'auto';
    videoElement.setAttribute('muted', '');
    videoElement.setAttribute('playsinline', '');
    videoElement.setAttribute('webkit-playsinline', '');
    videoElement.setAttribute('disablePictureInPicture', '');
    
    videoElement.style.width = '100%';
    videoElement.style.height = 'auto';
    videoElement.style.objectFit = 'cover';
    
    const sourceElement = document.createElement('source');
    sourceElement.src = 'https://www.justhoney.cz/user/documents/upload/NEW ZEALAND - NATURE - 4KSHORTEST.mp4';
    sourceElement.type = 'video/mp4';

    const mobileFilter = document.createElement('div');
    mobileFilter.id = 'black-mobile-filter';

    const mobileLink = document.createElement('a');
    mobileLink.id = 'welcoming-mobile-logo';
    mobileLink.innerHTML = '<img src="https://www.justhoney.cz/user/documents/upload/Just%20Honey%20logo.png" alt="Just Honey Logo">';

    videoElement.appendChild(sourceElement);
    backgroundDiv.appendChild(mobileLink);
    backgroundDiv.appendChild(mobileFilter);
    backgroundDiv.appendChild(videoElement);

    headerElement.parentNode.insertBefore(backgroundDiv, headerElement.nextSibling);

    document.addEventListener('click', () => {
      if (videoElement.paused) {
        videoElement.play().catch((error) => {
          console.error('Autoplay failed after user interaction:', error);
        });
      }
    });

    ensureAutoplayForever(videoElement);
  }

  const mainBackground = document.querySelector('#main-background');

  if (mainBackground) {
    const repeatedBanners = [...banners, ...banners];
    const swiperHTML = `
      <div class="banner-swiper" style="margin-top:0;margin-bottom:60px;">
        <div class="swiper-wrapper">
          ${repeatedBanners.map((banner, i) => `
            <div class="swiper-slide" data-dup="${i >= banners.length ? 1 : 0}">
              <a href="${banner.odkaz}">
                <div class="image-container">
                  <div class="banner-image">
                    <img src="${banner.obrazek}" alt="${banner.nazev}">
                    <div class="image-overlay">
                      <p class="overlay-text">${banner.nazev}</p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          `).join('')}
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
      slidesPerView: 'auto',
      spaceBetween: 50,
      autoplay: { delay: 6000, disableOnInteraction: false },
      speed: 600,
      effect: 'coverflow',
      coverflowEffect: { rotate: 0, slideShadows: false, scale: 0.9 },
      breakpoints: {
        1100: { slidesPerView: 3, spaceBetween: 30 },
      },
    });

    const bannerSwiper = document.querySelector('.banner-swiper');

    const updateSwiperMargin = () => {
      if (!bannerSwiper) return;
      const h = mainBackground.offsetHeight || 0;
      bannerSwiper.style.marginTop = `${Math.max(h - 150, 0)}px`;
    };

    window.addEventListener('resize', updateSwiperMargin);

    let resizeObserv;
    function attachResizeObserver(el) {
      if (!('ResizeObserver' in window) || !el) return;
      if (resizeObserv) resizeObserv.disconnect();
      resizeObserv = new ResizeObserver(updateSwiperMargin);
      resizeObserv.observe(el);
    }

    attachResizeObserver(mainBackground);
    updateSwiperMargin();
  }
}

// --- global DOMContentLoaded: nav + submenu toggles ---
onDomReady(() => {
  const contentWrapper = document.querySelector('#content-wrapper');
  if (contentWrapper) contentWrapper.style.setProperty('margin-top', '0', 'important');

  const submenuArrows = document.querySelectorAll('.submenu-arrow');
  submenuArrows.forEach((arrow) => {
    arrow.addEventListener('click', function () {
      const menuLevel2 = this.parentElement?.parentElement?.querySelector('.menu-level-2');
      if (!menuLevel2) return;
      if (menuLevel2.classList.contains('show')) {
        menuLevel2.classList.remove('show');
      } else {
        setTimeout(() => menuLevel2.classList.add('show'), 25);
      }
    });
  });
});

// --- desktop expand animation watcher ---
onDomReady(() => {
  const windowWidth = window.innerWidth;
  if (windowWidth < 991) return;

  const menuItems = document.querySelectorAll('[class^="menu-item-"]');
  menuItems.forEach((menuItem) => {
    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isExpanded = menuItem.classList.contains('exp');
          const menuLevel2 = menuItem.querySelector('.menu-level-2');
          if (!menuLevel2) return;
          if (isExpanded) {
            if (isHome) {
              menuLevel2.classList.add('opaque-smooth-show');
            } else {
              menuLevel2.classList.add('smooth-show');
            }
          } else {
            menuLevel2.classList.remove('smooth-show');
            menuLevel2.classList.remove('opaque-smooth-show');
          }
        }
      });
    });

    observer.observe(menuItem, { attributes: true, attributeFilter: ['class'] });
  });
});

// --- mobile: close nav when body loses class ---
(() => {
  const bodyElement = document.body;

  const removeShowClassFromMenuLevel2 = () => {
    document.querySelectorAll('#navigation .menu-level-2').forEach((el) => el.classList.remove('show'));
  };
  const removeExpClassFromNavigation = () => {
    document.querySelectorAll('#navigation .exp').forEach((el) => el.classList.remove('exp'));
  };

  const bodyObserver = new MutationObserver((mutationsList) => {
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

  bodyObserver.observe(bodyElement, { attributes: true, attributeFilter: ['class'] });
})();

// --- “the-one...” element before header if no admin bar ---
onDomReady(() => {
  if (!document.body.classList.contains('admin-bar')) {
    const newElement = document.createElement('div');
    newElement.className = 'the-one-whose-name-we-shall-not-say';

    const headerElement = document.getElementById('header');
    if (headerElement && headerElement.parentNode) {
      headerElement.parentNode.insertBefore(newElement, headerElement);
    }
  }
});

// --- banner-swiper margin for desktop/tablets ---
(() => {
  const mainBackground = document.getElementById('main-background');
  const bannerSwiper = document.querySelector('.banner-swiper');

  function updateMarginTop() {
    if (!mainBackground || !bannerSwiper) return;
    const isWide = window.matchMedia('(min-width: 768px)').matches;
    if (isWide) {
      const h = Math.ceil(mainBackground.getBoundingClientRect().height);
      bannerSwiper.style.setProperty('margin-top', `${h}px`, 'important');
    } else {
      bannerSwiper.style.removeProperty('margin-top');
    }
  }

  window.addEventListener('resize', updateMarginTop);
  onDomReady(updateMarginTop);
})();

// --- non-home: push content below header ---
if (!isHome) {
  onDomReady(() => {
    const header = document.getElementById('header');
    const contentWrapper = document.querySelector('#content-wrapper');

    const updateMarginTop = () => {
      if (header && contentWrapper) {
        const headerHeight = header.offsetHeight;
        contentWrapper.style.setProperty('margin-top', `${headerHeight + 30}px`, 'important');
      }
    };

    updateMarginTop();
    window.addEventListener('resize', updateMarginTop);

    if (header) {
      const observer = new MutationObserver(updateMarginTop);
      observer.observe(header, { attributes: true, childList: true, subtree: true });
    }
  });
}

// --- fade-in sections & optional main swiper on non-home ---
onDomReady(() => {
  const sidebar = document.querySelector('.sidebar.sidebar-left');
  if (sidebar) {
    sidebar.style.opacity = '1';
    sidebar.style.transform = 'translateY(0)';
  }

  const content = document.getElementById('content');
  if (content) {
    setTimeout(() => {
      content.style.opacity = '1';
      content.style.transform = 'translateY(0)';
    }, 500);
  }
});

// --- timeline + banner on certain pages ---
onDomReady(() => {
  const targetElement =
    document.querySelector('.homepage-latest-contribution-full-width') ||
    document.querySelector('.p-detail-full-width') ||
    document.querySelector('.category-content-wrapper');

  if (!targetElement) {
    console.error('Target element not found');
    return;
  }

  const timelineContainer = document.createElement('div');
  timelineContainer.innerHTML = `
    <div class="timeline">
      <div class="timeline-list-item">
        <div class="timeline-item" data-index="0">
          <div class="timeline-image-container">
            ${timelineData.map((item, index) => `
              <img class="${index === 0 ? 'is-visible' : ''}" src="${item.obrazek}" alt="Image ${index + 1}" data-index="${index}">
            `).join('')}
          </div>
          <div class="timeline-content">
            ${timelineData.map((item, index) => `
              <div class="timeline-inner ${index === 0 ? 'is-visible' : ''}" data-index="${index}">
                <header class="timeline-header">
                  <h3 class="section-header-sub-heading">${item.miniNadpis}</h3>
                  <h2 class="section-header-heading">${item.nadpis}</h2>
                  <div class="section-header-description">
                    <p>${item.popis}</p>
                    <a class="btn-elegant-2" href="${item.odkaz}">PROZKOUMAT</a>
                  </div>
                </header>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="timeline-nav">
        <div>
          ${timelineData.map((item, index) => `
            <button type="button" class="timeline-nav-item ${index === 0 ? 'is-selected' : ''}" data-index="${index}">
              <span class="timeline-nav-label">${item.linkNazev}</span>
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  const parallaxDiv = document.createElement('div');
  parallaxDiv.classList.add('additional-background1');

  const textBlock = document.createElement('div');
  textBlock.classList.add('text-block');

  const smallHeadline = document.createElement('h5');
  smallHeadline.textContent = boxMiniNadpis;
  textBlock.appendChild(smallHeadline);

  const bigHeadline = document.createElement('h1');
  bigHeadline.textContent = boxNadpis;
  textBlock.appendChild(bigHeadline);

  const paragraph = document.createElement('p');
  paragraph.textContent = boxPopis;
  textBlock.appendChild(paragraph);

  parallaxDiv.appendChild(textBlock);

  const containerDiv = document.createElement('div');
  Object.assign(containerDiv.style, {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '60px',
    marginBottom: '60px',
  });

  if (!document.querySelector('.homepage-latest-contribution-full-width')) {
    Object.assign(containerDiv.style, { maxWidth: '1342px', padding: '20px' });
  }

  containerDiv.appendChild(parallaxDiv);

  const button = document.createElement('a');
  button.className = 'btn-elegant';
  button.innerText = 'PROZKOUMAT';
  button.href = boxOdkaz;
  paragraph.parentNode.appendChild(button);

  const swiperHTML = `
    <div class="banner-swiper" style="margin-top:60px;margin-bottom:60px;">
      <div class="swiper-wrapper">
        ${banners.map((banner) => `
          <div class="swiper-slide">
            <a href="${banner.odkaz}">
              <div class="image-container">
                <div class="banner-image">
                  <img src="${banner.obrazek}" alt="${banner.nazev}">
                  <div class="image-overlay">
                    <p class="overlay-text">${banner.nazev}</p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        `).join('')}
      </div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  `;

  if (!document.querySelector('.homepage-latest-contribution-full-width')) {
    targetElement.insertAdjacentHTML('afterend', swiperHTML);
    const swiper = new Swiper('.banner-swiper', {
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      loop: true,
      slidesPerView: 1,
      spaceBetween: 50,
      autoplay: { delay: 6000, disableOnInteraction: false },
      speed: 600,
      breakpoints: { 1400: { slidesPerView: 2, spaceBetween: 20 } },
    });
  } else {
    const targetElement2 = document.querySelector('#content > .products-wrapper');
    if (targetElement2) {
      targetElement2.insertAdjacentElement('afterend', containerDiv);
    }
  }

  targetElement.insertAdjacentElement('afterend', timelineContainer);
});

// --- timeline interactions ---
onDomReady(() => {
  const navItems = document.querySelectorAll('.timeline-nav-item');
  const images = document.querySelectorAll('.timeline-image-container img');
  const innerContents = document.querySelectorAll('.timeline-inner');
  if (!navItems.length || !images.length || !innerContents.length) return;

  let currentIndex = 0;

  navItems.forEach((navItem) => {
    navItem.addEventListener('click', () => {
      const newIndex = parseInt(navItem.getAttribute('data-index'), 10);
      if (Number.isNaN(newIndex) || newIndex === currentIndex) return;

      const currentImage = images[currentIndex];
      const newImage = images[newIndex];
      const currentInner = innerContents[currentIndex];
      const newInner = innerContents[newIndex];

      navItems.forEach((item) => item.classList.remove('is-selected'));
      navItem.classList.add('is-selected');

      currentImage.classList.remove('is-visible');
      currentImage.classList.add('is-fading-out');
      newImage.classList.add('is-visible');

      currentInner.classList.remove('is-visible');
      newInner.classList.add('is-visible');

      const handleTransitionEnd = () => {
        currentImage.classList.remove('is-fading-out');
        currentImage.removeEventListener('transitionend', handleTransitionEnd);
      };
      currentImage.addEventListener('transitionend', handleTransitionEnd);

      currentIndex = newIndex;
    });
  });
});

// --- cards become clickable, hide inner button ---
onDomReady(() => {
  document.querySelectorAll('.rc-card-call-to-action__single').forEach((card) => {
    const linkEl = card.querySelector('.rc-card-call-to-action__link');
    const button = card.querySelector('.rc-card-call-to-action__button');

    const link = linkEl?.href;
    if (link) {
      card.addEventListener('click', () => {
        window.location.href = link;
      });
    }
    if (button) button.style.display = 'none';
  });
});

// --- page-specific header videos ---
window.addEventListener('DOMContentLoaded', () => {
  try {
    if (window.location.href === produktyUrl) {
      const imgElement = document.querySelector('.rc-image-one__single img');
      if (imgElement) {
        const videoElement = document.createElement('video');
        videoElement.src = produktyVideo;
        videoElement.autoplay = true;
        videoElement.loop = true;
        videoElement.muted = true;
        videoElement.playsInline = true;
        videoElement.disablePictureInPicture = true;
        videoElement.controls = false;
        Object.assign(videoElement.style, { width: '100%', height: 'auto', objectFit: 'contain' });
        videoElement.className = 'rc-image-one__img';

        const parentElement = imgElement.parentElement;
        if (parentElement) parentElement.replaceChild(videoElement, imgElement);

        const downElement = document.querySelector('.rc-image-one__down');
        if (downElement) {
          downElement.style.padding = '';
          downElement.style.webkitBackdropFilter = 'none';
          downElement.style.backdropFilter = 'none';
          downElement.style.background = 'none';
          downElement.style.width = '';
          downElement.style.position = '';
          downElement.style.bottom = '';
        }
      } else {
        console.error('Image element not found.');
      }
    } else if (window.location.href === zamereniUrl) {
      const imgElement = document.querySelector('.rc-header-top-image-bottom img');
      if (imgElement) {
        const videoElement = document.createElement('video');
        videoElement.src = zamereniVideo;
        videoElement.autoplay = true;
        videoElement.loop = true;
        videoElement.muted = true;
        videoElement.playsInline = true;
        videoElement.disablePictureInPicture = true;
        videoElement.controls = false;
        Object.assign(videoElement.style, { width: '100%', height: 'auto', objectFit: 'contain' });
        videoElement.className = 'rc-image-one__img';

        const parentElement = imgElement.parentElement;
        if (parentElement) parentElement.replaceChild(videoElement, imgElement);

        const downElement = document.querySelector('.rc-image-one__down');
        if (downElement) {
          downElement.style.padding = '';
          downElement.style.webkitBackdropFilter = 'none';
          downElement.style.backdropFilter = 'none';
          downElement.style.background = 'none';
          downElement.style.width = '';
          downElement.style.position = '';
          downElement.style.bottom = '';
        }
      }
    } else {
      const video = document.querySelector('#main-background video');
      if (video) {
        video.muted = true;
        video.play().catch((error) => console.error('Autoplay failed:', error));
      }
    }
  } catch (e) {
    console.error(e);
  }
});

// --- welcome overlay fade/transform ---
window.addEventListener('load', () => {
  const blackFilter = document.getElementById('black-mobile-filter');
  const welcomingLogo = document.getElementById('welcoming-mobile-logo');

  if (blackFilter) blackFilter.style.opacity = '0.8';

  setTimeout(() => {
    if (welcomingLogo) {
      welcomingLogo.style.opacity = '1';
      welcomingLogo.style.transform = 'translate(-50%, -50%) scale(1.5)';
    }
  }, 1000);

  const fadeOutElements = () => {
    if (blackFilter) {
      blackFilter.style.transition = 'opacity 0.5s ease';
      blackFilter.style.opacity = '0';
    }
    if (welcomingLogo) {
      welcomingLogo.style.transition = 'opacity 0.5s ease';
      welcomingLogo.style.opacity = '0';
    }
  };

  if (welcomingLogo) {
    welcomingLogo.addEventListener('click', fadeOutElements);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) fadeOutElements();
  });
});

// --- autoplay helper for Safari etc --- 
function ensureAutoplayForever(video) {
  if (!video) return;

  video.muted = true;
  video.playsInline = true;
  video.autoplay = true;
  video.loop = true;
  video.controls = false;
  video.preload = 'auto';
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.setAttribute('disablePictureInPicture', '');

  let retryTimer = null;
  let retryDelay = 250; 

  const tryPlay = () => {
    clearTimeout(retryTimer);
    const p = video.play();
    if (p && typeof p.then === 'function') {
      p.then(() => {
        retryDelay = 250;
      }).catch(() => {
        retryTimer = setTimeout(tryPlay, retryDelay);
        retryDelay = Math.min(retryDelay * 2, 2500);
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryPlay, { once: true });
  } else {
    tryPlay();
  }
  window.addEventListener('load', tryPlay, { once: true });

  const userKick = () => tryPlay();
  ['click','touchstart','keydown','mousemove','scroll'].forEach(ev =>
    document.addEventListener(ev, userKick, { passive: true })
  );

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') tryPlay();
  });
  window.addEventListener('pageshow', tryPlay);
  window.addEventListener('focus', tryPlay);

  video.addEventListener('pause', () => { if (!video.ended) tryPlay(); });
  video.addEventListener('ended', () => { video.currentTime = 0; tryPlay(); });
  ['waiting','stalled','suspend','timeupdate','canplay','loadeddata','loadedmetadata']
    .forEach(ev => video.addEventListener(ev, tryPlay));

  setInterval(() => {
    if (document.visibilityState === 'visible' && video.paused) tryPlay();
  }, 3000);
}
