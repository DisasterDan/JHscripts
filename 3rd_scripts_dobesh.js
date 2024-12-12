<script src="https://cdn.jsdelivr.net/gh/DisasterDan/JHscripts@main/1st_scripts_dobesh_15.js"></script>
<script src="https://cdn.jsdelivr.net/gh/DisasterDan/JHscripts@main/2nd_scripts_dobesh_5.js"></script>

<script>
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
  const targetElement = document.querySelector('.homepage-latest-contribution-full-width');
  
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

</script>
