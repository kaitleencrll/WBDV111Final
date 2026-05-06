document.addEventListener('DOMContentLoaded', () => {
    // Navigation Logic
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if(item.classList.contains('settings-trigger')) return;
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            const target = item.getAttribute('href').substring(1);
            document.querySelectorAll('.section-pane').forEach(p => p.classList.remove('active'));
            document.getElementById(target).classList.add('active');
        });
    });

    // Start Animations
    animateValue("totalDonations", 0, 300000, 2500, "₱");
    animateValue("activeUsers", 0, 1284, 2500, "");
    updateClock();
    setInterval(updateClock, 1000);
    spawnPings();
    simulateAudit();
});

function updateClock() {
    const now = new Date();
    document.getElementById('liveClock').innerText = now.toLocaleTimeString();
}

function simulateAudit() {
    const logs = [
        "Root User Authenticated", "Database Backup Node-A: OK", 
        "Organization 'Hope' Verified", "Traffic Spike Detected (Manila)",
        "Security Patch 9.2 Applied"
    ];
    const container = document.getElementById('auditLogs');
    setInterval(() => {
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerHTML = `<span style="color:#ef4444">></span> [${new Date().toLocaleTimeString()}] ${logs[Math.floor(Math.random()*logs.length)]}`;
        container.prepend(entry);
        if(container.children.length > 20) container.lastChild.remove();
    }, 4000);
}

function spawnPings() {
    const map = document.getElementById('mapOverlay');
    for(let i=0; i<5; i++) {
        const ping = document.createElement('div');
        ping.className = 'location-ping';
        ping.style.top = Math.random() * 80 + 10 + '%';
        ping.style.left = Math.random() * 80 + 10 + '%';
        map.appendChild(ping);
    }
}

function animateValue(id, start, end, duration, prefix) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = prefix + Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

function toggleSuperModal(id) {
    const m = document.getElementById(id);
    m.style.display = (m.style.display === 'flex') ? 'none' : 'flex';
}
// superscript.js - Dynamic Dashboard Logic

let currentDonations = 300000;
let currentUsers = 1284;

document.addEventListener('DOMContentLoaded', () => {
    // Initial display
    updateDashboardDisplay();
    
    // Start the dynamic loops
    startFluctuations();
});

function updateDashboardDisplay() {
    document.getElementById('totalDonations').innerText = `₱${currentDonations.toLocaleString()}`;
    document.getElementById('activeUsers').innerText = currentUsers.toLocaleString();
}

function startFluctuations() {
    // 1. FLUCTUATING USERS: Changes every 3 seconds (+/- 1 to 5 users)
    setInterval(() => {
        const change = Math.floor(Math.random() * 11) - 5; // Range: -5 to +5
        currentUsers = Math.max(1200, currentUsers + change); // Keep it around 1200+
        
        const userEl = document.getElementById('activeUsers');
        userEl.innerText = currentUsers.toLocaleString();
        
        // Brief highlight effect on change
        userEl.style.color = change >= 0 ? '#4ade80' : '#f87171';
        setTimeout(() => userEl.style.color = '#fff', 500);
    }, 3000);

    // 2. INCREASING DONATIONS: Adds small amounts slowly every 8 seconds
    setInterval(() => {
        const increment = Math.floor(Math.random() * 46) + 5; // Adds ₱5 to ₱50
        currentDonations += increment;
        
        const donationEl = document.getElementById('totalDonations');
        donationEl.innerText = `₱${currentDonations.toLocaleString()}`;
        
        // Glow effect
        donationEl.style.textShadow = '0 0 10px rgba(24acc15, 0.5)';
        setTimeout(() => donationEl.style.textShadow = 'none', 1000);
    }, 8000);
}

function startAdvancedAnalytics() {
    // Jitter for Latency and DB Load
    setInterval(() => {
        const latency = document.querySelector('.node-box:nth-child(1) .node-val');
        const dbLoad = document.querySelector('.node-box:nth-child(2) .node-val');
        
        const newVal = Math.floor(Math.random() * 10) + 20; // 20-30ms
        const newLoad = (Math.random() * 5 + 12).toFixed(1); // 12-17%
        
        latency.innerText = newVal + "ms";
        dbLoad.innerText = newLoad + "%";
        
        // Adjust sparkline
        document.querySelector('.node-box:nth-child(1) .spark-fill').style.width = (newVal * 3) + "%";
    }, 2000);
}

// Call in your DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // ... previous functions ...
    startAdvancedAnalytics();
});

// Ensure the sidebar click toggles the correct section
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        const href = item.getAttribute('href');
        if (href && href.startsWith('#')) {
            // Hide all sections
            document.querySelectorAll('.section-pane').forEach(section => {
                section.classList.remove('active');
            });
            // Show target section
            const targetId = href.substring(1);
            document.getElementById(targetId).classList.add('active');
        }
    });
});

// Add to your navigation listener
const targetId = item.getAttribute('href').substring(1);
const targetSection = document.getElementById(targetId);

if (targetSection) {
    document.querySelectorAll('.section-pane').forEach(s => s.classList.remove('active'));
    targetSection.classList.add('active');
}

function startControlCenterSim() {
    // Randomly change the "Scanning Node" text
    const scanTarget = document.getElementById('liveScanTarget');
    const nodes = ['NODE_01', 'NODE_04', 'UPLINK_B', 'GEO_DATA_S3', 'ENCRYPT_X'];
    
    setInterval(() => {
        scanTarget.innerText = nodes[Math.floor(Math.random() * nodes.length)];
    }, 3000);

    // Auto-scroll or jitter the moderation stream
    const modStream = document.getElementById('modStream');
    setInterval(() => {
        const line = document.createElement('div');
        line.className = 'stream-line';
        line.innerHTML = `<span class="text-green">[SCAN]</span> Request #${Math.floor(Math.random()*999)} Verified.`;
        modStream.prepend(line);
        if (modStream.childNodes.length > 5) modStream.removeChild(modStream.lastChild);
    }, 4000);
}

// Call in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    startControlCenterSim();
});

function updateTelemetry() {
    const coords = ["14.6760° N, 120.9850° E", "14.5995° N, 120.9842° E", "14.6507° N, 121.0483° E"];
    const logs = document.getElementById('neuralLogs');
    
    setInterval(() => {
        // Randomly update a log entry
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        const time = new Date().toLocaleTimeString('en-GB');
        entry.innerHTML = `<span class="timestamp">[${time}]</span> <span class="text-green">[PASS]</span> Packet Integrity Check: 100%`;
        logs.prepend(entry);
        if (logs.childNodes.length > 8) logs.removeChild(logs.lastChild);
    }, 5000);
}

document.addEventListener('DOMContentLoaded', updateTelemetry);
document.querySelectorAll('.m-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and panes
        document.querySelectorAll('.m-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.m-pane').forEach(p => p.classList.remove('active'));

        // Add active class to clicked tab and target pane
        tab.classList.add('active');
        const target = tab.getAttribute('data-tab');
        document.getElementById(target).classList.add('active');
    });
});

// Function to open/close modal
function toggleSuperModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal.style.display === 'flex') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'flex';
    }
}
// Tab Switching Logic
document.querySelectorAll('.m-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Clear active states
        document.querySelectorAll('.m-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.m-pane').forEach(p => p.classList.remove('active'));

        // Activate selected
        tab.classList.add('active');
        const paneId = tab.getAttribute('data-tab');
        document.getElementById(paneId).classList.add('active');
    });
});

// Modal Toggle
function toggleSuperModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
}

// Success Animation for "Apply Changes"
function saveAndCloseSettings() {
    const btn = document.querySelector('.btn-cyber-small');
    btn.innerHTML = "UPDATING...";
    
    setTimeout(() => {
        btn.innerHTML = "SYSTEM_SYNCED";
        setTimeout(() => {
            toggleSuperModal('profileModal');
            btn.innerHTML = "APPLY_CHANGES";
        }, 800);
    }, 1200);
}

// Toggle Function - Ensure the ID matches 'profileModal' exactly
function toggleSuperModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    // Standard display toggle
    if (modal.style.display === 'flex') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'flex';
    }
}

// Save Function with visual feedback
function saveAndCloseSettings() {
    const btn = document.querySelector('.btn-cyber-small');
    const originalText = btn.innerText;

    btn.innerText = "UPLOADING...";
    btn.disabled = true;

    // Simulate system update delay
    setTimeout(() => {
        btn.innerText = "COMPLETE";
        btn.style.color = "#4ade80";

        setTimeout(() => {
            toggleSuperModal('profileModal');
            // Reset for next use
            btn.innerText = originalText;
            btn.disabled = false;
            btn.style.color = "";
        }, 800);
    }, 1200);
}