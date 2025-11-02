// Check viewport
console.log("Current viewport width:", window.innerWidth);


// Loading Componets
async function loadComponents() {
    try {
        let headerHTML = '';
        try {
            const resp = await fetch('../components/header.html') || await fetch('./components/header.html');
            headerHTML = await resp.text();
        } catch (err) {
            console.error('Header not found in either location');
        }
        document.getElementById('header-container').innerHTML = headerHTML;

        initMobileMenu();
        setActivePage();

        // Loading Footer ...
        let footerHTML = '';
        try {
            const resp = await fetch('../components/footer.html') || await fetch('./components/footer.html');
            footerHTML = await resp.text();
        } catch (err) {
            console.error('Footer not found in either location');
        }
        document.getElementById('footer-container').innerHTML = footerHTML;

        handleModal();
        updateCopyrightYear();
        initFooterAccordions();
        // subMenuToggle();

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

document.getElementById('downloadLink').addEventListener('click', function(e) {
    e.preventDefault();
    
    const downloadLink = document.createElement('a');
    downloadLink.href = 'brochure.pdf';
    downloadLink.download = 'brochure.pdf';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
});


const heroItems = [
    {
        title: "Fire Risk Assessment",
        imageUrl: "../assets/images/siteImages/fraSmall.webp",
        link: "../pages/fra.html"
    },
    {
        title: "System Integration and Maintenance",
        imageUrl: "../assets/images/siteImages/systemInt.webp",
        link: "../pages/intri-main.html"
    },
    {
        title: "Fire Drill and Awareness",
        imageUrl: "../assets/images/siteImages/firedrill.webp",
        link: "../pages/firedrill.html"
    },
    {
        title: "Fire License / NOC",
        imageUrl: "../assets/images/siteImages/fireNOC.webp",
        link: "../pages/firelicense.html"
    },
    {
        title: "Evacuation Strategy",
        imageUrl: "../assets/images/siteImages/evacuationSmall.webp",
        link: "../pages/evacuation.html"
    },
    {
        title: "Compartmentation",
        imageUrl: "../assets/images/siteImages/compartSmall.webp",
        link: "../pages/compartment.html"
    },
    {
        title: "Means of Escape",
        imageUrl: "../assets/images/siteImages/escapeSmall.webp",
        link: "../pages/escape.html"
    },
    {
        title: "PA/VA System",
        imageUrl: "../assets/images/siteImages/pava.webp",
        link: "../pages/pava.html"
    }
];


function isHomePage() {
    const pagesBox = document.querySelector('.pages-box');

    if (pagesBox) {
        return true;
    }
    return false;
}

if (isHomePage()) {
    // Get DOM elements
    const heroImage = document.getElementById('hero-image');
    const heroHeading = document.getElementById('hero-heading');
    const heroLink = document.getElementById('hero-link');

    // Variables for tracking current item and interval
    let currentIndex = -1;
    let rotationInterval;

    // Function to show a random hero item
    function showRandomHeroItem() {
        let newIndex;
        // Ensure we don't show the same item twice in a row
        do {
            newIndex = Math.floor(Math.random() * heroItems.length);
        } while (newIndex === currentIndex && heroItems.length > 1);
    
        currentIndex = newIndex;
    
        // Update the hero section with the new item
        const item = heroItems[currentIndex];
        heroImage.src = item.imageUrl;
        heroImage.alt = item.title;
        heroHeading.textContent = item.title;
        heroLink.href = item.link;
    }

    // Start the rotation with a 5-second interval
    function startRotation() {
        showRandomHeroItem();
        rotationInterval = setInterval(showRandomHeroItem, 5000);
    }

// Initialize the hero section rotation
document.addEventListener('DOMContentLoaded', function() {
    startRotation();
});}


// function subMenuToggle() {
//     const toggleButton = document.querySelector('.submenu-toggle');
//     console.log(toggleButton);

//     const submenu = document.querySelector('.submenu');
//     console.log(submenu);

//     if (toggleButton && submenu) {
//         toggleButton.addEventListener('click', function() {
//             if (submenu.style.display === 'block') {
//                     submenu.style.display = 'none';
//                 } else {
//                     submenu.style.display = 'block';
//                 }
//         });

//     }
// };

    
    // const modal = document.getElementById("myModal");
    // const enquiryLink = document.getElementById("enquiryLink");
    // const closeBtn = document.getElementsByClassName("close")[0];

    // console.log(modal);
    // Ensure modal and enquiryLink are available before adding event listeners
    // if (enquiryLink && modal && closeBtn) {
    //     enquiryLink.addEventListener('click', function (event) {
    //         event.preventDefault();
    //         modal.style.display = "block";
    //     });

        // Close the modal when the user clicks on the close button (×)
        // closeBtn.addEventListener('click', function () {
        //     modal.style.display = "none"; // Hide the modal
        // });

        // Close the modal when the user clicks anywhere outside the modal content
    //     window.addEventListener('click', function (event) {
    //         if (event.target === modal) {
    //             modal.style.display = "none";
    //         }
    //     });
    // } else {
    //     console.error("Not Worked???");
    // }
// }
