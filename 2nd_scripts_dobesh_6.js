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
