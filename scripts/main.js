console.log("STARTING DEBUGGING");

// Loading Componets
async function loadComponents() {
    try {
        let headerHTML = '';
        try {
            const resp = await fetch('./components/header.html');
            if (resp.ok) {
                headerHTML = await resp.text();
            } else {
                const fallbackResp = await fetch('../components/header.html');
                headerHTML = await fallbackResp.text();
            }
        } catch (err) {
            console.error('Header not found in either location');
        }
        document.getElementById('header-container').innerHTML = headerHTML;

        initMobileMenu();
        setActivePage();

        // Loading Footer ...
        let footerHTML = '';
        try {
            const resp = await fetch('./components/footer.html');
            if (resp.ok) {
                footerHTML = await resp.text();
            } else {
                const fallbackResp = await fetch('../components/footer.html');
                footerHTML = await fallbackResp.text();
            }
        } catch (err) {
            console.error('Footer not found in either location');
        }
        document.getElementById('footer-container').innerHTML = footerHTML;

        handleModal();
        updateCopyrightYear();
        initFooterAccordions();


    } catch (error) {
        console.error("[ERROR] Loading components failed:", error);
    }

}


function updateCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}


// Mobile menu toggle
function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileNav = document.getElementById('mobileNav');

    if (!menuBtn || !mobileNav) {
        console.error('Mobile menu elements not found');
        return;
    }

    const menuIcon = menuBtn.querySelector('.menu-icon');
    const closeIcon = menuBtn.querySelector('.close-icon');

    function toggleMenu() {
        const isOpen = mobileNav.classList.toggle('open');
        menuIcon.style.display = isOpen ? 'none' : 'block';
        closeIcon.style.display = isOpen ? 'block' : 'none';
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    // Submenu toggle
    document.querySelectorAll('.has-submenu > .submenu-toggle').forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            if (window.innerWidth < 993) {
                e.preventDefault();
                this.nextElementSibling.classList.toggle('show');
            }
        });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header-content') && mobileNav.classList.contains('open')) {
            toggleMenu();
        }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
            toggleMenu();
        }
    });

    menuBtn.addEventListener('click', toggleMenu);
}


// Check viewport dimensions
console.log("[9] Current viewport width:", window.innerWidth);


document.addEventListener('DOMContentLoaded', () => {
    loadComponents();
    
});


function initFooterAccordions() {
    const accordions = document.querySelectorAll('.mobile-accordion');

    function setupAccordions() {
        accordions.forEach(accordion => {
            const toggle = accordion.querySelector('.accordion-toggle');
            const menu = accordion.querySelector('.menu-list');
            toggle.removeEventListener('click', toggleAccordion);


            if (window.innerWidth < 768) {
                accordion.classList.remove('active');
                toggle.addEventListener('click', toggleAccordion);
            } else {
                accordion.classList.add('active');
            }
        });
    }

    function toggleAccordion(e) {
        const accordion = e.currentTarget.closest('.mobile-accordion');
        accordion.classList.toggle('active');
    }

    setupAccordions();

    window.addEventListener('resize', setupAccordions);
}

function setActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    // console.log(currentPage);
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        // console.log(linkPage);

        if (currentPage === linkPage) {
            link.classList.add('isActive');

            const parentItem = link.closest('.has-submenu');
            if (parentItem) {
                parentItem.querySelector('.submenu-toggle').classList.add('isActive');
            }
        }

    });
}


function handleModal() {
    const modal = document.getElementById("myModal");
    const enquiryLink = document.getElementById("enquiryLink");
    const closeBtn = document.getElementsByClassName("close")[0];

    // console.log(modal);
    // Ensure modal and enquiryLink are available before adding event listeners
    if (enquiryLink && modal && closeBtn) {
        // Open the modal when the enquiry link is clicked
        enquiryLink.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default link behavior
            modal.style.display = "block"; // Show the modal
        });

        // Close the modal when the user clicks on the close button (×)
        closeBtn.addEventListener('click', function () {
            modal.style.display = "none"; // Hide the modal
        });

        // Close the modal when the user clicks anywhere outside the modal content
        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = "none"; // Hide the modal if user clicks outside
            }
        });
    } else {
        console.error("Modal or enquiry link not found");
    }
}