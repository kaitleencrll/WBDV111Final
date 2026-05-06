let activeTab = null; 

function switchDirectory(tab, btn) {
    const box = document.getElementById('directory-content-box');
    
    // Safety check: ensure the box exists
    if (!box) return;

    // Handle "Tap again to close" logic
    if (activeTab === tab) {
        box.style.display = 'none';
        btn.classList.remove('active');
        activeTab = null;
        return;
    }

    // Show the main container box
    box.style.display = 'block';

    // Hide all tab contents and remove active states from buttons
    document.querySelectorAll('.dir-tab-content').forEach(c => c.style.display = 'none');
    document.querySelectorAll('.dir-big-nav').forEach(n => n.classList.remove('active'));
    
    // Find the specific content to show (e.g., "dir-adoption")
    const targetContent = document.getElementById('dir-' + tab);
    if (targetContent) {
        targetContent.style.display = 'block';
        btn.classList.add('active');
        activeTab = tab;

        // If user clicks Adoption, make sure the animal grid renders
        if (tab === 'adoption') {
            renderAnimals();
        }
        
        // Smooth scroll to the content so the user sees it open
        box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

  const animals = [
    {name: 'Cooper', type: 'Aspin', desc: 'Energetic & brave protector.', img: 'Media/animal1.jpg'},
    {name: 'Luna', type: 'Puspin', desc: 'Calm, loves window watching.', img: 'Media/animal2.jpg'},
    {name: 'Max', type: 'Golden Mix', desc: 'Friendly senior, great with kids.', img: 'Media/animal3.jpg'},
    {name: 'Bella', type: 'Puspin', desc: 'Playful kitten with high energy.', img: 'Media/animal4.jpg'},
    {name: 'Charlie', type: 'Aspin', desc: 'Sweet soul, found in Karuhatan.', img: 'Media/animal5.jpg'},
    {name: 'Milo', type: 'Terrier Mix', desc: 'Smart, already knows "Sit".', img: 'Media/animal6.jpg'},
    {name: 'Lucy', type: 'Puspin', desc: 'Reserved but very affectionate.', img: 'Media/animal7.jpg'},
    {name: 'Daisy', type: 'Aspin', desc: 'Happy-go-lucky puppy.', img: 'Media/animal8.jpg'}
];

function renderAnimals() {
    const container = document.getElementById('adoption-grid-container');
    if (!container) {
        console.log("Error: adoption-grid-container not found!");
        return;
    }

    let html = '';
    animals.forEach((pet) => {
        html += `
            <div class="adoption-card">
                <div class="pet-img-placeholder" style="background-image: url('${pet.img}');"></div>
                <div style="padding: 12px;">
                    <span class="status-badge" style="background:var(--light-blue); color:var(--primary-blue); font-size: 10px; padding: 2px 8px; border-radius: 10px;">${pet.type}</span>
                    <h5 style="margin: 5px 0; font-size: 16px;">${pet.name}</h5>
                    <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px; height: 30px; line-height:1.2;">${pet.desc}</p>
                    <button class="btn-main" style="width: 100%; padding: 8px; font-size: 12px;" onclick="openAdoptionModal('${pet.name}', '${pet.img}', '${pet.type}')">Apply</button>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
    console.log("Animals rendered successfully!");
}

// This ensures the script waits for the HTML to load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAnimals);
} else {
    renderAnimals();
}

    function switchDirectory(tab, btn) {
        const box = document.getElementById('directory-content-box');
        
        if (activeTab === tab) {
            box.style.display = 'none';
            btn.classList.remove('active');
            activeTab = null;
            return;
        }

        box.style.display = 'block';
        document.querySelectorAll('.dir-tab-content').forEach(c => c.style.display = 'none');
        document.querySelectorAll('.dir-big-nav').forEach(n => n.classList.remove('active'));
        
        document.getElementById('dir-' + tab).style.display = 'block';
        btn.classList.add('active');
        activeTab = tab;
        
        box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function openAdoptionModal(name, img, type) {
        document.getElementById('adoptPetName').innerText = name;
        document.getElementById('adoptPetImg').style.backgroundImage = `url('${img}')`;
        document.getElementById('adoptModal').style.display = 'flex';
        document.getElementById('adoptFormArea').style.display = 'block';
        document.getElementById('adoptSuccessArea').style.display = 'none';
    }

    function closeAdoptModal() { document.getElementById('adoptModal').style.display = 'none'; }
    
    function submitAdoption() {
        if(!document.getElementById('adoptPromise').checked) return alert("Certification required.");
        document.getElementById('adoptFormArea').style.display = 'none';
        document.getElementById('adoptSuccessArea').style.display = 'block';
    }
let activeDonationTab = null;

    function switchDonation(tab, btn) {
        const box = document.getElementById('donation-content-box');
        if (activeDonationTab === tab) {
            box.style.display = 'none';
            btn.classList.remove('active');
            activeDonationTab = null;
            return;
        }
        box.style.display = 'block';
        document.querySelectorAll('.don-tab-content').forEach(c => c.style.display = 'none');
        document.querySelectorAll('.don-nav-card').forEach(n => n.classList.remove('active'));
        document.getElementById('don-' + tab).style.display = 'block';
        btn.classList.add('active');
        activeDonationTab = tab;
        box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function handleOtherSelection(select, specId) {
        document.getElementById(specId).style.display = select.value === 'other' ? 'block' : 'none';
    }

    function submitProcess(type) {
        const overlay = document.getElementById('don-processing');
        overlay.style.display = 'flex';
        
        setTimeout(() => {
            overlay.innerHTML = `
                <div style="background:white; padding:40px; border-radius:30px; box-shadow:0 20px 50px rgba(0,0,0,0.15); max-width: 400px;">
                    <span style="font-size: 50px;">✅</span>
                    <h2 style="color: var(--dim-blue); margin-top: 20px;">${type} Processed</h2>
                    <p style="font-size: 14px; color: var(--text-muted);">Thank you. Our Logistics Team in Valenzuela will review your data and send an SMS confirmation within 2 hours.</p>
                    <button class="btn-main" style="width: 100%; margin-top: 20px;" onclick="closeDonOverlay()">Return to Portal</button>
                </div>
            `;
        }, 2000);
    }

    function closeDonOverlay() {
        const overlay = document.getElementById('don-processing');
        overlay.style.display = 'none';
       
        overlay.innerHTML = `<div class="loader-circle"></div><h3 style="color: var(--dim-blue); margin-top: 20px;">Verifying Submission...</h3><p style="color: var(--text-muted); font-size: 14px;">Updating Valenzuela Animal Welfare Database</p>`;
        document.getElementById('donation-content-box').style.display = 'none';
        document.querySelectorAll('.don-nav-card').forEach(n => n.classList.remove('active'));
        activeDonationTab = null;
    }
function showTab(tabId) {
      
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });
        
      
        document.querySelectorAll('.m-nav').forEach(nav => {
            nav.classList.remove('active');
        });
        
       
        document.getElementById(tabId).style.display = 'block';
        
    
        event.currentTarget.classList.add('active');
    }

    function handleAccountAction(action) {
        const confirmMsg = action === 'logout' 
            ? "Are you sure you want to log out?" 
            : "Are you sure you want to deactivate? This action cannot be undone.";
            
        if(confirm(confirmMsg)) {
            window.location.href = 'index.html';
        }
    }
let currentHero = 0;
    const heroSlides = document.querySelectorAll('.hero-slide');
    function rotateHero() {
        heroSlides[currentHero].classList.remove('active');
        currentHero = (currentHero + 1) % heroSlides.length;
        heroSlides[currentHero].classList.add('active');
    }
    setInterval(rotateHero, 2500);

    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const track = document.getElementById('track');
    function updateCarousel() {
        const slideWidth = 500; 
        track.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
        slides.forEach((s, i) => {
            s.classList.remove('active');
            if (i === currentSlide) s.classList.add('active');
        });
    }
    function moveSlide(dir) {
        currentSlide = (currentSlide + dir + slides.length) % slides.length;
        updateCarousel();
    }

    function toggleModal(show) {
        document.getElementById('profileModal').style.display = show ? 'flex' : 'none';
    }

    function toggleStoryModal(show) {
        const modal = document.getElementById('storyModal');
        modal.style.display = show ? 'flex' : 'none';
        if(!show) {
            document.getElementById('storyFormArea').style.display = 'block';
            document.getElementById('storySuccessArea').style.display = 'none';
        }
    }

    function handleStorySubmit() {
        document.getElementById('storyFormArea').style.display = 'none';
        document.getElementById('storySuccessArea').style.display = 'block';
    }

    function showTab(tabId) {
        document.querySelectorAll('.tab-content').forEach(t => t.style.display = 'none');
        document.querySelectorAll('.m-nav').forEach(n => n.classList.remove('active'));
        document.getElementById(tabId).style.display = 'block';
        event.target.classList.add('active');
    }

    function toggleOther(select, targetId) {
        document.getElementById(targetId).style.display = (select.value === 'Other') ? 'block' : 'none';
    }

    function simulateGPS() {
        document.getElementById('locInput').value = "📍 Brgy. Marulas, Valenzuela City (14.6760° N, 120.9754° E)";
    }

    function handleReportSubmit() {
        document.getElementById('reportForm').style.display = 'none';
        document.getElementById('reportSuccess').style.display = 'block';
    }

    function resetReport() {
        document.getElementById('reportForm').style.display = 'block';
        document.getElementById('reportSuccess').style.display = 'none';
    }

function switchEmergencyTab(type) {
    const formContent = document.getElementById('emergency-form-content');
    const callContent = document.getElementById('emergency-call-content');
    const btnForm = document.getElementById('btn-show-form');
    const btnCall = document.getElementById('btn-show-call');

    if (type === 'form') {
        formContent.style.display = 'block';
        callContent.style.display = 'none';
        btnForm.classList.add('active');
        btnCall.classList.remove('active');
    } else {
        formContent.style.display = 'none';
        callContent.style.display = 'block';
        btnCall.classList.add('active');
        btnForm.classList.remove('active');
    }
}

// Phone Modal Logic
function startFakeCall() {
    document.getElementById('phone-modal').style.display = 'flex';
    document.getElementById('call-status').innerText = 'Calling...';
    
    // Simulate someone answering after 2 seconds
    setTimeout(() => {
        document.getElementById('call-status').innerText = '00:01';
        // Start a simple timer
        let sec = 1;
        window.callTimer = setInterval(() => {
            sec++;
            let m = Math.floor(sec/60);
            let s = sec % 60;
            document.getElementById('call-status').innerText = `${m<10?'0':''}${m}:${s<10?'0':''}${s}`;
        }, 1000);
    }, 2000);
}

function endFakeCall() {
    document.getElementById('phone-modal').style.display = 'none';
    clearInterval(window.callTimer);
}

function switchEmergencyTab(type) {
    const btnForm = document.getElementById('btn-show-form');
    const btnCall = document.getElementById('btn-show-call');
    const formContent = document.getElementById('emergency-form-content');
    const callContent = document.getElementById('emergency-call-content');

    if (type === 'form') {
        formContent.style.display = 'block';
        callContent.style.display = 'none';
        btnForm.classList.add('active');
        btnCall.classList.remove('active');
    } else {
        formContent.style.display = 'none';
        callContent.style.display = 'block';
        btnCall.classList.add('active');
        btnForm.classList.remove('active');
    }
}
function toggleMute() {
    const btn = document.getElementById('mute-btn');
    const icon = document.getElementById('mute-icon');
    const label = document.getElementById('mute-label');

    btn.classList.toggle('active-blue');
    
    if (btn.classList.contains('active-blue')) {
        icon.innerText = '🔇';
        label.innerText = 'unmute';
    } else {
        icon.innerText = '🎤';
        label.innerText = 'mute';
    }
}

// Toggle Speaker Logic
function toggleSpeaker() {
    const btn = document.getElementById('speaker-btn');
    btn.classList.toggle('active-blue');
}

