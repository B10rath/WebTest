/* ===============================
   HEADER + DRAWER + SCROLL TOP
================================ */

function initHeaderAndDrawer() {
    const header = document.getElementById("gsMainHeader");
    const menuBtn = document.getElementById("menuBtn");
    const drawer = document.getElementById("gsSideDrawer");
    const overlay = document.getElementById("gsOverlay");
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    const closeBtn = document.getElementById("closeDrawer");

    if (!menuBtn || !drawer || !overlay) return;

    const openMenu = () => {
        drawer.classList.add("active");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    };

    const closeMenu = () => {
        drawer.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "auto";
    };

    menuBtn.addEventListener("click", openMenu);
    overlay.addEventListener("click", closeMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);

    window.addEventListener("scroll", () => {
        if (header) {
            if (window.scrollY > 60) header.classList.add("scrolled");
            else header.classList.remove("scrolled");
        }

        if (scrollTopBtn) {
            if (window.scrollY > window.innerHeight * 0.5)
                scrollTopBtn.classList.add("show");
            else scrollTopBtn.classList.remove("show");
        }

        if (drawer.classList.contains("active")) closeMenu();
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
}

/* ===============================
   MENU BUTTON VISIBILITY
================================ */

function initMenuButtonVisibility() {
    const menuBtn = document.getElementById("menuBtn");
    if (!menuBtn) return;

    const handleScroll = () => {
        const isMobile = window.innerWidth <= 1024;

        if (!isMobile) {
            if (window.scrollY > 150) menuBtn.classList.add("visible");
            else menuBtn.classList.remove("visible");
        }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
}

/* ===============================
   CUBE LOADER
================================ */

function initCubeLoader() {
    window.addEventListener("load", () => {
        const loader = document.getElementById("cube-loader");
        if (!loader) return;

        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 800);
    });
}

/* ===============================
   FLOAT TO ABOUT SECTION
================================ */

function gsFloatToAbout() {
    window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
    });
}

/* ===============================
   REVEAL ANIMATION
================================ */

function initRevealAnimations() {
    const elements = document.querySelectorAll(".reveal");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) entry.target.classList.add("active");
            });
        },
        { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
}

/*Page Switch*/
function handleDrawerNavigation() {
    const drawer = document.getElementById("gsSideDrawer");
    const overlay = document.getElementById("gsOverlay");
    const menuBtn = document.getElementById("menuBtn");

    const forceClose = () => {
        if (drawer) drawer.classList.remove("active");
        if (overlay) overlay.classList.remove("active");
        if (menuBtn) menuBtn.classList.remove("active");
        document.body.style.overflow = "auto";
    };

    if (drawer) {
        const links = drawer.querySelectorAll("a");
        links.forEach(link => {
            link.addEventListener("click", function (e) {
                // 1. Prevent the page from jumping immediately
                e.preventDefault();
                const targetUrl = this.getAttribute('href');

                // 2. Trigger the close animation
                forceClose();

                // 3. Wait for the animation (0.4s) to finish, then navigate
                // This removes the "blink" because the menu is gone before the page changes
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, ); // Matches your 0.4s transition slightly earlier for speed
            });
        });
    }

    // Keep the back-button fix
    window.addEventListener('pageshow', (event) => {
        forceClose();
    });
}

document.addEventListener("DOMContentLoaded", handleDrawerNavigation);


/* ===============================
   INIT ALL AFTER DOM LOAD
================================ */

document.addEventListener("DOMContentLoaded", () => {
    initHeaderAndDrawer();
    initMenuButtonVisibility();
    initRevealAnimations();
    initCubeLoader();
});
