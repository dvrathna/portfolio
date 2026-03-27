document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated in
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // --- Lightbox Functionality ---
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const captionText = document.getElementById("lightbox-caption");
    const closeBtn = document.getElementsByClassName("close-lightbox")[0];

    const galleryImages = document.querySelectorAll('.lightbox-trigger');

    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            lightbox.style.display = "block";
            lightboxImg.src = this.src;
            // Use the parent card's h3 text for caption, or alt text fallback
            const parentCard = this.closest('.gallery-item');
            const title = parentCard ? parentCard.querySelector('h3').textContent : this.alt;
            captionText.innerHTML = title;
            // Prevent body scroll when lightbox is open
            document.body.style.overflow = "hidden";
        });
    });

    closeBtn.onclick = function() {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto";
    }

    // Close on clicking outside the image
    lightbox.onclick = function(e) {
        if(e.target === lightbox) {
            lightbox.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if(e.key === "Escape" && lightbox.style.display === "block") {
            lightbox.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });

    // --- Active Link Highlight on Scroll ---
    const sections = document.querySelectorAll('section, header');
    const navLinksList = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
        
        // Navbar transparency effect on scroll
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 15, 29, 0.95)'; // Matches --bg-secondary for a stable dark look
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.9)'; // Matches --bg-primary
            navbar.style.boxShadow = 'none';
        }
    });
});
