// adminscript.js

// 1. Initial Load
document.addEventListener('DOMContentLoaded', () => {
    loadAdminReports();
    animateStats();
});

// 2. Count-up Animation for Stats
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const increment = target / 100;
        let current = 0;

        const updateNumber = () => {
            if (current < target) {
                current += increment;
                stat.innerText = Math.ceil(current).toLocaleString();
                setTimeout(updateNumber, 10);
            } else {
                stat.innerText = target.toLocaleString();
            }
        };
        updateNumber();
    });
}

// 3. Report Management
function loadAdminReports() {
    const reports = JSON.parse(localStorage.getItem("reports")) || [
        {type: "Medical Emergency", location: "Malanday", status: "Pending"},
        {type: "Stray Rescue", location: "Karuhatan", status: "Ongoing"}
    ];
    
    const container = document.getElementById("reportList");
    container.innerHTML = "";

    reports.forEach((r, index) => {
        const statusClass = `pill-${r.status.toLowerCase()}`;
        container.innerHTML += `
            <div class="report animate-fade">
                <div>
                    <span class="pill ${statusClass}">${r.status}</span>
                    <h4 style="margin: 10px 0 5px 0;">${r.type}</h4>
                    <small>📍 ${r.location}</small>
                </div>
                <div class="actions">
                    <button class="btn" onclick="changeStatus(${index}, 'Ongoing')">Process</button>
                    <button class="btn" style="background:#22c55e" onclick="changeStatus(${index}, 'Completed')">Resolve</button>
                </div>
            </div>
        `;
    });
}

function changeStatus(index, newStatus) {
    let reports = JSON.parse(localStorage.getItem("reports")) || [];
    if(reports[index]) {
        reports[index].status = newStatus;
        localStorage.setItem("reports", JSON.stringify(reports));
        loadAdminReports();
    }
}

function clearReports() {
    if(confirm("Are you sure you want to clear the feed?")) {
        localStorage.removeItem("reports");
        loadAdminReports();
    }
}

// 4. Modal Controls
function openAdminModal() { document.getElementById("adminProfileModal").style.display = "flex"; }
function closeAdminModal() { document.getElementById("adminProfileModal").style.display = "none"; }

window.addEventListener("scroll", function(){
    const nav = document.getElementById("navbar");
    if(window.scrollY > 20){
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});

function openModal(){
    document.getElementById("profileModal").style.display = "flex";
}

function closeModal(){
    document.getElementById("profileModal").style.display = "none";
}

/* CLOSE WHEN CLICK OUTSIDE */
window.onclick = function(e){
    let modal = document.getElementById("profileModal");
    if(e.target === modal){
        modal.style.display = "none";
    }
}
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const increment = target / 100;
        let current = 0;

        const updateNumber = () => {
            if (current < target) {
                current += increment;
                stat.innerText = Math.ceil(current).toLocaleString();
                setTimeout(updateNumber, 15);
            } else {
                stat.innerText = target.toLocaleString();
            }
        };
        updateNumber();
    });
}

const cases = [
    { type: "Injured Dog – Road Accident", desc: "Stray dog hit by vehicle on highway. Heavy bleeding.", status: "Pending" },
    { type: "Cat Trapped in Drain", desc: "Kitten stuck in drainage canal with rising water levels.", status: "Pending" },
    { type: "Poisoning Incident", desc: "Several dogs showing signs of poisoning. Urgent response.", status: "Pending" },
    /* --- The 3 above go to Priority --- */
    /* --- The ones below go to Standard --- */
    { type: "Abandoned Puppy", desc: "Young puppy left near public market. Hungry but uninjured.", status: "Pending" },
    { type: "Malnourished Stray", desc: "Thin dog regularly seen scavenging for food.", status: "Pending" },
    { type: "Injured Bird", desc: "Bird with wing damage found in park.", status: "Pending" },
    { type: "Skin Infection Case", desc: "Stray cat with visible mange needing treatment.", status: "Pending" },
    { type: "Litter of Kittens", desc: "Found in alleyway without a mother.", status: "Pending" }
];

function refreshDisplay() {
    const data = JSON.parse(localStorage.getItem("reports")) || cases;
    if (!localStorage.getItem("reports")) localStorage.setItem("reports", JSON.stringify(cases));

    const urgentWrap = document.getElementById("urgentReports");
    const standardWrap = document.getElementById("reportList");
    
    urgentWrap.innerHTML = ""; 
    standardWrap.innerHTML = "";

    data.forEach((item, index) => {
        const sClass = `s-${item.status.toLowerCase()}`;
        const html = `
            <div class="case-card">
                <span class="status-label ${sClass}">${item.status.toUpperCase()}</span>
                <h4>${item.type}</h4>
                <p>${item.desc}</p>
                <div class="btn-group">
                    <button onclick="updateCase(${index}, 'Processing')">PROCESS</button>
                    <button onclick="updateCase(${index}, 'Resolved')">RESOLVE</button>
                </div>
            </div>
        `;
        // Put first 3 in Urgent, rest in Standard
        if (index < 3) urgentWrap.innerHTML += html;
        else standardWrap.innerHTML += html;
    });
}

function updateCase(idx, newStatus) {
    let store = JSON.parse(localStorage.getItem("reports"));
    
    // Check if the current status is the same as the button clicked
    if (store[idx].status === newStatus) {
        // If it is, toggle it back to PENDING
        store[idx].status = 'Pending';
    } else {
        // Otherwise, set it to the new status (Processing or Resolved)
        store[idx].status = newStatus;
    }
    
    localStorage.setItem("reports", JSON.stringify(store));
    refreshDisplay();
}

// Initial Call
document.addEventListener("DOMContentLoaded", refreshDisplay);