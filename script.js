"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const nav = document.querySelector(".nav");
const header = document.querySelector(".header");

// MODAL WINDOWS
const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

// *SMOOTH SCROLLING FOR BTN IN HEADER

btnScrollTo.addEventListener("click", function (e) {
    // scrolling

    // *old version (all browsers)
    /* window.scrollTo({
        left: s1coords.left + window.pageXOffset,
        top: s1coords.top + window.pageYOffset,
        behavior: "smooth",
    }); */
    // *new version (modern browsers)
    section1.scrollIntoView({ behavior: "smooth" });
});

// *PAGE NAVIGATION

// using bubble effect
document.querySelector(".nav__links").addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("nav__link")) {
        // get href of element
        const id = e.target.getAttribute("href");
        //smooth scrolling
        document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
});

// *TABBED COMPONENTS

tabsContainer.addEventListener("click", function (e) {
    const clicked = e.target.closest(".operations__tab");

    // guard clause
    if (!clicked) return;

    // Remove active classes
    tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
    tabsContent.forEach((c) =>
        c.classList.remove("operations__content--active")
    );
    // Active tab
    clicked.classList.add("operations__tab--active");

    // Content area
    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add("operations__content--active");
});

// *MENU FADE ANIMATION

const hndlrHover = function (e) {
    if (e.target.classList.contains("nav__link")) {
        const link = e.target;
        const siblings = link.closest(".nav").querySelectorAll(".nav__link");
        const logo = link.closest(".nav").querySelector("img");

        siblings.forEach((el) => {
            if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
    }
};
// Passing argument into handler
nav.addEventListener("mouseover", hndlrHover.bind(0.5));
nav.addEventListener("mouseout", hndlrHover.bind(1));

// *STICKY NAVIGATION (OBSERVER API)

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// *LAZY LOADING SECTIONS (OBSERVER API)

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
};

const sectionsObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});
allSections.forEach(function (section) {
    sectionsObserver.observe(section);
    section.classList.add("section--hidden");
});
