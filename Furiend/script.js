 document.addEventListener('DOMContentLoaded', () => {
    let heroIndex = 0;
    const heroTrack = document.getElementById('heroTrack');
    
    function autoHero() {
        if (heroTrack) {
            heroIndex = (heroIndex + 1) % 3;
            heroTrack.style.transform = `translateX(-${heroIndex * 100}%)`;
        }
    }
    setInterval(autoHero, 4500);

    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const track = document.getElementById('track');

    function updateCarousel() {
        if (!track || slides.length === 0) return;
        const slideWidth = 500; 
        track.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentSlide) slide.classList.add('active');
        });
    }

    window.moveSlide = function(dir) {
        currentSlide = (currentSlide + dir + slides.length) % slides.length;
        updateCarousel();
    };

    updateCarousel();
});

function toggleAbout(card) {
    document.querySelectorAll('.about-card').forEach(c => {
        if (c !== card) c.classList.remove('active');
    });
    card.classList.toggle('active');
}
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        let loginCurrentSlide = 0;
        const loginSlides = document.querySelectorAll('.login-slide');

        function nextLoginSlide() {
            if (loginSlides.length > 0) {
                loginSlides[loginCurrentSlide].classList.remove('active');
                loginCurrentSlide = (loginCurrentSlide + 1) % loginSlides.length;
                loginSlides[loginCurrentSlide].classList.add('active');
            }
        }
        setInterval(nextLoginSlide, 4000);

        window.toggleForms = function() {
            document.getElementById('loginForm').classList.toggle('hidden');
            document.getElementById('signupForm').classList.toggle('hidden');
        };

        window.openTerms = function() { document.getElementById('termsModal').style.display = 'flex'; };
        window.closeTerms = function() { document.getElementById('termsModal').style.display = 'none'; };
        
        window.acceptTerms = function() {
            closeTerms();
            toggleForms();
        };

        window.completeSignup = function() {
            window.location.href = "login.html";
        };

        const demos = {
            'user': { u: 'user@furiend.ph', p: 'user123' },
            'admin': { u: 'admin@furiend.ph', p: 'admin123' },
            'superadmin': { u: 'super@furiend.ph', p: 'super123' }
        };

        window.autoFill = function(role) {
            const uInp = document.getElementById('loginUser');
            const pInp = document.getElementById('loginPass');
            const data = demos[role];
            uInp.value = "";
            pInp.value = "";
            
            let i = 0;
            let j = 0;
            const typeU = setInterval(() => {
                uInp.value += data.u[i++];
                if(i >= data.u.length) {
                    clearInterval(typeU);
                    const typeP = setInterval(() => {
                        pInp.value += data.p[j++];
                        if(j >= data.p.length) clearInterval(typeP);
                    }, 30);
                }
            }, 30);
        };

        window.handleLogin = function() {
            const u = document.getElementById('loginUser').value;
            const p = document.getElementById('loginPass').value;

            if(u === "admin@furiend.ph" && p === "admin123") window.location.href = "admin.html";
            else if(u === "super@furiend.ph" && p === "super123") window.location.href = "superadmin.html";
            else if(u !== "" && p !== "") window.location.href = "user.html";
            else alert("Please enter credentials or use a Demo Account button.");
        };
    }
});