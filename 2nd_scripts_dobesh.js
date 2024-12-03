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
        header.style.backgroundColor = 'transparent';
    });
}

// bannery pod produkty
if (window.location.href != 'https://www.justhoney.cz/' && window.location.href != 'http://www.justhoney.cz/' && 
document.querySelector('.p-detail-full-width')) {
		const swiperHTML = `
          <div class="banner-swiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <img class="banner-image" src="https://cdn.myshoptet.com/usr/www.justhoney.cz/user/banners/justhoney_banner.png?67477c92">
              </div>
              <div class="swiper-slide">
                <img class="banner-image" src="https://cdn.myshoptet.com/usr/www.justhoney.cz/user/banners/justhoney_banner.png?67477c92">
              </div>
              <div class="swiper-slide">
                <img class="banner-image" src="https://cdn.myshoptet.com/usr/www.justhoney.cz/user/banners/justhoney_banner.png?67477c92">
              </div>
              <div class="swiper-slide">
                <img class="banner-image" src="https://cdn.myshoptet.com/usr/www.justhoney.cz/user/banners/justhoney_banner.png?67477c92">
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
            centeredSlides: true,
            slidesPerView: 1,
            spaceBetween: 50,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            speed: 600,
            breakpoints: {
                1400: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });
}
