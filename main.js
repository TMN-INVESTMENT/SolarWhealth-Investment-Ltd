// ============================================
// SunWealth Investment Ltd - Firebase v7.20.0
// ============================================

var firebaseConfig = {
    apiKey: "AIzaSyD0dlE-syRMEMk0A7YdIpaXU7GM9jYL_aY",
    authDomain: "sunwealth-investment-ltd.firebaseapp.com",
    projectId: "sunwealth-investment-ltd",
    storageBucket: "sunwealth-investment-ltd.firebasestorage.app",
    messagingSenderId: "235913433211",
    appId: "1:235913433211:web:c376e6b13c24bc515312de",
    measurementId: "G-ZDGT0DG6LQ"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var auth = firebase.auth();

var currentUser = null;
var currentUserData = null;

var investmentPackages = [
    { 
        name: 'SunWealth A', 
        amount: 7000, 
        dailyIncome: 300, 
        totalIncome: 14100, 
        validityDays: 47,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6TyGoMmFsgDoCzgIUu3W42RiyZxWQLu6WtX948MpBfChp8NC4M63H13U&s=10',
        icon: 'fa-solar-panel',
        color: '#00e676',
        level: 'Mwanzo (Starter)'
    },
    { 
        name: 'SunWealth B', 
        amount: 15000, 
        dailyIncome: 650, 
        totalIncome: 30550, 
        validityDays: 47,
        image: 'https://elsol.co.in/wp-content/uploads/elementor/thumbs/solar-panel-installation-in-rooftop-rja69v8fllyzq9r7hrnzseiiwlvx1y05slj8gcsys4.webp',
        icon: 'fa-sun',
        color: '#26a69a',
        level: 'Msingi (Basic)'
    },
    { 
        name: 'SunWealth C', 
        amount: 30000, 
        dailyIncome: 1300, 
        totalIncome: 61100, 
        validityDays: 47,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3pInZBAm0u-CRD9QINm4_NLna1H-YL7L-7VC01QTTAg&s=10',
        icon: 'fa-bolt',
        color: '#42a5f5',
        level: 'Kati (Medium)'
    },
    { 
        name: 'SunWealth D', 
        amount: 50000, 
        dailyIncome: 2200, 
        totalIncome: 103400, 
        validityDays: 47,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQniJKCJGfqAnEYmsnZwr4H8xarFA4jZKJX87H5TsAOC5AiNnxrrJqdIpA&s=10',
        icon: 'fa-car-battery',
        color: '#7e57c2',
        level: 'Juu (Advanced)'
    },
    { 
        name: 'SunWealth E', 
        amount: 80000, 
        dailyIncome: 3500, 
        totalIncome: 164500, 
        validityDays: 47,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSecr6n9MFW_E9SxOhdrkaXGS3KJqfDqNcRcz0jAlrT8Qwe2cQvkgLLzvQ&s=10',
        icon: 'fa-industry',
        color: '#ef5350',
        level: 'Bora (Premium)'
    },
    { 
        name: 'SunWealth F', 
        amount: 120000, 
        dailyIncome: 5300, 
        totalIncome: 249100, 
        validityDays: 47,
        image: 'https://images.unsplash.com/photo-1624397640148-949b1732bb0a?w=300&h=250&fit=crop&crop=center',
        icon: 'fa-building',
        color: '#ff9800',
        level: 'Biashara (Business)'
    },
    { 
        name: 'SunWealth G', 
        amount: 200000, 
        dailyIncome: 8800, 
        totalIncome: 413600, 
        validityDays: 47,
        image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=300&h=250&fit=crop&crop=center',
        icon: 'fa-charging-station',
        color: '#66bb6a',
        level: 'Kampuni (Corporate)'
    },
    { 
        name: 'SunWealth H', 
        amount: 300000, 
        dailyIncome: 13200, 
        totalIncome: 620400, 
        validityDays: 47,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvI-tzrJEwJqbbFnSZw7aV_JiBNGRB7yEw40HDe_7x_A&s=10',
        icon: 'fa-seedling',
        color: '#29b6f6',
        level: 'Kiwanda (Industrial)'
    },
    { 
        name: 'SunWealth I', 
        amount: 500000, 
        dailyIncome: 22000, 
        totalIncome: 1034000, 
        validityDays: 47,
        image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=300&h=250&fit=crop&crop=center',
        icon: 'fa-city',
        color: '#ab47bc',
        level: 'Mkubwa (Enterprise)'
    },
    { 
        name: 'SunWealth J', 
        amount: 1000000, 
        dailyIncome: 45000, 
        totalIncome: 2115000, 
        validityDays: 47,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7cpbw8gJQz706Qsd8U8IN3NhYPM_I7lxIwLdpWdsimrruCp-dgOvzYCk&s=10',
        icon: 'fa-crown',
        color: '#ffd700',
        level: 'Fahari (VIP)'
    }
];

// ===== STANDALONE TICKER (No Firebase Required) =====
var tickerMessages = [
    { icon: '📈', message: 'User invested in', package: 'SunWealth C', amount: 30000, time: '2 min ago' },
    { icon: '💰', message: 'Withdrawal of', amount: 15000, time: '5 min ago' },
    { icon: '🌟', message: 'New member joined SunWealth', time: '8 min ago' },
    { icon: '☀️', message: 'Daily income credited', time: '12 min ago' },
    { icon: '🏆', message: 'VIP package purchased:', package: 'SunWealth F', amount: 120000, time: '15 min ago' },
    { icon: '💎', message: 'Large deposit of', amount: 500000, time: '20 min ago' },
    { icon: '🤝', message: 'Referral bonus awarded', amount: 3000, time: '25 min ago' },
    { icon: '✅', message: 'Withdrawal approved', amount: 15000, time: '30 min ago' }
];

function initTicker() {
    var track = document.getElementById('ticker-track');
    if (!track) return;
    
    var allMessages = tickerMessages.concat(tickerMessages); // Duplicate for seamless scroll
    
    var html = '';
    for (var i = 0; i < allMessages.length; i++) {
        var msg = allMessages[i];
        html += '<span class="ticker-item">';
        html += '<span class="ticker-icon">' + (msg.icon || '📌') + '</span>';
        html += '<span class="ticker-message">' + msg.message + ' ';
        if (msg.package) html += '<span class="ticker-amount">' + msg.package + '</span> ';
        if (msg.amount) html += '<span class="ticker-amount">' + formatCurrency(msg.amount) + '</span> ';
        if (msg.time) html += '<span class="ticker-time">' + msg.time + '</span>';
        html += '</span></span>';
        if (i < allMessages.length - 1) html += '<span class="ticker-separator">•</span>';
    }
    
    track.innerHTML = html;
}

function addTickerMessage(msg) {
    tickerMessages.unshift(msg);
    if (tickerMessages.length > 20) tickerMessages = tickerMessages.slice(0, 20);
    initTicker();
}

// Remove setupTickerListener - not needed
// Call initTicker() directly in your init() function

// ===== SIDEBAR TOGGLE =====
function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('sidebar-overlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

// ===== UTILITY FUNCTIONS =====
function formatCurrency(amount) {
    return 'TZS ' + Number(amount).toLocaleString('en-US');
}

function showToast(message, type) {
    type = type || 'success';
    var toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = 'toast ' + type;
    toast.style.display = 'block';
    setTimeout(function() { toast.style.display = 'none'; }, 4000);
}

function openModal(id) {
    document.getElementById(id).style.display = 'block';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

function generateId(prefix) {
    return (prefix || '') + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// ===== LANGUAGE SYSTEM INTEGRATION =====
// Load language system
document.addEventListener('DOMContentLoaded', function() {
    if (typeof initLanguage === 'function') {
        initLanguage();
    }
});

// Override showToast to use translated messages
const originalShowToast = showToast;
showToast = function(message, type) {
    if (typeof translate === 'function') {
        // Try to translate the message
        const translated = translate(message);
        originalShowToast(translated, type);
    } else {
        originalShowToast(message, type);
    }
};

// ===== NAVIGATION =====
function navigateTo(page) {
    // Hide all sections
    var sections = document.querySelectorAll('.page-section');
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none';
    }
    
    // Show target section
    var sectionMap = {
        'home': 'home-section',
        'packages': 'packages-section',
        'investments': 'investments-section',
        'wallet': 'wallet-section',
        'transactions': 'transactions-section',
        'referral': 'referral-section',
        'admin-dashboard': 'admin-dashboard-section',
        'pending-approvals': 'pending-approvals-section',
        'all-transactions': 'all-transactions-section',
        'user-management': 'user-management-section',
        'system-config': 'system-config-section',
        'super-dashboard': 'super-dashboard-section',
        'profile': 'profile-section',
        'bank-accounts': 'bank-accounts-section',
        'social-links': 'social-links-section',
'solar-projects': 'solar-projects-section',
'solar-projects': 'solar-projects-section',

// In refresh conditions:

    };
    
    if (sectionMap[page]) {
        document.getElementById(sectionMap[page]).style.display = 'block';
    }
    
    // Update sidebar links
    updateActiveLinks(page);
    
    // Update bottom nav
    updateBottomNav(page);
    
    // Refresh data based on page
    if (page === 'wallet') refreshWallet();
    else if (page === 'investments') refreshInvestments();
    else if (page === 'transactions') refreshTransactions();
    else if (page === 'referral') refreshReferral();
    else if (page === 'pending-approvals') refreshPendingApprovals();
    else if (page === 'all-transactions') refreshAdminTransactions();
    else if (page === 'user-management') refreshUserManagement();
    else if (page === 'system-config') refreshSystemConfig();
    else if (page === 'admin-dashboard') refreshAdminDashboard();
    else if (page === 'super-dashboard') refreshSuperDashboard();
    else if (page === 'bank-accounts') refreshBankAccountsList();
else if (page === 'profile') refreshProfile();
else if (page === 'referral') {
    refreshReferral();
    updateReferralInfo();
}
else if (page === 'solar-projects') refreshSolarProjectsAdmin();
else if (page === 'solar-projects') refreshSolarProjectsAdmin();
else if (page === 'social-links') refreshSocialLinksAdmin();

    if (page !== 'investments') {
        clearAllInvestmentIntervals();
    }
    
    // Refresh slideshow when going to home
    if (page === 'home') {
        setTimeout(function() {
            loadSolarSlideshow();
        }, 300);
    }
}

// Alias for backward compatibility
function refreshBankAccounts() {
    refreshBankAccountsList();
}// ===== BANK ACCOUNT MANAGEMENT =====
var bankAccountsList = [];

function showAddBankModal() {
    document.getElementById('bank-modal-title').textContent = '🏦 Add Payment Method';
    document.getElementById('bank-edit-id').value = '';
    document.getElementById('bank-form').reset();
    document.getElementById('bank-is-active').checked = true;
    var err = document.getElementById('bank-error');
    if (err) err.style.display = 'none';
    openModal('bank-modal');
}

function editBankAccount(id) {
    db.collection('bank_accounts').doc(id).get()
    .then(function(doc) {
        if (!doc.exists) { 
            showToast('Payment method not found', 'error'); 
            return; 
        }
        
        var acc = doc.data();
        document.getElementById('bank-modal-title').textContent = '✏️ Edit Payment Method';
        document.getElementById('bank-edit-id').value = id;
        document.getElementById('bank-type').value = acc.type || '';
        document.getElementById('bank-name').value = acc.name || '';
        document.getElementById('bank-account-name').value = acc.accountName || '';
        document.getElementById('bank-account-number').value = acc.accountNumber || '';
        document.getElementById('bank-instructions').value = acc.instructions || '';
        document.getElementById('bank-is-active').checked = acc.isActive !== false;
        var err = document.getElementById('bank-error');
        if (err) err.style.display = 'none';
        openModal('bank-modal');
    })
    .catch(function(e) {
        showToast('Error: ' + e.message, 'error');
    });
}

function saveBankAccount(event) {
    event.preventDefault();
    
    var editId = document.getElementById('bank-edit-id').value;
    var type = document.getElementById('bank-type').value;
    var name = document.getElementById('bank-name').value.trim();
    var accountName = document.getElementById('bank-account-name').value.trim();
    var accountNumber = document.getElementById('bank-account-number').value.trim();
    var instructions = document.getElementById('bank-instructions').value.trim();
    var isActive = document.getElementById('bank-is-active').checked;
    var err = document.getElementById('bank-error');
    if (err) err.style.display = 'none';
    
    if (!type || !name || !accountName || !accountNumber || !instructions) {
        if (err) { err.textContent = 'All fields are required'; err.style.display = 'block'; }
        return;
    }
    
    var bankData = {
        type: type,
        name: name,
        accountName: accountName,
        accountNumber: accountNumber,
        instructions: instructions,
        isActive: isActive,
        updated_at: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    var promise;
    if (editId) {
        promise = db.collection('bank_accounts').doc(editId).update(bankData);
    } else {
        bankData.created_at = firebase.firestore.FieldValue.serverTimestamp();
        promise = db.collection('bank_accounts').add(bankData);
    }
    
    promise.then(function() {
        closeModal('bank-modal');
        showToast(editId ? '✅ Payment method updated!' : '✅ Payment method added!', 'success');
        refreshBankAccountsList();
    })
    .catch(function(e) {
        if (err) { err.textContent = 'Error: ' + e.message; err.style.display = 'block'; }
    });
}

function deleteBankAccount(id) {
    if (!confirm('Delete this payment method? This cannot be undone.')) return;
    
    db.collection('bank_accounts').doc(id).delete()
    .then(function() {
        showToast('🗑️ Payment method deleted', 'warning');
        refreshBankAccountsList();
    })
    .catch(function(e) {
        showToast('Error: ' + e.message, 'error');
    });
}

function toggleBankStatus(id, currentStatus) {
    var newStatus = !currentStatus;
    var action = newStatus ? 'activated' : 'deactivated';
    
    db.collection('bank_accounts').doc(id).update({
        isActive: newStatus,
        updated_at: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function() {
        showToast('Payment method ' + action, 'success');
        refreshBankAccountsList();
    })
    .catch(function(e) {
        showToast('Error: ' + e.message, 'error');
    });
}

function refreshBankAccountsList() {
    var el = document.getElementById('bank-accounts-list');
    if (!el) return;
    
    el.innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:1rem;"><span class="loading-spinner"></span> Loading...</p>';
    
    db.collection('bank_accounts').get()
    .then(function(snap) {
        if (snap.empty) {
            el.innerHTML = '<div style="text-align:center;padding:2rem;">' +
                '<p style="color:var(--text-secondary);margin-bottom:1rem;">No payment methods added yet.</p>' +
                '<button class="btn btn-primary" onclick="showAddBankModal()">➕ Add Payment Method</button>' +
                '</div>';
            return;
        }
        
        bankAccountsList = [];
        var html = '';
        
        snap.forEach(function(doc) {
            var acc = doc.data();
            bankAccountsList.push({ id: doc.id, data: acc });
            
            var icon = '📱';
            if (acc.type === 'bank_transfer') icon = '🏛️';
            else if (acc.type === 'crypto') icon = '₿';
            
            var statusBadge = acc.isActive !== false ? 
                '<span class="badge-active">Active</span>' : 
                '<span class="badge-inactive">Inactive</span>';
            
            html += '<div style="border:1px solid var(--border-subtle);border-radius:8px;padding:1rem;margin-bottom:0.8rem;display:flex;gap:1rem;align-items:flex-start;">' +
                '<div style="font-size:2rem;min-width:50px;text-align:center;">' + icon + '</div>' +
                '<div style="flex:1;">' +
                '<div style="font-weight:600;margin-bottom:0.3rem;">' + escapeHtml(acc.name) + ' ' + statusBadge + '</div>' +
                '<div style="font-size:0.85rem;color:var(--accent-solar);">🔢 ' + escapeHtml(acc.accountNumber) + '</div>' +
                '<div style="font-size:0.8rem;color:var(--text-secondary);">👤 ' + escapeHtml(acc.accountName) + ' • ' + acc.type.replace('_', ' ').toUpperCase() + '</div>' +
                '<div style="font-size:0.8rem;color:var(--text-secondary);margin-top:0.3rem;">📋 ' + escapeHtml(acc.instructions.substring(0, 60)) + '...</div>' +
                '</div>' +
                '<div style="display:flex;flex-direction:column;gap:0.3rem;">' +
                '<button class="btn btn-info btn-sm" onclick="editBankAccount(\'' + doc.id + '\')">✏️</button>' +
                '<button class="btn btn-warning btn-sm" onclick="toggleBankStatus(\'' + doc.id + '\',' + (acc.isActive !== false) + ')">' + (acc.isActive !== false ? '🔒' : '🔓') + '</button>' +
                '<button class="btn btn-danger btn-sm" onclick="deleteBankAccount(\'' + doc.id + '\')">🗑️</button>' +
                '</div></div>';
        });
        
        el.innerHTML = html;
    })
    .catch(function(e) {
        el.innerHTML = '<p style="color:var(--danger);text-align:center;padding:1rem;">Error: ' + e.message + '</p>';
    });
}

// Alias for navigation
function refreshBankAccounts() {
    refreshBankAccountsList();
}

function updateActiveLinks(page) {
    var allLinks = document.querySelectorAll('.sidebar-link, .bottom-nav-item');
    for (var i = 0; i < allLinks.length; i++) {
        allLinks[i].classList.remove('active');
        if (allLinks[i].getAttribute('data-page') === page) {
            allLinks[i].classList.add('active');
        }
    }
}

function updateBottomNav(page) {
    var bottomNavs = document.querySelectorAll('.bottom-nav');
    for (var i = 0; i < bottomNavs.length; i++) {
        bottomNavs[i].style.display = 'none';
    }
    
    if (!currentUserData) return;
    
    var navToShow = '';
    if (currentUserData.role === 'user') navToShow = 'bottom-nav';
    else if (currentUserData.role === 'admin') navToShow = 'bottom-nav-admin';
    else if (currentUserData.role === 'superadmin') navToShow = 'bottom-nav-superadmin';
    
    var nav = document.getElementById(navToShow);
    if (nav) {
        nav.style.display = 'flex';
        var items = nav.querySelectorAll('.bottom-nav-item');
        for (var j = 0; j < items.length; j++) {
            items[j].classList.remove('active');
            if (items[j].getAttribute('data-page') === page) {
                items[j].classList.add('active');
            }
        }
    }
}

auth.onAuthStateChanged(function(user) {
    if (user) {
        currentUser = user;
        console.log('🔐 Auth state: Logged in as', user.email);
        
        // Load user data first
        loadUserData(user.uid);
    } else {
        console.log('🔐 Auth state: Logged out');
        currentUser = null;
        currentUserData = null;
        
        // Stop social popup
        stopSocialPopup();
        
        updateUIForLoggedOut();
        navigateTo('home');
    }
});

function loadUserData(uid) {
    db.collection('users').doc(uid).get()
        .then(function(doc) {
            if (doc.exists) {
                currentUserData = doc.data();
                currentUserData.id = uid;
                
                // Set defaults for missing fields
                if (!currentUserData.username) {
                    currentUserData.username = currentUserData.email ? currentUserData.email.split('@')[0] : 'user';
                }
                if (!currentUserData.phone) {
                    currentUserData.phone = '';
                }
                if (!currentUserData.role) {
                    currentUserData.role = 'user';
                }
                if (!currentUserData.referralCode) {
                    currentUserData.referralCode = 'SW' + uid.substring(0, 8).toUpperCase();
                }
                
                console.log('✅ User data loaded:', currentUserData.username, '| Role:', currentUserData.role);
                
                // Update UI
                updateUIForLoggedInUser();
                
                // Navigate based on role
                var page = 'home';
                if (currentUserData.role === 'superadmin') page = 'super-dashboard';
                else if (currentUserData.role === 'admin') page = 'admin-dashboard';
                else if (currentUserData.role === 'user') page = 'home';
                
                navigateTo(page);
                
                // 🔔 START SOCIAL POPUP FOR USERS ONLY
                if (currentUserData.role === 'user') {
                    console.log('👤 User logged in - starting social popup in 2 seconds...');
                    setTimeout(function() {
                        resetSocialPopupState();
                        startSocialPopup();
                    }, 2000);
                }
                
            } else {
                console.log('📝 User document not found, creating new user...');
                createUserDoc(uid);
            }
        })
        .catch(function(error) {
            console.error('❌ Load user error:', error.code || error.message || error);
            showToast('Imeshindwa kupakia wasifu. Jaribu tena.', 'error');
        });
}

function createUserDoc(uid) {
    var username = currentUser.email ? currentUser.email.split('@')[0] : 'user';
    var email = currentUser.email || '';
    
    var data = {
        uid: uid,
        username: username,
        email: email,
        phone: '',
        referralCode: 'SW' + uid.substring(0, 8).toUpperCase(),
        referredBy: null,
        referredByValid: false,
        referralBonusPaid: false,
        role: 'user',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    console.log('📝 Creating new user:', username);
    
    db.collection('users').doc(uid).set(data)
        .then(function() {
            console.log('✅ User document created');
            return db.collection('wallets').doc(uid).set({
                user_id: uid,
                current_balance: 0,
                total_deposited: 0,
                total_withdrawn: 0,
                created_at: firebase.firestore.FieldValue.serverTimestamp(),
                updated_at: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .then(function() {
            console.log('✅ Wallet created');
            
            currentUserData = data;
            currentUserData.id = uid;
            
            // Update UI
            updateUIForLoggedInUser();
            navigateTo('home');
            
            // 🔔 START SOCIAL POPUP FOR NEW USERS
            setTimeout(function() {
                resetSocialPopupState();
                startSocialPopup();
            }, 3000);
            
            showToast('🎉 Karibu @' + username + '! Akaunti imefunguliwa.', 'success');
        })
        .catch(function(error) {
            console.error('❌ Create user error:', error.code || error.message || error);
            showToast('Imeshindwa kufungua akaunti. Jaribu tena.', 'error');
        });
}

function createUserDoc(uid) {
    var data = {
        uid: uid, email: currentUser.email,
        username: currentUser.email.split('@')[0],
        phone: '', referralCode: 'SW' + uid.substring(0,8).toUpperCase(),
        referredBy: null, role: 'user',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    db.collection('users').doc(uid).set(data)
    .then(function() {
        return db.collection('wallets').doc(uid).set({
            user_id: uid, current_balance: 0, total_deposited: 0, total_withdrawn: 0,
            created_at: firebase.firestore.FieldValue.serverTimestamp()
        });
    })
    .then(function() {
        currentUserData = data;
        updateUIForLoggedIn();
        navigateTo('home');
    });
}

function updateUIForLoggedInUser() {
    if (!currentUser || !currentUserData) return;
    
    var username = currentUserData.username || currentUser.email.split('@')[0] || 'mtumiaji';
    var role = currentUserData.role || 'user';
    
    // Hide auth buttons, show user info
    var authBtns = document.getElementById('auth-buttons');
    var userInfo = document.getElementById('user-info');
    if (authBtns) authBtns.style.display = 'none';
    if (userInfo) userInfo.style.display = 'flex';
    
    // Update display name
    var displayName = document.getElementById('user-display-name');
    if (displayName) {
        displayName.innerHTML = '<i class="fas fa-user-circle"></i> @' + username;
    }
    
    // Update sidebar user info
    var sidebarUser = document.getElementById('sidebar-user');
    if (sidebarUser) sidebarUser.style.display = 'flex';
    
    var sidebarUsername = document.getElementById('sidebar-username');
    if (sidebarUsername) sidebarUsername.textContent = '@' + username;
    
    var sidebarUserRole = document.getElementById('sidebar-userrole');
    if (sidebarUserRole) {
        var roleMap = {
            'user': 'Mwekezaji',
            'admin': 'Msimamizi',
            'superadmin': 'Msimamizi Mkuu'
        };
        sidebarUserRole.textContent = roleMap[role] || role;
    }
    
    // Show correct navigation
    var navUser = document.getElementById('sidebar-nav-user');
    var navAdmin = document.getElementById('sidebar-nav-admin');
    var navSuperadmin = document.getElementById('sidebar-nav-superadmin');
    
    if (navUser) navUser.style.display = (role === 'user') ? 'block' : 'none';
    if (navAdmin) navAdmin.style.display = (role === 'admin') ? 'block' : 'none';
    if (navSuperadmin) navSuperadmin.style.display = (role === 'superadmin') ? 'block' : 'none';
    
    // Show bottom nav
    updateBottomNav(role === 'user' ? 'home' :
        role === 'superadmin' ? 'super-dashboard' : 'admin-dashboard');
}

function updateUIForLoggedOut() {
    var authBtns = document.getElementById('auth-buttons');
    var userInfo = document.getElementById('user-info');
    var sidebarUser = document.getElementById('sidebar-user');
    var navUser = document.getElementById('sidebar-nav-user');
    var navAdmin = document.getElementById('sidebar-nav-admin');
    var navSuperadmin = document.getElementById('sidebar-nav-superadmin');
    
    if (authBtns) authBtns.style.display = 'flex';
    if (userInfo) userInfo.style.display = 'none';
    if (sidebarUser) sidebarUser.style.display = 'none';
    if (navUser) navUser.style.display = 'none';
    if (navAdmin) navAdmin.style.display = 'none';
    if (navSuperadmin) navSuperadmin.style.display = 'none';
    
    // Hide all bottom navs
    var navs = document.querySelectorAll('.bottom-nav');
    for (var i = 0; i < navs.length; i++) {
        navs[i].style.display = 'none';
    }
}

function showLoginModal() { openModal('login-modal'); }
function showSignupModal() { openModal('signup-modal'); }

// Format phone input - remove non-digits
function formatPhoneInput(input) {
    // Remove any non-digit characters except +
    var value = input.value.replace(/[^\d+]/g, '');
    
    // If user types 0 first, replace with nothing (they should type 7xx)
    if (value.length === 1 && value === '0') {
        value = '';
    }
    
    // Remove leading + if user types it (we already have +255)
    if (value.startsWith('+')) {
        value = value.substring(1);
    }
    
    // Limit to 9 digits (Tanzania number without country code)
    if (value.length > 9) {
        value = value.substring(0, 9);
    }
    
    input.value = value;
}

// Show login modal
function showLoginModal() {
    // Clear form and errors
    var form = document.getElementById('login-form');
    var err = document.getElementById('login-error');
    if (form) form.reset();
    if (err) err.style.display = 'none';
    
    // Reset country code to +255
    var countryCode = document.getElementById('login-country-code');
    if (countryCode) countryCode.value = '+255';
    
    // Reset button
    var submitBtn = document.getElementById('login-submit-btn');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Ingia (Login)';
    }
    
    openModal('login-modal');
    
    // Focus on phone input
    setTimeout(function() {
        var phoneInput = document.getElementById('login-identifier');
        if (phoneInput) phoneInput.focus();
    }, 300);
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    
    var countryCode = document.getElementById('login-country-code').value;
    var phoneNumber = document.getElementById('login-identifier').value.trim();
    var password = document.getElementById('login-password').value;
    var rememberMe = document.getElementById('login-remember').checked;
    var err = document.getElementById('login-error');
    var submitBtn = document.getElementById('login-submit-btn');
    
    if (err) err.style.display = 'none';
    
    // Build full phone number
    var fullPhone = countryCode + phoneNumber.replace(/^0+/, '');
    fullPhone = fullPhone.replace(/[\s\-\(\)]/g, '');
    
    // Validate
    if (!phoneNumber || phoneNumber.length < 9) {
        showLoginError('<i class="fas fa-exclamation-triangle"></i> Tafadhali jaza namba ya simu sahihi (tarakimu 9)');
        return;
    }
    if (!password) {
        showLoginError('<i class="fas fa-exclamation-triangle"></i> Tafadhali jaza nywila yako.');
        return;
    }
    
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Inaingia...';
    }
    
    console.log('📱 Logging in with phone:', fullPhone);
    
    // Convert phone to email format for Firebase Auth
    var email = fullPhone.replace(/\+/g, '') + '@sunwealth.user';
    
    // Set persistence
    var persistence = rememberMe ?
        firebase.auth.Auth.Persistence.LOCAL :
        firebase.auth.Auth.Persistence.SESSION;
    
    auth.setPersistence(persistence)
        .then(function() {
            return auth.signInWithEmailAndPassword(email, password);
        })
        .then(function(userCredential) {
            console.log('✅ Login successful');
            
            closeModal('login-modal');
            showToast('Karibu tena!', 'success');
            
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Ingia (Login)';
            }
            
            // Reset form
            document.getElementById('login-form').reset();
            var countryCode = document.getElementById('login-country-code');
            if (countryCode) countryCode.value = '+255';
            
            // Log activity
            if (currentUserData) {
                db.collection('activity_logs').add({
                    message: fullPhone + ' ameingia kwenye mfumo',
                    type: 'login',
                    phone: fullPhone,
                    created_at: firebase.firestore.FieldValue.serverTimestamp()
                }).catch(function(e) { console.warn('Login log skipped'); });
            }
        })
        .catch(function(error) {
            console.error('❌ Login error:', error.code);
            
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Ingia (Login)';
            }
            
            var msg = getLoginErrorMessage(error.code);
            showLoginError('<i class="fas fa-exclamation-triangle"></i> ' + msg);
        });
}

// Show login error
function showLoginError(message) {
    var err = document.getElementById('login-error');
    var submitBtn = document.getElementById('login-submit-btn');
    
    if (err) {
        err.innerHTML = message;
        err.style.display = 'block';
    }
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Ingia (Login)';
    }
    
    setTimeout(function() {
        if (err) err.style.display = 'none';
    }, 8000);
}

// Get login error message
function getLoginErrorMessage(code) {
    var messages = {
        'auth/invalid-email': 'Namba ya simu siyo sahihi.',
        'auth/user-disabled': 'Akaunti hii imezuiwa. Wasiliana na msimamizi.',
        'auth/user-not-found': 'Akaunti haipo. Tafadhali jisajili kwanza.',
        'auth/wrong-password': 'Nywila siyo sahihi. Tafadhali jaribu tena.',
        'auth/invalid-credential': 'Namba ya simu au nywila siyo sahihi.',
        'auth/too-many-requests': 'Umejaribu mara nyingi. Subiri kidogo ujaribu tena.',
        'auth/network-request-failed': 'Mtandao haupatikani. Angalia intaneti yako.'
    };
    return messages[code] || 'Imeshindwa kuingia. Jaribu tena baadaye.';
}

// Toggle password visibility
function togglePasswordVisibility(inputId, button) {
    var input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        button.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        input.type = 'password';
        button.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

// Show reset password modal
function showResetPasswordModal() {
    openModal('reset-password-modal');
}

// Handle reset password
function handleResetPassword(event) {
    event.preventDefault();
    
    var email = document.getElementById('reset-email').value.trim();
    var msgDiv = document.getElementById('reset-message');
    
    if (!email) {
        if (msgDiv) {
            msgDiv.textContent = 'Tafadhali jaza barua pepe.';
            msgDiv.style.color = 'var(--danger)';
            msgDiv.style.background = 'rgba(248,81,73,0.1)';
            msgDiv.style.display = 'block';
        }
        return;
    }
    
    if (msgDiv) {
        msgDiv.textContent = '⏳ Inatuma kiungo...';
        msgDiv.style.color = 'var(--accent-warning)';
        msgDiv.style.background = 'rgba(255,167,38,0.1)';
        msgDiv.style.display = 'block';
    }
    
    auth.sendPasswordResetEmail(email)
    .then(function() {
        if (msgDiv) {
            msgDiv.textContent = '✅ Kiungo kimetumwa! Angalia barua pepe yako ili kubadilisha nywila.';
            msgDiv.style.color = 'var(--accent-solar)';
            msgDiv.style.background = 'rgba(0,230,118,0.1)';
            msgDiv.style.display = 'block';
        }
        showToast('📧 Kiungo kimetumwa kwa barua pepe!', 'success');
        
        setTimeout(function() {
            closeModal('reset-password-modal');
            if (msgDiv) msgDiv.style.display = 'none';
        }, 3000);
    })
    .catch(function(error) {
        console.error('Reset password error:', error);
        if (msgDiv) {
            msgDiv.textContent = '❌ ' + getLoginErrorMessage(error.code);
            msgDiv.style.color = 'var(--danger)';
            msgDiv.style.background = 'rgba(248,81,73,0.1)';
            msgDiv.style.display = 'block';
        }
    });
}

// Show login modal
function showLoginModal() {
    // Clear form and errors
    var form = document.getElementById('login-form');
    var err = document.getElementById('login-error');
    if (form) form.reset();
    if (err) err.style.display = 'none';
    
    // Reset button
    var submitBtn = document.getElementById('login-submit-btn');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = '🔐 Ingia (Login)';
    }
    
    openModal('login-modal');
    
    // Focus on identifier field
    setTimeout(function() {
        var identifierField = document.getElementById('login-identifier');
        if (identifierField) identifierField.focus();
    }, 300);
}

function handleSignup(event) {
    event.preventDefault();
    
    // Get form values
    var countryCode = document.getElementById('signup-country-code').value;
    var phoneNumber = document.getElementById('signup-phone').value.trim();
    var fullPhone = countryCode + phoneNumber.replace(/^0+/, ''); // Remove leading zero
    var referralCode = document.getElementById('signup-referral').value.trim();
    var password = document.getElementById('signup-password').value;
    var confirmPassword = document.getElementById('signup-confirm-password').value;
    var termsAccepted = document.getElementById('signup-terms').checked;
    
    var err = document.getElementById('signup-error');
    var success = document.getElementById('signup-success');
    var submitBtn = document.getElementById('signup-submit-btn');
    
    // Hide messages
    if (err) err.style.display = 'none';
    if (success) success.style.display = 'none';
    
    // ===== VALIDATIONS =====
    
    // 1. Terms & Conditions
    if (!termsAccepted) {
        showSignupError('<i class="fas fa-exclamation-triangle"></i> Tafadhali kubali Masharti na Vigezo');
        return;
    }
    
    // 2. Phone validation
    if (!phoneNumber || phoneNumber.length < 9) {
        showSignupError('<i class="fas fa-exclamation-triangle"></i> Tafadhali jaza namba ya simu sahihi (angalau tarakimu 9)');
        return;
    }
    
    // Clean phone number - remove spaces and dashes
    fullPhone = fullPhone.replace(/[\s\-\(\)]/g, '');
    
    // 3. Password validation
    if (!password || password.length < 6) {
        showSignupError('<i class="fas fa-exclamation-triangle"></i> Nywila inatakiwa iwe na angalau herufi 6');
        return;
    }
    
    // 4. Confirm password
    if (password !== confirmPassword) {
        showSignupError('<i class="fas fa-exclamation-triangle"></i> Nywila haziwiani. Tafadhali jaribu tena.');
        return;
    }
    
    // Show loading
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Inasubiri...';
    }
    
    // 5. Check if phone already registered
    checkPhoneUnique(fullPhone)
        .then(function(isUnique) {
            if (!isUnique) {
                showSignupError('<i class="fas fa-exclamation-triangle"></i> Namba hii ya simu tayari imesajiliwa. Tafadhali ingia au tumia namba nyingine.');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Fungua Akaunti';
                }
                return Promise.reject('phone_taken');
            }
            
            // 6. Validate referral code if provided
            if (referralCode) {
                return validateReferralCode(referralCode);
            }
            return Promise.resolve(null);
        })
        .then(function(referrerData) {
            // Create user account with phone as username
            return createPhoneUserAccount({
                phone: fullPhone,
                referralCode: referralCode,
                referrerData: referrerData,
                password: password
            });
        })
        .then(function() {
            // Success
            if (success) {
                success.innerHTML = '<i class="fas fa-check-circle"></i> Akaunti imefunguliwa kwa mafanikio!';
                success.style.display = 'block';
            }
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Imefanikiwa!';
            }
            
            // Clear referral from storage
            sessionStorage.removeItem('sunwealth_ref');
            
            // Auto-login after signup
            setTimeout(function() {
                closeModal('signup-modal');
                
                // Auto login with phone
                performPhoneLogin(fullPhone, password, submitBtn);
            }, 1500);
        })
        .catch(function(error) {
            if (error === 'phone_taken') return;
            if (error === 'invalid_referral') return;
            
            console.error('Signup error:', error);
            
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Fungua Akaunti';
            }
            
            showSignupError(getFirebaseErrorMessage(error.code || error.message));
        });
}

// Check if phone number is unique
function checkPhoneUnique(phone) {
    return db.collection('users')
        .where('phone', '==', phone)
        .get()
        .then(function(snap) {
            return snap.empty;
        })
        .catch(function(e) {
            console.warn('Phone check error:', e);
            return true; // Allow on error
        });
}

// Validate referral code
function validateReferralCode(code) {
    return db.collection('users')
        .where('referralCode', '==', code)
        .get()
        .then(function(snap) {
            if (snap.empty) {
                showSignupError('<i class="fas fa-exclamation-triangle"></i> Namba ya ushirika "' + code + '" haipo. Acha wazi au angalia.');
                return Promise.reject('invalid_referral');
            }
            return snap.docs[0].data();
        });
}

// Create user account with phone
function createPhoneUserAccount(data) {
    var phone = data.phone;
    var referralCode = data.referralCode;
    var referrerData = data.referrerData;
    var password = data.password;
    
    // Create email from phone for Firebase Auth
    var email = phone.replace(/\+/g, '') + '@sunwealth.user';
    var username = phone.replace(/\+/g, '');
    
    // Create auth user
    return auth.createUserWithEmailAndPassword(email, password)
        .then(function(userCredential) {
            var user = userCredential.user;
            
            // Generate referral code
            var userReferralCode = 'SW' + phone.replace(/\+/g, '').slice(-8);
            
            // User data for Firestore
            var userData = {
                uid: user.uid,
                username: username,
                phone: phone,
                email: email,
                referralCode: userReferralCode,
                referredBy: referralCode || null,
                referredByValid: referralCode ? true : false,
                referralBonusPaid: false,
                referrerId: referrerData ? referrerData.uid : null,
                referrerName: referrerData ? referrerData.username || referrerData.phone : null,
                role: 'user',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            // Save to Firestore
            return db.collection('users').doc(user.uid).set(userData)
                .then(function() {
                    // Create wallet
                    return db.collection('wallets').doc(user.uid).set({
                        user_id: user.uid,
                        current_balance: 0,
                        total_deposited: 0,
                        total_withdrawn: 0,
                        created_at: firebase.firestore.FieldValue.serverTimestamp(),
                        updated_at: firebase.firestore.FieldValue.serverTimestamp()
                    });
                })
                .then(function() {
                    // Log activity
                    var logMsg = phone + ' amejisajili';
                    if (referralCode && referrerData) {
                        logMsg += ' kupitia ushirika wa ' + (referrerData.phone || referrerData.username);
                    }
                    
                    return db.collection('activity_logs').add({
                        message: logMsg,
                        type: 'signup',
                        phone: phone,
                        referral_code: referralCode || null,
                        created_at: firebase.firestore.FieldValue.serverTimestamp()
                    }).catch(function(e) { console.warn('Log skipped'); });
                })
                .then(function() {
                    // Add to ticker
                    if (typeof addTickerMessage === 'function') {
                        addTickerMessage({
                            icon: '<i class="fas fa-user-plus"></i>',
                            message: 'Mwanachama mpya:',
                            username: phone,
                            time: 'Sasa hivi'
                        });
                    }
                });
        });
}

// Auto-login after signup
function performPhoneLogin(phone, password, submitBtn) {
    var email = phone.replace(/\+/g, '') + '@sunwealth.user';
    
    auth.signInWithEmailAndPassword(email, password)
        .then(function() {
            console.log('✅ Auto-login successful');
            showToast('<i class="fas fa-check-circle"></i> Karibu! Akaunti imefunguliwa.', 'success');
            
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Fungua Akaunti';
            }
        })
        .catch(function(e) {
            console.log('Auto-login failed, showing login modal');
            showLoginModal();
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Fungua Akaunti';
            }
        });
}

// Toggle password visibility
function togglePasswordVisibility(inputId, button) {
    var input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        button.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        input.type = 'password';
        button.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

// Check if username is unique
function checkUsernameUnique(username) {
    return db.collection('users')
        .where('username', '==', username)
        .get()
        .then(function(snap) {
            return snap.empty;
        })
        .catch(function(e) {
            console.warn('Username check error:', e);
            return true; // Allow on error to not block signup
        });
}

// Validate referral code
function validateReferralCode(code) {
    return db.collection('users')
        .where('referralCode', '==', code)
        .get()
        .then(function(snap) {
            if (snap.empty) {
                showSignupError('<i class="fas fa-exclamation-triangle"></i> Namba ya ushirika "' + code + '" haipo. Acha wazi au angalia.');
                return Promise.reject('invalid_referral');
            }
            return snap.docs[0].data();
        });
}

// Create user account
function createUserAccount(data) {
    var username = data.username;
    var email = data.email;
    var phone = data.phone;
    var referralCode = data.referralCode;
    var referrerData = data.referrerData;
    var password = data.password;
    
    // Create auth user
    return auth.createUserWithEmailAndPassword(email, password)
        .then(function(userCredential) {
            var user = userCredential.user;
            
            // Generate referral code for new user
            var userReferralCode = 'SW' + user.uid.substring(0, 8).toUpperCase();
            
            // User data for Firestore
            var userData = {
                uid: user.uid,
                username: username,
                email: email,
                phone: phone,
                referralCode: userReferralCode,
                referredBy: referralCode || null,
                referredByValid: referralCode ? true : false,
                referralBonusPaid: false,
                referrerId: referrerData ? referrerData.uid : null,
                referrerName: referrerData ? referrerData.username : null,
                role: 'user',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            // Save user to Firestore
            return db.collection('users').doc(user.uid).set(userData)
                .then(function() {
                    // Create wallet
                    return db.collection('wallets').doc(user.uid).set({
                        user_id: user.uid,
                        current_balance: 0,
                        total_deposited: 0,
                        total_withdrawn: 0,
                        created_at: firebase.firestore.FieldValue.serverTimestamp(),
                        updated_at: firebase.firestore.FieldValue.serverTimestamp()
                    });
                })
                .then(function() {
                    // Log activity
                    var logMsg = '@' + username + ' amejisajili';
                    if (referralCode && referrerData) {
                        logMsg += ' kupitia ushirika wa @' + referrerData.username;
                    }
                    
                    return db.collection('activity_logs').add({
                        message: logMsg,
                        type: 'signup',
                        username: username,
                        referral_code: referralCode || null,
                        created_at: firebase.firestore.FieldValue.serverTimestamp()
                    }).catch(function(e) {
                        console.warn('Activity log skipped');
                    });
                })
                .then(function() {
                    // Add to ticker
                    if (typeof addTickerMessage === 'function') {
                        addTickerMessage({
                            icon: '<i class="fas fa-user-plus"></i>',
                            message: 'Mwanachama mpya:',
                            username: '@' + username,
                            time: 'Sasa hivi'
                        });
                    }
                });
        });
}

// Show signup error
function showSignupError(message) {
    var err = document.getElementById('signup-error');
    var success = document.getElementById('signup-success');
    var submitBtn = document.getElementById('signup-submit-btn');
    
    if (err) {
        err.innerHTML = message;
        err.style.display = 'block';
    }
    if (success) success.style.display = 'none';
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Fungua Akaunti';
    }
    
    // Auto hide after 8 seconds
    setTimeout(function() {
        if (err) err.style.display = 'none';
    }, 8000);
}

// Email validation
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Toggle password visibility
function togglePasswordVisibility(inputId, button) {
    var input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        button.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        input.type = 'password';
        button.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

// Get Firebase error message
function getFirebaseErrorMessage(code) {
    var messages = {
        'auth/email-already-in-use': '<i class="fas fa-exclamation-circle"></i> Barua pepe hii tayari imesajiliwa. Ingia au tumia nyingine.',
        'auth/invalid-email': '<i class="fas fa-exclamation-circle"></i> Barua pepe siyo sahihi.',
        'auth/weak-password': '<i class="fas fa-exclamation-circle"></i> Nywila ni dhaifu. Tumia angalau herufi 6.',
        'auth/network-request-failed': '<i class="fas fa-exclamation-circle"></i> Mtandao haupatikani. Angalia intaneti.',
        'auth/too-many-requests': '<i class="fas fa-exclamation-circle"></i> Umejaribu mara nyingi. Subiri kidogo.'
    };
    return messages[code] || '<i class="fas fa-exclamation-circle"></i> Imeshindwa: ' + (code || 'Jaribu tena.');
}

function showErr(el, msg) { if (el) { el.textContent = msg; el.style.display = 'block'; }}

function logout() {
    // Stop social popup
    stopSocialPopup();
    resetSocialPopupState();
    
    auth.signOut()
        .then(function() {
            toggleSidebar();
            showToast('Umetoka kwenye mfumo. Karibu tena!', 'warning');
        })
        .catch(function(error) {
            console.error('Logout error:', error);
        });
}

function renderPackages() {
    var grids = document.querySelectorAll('#package-grid, #packages-page-grid');
    
    for (var g = 0; g < grids.length; g++) {
        if (!grids[g]) continue;
        grids[g].innerHTML = '';
        
        for (var i = 0; i < investmentPackages.length; i++) {
            var p = investmentPackages[i];
            
            var card = document.createElement('div');
            card.className = 'package-card';
            
            // Left side - Solar Image with overlay
            var leftSide =
                '<div class="package-image-side">' +
                '<img src="' + p.image + '" ' +
                'alt="' + p.name + ' - Solar Investment" ' +
                'loading="lazy" ' +
                'onerror="this.onerror=null;this.style.display=\'none\';this.parentNode.classList.add(\'no-image\');">' +
                '<div class="package-image-overlay"></div>' +
                '<div class="package-image-icon">' +
                '<i class="fas ' + p.icon + '"></i>' +
                '</div>' +
                '<div class="package-image-badge">' + p.level + '</div>' +
                '</div>';
            
            // Right side - Package Details
            var rightSide =
                '<div class="package-info">' +
                '<div class="package-title">' +
                '<i class="fas ' + p.icon + '" style="color:' + p.color + ';margin-right:0.4rem;"></i>' +
                p.name +
                '</div>' +
                '<div class="package-level">' + p.level + '</div>' +
                '<div class="package-details-grid">' +
                '<div class="detail-item">' +
                '<span class="detail-label"><i class="fas fa-money-bill-wave"></i> Kiasi</span>' +
                '<span class="detail-value">' + formatCurrency(p.amount) + '</span>' +
                '</div>' +
                '<div class="detail-item">' +
                '<span class="detail-label"><i class="fas fa-calendar-check"></i> Kila Siku</span>' +
                '<span class="detail-value highlight">' + formatCurrency(p.dailyIncome) + '</span>' +
                '</div>' +
                '<div class="detail-item">' +
                '<span class="detail-label"><i class="fas fa-trophy"></i> Jumla</span>' +
                '<span class="detail-value highlight">' + formatCurrency(p.totalIncome) + '</span>' +
                '</div>' +
                '<div class="detail-item">' +
                '<span class="detail-label"><i class="fas fa-clock"></i> Muda</span>' +
                '<span class="detail-value">Siku ' + p.validityDays + '</span>' +
                '</div>' +
                '</div>' +
                '<div class="package-progress">' +
                '<div class="progress-bar">' +
                '<div class="progress-fill" style="width:0%;background:' + p.color + ';"></div>' +
                '</div>' +
                '<span class="progress-text">Mapato yataanza mara moja</span>' +
                '</div>' +
                '<button class="btn btn-primary package-buy-btn" onclick="buyPackage(\'' + p.name + '\')" style="background:' + p.color + ';border-color:' + p.color + ';">' +
                '<i class="fas fa-shopping-cart"></i> Nunua Sasa' +
                '</button>' +
                '</div>';
            
            card.innerHTML = leftSide + rightSide;
            grids[g].appendChild(card);
        }
    }
}

// Global variable to store selected package
var selectedPackageForBuy = null;
var selectedPackageData = null;

// Show buy confirmation modal
function buyPackage(name) {
    if (!currentUser) {
        showToast('Tafadhali ingia kwanza (Please login first)', 'error');
        showLoginModal();
        return;
    }
    
    if (!currentUserData || currentUserData.role !== 'user') {
        showToast('Wawekezaji pekee wanaweza kununua vifurushi', 'error');
        return;
    }
    
    // Find package
    var pkg = null;
    for (var i = 0; i < investmentPackages.length; i++) {
        if (investmentPackages[i].name === name) {
            pkg = investmentPackages[i];
            break;
        }
    }
    if (!pkg) return;
    
    // Store for later
    selectedPackageForBuy = name;
    selectedPackageData = pkg;
    
    // Get current balance
    db.collection('wallets').doc(currentUser.uid).get()
        .then(function(doc) {
            var balance = doc.exists ? (doc.data().current_balance || 0) : 0;
            var afterPurchase = balance - pkg.amount;
            var canAfford = balance >= pkg.amount;
            
            // Fill confirmation modal
            document.getElementById('confirm-package-name').textContent = pkg.name;
            document.getElementById('confirm-invest-amount').textContent = formatCurrency(pkg.amount);
            document.getElementById('confirm-daily-income').textContent = formatCurrency(pkg.dailyIncome);
            document.getElementById('confirm-total-income').textContent = formatCurrency(pkg.totalIncome);
            document.getElementById('confirm-validity').textContent = 'Siku ' + pkg.validityDays;
            document.getElementById('confirm-current-balance').textContent = formatCurrency(balance);
            document.getElementById('confirm-remaining-balance').textContent = formatCurrency(Math.max(0, afterPurchase));
            
            // Show/hide insufficient warning
            var warningDiv = document.getElementById('confirm-insufficient-warning');
            var submitBtn = document.getElementById('buy-confirm-submit-btn');
            var errorDiv = document.getElementById('buy-confirm-error');
            var successDiv = document.getElementById('buy-confirm-success');
            
            if (warningDiv) warningDiv.style.display = canAfford ? 'none' : 'block';
            if (submitBtn) {
                submitBtn.disabled = !canAfford;
                submitBtn.style.opacity = canAfford ? '1' : '0.5';
                submitBtn.textContent = canAfford ? '✅ Thibitisha Ununuzi' : '❌ Salio Halitoshi';
            }
            if (errorDiv) errorDiv.style.display = 'none';
            if (successDiv) successDiv.style.display = 'none';
            
            // Color remaining balance
            var remainingEl = document.getElementById('confirm-remaining-balance');
            if (remainingEl) {
                remainingEl.style.color = afterPurchase < 0 ? 'var(--danger)' : 'var(--accent-warning)';
            }
            
            // Show modal
            openModal('buy-confirm-modal');
        })
        .catch(function(e) {
            console.error('Balance check error:', e);
            showToast('Imeshindwa kupakia salio. Jaribu tena.', 'error');
        });
}

// Confirm and process purchase
function confirmBuyPackage() {
    if (!selectedPackageForBuy || !selectedPackageData) {
        showToast('Hakuna kifurushi kilichochaguliwa', 'error');
        return;
    }
    
    var pkg = selectedPackageData;
    var submitBtn = document.getElementById('buy-confirm-submit-btn');
    var errorDiv = document.getElementById('buy-confirm-error');
    var successDiv = document.getElementById('buy-confirm-success');
    
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '⏳ Inashughulikia...';
    }
    if (errorDiv) errorDiv.style.display = 'none';
    if (successDiv) successDiv.style.display = 'none';
    
    // Check balance and deduct
    db.collection('wallets').doc(currentUser.uid).get()
        .then(function(doc) {
            if (!doc.exists || doc.data().current_balance < pkg.amount) {
                throw new Error('insufficient_balance');
            }
            
            // Deduct balance
            return db.collection('wallets').doc(currentUser.uid).update({
                current_balance: firebase.firestore.FieldValue.increment(-pkg.amount),
                updated_at: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .then(function() {
            // Create investment record
            return db.collection('investments').add({
                user_id: currentUser.uid,
                package_name: pkg.name,
                amount: pkg.amount,
                daily_income: pkg.dailyIncome,
                total_income: pkg.totalIncome,
                validity_days: pkg.validityDays,
                start_date: firebase.firestore.FieldValue.serverTimestamp(),
                earned_so_far: 0,
                days_elapsed: 0,
                status: 'active',
                created_at: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .then(function() {
            // Log activity
            return db.collection('activity_logs').add({
                message: (currentUserData.username || 'Mtumiaji') + ' amenunua ' + pkg.name + ' - ' + formatCurrency(pkg.amount),
                type: 'investment',
                amount: pkg.amount,
                package: pkg.name,
                user_name: currentUserData.username,
                created_at: firebase.firestore.FieldValue.serverTimestamp()
            }).catch(function(e) { console.warn('Log skipped'); });
        })
        .then(function() {
            // Add to ticker
            if (typeof addTickerMessage === 'function') {
                addTickerMessage({
                    icon: '📈',
                    message: 'Uwekezaji mpya:',
                    package: pkg.name,
                    amount: pkg.amount,
                    username: currentUserData.username || 'Mtumiaji',
                    time: 'Sasa hivi'
                });
            }
            
            // Show success
            if (successDiv) {
                successDiv.textContent = '✅ Ununuzi umefanikiwa!';
                successDiv.style.display = 'block';
            }
            
            // Close confirm modal
            setTimeout(function() {
                closeModal('buy-confirm-modal');
                
                // Show success modal
                document.getElementById('success-package-name').textContent = pkg.name;
                document.getElementById('success-amount').textContent = formatCurrency(pkg.amount);
                document.getElementById('success-daily').textContent = formatCurrency(pkg.dailyIncome);
                document.getElementById('success-days').textContent = 'Siku ' + pkg.validityDays;
                openModal('purchase-success-modal');
                
                // Reset state
                selectedPackageForBuy = null;
                selectedPackageData = null;
                
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = '✅ Thibitisha Ununuzi';
                }
            }, 500);
            
            // Refresh dashboard
            if (typeof refreshWallet === 'function') refreshWallet();
            if (typeof refreshInvestments === 'function') refreshInvestments();
        })
        .catch(function(error) {
            console.error('Purchase error:', error);
            
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = '✅ Thibitisha Ununuzi';
            }
            
            if (error.message === 'insufficient_balance') {
                if (errorDiv) {
                    errorDiv.textContent = '⚠️ Salio halitoshi. Tafadhali weka amana kwanza.';
                    errorDiv.style.display = 'block';
                }
                // Show insufficient warning
                var warningDiv = document.getElementById('confirm-insufficient-warning');
                if (warningDiv) warningDiv.style.display = 'block';
            } else {
                if (errorDiv) {
                    errorDiv.textContent = '❌ Imeshindwa kununua. Tafadhali jaribu tena.';
                    errorDiv.style.display = 'block';
                }
            }
        });
}

// ===== DEPOSIT/WITHDRAW =====
function showDepositModal() { if (!currentUser) { showToast('Login first', 'error'); return; } openModal('deposit-modal'); }
// ===== WITHDRAWAL FUNCTIONS =====

// Show withdraw modal
function showWithdrawModal() {
    if (!currentUser) {
        showToast('Tafadhali ingia kwanza', 'error');
        return;
    }
    
    // Reset form
    var form = document.getElementById('withdraw-form');
    if (form) form.reset();
    
    // Clear error
    var err = document.getElementById('withdraw-error');
    if (err) err.style.display = 'none';
    
    // Hide fee display
    var feeDisplay = document.getElementById('withdraw-fee-display');
    if (feeDisplay) feeDisplay.style.display = 'none';
    
    // Reset button
    var submitBtn = document.getElementById('withdraw-submit-btn');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Tuma Ombi la Utoaji';
    }
    
    // Load current balance
    loadWithdrawBalance();
    
    openModal('withdraw-modal');
}

// Load available balance
function loadWithdrawBalance() {
    if (!currentUser) return;
    
    db.collection('wallets').doc(currentUser.uid).get()
        .then(function(doc) {
            var balance = doc.exists ? (doc.data().current_balance || 0) : 0;
            var balanceEl = document.getElementById('withdraw-available-balance');
            if (balanceEl) {
                balanceEl.textContent = formatCurrency(balance);
            }
        })
        .catch(function(e) {
            console.warn('Balance load error:', e.message);
            var balanceEl = document.getElementById('withdraw-available-balance');
            if (balanceEl) balanceEl.textContent = 'TZS 0';
        });
}

// Update placeholder based on selected method
function updateWithdrawPlaceholder() {
    var method = document.getElementById('withdraw-method').value;
    var accountInput = document.getElementById('withdraw-account');
    var nameInput = document.getElementById('withdraw-account-name');
    
    if (!accountInput) return;
    
    var providerInfo = getProviderInfo(method);
    
    // Set placeholder based on method type
    if (method === 'mpesa' || method === 'tigopesa' || method === 'airtel_money' ||
        method === 'halopesa' || method === 'ezypesa' || method === 'ttcl_pesa') {
        accountInput.placeholder = 'Mfano: 0712 345 678 (Namba ya simu)';
        if (nameInput) nameInput.placeholder = 'Jina la mmiliki wa simu';
    } else if (method === 'crdb' || method === 'nmb' || method === 'exim' ||
        method === 'stanbic' || method === 'kcb' || method === 'absa' ||
        method === 'dtb' || method === 'equity' || method === 'posta') {
        accountInput.placeholder = 'Mfano: 0123456789 (Namba ya akaunti)';
        if (nameInput) nameInput.placeholder = 'Jina la mmiliki wa akaunti';
    } else if (method === 'usdt_trc20' || method === 'usdt_erc20' ||
        method === 'btc' || method === 'eth') {
        accountInput.placeholder = 'Anwani ya wallet yako';
        if (nameInput) nameInput.placeholder = 'Jina lako kwenye wallet';
    } else {
        accountInput.placeholder = 'Namba ya simu au akaunti';
        if (nameInput) nameInput.placeholder = 'Jina la mmiliki';
    }
    
    // Update provider name display
    if (method && providerInfo) {
        console.log('Selected:', providerInfo.name);
    }
}

// Calculate withdrawal fee
function calculateWithdrawFee() {
    var amount = parseInt(document.getElementById('withdraw-amount').value) || 0;
    var feeDisplay = document.getElementById('withdraw-fee-display');
    
    if (amount >= 2000) {
        var fee = Math.floor(amount * 0.10);
        var netAmount = amount - fee;
        
        var grossEl = document.getElementById('fee-gross-amount');
        var feeEl = document.getElementById('fee-amount');
        var netEl = document.getElementById('fee-net-amount');
        
        if (grossEl) grossEl.textContent = formatCurrency(amount);
        if (feeEl) feeEl.textContent = '-' + formatCurrency(fee);
        if (netEl) netEl.textContent = formatCurrency(netAmount);
        
        if (feeDisplay) feeDisplay.style.display = 'block';
    } else {
        if (feeDisplay) feeDisplay.style.display = 'none';
    }
}

// Handle withdrawal
function handleWithdraw(event) {
    event.preventDefault();
    
    var method = document.getElementById('withdraw-method').value;
    var account = document.getElementById('withdraw-account').value.trim();
    var accountName = document.getElementById('withdraw-account-name').value.trim();
    var amount = parseInt(document.getElementById('withdraw-amount').value);
    var password = document.getElementById('withdraw-password').value;
    var err = document.getElementById('withdraw-error');
    var submitBtn = document.getElementById('withdraw-submit-btn');
    
    if (err) err.style.display = 'none';
    
    // ===== VALIDATIONS =====
    
    // 1. Method
    if (!method) {
        showWithdrawError('Tafadhali chagua njia ya kupokea.');
        return;
    }
    
    // 2. Account
    if (!account) {
        showWithdrawError('Tafadhali jaza namba ya simu au akaunti.');
        return;
    }
    
    // 3. Account Name
    if (!accountName) {
        showWithdrawError('Tafadhali jaza jina la mmiliki wa akaunti.');
        return;
    }
    
    // 4. Amount
    if (!amount || amount < 2000) {
        showWithdrawError('Kiwango cha chini cha utoaji ni TZS 2,000.');
        return;
    }
    
    // 5. Password
    if (!password) {
        showWithdrawError('Tafadhali jaza nywila yako kuthibitisha.');
        return;
    }
    
    // 6. Check operating hours
    var now = new Date();
    var currentMinutes = now.getHours() * 60 + now.getMinutes();
    var openMinutes = 4 * 60 + 30; // 04:30
    var closeMinutes = 19 * 60; // 19:00
    
    if (currentMinutes < openMinutes || currentMinutes > closeMinutes) {
        showWithdrawError('<i class="fas fa-clock"></i> Utoaji unaruhusiwa kati ya 04:30 AM - 07:00 PM pekee.');
        return;
    }
    
    // Show loading
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Inashughulikia...';
    }
    
    // Get wallet and check balance
    db.collection('wallets').doc(currentUser.uid).get()
        .then(function(doc) {
            var balance = doc.exists ? (doc.data().current_balance || 0) : 0;
            
            if (balance < amount) {
                throw new Error('insufficient_balance');
            }
            
            // Re-authenticate user
            var email = currentUser.email;
            return auth.signInWithEmailAndPassword(email, password);
        })
        .then(function() {
            // Calculate fee
            var fee = Math.floor(amount * 0.10);
            var netAmount = amount - fee;
            var providerInfo = getProviderInfo(method);
            
            // Deduct balance
            return db.collection('wallets').doc(currentUser.uid).update({
                current_balance: firebase.firestore.FieldValue.increment(-amount),
                updated_at: firebase.firestore.FieldValue.serverTimestamp()
            }).then(function() {
                // Create transaction
                return db.collection('transactions').add({
                    user_id: currentUser.uid,
                    type: 'withdrawal',
                    amount: amount,
                    fee: fee,
                    net_amount: netAmount,
                    payment_method: method,
                    payment_method_name: providerInfo ? providerInfo.name : method,
                    account_details: account,
                    account_name: accountName,
                    transaction_reference: generateId('WTH'),
                    status: 'pending',
                    created_at: firebase.firestore.FieldValue.serverTimestamp(),
                    processed_at: null,
                    user_email: currentUser.email,
                    user_name: currentUserData ? currentUserData.username : currentUser.email
                });
            });
        })
        .then(function() {
            // Log activity
            try {
                db.collection('activity_logs').add({
                    message: '@' + (currentUserData.username || 'mtumiaji') + ' ameomba utoaji wa ' + formatCurrency(amount) + ' kupitia ' + method,
                    type: 'withdrawal',
                    amount: amount,
                    method: method,
                    created_at: firebase.firestore.FieldValue.serverTimestamp()
                });
            } catch (e) {}
            
            // Add to ticker
            if (typeof addTickerMessage === 'function') {
                addTickerMessage({
                    icon: '<i class="fas fa-upload"></i>',
                    message: 'Ombi la utoaji:',
                    amount: amount,
                    username: currentUserData ? currentUserData.username : 'Mtumiaji',
                    time: 'Sasa hivi'
                });
            }
            
            var fee = Math.floor(amount * 0.10);
            
            closeModal('withdraw-modal');
            showToast(
                '<i class="fas fa-check-circle"></i> Ombi la utoaji wa ' + formatCurrency(amount) + ' limetumwa!<br>' +
                '<small>Ada: ' + formatCurrency(fee) + ' | Utapokea: ' + formatCurrency(amount - fee) + '</small>',
                'warning'
            );
            
            refreshWallet();
        })
        .catch(function(error) {
            console.error('Withdraw error:', error);
            
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Tuma Ombi la Utoaji';
            }
            
            if (error.message === 'insufficient_balance') {
                showWithdrawError('<i class="fas fa-exclamation-triangle"></i> Salio halitoshi. Tafadhali angalia salio lako.');
            } else if (error.code === 'auth/wrong-password') {
                showWithdrawError('<i class="fas fa-lock"></i> Nywila siyo sahihi. Tafadhali jaribu tena.');
            } else {
                showWithdrawError('Imeshindwa kushughulikia ombi. Tafadhali jaribu tena.');
            }
        });
}

// Show withdrawal error
function showWithdrawError(message) {
    var err = document.getElementById('withdraw-error');
    var submitBtn = document.getElementById('withdraw-submit-btn');
    
    if (err) {
        err.innerHTML = message;
        err.style.display = 'block';
    }
    
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Tuma Ombi la Utoaji';
    }
    
    setTimeout(function() {
        if (err) err.style.display = 'none';
    }, 8000);
}

function handleDeposit(event) {
    event.preventDefault();
    
    var amount = parseInt(document.getElementById('deposit-amount').value);
    var method = document.getElementById('deposit-method').value;
    var ref = document.getElementById('deposit-reference').value.trim();
    var err = document.getElementById('deposit-error');
    
    if (err) err.style.display = 'none';
    
    // Validate
    if (!amount || amount < 7000) {
        showErr(err, 'Minimum deposit is TZS 7,000');
        return;
    }
    if (!method) {
        showErr(err, 'Please select payment method');
        return;
    }
    if (!ref) {
        showErr(err, 'Please enter transaction reference');
        return;
    }
    
    // Create transaction
    db.collection('transactions').add({
            user_id: currentUser.uid,
            type: 'deposit',
            amount: amount,
            payment_method: method,
            transaction_reference: ref,
            status: 'pending',
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
            processed_at: null,
            user_email: currentUser.email,
            user_name: currentUserData ? currentUserData.username : currentUser.email
        })
        .then(function() {
            // Log activity to Firestore
            return db.collection('activity_logs').add({
                message: (currentUserData ? currentUserData.username : 'User') + ' deposited ' + formatCurrency(amount) + ' via ' + method,
                type: 'deposit',
                amount: amount,
                method: method,
                created_at: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .then(function() {
            // Add to live ticker
            addTickerMessage({
                icon: '💎',
                message: 'New deposit of',
                amount: amount,
                username: currentUserData ? currentUserData.username : 'User',
                time: 'Just now'
            });
            
            // Close modal and show success
            closeModal('deposit-modal');
            showToast('Deposit of ' + formatCurrency(amount) + ' submitted! Pending approval.', 'success');
            
            // Refresh wallet
            refreshWallet();
        })
        .catch(function(error) {
            console.error('Deposit error:', error);
            showErr(err, 'Failed to submit deposit. Please try again.');
        });
}


function approveTransaction(id) {
    if (!currentUserData || (currentUserData.role !== 'admin' && currentUserData.role !== 'superadmin')) {
        showToast('Huna ruhusa ya kufanya hili', 'error');
        return;
    }
    
    var txnRef = db.collection('transactions').doc(id);
    var transactionData = null;
    
    txnRef.get()
        .then(function(doc) {
            if (!doc.exists) {
                showToast('Muamala haukupatikana', 'error');
                throw new Error('notfound');
            }
            
            transactionData = doc.data();
            
            if (transactionData.status !== 'pending') {
                showToast('Muamala tayari umeshughulikiwa', 'warning');
                throw new Error('processed');
            }
            
            // Show confirmation dialog
            var confirmMsg = 'Idhinisha muamala huu?\n\n' +
                'Aina: ' + transactionData.type.toUpperCase() + '\n' +
                'Kiasi: ' + formatCurrency(transactionData.amount) + '\n' +
                'Mteja: ' + (transactionData.user_name || 'N/A') + '\n' +
                'Simu: ' + (transactionData.depositor_phone || transactionData.user_email || 'N/A') + '\n' +
                'Kumbukumbu: ' + (transactionData.transaction_reference || 'N/A');
            
            if (!confirm(confirmMsg)) {
                throw new Error('cancelled');
            }
            
            // Update transaction status to approved
            return txnRef.update({
                status: 'approved',
                processed_at: firebase.firestore.FieldValue.serverTimestamp(),
                processed_by: currentUser.uid
            });
        })
        .then(function() {
            // If deposit, credit wallet
            if (transactionData.type === 'deposit') {
                return db.collection('wallets').doc(transactionData.user_id).update({
                    current_balance: firebase.firestore.FieldValue.increment(transactionData.amount),
                    total_deposited: firebase.firestore.FieldValue.increment(transactionData.amount),
                    updated_at: firebase.firestore.FieldValue.serverTimestamp()
                }).then(function() {
                    // Check and process referral bonus for FIRST deposit
                    return processReferralBonus(transactionData);
                });
            }
            return Promise.resolve();
        })
        .then(function(bonusResult) {
            // Log activity
            var logMessage = 'Muamala umeidhinishwa na ' + currentUserData.username;
            if (bonusResult && bonusResult.bonusAwarded) {
                logMessage += ' | Bonasi ya ushirika: ' + formatCurrency(bonusResult.bonusAmount) + ' imetolewa';
            }
            
            return db.collection('activity_logs').add({
                message: logMessage,
                type: 'approval',
                amount: transactionData.amount,
                bonus_awarded: bonusResult ? bonusResult.bonusAwarded : false,
                created_at: firebase.firestore.FieldValue.serverTimestamp()
            }).catch(function(e) {
                console.warn('Log skipped:', e.message);
            });
        })
        .then(function() {
            // Add to ticker
            if (typeof addTickerMessage === 'function') {
                addTickerMessage({
                    icon: '✅',
                    message: 'Muamala umeidhinishwa',
                    amount: transactionData.amount,
                    time: 'Sasa hivi'
                });
            }
            
            showToast('✅ Muamala umeidhinishwa!', 'success');
            refreshPendingApprovals();
            refreshAdminDashboard();
        })
        .catch(function(error) {
            if (error.message === 'cancelled') return;
            if (error.message !== 'notfound' && error.message !== 'processed') {
                console.error('Approval error:', error);
                showToast('Imeshindwa kuidhinisha: ' + error.message, 'error');
            }
        });
}

// ===== PROCESS REFERRAL BONUS =====
function processReferralBonus(transactionData) {
    var userId = transactionData.user_id;
    var depositAmount = transactionData.amount;
    
    // Get user data to check referral
    return db.collection('users').doc(userId).get()
        .then(function(userDoc) {
            if (!userDoc.exists) {
                console.log('❌ User not found for referral check');
                return { bonusAwarded: false, reason: 'user_not_found' };
            }
            
            var userData = userDoc.data();
            
            // Check if user was referred and bonus hasn't been paid yet
            if (!userData.referredBy || !userData.referredByValid) {
                console.log('❌ User was not referred or referral invalid');
                return { bonusAwarded: false, reason: 'no_valid_referral' };
            }
            
            if (userData.referralBonusPaid) {
                console.log('❌ Referral bonus already paid');
                return { bonusAwarded: false, reason: 'already_paid' };
            }
            
            // Check if this is the FIRST deposit
            return db.collection('transactions')
                .where('user_id', '==', userId)
                .where('type', '==', 'deposit')
                .where('status', '==', 'approved')
                .get()
                .then(function(snap) {
                    // Count approved deposits (this one is already approved)
                    var approvedDeposits = snap.size;
                    
                    console.log('📊 Approved deposits count:', approvedDeposits);
                    
                    // Only award bonus on FIRST deposit
                    if (approvedDeposits > 1) {
                        console.log('❌ Not first deposit. Bonus skipped.');
                        // Mark as paid anyway to prevent future checks
                        return db.collection('users').doc(userId).update({
                            referralBonusPaid: true,
                            referralBonusSkipped: true,
                            referralBonusNote: 'Not first deposit. Had ' + approvedDeposits + ' deposits.'
                        }).then(function() {
                            return { bonusAwarded: false, reason: 'not_first_deposit' };
                        });
                    }
                    
                    // Find the referrer by referral code
                    return db.collection('users')
                        .where('referralCode', '==', userData.referredBy)
                        .get()
                        .then(function(referrerSnap) {
                            if (referrerSnap.empty) {
                                console.log('❌ Referrer not found');
                                return { bonusAwarded: false, reason: 'referrer_not_found' };
                            }
                            
                            var referrerDoc = referrerSnap.docs[0];
                            var referrerData = referrerDoc.data();
                            var referrerId = referrerDoc.id;
                            
                            // Calculate 10% bonus
                            var bonusAmount = Math.floor(depositAmount * 0.10);
                            
                            console.log('💰 Awarding referral bonus:');
                            console.log('   Referrer:', referrerData.username, '(' + referrerId + ')');
                            console.log('   New User:', userData.username, '(' + userId + ')');
                            console.log('   Deposit:', formatCurrency(depositAmount));
                            console.log('   Bonus (10%):', formatCurrency(bonusAmount));
                            
                            // Create referral bonus transaction
                            var bonusTransactionData = {
                                user_id: referrerId,
                                type: 'referral_bonus',
                                amount: bonusAmount,
                                status: 'approved',
                                description: 'Bonus ya ushirika (10%) kutoka kwa ' + (userData.username || 'mtumiaji mpya'),
                                referred_user_id: userId,
                                referred_user_name: userData.username || 'Mtumiaji',
                                referral_code: userData.referredBy,
                                deposit_amount: depositAmount,
                                deposit_transaction_id: transactionData.id || '',
                                created_at: firebase.firestore.FieldValue.serverTimestamp(),
                                processed_at: firebase.firestore.FieldValue.serverTimestamp()
                            };
                            
                            // Add bonus transaction
                            return db.collection('transactions').add(bonusTransactionData)
                                .then(function() {
                                    // Credit referrer's wallet
                                    return db.collection('wallets').doc(referrerId).update({
                                        current_balance: firebase.firestore.FieldValue.increment(bonusAmount),
                                        updated_at: firebase.firestore.FieldValue.serverTimestamp()
                                    });
                                })
                                .then(function() {
                                    // Mark referral bonus as paid
                                    return db.collection('users').doc(userId).update({
                                        referralBonusPaid: true,
                                        referralBonusAmount: bonusAmount,
                                        referralBonusPaidAt: firebase.firestore.FieldValue.serverTimestamp(),
                                        referrerId: referrerId
                                    });
                                })
                                .then(function() {
                                    // Log bonus activity
                                    return db.collection('activity_logs').add({
                                        message: '🎉 Bonasi ya ushirika ya ' + formatCurrency(bonusAmount) + ' imetolewa kwa ' + (referrerData.username || 'mshiriki') + ' kutoka kwa ' + (userData.username || 'mtumiaji mpya'),
                                        type: 'referral_bonus',
                                        amount: bonusAmount,
                                        referrer_id: referrerId,
                                        user_id: userId,
                                        created_at: firebase.firestore.FieldValue.serverTimestamp()
                                    }).catch(function(e) {
                                        console.warn('Bonus log skipped');
                                    });
                                })
                                .then(function() {
                                    // Add to ticker
                                    if (typeof addTickerMessage === 'function') {
                                        addTickerMessage({
                                            icon: '🤝',
                                            message: 'Bonasi ya ushirika imetolewa',
                                            amount: bonusAmount,
                                            username: referrerData.username || 'Mshiriki',
                                            time: 'Sasa hivi'
                                        });
                                    }
                                    
                                    console.log('✅ Referral bonus awarded successfully!');
                                    return {
                                        bonusAwarded: true,
                                        bonusAmount: bonusAmount,
                                        referrerId: referrerId,
                                        referrerName: referrerData.username
                                    };
                                });
                        });
                });
        })
        .catch(function(error) {
            console.error('❌ Referral bonus error:', error);
            return { bonusAwarded: false, reason: 'error', error: error.message };
        });
}

function rejectTransaction(id) {
    if (!currentUserData || (currentUserData.role !== 'admin' && currentUserData.role !== 'superadmin')) {
        showToast('Huna ruhusa ya kufanya hili', 'error');
        return;
    }
    
    var txnRef = db.collection('transactions').doc(id);
    var transactionData = null;
    
    txnRef.get()
        .then(function(doc) {
            if (!doc.exists) {
                showToast('Muamala haukupatikana', 'error');
                throw new Error('notfound');
            }
            
            transactionData = doc.data();
            
            if (transactionData.status !== 'pending') {
                showToast('Muamala tayari umeshughulikiwa', 'warning');
                throw new Error('processed');
            }
            
            if (!confirm('Unahakika unataka kukataa muamala huu?\n\nKiasi: ' + formatCurrency(transactionData.amount) + '\nMteja: ' + (transactionData.user_name || 'N/A'))) {
                throw new Error('cancelled');
            }
            
            // Update transaction status
            return txnRef.update({
                status: 'rejected',
                processed_at: firebase.firestore.FieldValue.serverTimestamp(),
                processed_by: currentUser.uid,
                rejection_reason: 'Imekataliwa na ' + currentUserData.username
            });
        })
        .then(function() {
            // If withdrawal, refund the amount
            if (transactionData.type === 'withdrawal') {
                return db.collection('wallets').doc(transactionData.user_id).update({
                    current_balance: firebase.firestore.FieldValue.increment(transactionData.amount),
                    updated_at: firebase.firestore.FieldValue.serverTimestamp()
                });
            }
            return Promise.resolve();
        })
        .then(function() {
            // Log activity
            return db.collection('activity_logs').add({
                message: 'Muamala ' + id.substring(0, 8) + ' umekataliwa na ' + currentUserData.username,
                type: 'rejection',
                created_at: firebase.firestore.FieldValue.serverTimestamp()
            }).catch(function(e) { console.warn('Log skipped'); });
        })
        .then(function() {
            if (typeof addTickerMessage === 'function') {
                addTickerMessage({
                    icon: '❌',
                    message: 'Muamala umekataliwa',
                    time: 'Sasa hivi'
                });
            }
            
            showToast('❌ Muamala umekataliwa', 'warning');
            refreshPendingApprovals();
            refreshAdminDashboard();
        })
        .catch(function(error) {
            if (error.message === 'cancelled') return;
            if (error.message !== 'notfound' && error.message !== 'processed') {
                console.error('Rejection error:', error);
                showToast('Imeshindwa kukataa: ' + error.message, 'error');
            }
        });
}

function updateSystemParams() {
    var config = {
        withdrawal_fee_percent: parseInt(document.getElementById('sys-withdrawal-fee').value) || 10,
        operating_hours_start: document.getElementById('sys-open-time').value,
        operating_hours_end: document.getElementById('sys-close-time').value,
        min_deposit: parseInt(document.getElementById('sys-min-deposit').value) || 7000,
        min_withdrawal: parseInt(document.getElementById('sys-min-withdrawal').value) || 2000,
        updated_at: firebase.firestore.FieldValue.serverTimestamp()
    };
    db.collection('system_config').doc('config').set(config)
    .then(function() { showToast('Settings saved!', 'success'); });
}

function refreshWallet() {
    if (!currentUser) return;
    
    // Get wallet balance
    db.collection('wallets').doc(currentUser.uid).get()
        .then(function(doc) {
            if (doc.exists) {
                var el = document.getElementById('wallet-balance');
                if (el) el.textContent = formatCurrency(doc.data().current_balance || 0);
            }
        })
        .catch(function(e) { console.warn('Wallet balance error:', e.message); });
    
    // Get recent transactions (without orderBy to avoid index)
    db.collection('transactions')
        .where('user_id', '==', currentUser.uid)
        .limit(10)
        .get()
        .then(function(snap) {
            var txns = [];
            snap.forEach(function(doc) {
                txns.push(doc.data());
            });
            
            // Sort manually
            txns.sort(function(a, b) {
                var da = a.created_at ? a.created_at.toDate().getTime() : 0;
                var db = b.created_at ? b.created_at.toDate().getTime() : 0;
                return db - da;
            });
            
            var html = '<table><thead><tr><th>Type</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead><tbody>';
            for (var i = 0; i < txns.length; i++) {
                var t = txns[i];
                var d = t.created_at ? t.created_at.toDate().toLocaleDateString() : '';
                html += '<tr><td>' + t.type + '</td><td>' + formatCurrency(t.amount) + '</td>' +
                    '<td><span class="badge badge-' + t.status + '">' + t.status + '</span></td><td>' + d + '</td></tr>';
            }
            html += '</tbody></table>';
            
            var el = document.getElementById('wallet-transactions');
            if (el) el.innerHTML = html || '<p style="color:var(--text-secondary);">No transactions</p>';
        })
        .catch(function(e) {
            console.warn('Wallet transactions error:', e.message);
            var el = document.getElementById('wallet-transactions');
            if (el) el.innerHTML = '<p style="color:var(--text-secondary);">Unable to load transactions</p>';
        });
}

// ===== REAL-TIME INVESTMENT TRACKING =====
var investmentIntervals = {};
var realtimeEarningsInterval = null;

function refreshInvestments() {
    if (!currentUser) return;
    
    // Clear existing intervals
    clearAllInvestmentIntervals();
    
    db.collection('investments')
        .where('user_id', '==', currentUser.uid)
        .where('status', '==', 'active')
        .get()
        .then(function(snap) {
            var investments = [];
            snap.forEach(function(doc) {
                investments.push({ id: doc.id, data: doc.data() });
            });
            
            // Update summary
            updateInvestmentSummary(investments);
            
            // Render investment cards
            renderInvestmentCards(investments);
            
            // Start real-time tracking
            startRealtimeTracking(investments);
        })
        .catch(function(e) {
            console.warn('Investments load error:', e.message);
            var el = document.getElementById('active-investments-list');
            if (el) el.innerHTML = '<p style="color:var(--danger);text-align:center;">Imeshindwa kupakia</p>';
        });
}

function updateInvestmentSummary(investments) {
    var totalInvested = 0;
    var totalEarned = 0;
    var activeCount = investments.length;
    
    for (var i = 0; i < investments.length; i++) {
        var inv = investments[i].data;
        totalInvested += inv.amount || 0;
        
        // Calculate earnings based on elapsed time
        var earnings = calculateCurrentEarnings(inv);
        totalEarned += earnings;
    }
    
    var el1 = document.getElementById('inv-total-invested');
    var el2 = document.getElementById('inv-total-earned');
    var el3 = document.getElementById('inv-active-count');
    
    if (el1) el1.textContent = formatCurrency(totalInvested);
    if (el2) el2.textContent = formatCurrency(totalEarned);
    if (el3) el3.textContent = activeCount;
}

function calculateCurrentEarnings(investment) {
    var startDate = investment.start_date ? investment.start_date.toDate() : new Date();
    var now = new Date();
    var elapsedMs = now - startDate;
    var elapsedDays = elapsedMs / (1000 * 60 * 60 * 24);
    
    // Calculate earnings
    var dailyIncome = investment.daily_income || 0;
    var totalPossibleEarnings = dailyIncome * Math.min(elapsedDays, investment.validity_days || 47);
    
    return Math.floor(totalPossibleEarnings);
}

function renderInvestmentCards(investments) {
    var container = document.getElementById('active-investments-list');
    if (!container) return;
    
    if (investments.length === 0) {
        container.innerHTML =
            '<div style="text-align:center;padding:3rem 1rem;">' +
            '<div style="font-size:4rem;margin-bottom:1rem;"><i class="fas fa-solar-panel"></i></div>' +
            '<h3 style="color:var(--text-secondary);margin-bottom:0.5rem;">Hakuna Uwekezaji Hai</h3>' +
            '<p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:1.5rem;">' +
            'Bado hujafanya uwekezaji wowote. Anza sasa upate mapato ya kila siku!</p>' +
            '<button class="btn btn-primary" onclick="navigateTo(\'packages\')">' +
            '<i class="fas fa-solar-panel"></i> Angalia Vifurushi</button>' +
            '</div>';
        return;
    }
    
    var html = '';
    for (var i = 0; i < investments.length; i++) {
        var inv = investments[i];
        var data = inv.data;
        var pkg = findPackageByName(data.package_name);
        
        html += buildInvestmentCard(inv.id, data, pkg);
    }
    
    container.innerHTML = html;
}

function findPackageByName(name) {
    for (var i = 0; i < investmentPackages.length; i++) {
        if (investmentPackages[i].name === name) return investmentPackages[i];
    }
    return null;
}

function buildInvestmentCard(id, data, pkg) {
    var startDate = data.start_date ? data.start_date.toDate() : new Date();
    var now = new Date();
    var endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + (data.validity_days || 47));
    
    var totalMs = endDate - startDate;
    var elapsedMs = now - startDate;
    var progressPercent = Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100));
    var daysRemaining = Math.max(0, Math.ceil((endDate - now) / (1000 * 60 * 60 * 24)));
    
    var dailyIncome = data.daily_income || 0;
    var totalExpected = data.total_income || (dailyIncome * (data.validity_days || 47));
    
    // Package image
    var imageHtml = '';
    if (pkg && pkg.image) {
        imageHtml = '<img src="' + pkg.image + '" alt="' + data.package_name + '" ' +
            'onerror="this.style.display=\'none\';this.parentNode.innerHTML=\'<i class=\\\'fas ' + (pkg.icon || 'fa-solar-panel') + '\\\' style=\\\'font-size:2rem;color:' + (pkg.color || '#00e676') + ';\\\'></i>\';">';
    } else {
        imageHtml = '<i class="fas fa-solar-panel" style="font-size:2rem;color:#00e676;"></i>';
    }
    
    var color = pkg ? pkg.color : '#00e676';
    var icon = pkg ? pkg.icon : 'fa-solar-panel';
    
    return '<div class="investment-card" id="investment-' + id + '">' +
        // Header
        '<div class="investment-card-header">' +
        '<div class="investment-image">' + imageHtml + '</div>' +
        '<div class="investment-header-info">' +
        '<h4><i class="fas ' + icon + '" style="color:' + color + ';"></i> ' + data.package_name + '</h4>' +
        '<div class="package-level">' + (pkg ? pkg.level : '') + '</div>' +
        '</div>' +
        '<span class="investment-status-badge status-active">' +
        '<i class="fas fa-circle"></i> Hai' +
        '</span>' +
        '</div>' +
        
        // Body
        '<div class="investment-card-body">' +
        '<div class="investment-details-grid">' +
        '<div class="investment-detail-item">' +
        '<span class="detail-label"><i class="fas fa-money-bill-wave"></i> Kiasi</span>' +
        '<span class="detail-value">' + formatCurrency(data.amount) + '</span>' +
        '</div>' +
        '<div class="investment-detail-item">' +
        '<span class="detail-label"><i class="fas fa-calendar-check"></i> Kila Siku</span>' +
        '<span class="detail-value earning">' + formatCurrency(dailyIncome) + '</span>' +
        '</div>' +
        '<div class="investment-detail-item">' +
        '<span class="detail-label"><i class="fas fa-trophy"></i> Jumla Tarajiwa</span>' +
        '<span class="detail-value">' + formatCurrency(totalExpected) + '</span>' +
        '</div>' +
        '<div class="investment-detail-item">' +
        '<span class="detail-label"><i class="fas fa-clock"></i> Mapato Sasa</span>' +
        '<span class="detail-value earning realtime-counter" id="earning-' + id + '">TZS 0</span>' +
        '</div>' +
        '</div>' +
        
        // Progress bar
        '<div class="investment-progress-section">' +
        '<div class="progress-info">' +
        '<span>📅 ' + startDate.toLocaleDateString() + '</span>' +
        '<span id="progress-percent-' + id + '">' + progressPercent.toFixed(1) + '%</span>' +
        '<span>📅 ' + endDate.toLocaleDateString() + '</span>' +
        '</div>' +
        '<div class="progress-bar-large">' +
        '<div class="progress-fill-large" id="progress-fill-' + id + '" ' +
        'style="width:' + progressPercent + '%;background:' + color + ';"></div>' +
        '</div>' +
        '</div>' +
        
        // Days remaining
        '<div class="days-remaining">' +
        '<div class="days-number" id="days-remaining-' + id + '">' + daysRemaining + '</div>' +
        '<div class="days-label">Siku Zilizobaki</div>' +
        '</div>' +
        '</div>' +
        '</div>';
}

// ===== REAL-TIME EARNINGS TRACKING =====
function startRealtimeTracking(investments) {
    // Update every 100ms for smooth counting
    if (realtimeEarningsInterval) {
        clearInterval(realtimeEarningsInterval);
    }
    
    realtimeEarningsInterval = setInterval(function() {
        var totalRealtimeEarnings = 0;
        
        for (var i = 0; i < investments.length; i++) {
            var inv = investments[i];
            var data = inv.data;
            var id = inv.id;
            
            var startDate = data.start_date ? data.start_date.toDate() : new Date();
            var now = new Date();
            var elapsedMs = now - startDate;
            var elapsedDays = elapsedMs / (1000 * 60 * 60 * 24);
            
            // Calculate precise earnings
            var dailyIncome = data.daily_income || 0;
            var earningsPerMs = dailyIncome / (24 * 60 * 60 * 1000); // Per millisecond
            var preciseEarnings = earningsPerMs * elapsedMs;
            var cappedEarnings = Math.min(preciseEarnings, data.total_income || Infinity);
            var displayEarnings = Math.floor(cappedEarnings);
            
            totalRealtimeEarnings += displayEarnings;
            
            // Update individual earning display
            var earningEl = document.getElementById('earning-' + id);
            if (earningEl) {
                earningEl.textContent = formatCurrency(displayEarnings);
            }
            
            // Update progress
            var endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + (data.validity_days || 47));
            var totalMs = endDate - startDate;
            var progressPercent = Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100));
            
            var progressFill = document.getElementById('progress-fill-' + id);
            var progressPercentEl = document.getElementById('progress-percent-' + id);
            
            if (progressFill) {
                progressFill.style.width = progressPercent + '%';
            }
            if (progressPercentEl) {
                progressPercentEl.textContent = progressPercent.toFixed(2) + '%';
            }
            
            // Update days remaining
            var daysRemaining = Math.max(0, Math.ceil((endDate - now) / (1000 * 60 * 60 * 24)));
            var daysRemainingEl = document.getElementById('days-remaining-' + id);
            if (daysRemainingEl) {
                daysRemainingEl.textContent = daysRemaining;
            }
        }
        
        // Update real-time earnings ticker
        var realtimeEl = document.getElementById('inv-realtime-earnings');
        if (realtimeEl) {
            realtimeEl.textContent = formatCurrency(totalRealtimeEarnings);
        }
        
        // Update total earned in summary
        var totalEarnedEl = document.getElementById('inv-total-earned');
        if (totalEarnedEl) {
            totalEarnedEl.textContent = formatCurrency(totalRealtimeEarnings);
        }
    }, 100); // Update every 100 milliseconds
}

function clearAllInvestmentIntervals() {
    if (realtimeEarningsInterval) {
        clearInterval(realtimeEarningsInterval);
        realtimeEarningsInterval = null;
    }
}

// Clean up when leaving page
window.addEventListener('beforeunload', function() {
    clearAllInvestmentIntervals();
});

function refreshTransactions() {
    if (!currentUser) return;
    var fType = document.getElementById('txn-filter-type') ? document.getElementById('txn-filter-type').value : 'all';
    db.collection('transactions').where('user_id', '==', currentUser.uid).get()
    .then(function(snap) {
        var txns = [];
        snap.forEach(function(doc) { txns.push({ id: doc.id, data: doc.data() }); });
        txns.sort(function(a, b) {
            return (b.data.created_at ? b.data.created_at.toDate() : new Date(0)) - 
                   (a.data.created_at ? a.data.created_at.toDate() : new Date(0));
        });
        var html = '<table><thead><tr><th>Type</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead><tbody>';
        for (var i = 0; i < txns.length; i++) {
            var t = txns[i].data;
            if (fType !== 'all' && t.type !== fType) continue;
            html += '<tr><td>' + t.type + '</td><td>' + formatCurrency(t.amount) + '</td>' +
                '<td><span class="badge badge-' + t.status + '">' + t.status + '</span></td>' +
                '<td>' + (t.created_at ? t.created_at.toDate().toLocaleDateString() : '') + '</td></tr>';
        }
        html += '</tbody></table>';
        document.getElementById('all-user-transactions').innerHTML = html;
    });
}

function refreshReferral() {
    if (!currentUserData) return;
    document.getElementById('referral-code').textContent = currentUserData.referralCode || '---';
    document.getElementById('referral-earnings').textContent = formatCurrency(0);
}

function copyReferralCode() {
    if (!currentUserData || !currentUserData.referralCode) return;
    navigator.clipboard.writeText(currentUserData.referralCode)
    .then(function() { showToast('Referral code copied!', 'success'); });
}

function refreshPendingApprovals() {
    var el = document.getElementById('pending-approvals-list');
    if (!el) return;
    
    el.innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:1rem;">' +
        '<span class="loading-spinner"></span> Inapakia maombi...</p>';
    
    db.collection('transactions')
        .where('status', '==', 'pending')
        .limit(50)
        .get()
        .then(function(snap) {
            var pendingTxns = [];
            snap.forEach(function(doc) {
                pendingTxns.push({ id: doc.id, data: doc.data() });
            });
            
            // Sort manually by date descending
            pendingTxns.sort(function(a, b) {
                var da = a.data.created_at ? a.data.created_at.toDate().getTime() : 0;
                var db = b.data.created_at ? b.data.created_at.toDate().getTime() : 0;
                return db - da;
            });
            
            if (pendingTxns.length === 0) {
                el.innerHTML = '<div style="text-align:center;padding:2rem;">' +
                    '<p style="font-size:3rem;">✅</p>' +
                    '<p style="color:var(--text-secondary);">Hakuna maombi yanayosubiri</p>' +
                    '<p style="color:var(--text-secondary);font-size:0.85rem;">Maombi yote yameshughulikiwa</p>' +
                    '</div>';
                return;
            }
            
            var html = '<p style="color:var(--text-secondary);margin-bottom:1rem;">' +
                'Jumla: <strong>' + pendingTxns.length + '</strong> maombi yanasubiri</p>';
            
            for (var i = 0; i < pendingTxns.length; i++) {
                var t = pendingTxns[i].data;
                var d = t.created_at ? t.created_at.toDate() : new Date();
                var isDeposit = t.type === 'deposit';
                var isWithdrawal = t.type === 'withdrawal';
                
                // Determine card color
                var cardBorder = isDeposit ? 'var(--accent-solar)' : 'var(--accent-warning)';
                var cardBg = isDeposit ? 'rgba(0,230,118,0.03)' : 'rgba(255,167,38,0.03)';
                var typeLabel = isDeposit ? 'AMANA (DEPOSIT)' : 'UTOLEWAJI (WITHDRAWAL)';
                var typeColor = isDeposit ? 'var(--accent-solar)' : 'var(--accent-warning)';
                
                html += '<div style="border:1px solid ' + cardBorder + ';background:' + cardBg + ';border-radius:12px;padding:1.2rem;margin-bottom:1rem;">';
                
                // Header
                html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.8rem;">' +
                    '<span style="font-weight:700;color:' + typeColor + ';font-size:0.85rem;">' + typeLabel + '</span>' +
                    '<span style="font-size:1.3rem;font-weight:700;color:var(--accent-solar);">' + formatCurrency(t.amount) + '</span>' +
                    '</div>';
                
                // User Info
                html += '<div style="background:var(--bg-card);border-radius:8px;padding:0.8rem;margin-bottom:0.8rem;">' +
                    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;font-size:0.85rem;">' +
                    '<div><span style="color:var(--text-secondary);">👤 Jina:</span><br><strong>' + escapeHtml(t.user_name || 'Haijulikani') + '</strong></div>' +
                    '<div><span style="color:var(--text-secondary);">📧 Barua pepe:</span><br><strong>' + escapeHtml(t.user_email || 'Haijulikani') + '</strong></div>';
                
                // Deposit specific details
                if (isDeposit) {
                    html += '<div><span style="color:var(--text-secondary);">📱 Simu ya Mwekaji:</span><br><strong style="color:var(--accent-info);">' + escapeHtml(t.depositor_phone || 'Haijawekwa') + '</strong></div>' +
                        '<div><span style="color:var(--text-secondary);">👤 Jina la Mwekaji:</span><br><strong>' + escapeHtml(t.depositor_name || 'Haijawekwa') + '</strong></div>' +
                        '<div><span style="color:var(--text-secondary);">🏦 Njia ya Malipo:</span><br><strong>' + escapeHtml(t.bank_name || t.payment_method || 'Haijawekwa') + '</strong></div>' +
                        '<div><span style="color:var(--text-secondary);">🔢 Namba ya Akaunti:</span><br><strong style="color:var(--accent-solar);">' + escapeHtml(t.bank_account || 'Haijawekwa') + '</strong></div>';
                }
                
                // Withdrawal specific details
                if (isWithdrawal) {
                    html += '<div><span style="color:var(--text-secondary);">🏦 Njia ya Utoaji:</span><br><strong>' + escapeHtml(t.payment_method || 'Haijawekwa') + '</strong></div>' +
                        '<div><span style="color:var(--text-secondary);">🔢 Namba ya Akaunti:</span><br><strong style="color:var(--accent-solar);">' + escapeHtml(t.account_details || 'Haijawekwa') + '</strong></div>' +
                        '<div><span style="color:var(--text-secondary);">👤 Jina la Akaunti:</span><br><strong>' + escapeHtml(t.account_name || 'Haijawekwa') + '</strong></div>' +
                        '<div><span style="color:var(--text-secondary);">💰 Ada (10%):</span><br><strong style="color:var(--danger);">' + formatCurrency(t.fee || 0) + '</strong></div>';
                }
                
                html += '</div></div>';
                
                // Transaction Reference
                html += '<div style="background:rgba(33,150,243,0.05);border:1px solid var(--accent-info);border-radius:8px;padding:0.8rem;margin-bottom:0.8rem;">' +
                    '<div style="font-size:0.85rem;">' +
                    '<span style="color:var(--text-secondary);">🔢 Kumbukumbu ya Muamala:</span><br>' +
                    '<strong style="font-size:1rem;color:var(--accent-info);">' + escapeHtml(t.transaction_reference || 'Haijawekwa') + '</strong>' +
                    '</div></div>';
                
                // Date
                html += '<div style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:0.8rem;">' +
                    '📅 Tarehe: ' + d.toLocaleString('sw-TZ', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    }) +
                    '</div>';
                
                // Action Buttons
                html += '<div style="display:flex;gap:0.5rem;">' +
                    '<button class="btn btn-primary" onclick="approveTransaction(\'' + pendingTxns[i].id + '\')" style="flex:1;padding:0.7rem;">' +
                    '✅ Idhinisha (Approve)</button>' +
                    '<button class="btn btn-danger" onclick="rejectTransaction(\'' + pendingTxns[i].id + '\')" style="flex:1;padding:0.7rem;">' +
                    '❌ Kataa (Reject)</button>' +
                    '</div>';
                
                html += '</div>';
            }
            
            el.innerHTML = html;
        })
        .catch(function(e) {
            console.warn('Pending approvals error:', e.message);
            el.innerHTML = '<p style="color:var(--danger);text-align:center;padding:1rem;">' +
                '⚠️ Imeshindwa kupakia. Tafadhali jaribu tena.<br><small>' + e.message + '</small></p>';
        });
}

function refreshAdminTransactions() {
    var fType = document.getElementById('admin-filter-type') ? document.getElementById('admin-filter-type').value : 'all';
    var fStatus = document.getElementById('admin-filter-status') ? document.getElementById('admin-filter-status').value : 'all';
    
    // Simple query without orderBy
    db.collection('transactions')
        .limit(100)
        .get()
        .then(function(snap) {
            var allTxns = [];
            snap.forEach(function(doc) {
                allTxns.push({ id: doc.id, data: doc.data() });
            });
            
            // Sort manually
            allTxns.sort(function(a, b) {
                var da = a.data.created_at ? a.data.created_at.toDate().getTime() : 0;
                var db = b.data.created_at ? b.data.created_at.toDate().getTime() : 0;
                return db - da;
            });
            
            var html = '<table><thead><tr><th>ID</th><th>User</th><th>Type</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead><tbody>';
            for (var i = 0; i < allTxns.length; i++) {
                var t = allTxns[i].data;
                
                // Apply filters
                if (fType !== 'all' && t.type !== fType) continue;
                if (fStatus !== 'all' && t.status !== fStatus) continue;
                
                var d = t.created_at ? t.created_at.toDate().toLocaleDateString() : '';
                html += '<tr>' +
                    '<td>' + allTxns[i].id.substring(0, 8) + '</td>' +
                    '<td>' + (t.user_name || 'N/A') + '</td>' +
                    '<td>' + t.type + '</td>' +
                    '<td>' + formatCurrency(t.amount) + '</td>' +
                    '<td><span class="badge badge-' + t.status + '">' + t.status + '</span></td>' +
                    '<td>' + d + '</td></tr>';
            }
            html += '</tbody></table>';
            
            var el = document.getElementById('admin-all-transactions');
            if (el) el.innerHTML = html || '<p style="color:var(--text-secondary);">No transactions found</p>';
        })
        .catch(function(e) {
            console.warn('Admin transactions error:', e.message);
        });
}

// ===== USER MANAGEMENT FUNCTIONS =====

// Refresh user management page
function refreshUserManagement() {
    var container = document.getElementById('user-management-table');
    if (!container) return;
    
    var searchTerm = document.getElementById('um-search') ? document.getElementById('um-search').value.trim().toLowerCase() : '';
    var filterRole = document.getElementById('um-filter-role') ? document.getElementById('um-filter-role').value : 'all';
    var filterStatus = document.getElementById('um-filter-status') ? document.getElementById('um-filter-status').value : 'all';
    
    container.innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:2rem;">' +
        '<i class="fas fa-spinner fa-spin"></i> Inapakia wateja...</p>';
    
    db.collection('users').get()
    .then(function(snap) {
        var users = [];
        snap.forEach(function(doc) {
            users.push({ id: doc.id, data: doc.data() });
        });
        
        // Get wallet balances
        var walletPromises = [];
        for (var i = 0; i < users.length; i++) {
            walletPromises.push(
                db.collection('wallets').doc(users[i].id).get()
                .then(function(walletDoc) {
                    return walletDoc.exists ? (walletDoc.data().current_balance || 0) : 0;
                })
                .catch(function() { return 0; })
            );
        }
        
        return Promise.all(walletPromises).then(function(balances) {
            for (var j = 0; j < users.length; j++) {
                users[j].balance = balances[j] || 0;
                users[j].status = users[j].data.status || 'active';
            }
            return users;
        });
    })
    .then(function(users) {
        // Apply filters
        var filteredUsers = users;
        
        if (searchTerm) {
            filteredUsers = filteredUsers.filter(function(u) {
                var username = (u.data.username || '').toLowerCase();
                var email = (u.data.email || '').toLowerCase();
                var phone = (u.data.phone || '').toLowerCase();
                return username.indexOf(searchTerm) !== -1 || 
                       email.indexOf(searchTerm) !== -1 || 
                       phone.indexOf(searchTerm) !== -1;
            });
        }
        
        if (filterRole !== 'all') {
            filteredUsers = filteredUsers.filter(function(u) {
                return u.data.role === filterRole;
            });
        }
        
        if (filterStatus !== 'all') {
            filteredUsers = filteredUsers.filter(function(u) {
                return u.status === filterStatus;
            });
        }
        
        // Update stats
        var activeUsers = users.filter(function(u) { return u.status === 'active'; });
        var inactiveUsers = users.filter(function(u) { return u.status === 'inactive'; });
        
        document.getElementById('um-total-users').textContent = users.length;
        document.getElementById('um-active-users').textContent = activeUsers.length;
        document.getElementById('um-inactive-users').textContent = inactiveUsers.length;
        
        // Render table
        if (filteredUsers.length === 0) {
            container.innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:2rem;">' +
                'Hakuna wateja waliopatikana.</p>';
            return;
        }
        
        var html = '<table style="width:100%;font-size:0.85rem;min-width:900px;">' +
            '<thead><tr>' +
            '<th>#</th>' +
            '<th>Jina</th>' +
            '<th>Barua Pepe</th>' +
            '<th>Simu</th>' +
            '<th>Wadhifa</th>' +
            '<th>Salio</th>' +
            '<th>Hali</th>' +
            '<th>Vitendo</th>' +
            '</tr></thead><tbody>';
        
        for (var i = 0; i < filteredUsers.length; i++) {
            var u = filteredUsers[i];
            var data = u.data;
            var status = u.status;
            var statusBadge = status === 'active' ? 
                '<span class="badge badge-approved">Hai</span>' : 
                '<span class="badge badge-rejected">Imezuiliwa</span>';
            
            var roleBadge = '';
            if (data.role === 'superadmin') roleBadge = '<span style="color:#ffd700;">👑 Mkuu</span>';
            else if (data.role === 'admin') roleBadge = '<span style="color:var(--accent-info);">🛡️ Msimamizi</span>';
            else roleBadge = '<span style="color:var(--text-secondary);">👤 Mwekezaji</span>';
            
            html += '<tr>' +
                '<td>' + (i + 1) + '</td>' +
                '<td><strong>@' + escapeHtml(data.username || 'N/A') + '</strong></td>' +
                '<td style="font-size:0.8rem;">' + escapeHtml(data.email || 'N/A') + '</td>' +
                '<td>' + escapeHtml(data.phone || '-') + '</td>' +
                '<td>' + roleBadge + '</td>' +
                '<td style="font-weight:600;color:var(--accent-solar);">' + formatCurrency(u.balance) + '</td>' +
                '<td>' + statusBadge + '</td>' +
                '<td>' +
                    '<div style="display:flex;gap:0.2rem;flex-wrap:wrap;">' +
                        '<button class="btn btn-info btn-sm" onclick="viewUserDetails(\'' + u.id + '\')" title="Angalia">' +
                            '<i class="fas fa-eye"></i></button>' +
                        '<button class="btn btn-primary btn-sm" onclick="editUserDetails(\'' + u.id + '\')" title="Hariri">' +
                            '<i class="fas fa-edit"></i></button>' +
                        '<button class="btn btn-success btn-sm" onclick="showAddBalanceModal(\'' + u.id + '\')" title="Ongeza Salio" style="background:#9b59b6;border-color:#9b59b6;">' +
                            '<i class="fas fa-coins"></i></button>' +
                        (status === 'active' ? 
                            '<button class="btn btn-warning btn-sm" onclick="toggleUserStatus(\'' + u.id + '\', \'inactive\')" title="Zima">' +
                                '<i class="fas fa-toggle-off"></i></button>' :
                            '<button class="btn btn-success btn-sm" onclick="toggleUserStatus(\'' + u.id + '\', \'active\')" title="Washa" style="background:var(--accent-solar);border-color:var(--accent-solar);color:#0d1117;">' +
                                '<i class="fas fa-toggle-on"></i></button>'
                        ) +
                    '</div>' +
                '</td>' +
                '</tr>';
        }
        
        html += '</tbody></table>';
        container.innerHTML = html;
    })
    .catch(function(e) {
        console.error('User management error:', e);
        container.innerHTML = '<p style="color:var(--danger);text-align:center;padding:2rem;">' +
            'Imeshindwa kupakia: ' + e.message + '</p>';
    });
}

// View user details
function viewUserDetails(userId) {
    db.collection('users').doc(userId).get()
    .then(function(userDoc) {
        if (!userDoc.exists) {
            showToast('Mteja hajapatikana', 'error');
            return;
        }
        
        var user = userDoc.data();
        
        return db.collection('wallets').doc(userId).get()
        .then(function(walletDoc) {
            var wallet = walletDoc.exists ? walletDoc.data() : {};
            
            // Get transaction count
            return db.collection('transactions')
                .where('user_id', '==', userId)
                .get()
            .then(function(txnSnap) {
                var deposits = 0, withdrawals = 0, investments = 0;
                txnSnap.forEach(function(doc) {
                    var t = doc.data();
                    if (t.type === 'deposit' && t.status === 'approved') deposits += t.amount;
                    if (t.type === 'withdrawal' && t.status === 'approved') withdrawals += t.amount;
                });
                
                return db.collection('investments')
                    .where('user_id', '==', userId)
                    .where('status', '==', 'active')
                    .get()
                .then(function(invSnap) {
                    invSnap.forEach(function(doc) {
                        investments++;
                    });
                    
                    var date = user.createdAt ? (user.createdAt.toDate ? user.createdAt.toDate() : new Date(user.createdAt)) : new Date();
                    
                    var html = '<div class="card" style="margin-bottom:1rem;">' +
                        '<table style="width:100%;font-size:0.9rem;">' +
                        '<tr><td style="color:var(--text-secondary);padding:0.5rem 0;">👤 Jina:</td><td><strong>@' + escapeHtml(user.username || 'N/A') + '</strong></td></tr>' +
                        '<tr><td style="color:var(--text-secondary);padding:0.5rem 0;">📧 Barua Pepe:</td><td>' + escapeHtml(user.email || 'N/A') + '</td></tr>' +
                        '<tr><td style="color:var(--text-secondary);padding:0.5rem 0;">📱 Simu:</td><td>' + escapeHtml(user.phone || '-') + '</td></tr>' +
                        '<tr><td style="color:var(--text-secondary);padding:0.5rem 0;">🛡️ Wadhifa:</td><td>' + (user.role || 'user') + '</td></tr>' +
                        '<tr><td style="color:var(--text-secondary);padding:0.5rem 0;">🔑 Ushirika:</td><td style="color:var(--accent-solar);">' + escapeHtml(user.referralCode || '-') + '</td></tr>' +
                        '<tr><td style="color:var(--text-secondary);padding:0.5rem 0;">📅 Alijiunga:</td><td>' + date.toLocaleDateString('sw-TZ', { year: 'numeric', month: 'long', day: 'numeric' }) + '</td></tr>' +
                        '</table></div>' +
                        '<div class="grid-2" style="margin-bottom:1rem;">' +
                        '<div class="card metric-card"><div class="metric-label">💰 Salio</div><div class="metric-value" style="color:var(--accent-solar);">' + formatCurrency(wallet.current_balance || 0) + '</div></div>' +
                        '<div class="card metric-card"><div class="metric-label">📥 Amana</div><div class="metric-value">' + formatCurrency(deposits) + '</div></div>' +
                        '<div class="card metric-card"><div class="metric-label">📤 Utoaji</div><div class="metric-value">' + formatCurrency(withdrawals) + '</div></div>' +
                        '<div class="card metric-card"><div class="metric-label">📊 Uwekezaji</div><div class="metric-value" style="color:var(--accent-info);">' + investments + '</div></div>' +
                        '</div>';
                    
                    document.getElementById('view-user-content').innerHTML = html;
                    openModal('view-user-modal');
                });
            });
        });
    })
    .catch(function(e) {
        showToast('Error: ' + e.message, 'error');
    });
}

// Edit user details
function editUserDetails(userId) {
    db.collection('users').doc(userId).get()
    .then(function(doc) {
        if (!doc.exists) {
            showToast('Mteja hajapatikana', 'error');
            return;
        }
        
        var user = doc.data();
        
        document.getElementById('edit-user-id').value = userId;
        document.getElementById('edit-user-username').value = user.username || '';
        document.getElementById('edit-user-email').value = user.email || '';
        document.getElementById('edit-user-phone').value = user.phone || '';
        document.getElementById('edit-user-role').value = user.role || 'user';
        document.getElementById('edit-user-status').value = user.status || 'active';
        document.getElementById('edit-user-error').style.display = 'none';
        
        openModal('edit-user-modal');
    })
    .catch(function(e) {
        showToast('Error: ' + e.message, 'error');
    });
}

// Save user edit
function saveUserEdit(event) {
    event.preventDefault();
    
    var userId = document.getElementById('edit-user-id').value;
    var username = document.getElementById('edit-user-username').value.trim();
    var email = document.getElementById('edit-user-email').value.trim();
    var phone = document.getElementById('edit-user-phone').value.trim();
    var role = document.getElementById('edit-user-role').value;
    var status = document.getElementById('edit-user-status').value;
    var err = document.getElementById('edit-user-error');
    
    if (err) err.style.display = 'none';
    
    if (!username || !email) {
        if (err) { err.textContent = 'Jina na barua pepe vinahitajika'; err.style.display = 'block'; }
        return;
    }
    
    db.collection('users').doc(userId).update({
        username: username,
        email: email,
        phone: phone,
        role: role,
        status: status,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function() {
        closeModal('edit-user-modal');
        showToast('Taarifa za mteja zimesasishwa!', 'success');
        refreshUserManagement();
    })
    .catch(function(e) {
        if (err) { err.textContent = 'Error: ' + e.message; err.style.display = 'block'; }
    });
}

// Toggle user status
function toggleUserStatus(userId, newStatus) {
    var action = newStatus === 'active' ? 'kuwashwa' : 'kuzimwa';
    
    if (!confirm('Unahakika unataka ' + action + ' mteja huyu?')) return;
    
    db.collection('users').doc(userId).update({
        status: newStatus,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function() {
        showToast('Mteja ame' + action + '!', 'success');
        refreshUserManagement();
    })
    .catch(function(e) {
        showToast('Error: ' + e.message, 'error');
    });
}

// Show add balance modal
function showAddBalanceModal(userId) {
    db.collection('users').doc(userId).get()
    .then(function(doc) {
        if (!doc.exists) {
            showToast('Mteja hajapatikana', 'error');
            return;
        }
        
        var user = doc.data();
        
        document.getElementById('add-balance-user-id').value = userId;
        document.getElementById('add-balance-user-info').innerHTML = 
            '<div style="background:rgba(0,230,118,0.05);padding:0.8rem;border-radius:8px;border:1px solid var(--accent-solar);">' +
            '<strong>@' + escapeHtml(user.username || 'N/A') + '</strong><br>' +
            '<span style="font-size:0.85rem;color:var(--text-secondary);">' + escapeHtml(user.email || '') + '</span>' +
            '</div>';
        
        document.getElementById('add-balance-form').reset();
        document.getElementById('add-balance-error').style.display = 'none';
        document.getElementById('add-balance-success').style.display = 'none';
        document.getElementById('add-balance-submit-btn').disabled = false;
        document.getElementById('add-balance-submit-btn').innerHTML = '<i class="fas fa-plus-circle"></i> Ongeza Salio';
        
        openModal('add-balance-modal');
    });
}

// Update balance description based on type
function updateBalanceDescription() {
    var type = document.getElementById('add-balance-type').value;
    var descField = document.getElementById('add-balance-description');
    
    var descriptions = {
        'bonus': 'Bonasi kwa mteja - ',
        'award': 'Tuzo kwa uwekezaji bora - ',
        'lunch': 'Posho ya chakula cha mchana - ',
        'dinner': 'Posho ya chakula cha jioni - ',
        'breakfast': 'Posho ya kifungua kinywa - ',
        'referral_bonus': 'Bonasi ya ushirika - ',
        'refund': 'Marejesho ya malipo - ',
        'other': ''
    };
    
    if (descField && descriptions[type]) {
        descField.value = descriptions[type];
    }
}

// Add balance to user
function addUserBalance(event) {
    event.preventDefault();
    
    var userId = document.getElementById('add-balance-user-id').value;
    var type = document.getElementById('add-balance-type').value;
    var amount = parseInt(document.getElementById('add-balance-amount').value);
    var description = document.getElementById('add-balance-description').value.trim();
    var err = document.getElementById('add-balance-error');
    var success = document.getElementById('add-balance-success');
    var submitBtn = document.getElementById('add-balance-submit-btn');
    
    if (err) err.style.display = 'none';
    if (success) success.style.display = 'none';
    
    if (!type) {
        if (err) { err.textContent = 'Chagua aina ya ongezo'; err.style.display = 'block'; }
        return;
    }
    if (!amount || amount < 1) {
        if (err) { err.textContent = 'Weka kiasi sahihi'; err.style.display = 'block'; }
        return;
    }
    
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Inaongeza...';
    }
    
    // Get user info
    db.collection('users').doc(userId).get()
    .then(function(userDoc) {
        if (!userDoc.exists) throw new Error('User not found');
        
        var user = userDoc.data();
        
        // Create transaction record
        return db.collection('transactions').add({
            user_id: userId,
            type: type,
            amount: amount,
            status: 'approved',
            description: description,
            user_name: user.username || user.email,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
            processed_at: firebase.firestore.FieldValue.serverTimestamp(),
            processed_by: currentUser.uid,
            processed_by_name: currentUserData ? currentUserData.username : 'admin'
        });
    })
    .then(function() {
        // Credit wallet
        return db.collection('wallets').doc(userId).update({
            current_balance: firebase.firestore.FieldValue.increment(amount),
            updated_at: firebase.firestore.FieldValue.serverTimestamp()
        });
    })
    .then(function() {
        // Log activity
        return db.collection('activity_logs').add({
            message: 'Ongezo la ' + formatCurrency(amount) + ' (' + type + ') limetolewa kwa mteja',
            type: 'balance_add',
            amount: amount,
            created_at: firebase.firestore.FieldValue.serverTimestamp()
        }).catch(function(e) { console.warn('Log skipped'); });
    })
    .then(function() {
        if (success) {
            success.innerHTML = '<i class="fas fa-check-circle"></i> Salio la ' + formatCurrency(amount) + ' limeongezwa!';
            success.style.display = 'block';
        }
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-plus-circle"></i> Ongeza Salio';
        }
        
        setTimeout(function() {
            closeModal('add-balance-modal');
            refreshUserManagement();
        }, 1500);
        
        showToast('✅ Salio limeongezwa kwa mafanikio!', 'success');
    })
    .catch(function(e) {
        console.error('Add balance error:', e);
        if (err) { err.textContent = 'Error: ' + e.message; err.style.display = 'block'; }
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-plus-circle"></i> Ongeza Salio';
        }
    });
}

// ===== SYSTEM SETTINGS FUNCTIONS =====

// Refresh system config page
function refreshSystemConfig() {
    db.collection('system_config').doc('config').get()
    .then(function(doc) {
        if (doc.exists) {
            var c = doc.data();
            
            // General Settings
            setValue('sys-company-name', c.company_name || 'SunWealth Investment Ltd');
            setValue('sys-website', c.website || '');
            setValue('sys-email', c.email || '');
            setValue('sys-phone', c.phone || '');
            setValue('sys-address', c.address || '');
            setValue('sys-language', c.language || 'sw');
            
            // Financial Settings
            setValue('sys-withdrawal-fee', c.withdrawal_fee_percent || 10);
            setValue('sys-min-deposit', c.min_deposit || 7000);
            setValue('sys-min-withdrawal', c.min_withdrawal || 2000);
            setValue('sys-max-withdrawal', c.max_withdrawal || 5000000);
            setValue('sys-referral-bonus', c.referral_bonus_percent || 10);
            setValue('sys-bonus-duration', c.bonus_duration_days || 30);
            
            // Operating Hours
            setValue('sys-open-time', c.operating_hours_start || '04:30');
            setValue('sys-close-time', c.operating_hours_end || '19:00');
            setChecked('sys-day-mon', c.working_days ? c.working_days.mon !== false : true);
            setChecked('sys-day-tue', c.working_days ? c.working_days.tue !== false : true);
            setChecked('sys-day-wed', c.working_days ? c.working_days.wed !== false : true);
            setChecked('sys-day-thu', c.working_days ? c.working_days.thu !== false : true);
            setChecked('sys-day-fri', c.working_days ? c.working_days.fri !== false : true);
            setChecked('sys-day-sat', c.working_days ? c.working_days.sat === true : false);
            setChecked('sys-day-sun', c.working_days ? c.working_days.sun === true : false);
            
            // Package Settings
            setValue('sys-package-duration', c.package_duration_days || 47);
            setValue('sys-daily-interest', c.daily_interest_percent || 4.29);
            setValue('sys-allow-purchases', c.allow_purchases || 'yes');
            setValue('sys-max-packages', c.max_packages_per_user || 10);
            
            // Security Settings
            setValue('sys-min-password', c.min_password_length || 6);
            setValue('sys-allow-signup', c.allow_signup || 'yes');
            setValue('sys-allow-login', c.allow_login || 'yes');
            setValue('sys-session-timeout', c.session_timeout_minutes || 60);
            
            // Notification Settings
            setValue('sys-email-notifications', c.email_notifications || 'yes');
            setValue('sys-sms-notifications', c.sms_notifications || 'no');
            
            // Maintenance
            setValue('sys-maintenance-mode', c.maintenance_mode || 'off');
            setValue('sys-maintenance-message', c.maintenance_message || '');
        }
    })
    .catch(function(e) {
        console.warn('Config load error:', e.message);
    });
    
    // Update stats
    db.collection('transactions').get()
    .then(function(snap) {
        var dep = 0, wth = 0;
        snap.forEach(function(doc) {
            var t = doc.data();
            if (t.status === 'approved') {
                if (t.type === 'deposit') dep += t.amount;
                else if (t.type === 'withdrawal') wth += t.amount;
            }
        });
        setText('sys-total-deposits', formatCurrency(dep));
        setText('sys-total-withdrawals', formatCurrency(wth));
    })
    .catch(function(e) { console.warn('Stats:', e.message); });
}

// Helper: Set input value safely
function setValue(id, value) {
    var el = document.getElementById(id);
    if (el) el.value = value;
}

// Helper: Set checkbox safely
function setChecked(id, checked) {
    var el = document.getElementById(id);
    if (el) el.checked = checked;
}

// Helper: Set text safely
function setText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
}

// Save all system settings
function saveAllSystemSettings() {
    if (!currentUserData || currentUserData.role !== 'superadmin') {
        showToast('Msimamizi Mkuu pekee anaweza kubadilisha mipangilio!', 'error');
        return;
    }
    
    if (!confirm('Unahakika unataka kuhifadhi mipangilio yote? Hii itaathiri mfumo mzima.')) return;
    
    var config = {
        // General
        company_name: getValue('sys-company-name'),
        website: getValue('sys-website'),
        email: getValue('sys-email'),
        phone: getValue('sys-phone'),
        address: getValue('sys-address'),
        language: getValue('sys-language'),
        
        // Financial
        withdrawal_fee_percent: parseInt(getValue('sys-withdrawal-fee')) || 10,
        min_deposit: parseInt(getValue('sys-min-deposit')) || 7000,
        min_withdrawal: parseInt(getValue('sys-min-withdrawal')) || 2000,
        max_withdrawal: parseInt(getValue('sys-max-withdrawal')) || 5000000,
        referral_bonus_percent: parseInt(getValue('sys-referral-bonus')) || 10,
        bonus_duration_days: parseInt(getValue('sys-bonus-duration')) || 30,
        
        // Operating Hours
        operating_hours_start: getValue('sys-open-time'),
        operating_hours_end: getValue('sys-close-time'),
        working_days: {
            mon: isChecked('sys-day-mon'),
            tue: isChecked('sys-day-tue'),
            wed: isChecked('sys-day-wed'),
            thu: isChecked('sys-day-thu'),
            fri: isChecked('sys-day-fri'),
            sat: isChecked('sys-day-sat'),
            sun: isChecked('sys-day-sun')
        },
        
        // Packages
        package_duration_days: parseInt(getValue('sys-package-duration')) || 47,
        daily_interest_percent: parseFloat(getValue('sys-daily-interest')) || 4.29,
        allow_purchases: getValue('sys-allow-purchases'),
        max_packages_per_user: parseInt(getValue('sys-max-packages')) || 10,
        
        // Security
        min_password_length: parseInt(getValue('sys-min-password')) || 6,
        allow_signup: getValue('sys-allow-signup'),
        allow_login: getValue('sys-allow-login'),
        session_timeout_minutes: parseInt(getValue('sys-session-timeout')) || 60,
        
        // Notifications
        email_notifications: getValue('sys-email-notifications'),
        sms_notifications: getValue('sys-sms-notifications'),
        
        // Maintenance
        maintenance_mode: getValue('sys-maintenance-mode'),
        maintenance_message: getValue('sys-maintenance-message'),
        
        // Metadata
        updated_at: firebase.firestore.FieldValue.serverTimestamp(),
        updated_by: currentUser.uid,
        updated_by_name: currentUserData.username
    };
    
    // Save to Firestore
    db.collection('system_config').doc('config').set(config)
    .then(function() {
        // Update local config
        window.systemConfig = {
            withdrawalFeePercent: config.withdrawal_fee_percent,
            operatingHoursStart: config.operating_hours_start,
            operatingHoursEnd: config.operating_hours_end,
            minWithdrawal: config.min_withdrawal,
            minDeposit: config.min_deposit
        };
        
        // Log activity
        db.collection('activity_logs').add({
            message: 'Mipangilio ya mfumo imesasishwa na ' + currentUserData.username,
            type: 'system_config',
            created_at: firebase.firestore.FieldValue.serverTimestamp()
        }).catch(function(e) { console.warn('Log skipped'); });
        
        showToast('✅ Mipangilio yote imehifadhiwa kwa mafanikio!', 'success');
    })
    .catch(function(e) {
        console.error('Save config error:', e);
        showToast('❌ Imeshindwa kuhifadhi: ' + e.message, 'error');
    });
}

// Reset system settings to defaults
function resetSystemSettings() {
    if (!confirm('Unahakika unataka kurejesha mipangilio yote kwenye hali ya awali? Hii haiwezi kutenduliwa!')) return;
    
    var defaultConfig = {
        company_name: 'SunWealth Investment Ltd',
        website: '',
        email: '',
        phone: '',
        address: 'Dar es Salaam, Tanzania',
        language: 'sw',
        
        withdrawal_fee_percent: 10,
        min_deposit: 7000,
        min_withdrawal: 2000,
        max_withdrawal: 5000000,
        referral_bonus_percent: 10,
        bonus_duration_days: 30,
        
        operating_hours_start: '04:30',
        operating_hours_end: '19:00',
        working_days: {
            mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false
        },
        
        package_duration_days: 47,
        daily_interest_percent: 4.29,
        allow_purchases: 'yes',
        max_packages_per_user: 10,
        
        min_password_length: 6,
        allow_signup: 'yes',
        allow_login: 'yes',
        session_timeout_minutes: 60,
        
        email_notifications: 'yes',
        sms_notifications: 'no',
        
        maintenance_mode: 'off',
        maintenance_message: 'Mfumo unafanyiwa matengenezo. Tafadhali rudi baadaye.',
        
        updated_at: firebase.firestore.FieldValue.serverTimestamp(),
        updated_by: currentUser.uid
    };
    
    db.collection('system_config').doc('config').set(defaultConfig)
    .then(function() {
        window.systemConfig = {
            withdrawalFeePercent: 10,
            operatingHoursStart: '04:30',
            operatingHoursEnd: '19:00',
            minWithdrawal: 2000,
            minDeposit: 7000
        };
        
        refreshSystemConfig();
        showToast('✅ Mipangilio imerejeshwa kwenye hali ya awali!', 'success');
    })
    .catch(function(e) {
        showToast('❌ Error: ' + e.message, 'error');
    });
}

// Helper functions
function getValue(id) {
    var el = document.getElementById(id);
    return el ? el.value : '';
}

function isChecked(id) {
    var el = document.getElementById(id);
    return el ? el.checked : false;
}

// Update old updateSystemParams to use new function
function updateSystemParams() {
    saveAllSystemSettings();
}

function refreshAdminDashboard() {
    if (!currentUserData || (currentUserData.role !== 'admin' && currentUserData.role !== 'superadmin')) return;
    
    console.log('🔄 Refreshing admin dashboard...');
    
    // 1. Pending Transactions Count
    db.collection('transactions')
        .where('status', '==', 'pending')
        .get()
        .then(function(s) {
            var el = document.getElementById('admin-pending-count');
            if (el) el.textContent = s.size;
        })
        .catch(function(e) {
            console.warn('Pending count error:', e.message);
        });
    
    // 2. Pending Deposits Count
    db.collection('transactions')
        .where('status', '==', 'pending')
        .where('type', '==', 'deposit')
        .get()
        .then(function(s) {
            var el = document.getElementById('admin-pending-deposits');
            if (el) el.textContent = s.size;
        })
        .catch(function(e) {
            console.warn('Pending deposits error:', e.message);
        });
    
    // 3. Pending Withdrawals Count
    db.collection('transactions')
        .where('status', '==', 'pending')
        .where('type', '==', 'withdrawal')
        .get()
        .then(function(s) {
            var el = document.getElementById('admin-pending-withdrawals');
            if (el) el.textContent = s.size;
        })
        .catch(function(e) {
            console.warn('Pending withdrawals error:', e.message);
        });
    
    // 4. Total Users Count
    db.collection('users').get()
        .then(function(s) {
            var el = document.getElementById('admin-total-users');
            if (el) el.textContent = s.size;
        })
        .catch(function(e) {
            console.warn('Users count error:', e.message);
        });
    
    // 5. Total Investors (role = user)
    db.collection('users')
        .where('role', '==', 'user')
        .get()
        .then(function(s) {
            var el = document.getElementById('admin-total-investors');
            if (el) el.textContent = s.size;
        })
        .catch(function(e) {
            console.warn('Investors count error:', e.message);
        });
    
    // 6. Approved Today Count & Total
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    
    db.collection('transactions')
        .where('status', '==', 'approved')
        .get()
        .then(function(snap) {
            var count = 0;
            var totalAmount = 0;
            
            snap.forEach(function(doc) {
                var t = doc.data();
                var date = t.processed_at ? t.processed_at.toDate() : null;
                if (date && date >= today) {
                    count++;
                    totalAmount += t.amount || 0;
                }
            });
            
            var el1 = document.getElementById('admin-approved-today');
            var el2 = document.getElementById('admin-total-approved');
            if (el1) el1.textContent = count;
            if (el2) el2.textContent = formatCurrency(totalAmount);
        })
        .catch(function(e) {
            console.warn('Approved today error:', e.message);
        });
    
    // 7. Total System Deposits
    db.collection('transactions')
        .where('type', '==', 'deposit')
        .where('status', '==', 'approved')
        .get()
        .then(function(snap) {
            var total = 0;
            snap.forEach(function(doc) {
                total += doc.data().amount || 0;
            });
            
            var el = document.getElementById('admin-total-deposits');
            if (el) el.textContent = formatCurrency(total);
        })
        .catch(function(e) {
            console.warn('Total deposits error:', e.message);
        });
    
    // 8. Total System Withdrawals
    db.collection('transactions')
        .where('type', '==', 'withdrawal')
        .where('status', '==', 'approved')
        .get()
        .then(function(snap) {
            var total = 0;
            snap.forEach(function(doc) {
                total += doc.data().amount || 0;
            });
            
            var el = document.getElementById('admin-total-withdrawals');
            if (el) el.textContent = formatCurrency(total);
        })
        .catch(function(e) {
            console.warn('Total withdrawals error:', e.message);
        });
    
    // 9. Referral Bonuses Count & Total
    db.collection('transactions')
        .where('type', '==', 'referral_bonus')
        .where('status', '==', 'approved')
        .get()
        .then(function(snap) {
            var totalBonus = 0;
            var bonusCount = 0;
            
            snap.forEach(function(doc) {
                totalBonus += doc.data().amount || 0;
                bonusCount++;
            });
            
            var el1 = document.getElementById('admin-total-bonus');
            var el2 = document.getElementById('admin-bonus-count');
            if (el1) el1.textContent = formatCurrency(totalBonus);
            if (el2) el2.textContent = bonusCount;
        })
        .catch(function(e) {
            console.warn('Bonus count error:', e.message);
        });
    
    // 10. Total Active Investments
    db.collection('investments')
        .where('status', '==', 'active')
        .get()
        .then(function(s) {
            var el = document.getElementById('admin-active-investments');
            if (el) el.textContent = s.size;
        })
        .catch(function(e) {
            console.warn('Active investments error:', e.message);
        });
    
    // 11. Total Investment Amount
    db.collection('investments')
        .where('status', '==', 'active')
        .get()
        .then(function(snap) {
            var total = 0;
            snap.forEach(function(doc) {
                total += doc.data().amount || 0;
            });
            
            var el = document.getElementById('admin-total-invested');
            if (el) el.textContent = formatCurrency(total);
        })
        .catch(function(e) {
            console.warn('Total invested error:', e.message);
        });
    
    // 12. Recent Activities (Last 5)
    db.collection('activity_logs')
        .orderBy('created_at', 'desc')
        .limit(5)
        .get()
        .then(function(snap) {
            var el = document.getElementById('admin-recent-activities');
            if (!el) return;
            
            if (snap.empty) {
                el.innerHTML = '<p style="color:var(--text-secondary);">Hakuna shughuli za hivi karibuni</p>';
                return;
            }
            
            var html = '';
            snap.forEach(function(doc) {
                var data = doc.data();
                var date = data.created_at ? data.created_at.toDate() : new Date();
                var timeAgo = getTimeAgo(data.created_at);
                
                html += '<div style="padding:0.5rem 0;border-bottom:1px solid var(--border-subtle);font-size:0.85rem;">' +
                    '<span style="color:var(--text-secondary);">[' + timeAgo + ']</span> ' +
                    escapeHtml(data.message || '') +
                    '</div>';
            });
            
            el.innerHTML = html;
        })
        .catch(function(e) {
            console.warn('Recent activities error:', e.message);
        });
    
    console.log('✅ Admin dashboard refreshed');
}

// ===== SUPER ADMIN FUNCTIONS =====

// Refresh super admin dashboard
function refreshSuperDashboard() {
    // Total users
    db.collection('users').get()
    .then(function(s) { 
        var el = document.getElementById('super-total-users');
        if (el) el.textContent = s.size; 
    })
    .catch(function(e) { console.warn('Users count:', e.message); });
    
    // Total admins
    db.collection('users')
        .where('role', 'in', ['admin', 'superadmin'])
        .get()
    .then(function(s) {
        var el = document.getElementById('super-total-admins');
        if (el) el.textContent = s.size;
    })
    .catch(function(e) { console.warn('Admins count:', e.message); });
    
    // Pending transactions
    db.collection('transactions')
        .where('status', '==', 'pending')
        .get()
    .then(function(s) {
        var el = document.getElementById('super-pending-count');
        if (el) el.textContent = s.size;
    })
    .catch(function(e) { console.warn('Pending count:', e.message); });
    
    // Active investments
    db.collection('investments')
        .where('status', '==', 'active')
        .get()
    .then(function(s) {
        var el = document.getElementById('super-active-investments');
        if (el) el.textContent = s.size;
    })
    .catch(function(e) { console.warn('Investments:', e.message); });
    
    // Total deposits & withdrawals
    db.collection('transactions').get()
    .then(function(snap) {
        var dep = 0, wth = 0;
        snap.forEach(function(doc) {
            var t = doc.data();
            if (t.status === 'approved') {
                if (t.type === 'deposit') dep += t.amount;
                else if (t.type === 'withdrawal') wth += t.amount;
            }
        });
        var depEl = document.getElementById('super-total-deposits');
        var wthEl = document.getElementById('super-total-withdrawals');
        if (depEl) depEl.textContent = formatCurrency(dep);
        if (wthEl) wthEl.textContent = formatCurrency(wth);
    })
    .catch(function(e) { console.warn('Totals:', e.message); });
    
    // Refresh admin list
    refreshSuperAdminAdmins();
}

// Refresh admin list
function refreshSuperAdminAdmins() {
    var container = document.getElementById('super-admin-list');
    if (!container) return;
    
    container.innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:2rem;">' +
        '<i class="fas fa-spinner fa-spin"></i> Inapakia wasimamizi...</p>';
    
    db.collection('users')
        .where('role', 'in', ['admin', 'superadmin'])
        .get()
    .then(function(snap) {
        if (snap.empty) {
            container.innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:2rem;">' +
                'Hakuna wasimamizi waliopatikana.</p>';
            return;
        }
        
        var admins = [];
        snap.forEach(function(doc) {
            admins.push({ id: doc.id, data: doc.data() });
        });
        
        var html = '<table style="width:100%;font-size:0.85rem;">' +
            '<thead><tr>' +
            '<th>#</th>' +
            '<th>Jina</th>' +
            '<th>Barua Pepe</th>' +
            '<th>Simu</th>' +
            '<th>Wadhifa</th>' +
            '<th>Hali</th>' +
            '<th>Vitendo</th>' +
            '</tr></thead><tbody>';
        
        for (var i = 0; i < admins.length; i++) {
            var a = admins[i];
            var data = a.data;
            var status = data.status || 'active';
            
            var statusBadge = status === 'active' ? 
                '<span class="badge badge-approved">Hai</span>' : 
                '<span class="badge badge-rejected">Imezuiliwa</span>';
            
            var roleBadge = data.role === 'superadmin' ? 
                '<span style="color:#ffd700;">👑 Mkuu</span>' : 
                '<span style="color:var(--accent-info);">🛡️ Msimamizi</span>';
            
            html += '<tr>' +
                '<td>' + (i + 1) + '</td>' +
                '<td><strong>@' + escapeHtml(data.username || 'N/A') + '</strong></td>' +
                '<td style="font-size:0.8rem;">' + escapeHtml(data.email || 'N/A') + '</td>' +
                '<td>' + escapeHtml(data.phone || '-') + '</td>' +
                '<td>' + roleBadge + '</td>' +
                '<td>' + statusBadge + '</td>' +
                '<td>' +
                    '<div style="display:flex;gap:0.2rem;">' +
                        '<button class="btn btn-primary btn-sm" onclick="editAdmin(\'' + a.id + '\')" title="Hariri">' +
                            '<i class="fas fa-edit"></i></button>' +
                        (status === 'active' ? 
                            '<button class="btn btn-warning btn-sm" onclick="toggleAdminStatus(\'' + a.id + '\', \'inactive\')" title="Zima">' +
                                '<i class="fas fa-toggle-off"></i></button>' :
                            '<button class="btn btn-success btn-sm" onclick="toggleAdminStatus(\'' + a.id + '\', \'active\')" title="Washa" style="background:var(--accent-solar);border-color:var(--accent-solar);color:#0d1117;">' +
                                '<i class="fas fa-toggle-on"></i></button>'
                        ) +
                        (data.role !== 'superadmin' ? 
                            '<button class="btn btn-danger btn-sm" onclick="deleteAdmin(\'' + a.id + '\')" title="Futa">' +
                                '<i class="fas fa-trash"></i></button>' : '') +
                    '</div>' +
                '</td>' +
                '</tr>';
        }
        
        html += '</tbody></table>';
        container.innerHTML = html;
    })
    .catch(function(e) {
        container.innerHTML = '<p style="color:var(--danger);text-align:center;padding:2rem;">' +
            'Error: ' + e.message + '</p>';
    });
}

// Show add admin modal
function showAddAdminModal() {
    document.getElementById('add-admin-modal-title').innerHTML = '<i class="fas fa-user-plus"></i> Ongeza Msimamizi';
    document.getElementById('add-admin-edit-id').value = '';
    document.getElementById('add-admin-form').reset();
    document.getElementById('add-admin-password').required = true;
    document.getElementById('add-admin-error').style.display = 'none';
    document.getElementById('add-admin-submit-btn').innerHTML = '<i class="fas fa-save"></i> Hifadhi';
    document.getElementById('add-admin-submit-btn').disabled = false;
    openModal('add-admin-modal');
}

// Edit admin
function editAdmin(adminId) {
    db.collection('users').doc(adminId).get()
    .then(function(doc) {
        if (!doc.exists) {
            showToast('Msimamizi hajapatikana', 'error');
            return;
        }
        
        var data = doc.data();
        
        document.getElementById('add-admin-modal-title').innerHTML = '<i class="fas fa-edit"></i> Hariri Msimamizi';
        document.getElementById('add-admin-edit-id').value = adminId;
        document.getElementById('add-admin-username').value = data.username || '';
        document.getElementById('add-admin-email').value = data.email || '';
        document.getElementById('add-admin-phone').value = data.phone || '';
        document.getElementById('add-admin-role').value = data.role || 'admin';
        document.getElementById('add-admin-status').value = data.status || 'active';
        document.getElementById('add-admin-password').value = '';
        document.getElementById('add-admin-password').required = false;
        document.getElementById('add-admin-error').style.display = 'none';
        document.getElementById('add-admin-submit-btn').innerHTML = '<i class="fas fa-save"></i> Hifadhi';
        document.getElementById('add-admin-submit-btn').disabled = false;
        
        openModal('add-admin-modal');
    })
    .catch(function(e) {
        showToast('Error: ' + e.message, 'error');
    });
}

// Save admin (add or edit)
function saveAdmin(event) {
    event.preventDefault();
    
    var editId = document.getElementById('add-admin-edit-id').value;
    var username = document.getElementById('add-admin-username').value.trim().toLowerCase();
    var email = document.getElementById('add-admin-email').value.trim().toLowerCase();
    var phone = document.getElementById('add-admin-phone').value.trim();
    var password = document.getElementById('add-admin-password').value;
    var role = document.getElementById('add-admin-role').value;
    var status = document.getElementById('add-admin-status').value;
    var err = document.getElementById('add-admin-error');
    var submitBtn = document.getElementById('add-admin-submit-btn');
    
    if (err) err.style.display = 'none';
    
    // Validations
    if (!username || username.length < 3) {
        if (err) { err.textContent = 'Jina la mtumiaji linahitajika (angalau herufi 3)'; err.style.display = 'block'; }
        return;
    }
    if (!email) {
        if (err) { err.textContent = 'Barua pepe inahitajika'; err.style.display = 'block'; }
        return;
    }
    if (!editId && (!password || password.length < 6)) {
        if (err) { err.textContent = 'Nywila inahitajika (angalau herufi 6) kwa ajili ya msimamizi mpya'; err.style.display = 'block'; }
        return;
    }
    
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Inahifadhi...';
    }
    
    var userData = {
        username: username,
        email: email,
        phone: phone,
        role: role,
        status: status,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    if (editId) {
        // Update existing admin
        db.collection('users').doc(editId).update(userData)
        .then(function() {
            closeModal('add-admin-modal');
            showToast('Taarifa za msimamizi zimesasishwa!', 'success');
            refreshSuperAdminAdmins();
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-save"></i> Hifadhi';
            }
        })
        .catch(function(e) {
            if (err) { err.textContent = 'Error: ' + e.message; err.style.display = 'block'; }
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-save"></i> Hifadhi';
            }
        });
    } else {
        // Create new admin - first create auth user
        auth.createUserWithEmailAndPassword(email, password)
        .then(function(userCredential) {
            var user = userCredential.user;
            
            userData.uid = user.uid;
            userData.referralCode = 'SW' + user.uid.substring(0, 8).toUpperCase();
            userData.referredBy = null;
            userData.referredByValid = false;
            userData.referralBonusPaid = false;
            userData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            
            // Save to Firestore
            return db.collection('users').doc(user.uid).set(userData)
            .then(function() {
                // Create wallet
                return db.collection('wallets').doc(user.uid).set({
                    user_id: user.uid,
                    current_balance: 0,
                    total_deposited: 0,
                    total_withdrawn: 0,
                    created_at: firebase.firestore.FieldValue.serverTimestamp(),
                    updated_at: firebase.firestore.FieldValue.serverTimestamp()
                });
            });
        })
        .then(function() {
            closeModal('add-admin-modal');
            showToast('Msimamizi ameongezwa kwa mafanikio!', 'success');
            refreshSuperAdminAdmins();
            refreshSuperDashboard();
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-save"></i> Hifadhi';
            }
        })
        .catch(function(e) {
            console.error('Add admin error:', e);
            if (err) { 
                if (e.code === 'auth/email-already-in-use') {
                    err.textContent = 'Barua pepe hii tayari inatumika';
                } else {
                    err.textContent = 'Error: ' + e.message;
                }
                err.style.display = 'block'; 
            }
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-save"></i> Hifadhi';
            }
        });
    }
}

// Toggle admin status
function toggleAdminStatus(adminId, newStatus) {
    var action = newStatus === 'active' ? 'kuwashwa' : 'kuzimwa';
    
    if (!confirm('Unahakika unataka ' + action + ' msimamizi huyu?')) return;
    
    db.collection('users').doc(adminId).update({
        status: newStatus,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function() {
        showToast('Msimamizi ame' + action + '!', 'success');
        refreshSuperAdminAdmins();
    })
    .catch(function(e) {
        showToast('Error: ' + e.message, 'error');
    });
}

// Delete admin
function deleteAdmin(adminId) {
    if (!confirm('Unahakika unataka kumfuta msimamizi huyu? Hii haiwezi kutenduliwa.')) return;
    
    // Get admin data first
    db.collection('users').doc(adminId).get()
    .then(function(doc) {
        if (!doc.exists) throw new Error('Admin not found');
        
        var data = doc.data();
        if (data.role === 'superadmin') {
            showToast('Huwezi kumfuta Msimamizi Mkuu!', 'error');
            throw new Error('Cannot delete superadmin');
        }
        
        // Delete user document
        return db.collection('users').doc(adminId).delete();
    })
    .then(function() {
        showToast('Msimamizi amefutwa!', 'warning');
        refreshSuperAdminAdmins();
        refreshSuperDashboard();
    })
    .catch(function(e) {
        if (e.message !== 'Cannot delete superadmin') {
            console.error('Delete admin error:', e);
            showToast('Error: ' + e.message, 'error');
        }
    });
}

// ===== CHECK REFERRAL ON PAGE LOAD =====
// This function MUST be defined BEFORE init()
function checkReferralOnLoad() {
    // Get referral code from URL
    var urlParams = new URLSearchParams(window.location.search);
    var referralCode = urlParams.get('ref');
    
    if (referralCode) {
        console.log('🔗 Referral code detected:', referralCode);
        
        // Store referral code in session storage
        sessionStorage.setItem('sunwealth_ref', referralCode);
        
        // If user is not logged in, show signup modal with referral pre-filled after a short delay
        if (!currentUser) {
            setTimeout(function() {
                // Show signup modal
                if (typeof showSignupModal === 'function') {
                    showSignupModal();
                    
                    // Pre-fill referral code
                    var refField = document.getElementById('signup-referral');
                    if (refField) {
                        refField.value = referralCode;
                        refField.readOnly = true;
                        refField.style.background = 'rgba(0,230,118,0.1)';
                        refField.style.border = '1px solid var(--accent-solar)';
                        
                        // Add note below the field
                        var noteEl = document.createElement('small');
                        noteEl.style.cssText = 'color:var(--accent-solar);display:block;margin-top:-0.5rem;margin-bottom:0.5rem;font-size:0.8rem;';
                        noteEl.textContent = '✅ Umealikwa na mshiriki! Namba ya ushirika imejazwa kiotomatiki.';
                        refField.parentNode.insertBefore(noteEl, refField.nextSibling);
                    }
                }
            }, 1500); // Wait 1.5 seconds for page to fully load
        }
    }
}

var originalShowSignupModal = showSignupModal;
showSignupModal = function() {
    if (typeof originalShowSignupModal === 'function') {
        originalShowSignupModal();
    } else {
        openModal('signup-modal');
    }
    
    // Check for stored referral code
    var storedRef = sessionStorage.getItem('sunwealth_ref');
    var refField = document.getElementById('signup-referral');
    var refBanner = document.getElementById('referral-banner');
    var refNote = document.getElementById('referral-note');
    
    if (storedRef && refField) {
        refField.value = storedRef;
        refField.readOnly = true;
        refField.style.background = 'rgba(0,230,118,0.08)';
        refField.style.border = '1px solid var(--accent-solar)';
        refField.style.cursor = 'not-allowed';
        if (refBanner) refBanner.style.display = 'block';
        if (refNote) refNote.style.display = 'block';
    } else {
        if (refField) {
            refField.value = '';
            refField.readOnly = false;
            refField.style.background = 'rgba(0,230,118,0.05)';
            refField.style.border = '1px solid var(--border-subtle)';
            refField.style.cursor = 'text';
        }
        if (refBanner) refBanner.style.display = 'none';
        if (refNote) refNote.style.display = 'none';
    }
    
    // Clear messages
    var err = document.getElementById('signup-error');
    var success = document.getElementById('signup-success');
    var submitBtn = document.getElementById('signup-submit-btn');
    if (err) err.style.display = 'none';
    if (success) success.style.display = 'none';
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Fungua Akaunti';
    }
    
    // Reset form (keep referral if from URL)
    var form = document.getElementById('signup-form');
    if (form && !storedRef) form.reset();
};

// ===== PROFILE FUNCTIONS =====
function refreshProfile() {
    if (!currentUser || !currentUserData) return;
    
    var username = currentUserData.username || currentUser.email.split('@')[0] || 'mtumiaji';
    
    // Profile card
    var profileusername = document.getElementById('profile-username');
    var profileEmail = document.getElementById('profile-email');
    var profileRole = document.getElementById('profile-role');
    
    if (profileusername) profileusername.textContent = '@' + username;
    if (profileEmail) profileEmail.textContent = currentUserData.email || '-';
    if (profileRole) {
        var roleMap = { 'user': 'Mwekezaji'};
        profileRole.textContent = roleMap[currentUserData.role] || currentUserData.role;
    }
    
    // Detail fields
    var detailusername = document.getElementById('detail-username');
    var detailEmail = document.getElementById('detail-email');
    var detailPhone = document.getElementById('detail-phone');
    var detailReferral = document.getElementById('detail-referral');
    var detailJoined = document.getElementById('detail-joined');
    var detailUsername = document.getElementById('detail-username');
    
    if (detailusername) detailusername.textContent = '@' + username;
    if (detailUsername) detailUsername.textContent = '@' + username;
    if (detailEmail) detailEmail.textContent = currentUserData.email || '-';
    if (detailPhone) detailPhone.textContent = currentUserData.phone || 'Haijawekwa';
    if (detailReferral) detailReferral.textContent = currentUserData.referralCode || '-';
    if (detailJoined && currentUserData.createdAt) {
        var date = currentUserData.createdAt.toDate ? currentUserData.createdAt.toDate() : new Date(currentUserData.createdAt);
        detailJoined.textContent = date.toLocaleDateString('sw-TZ', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    
    updateReferralInfo();
}

function showEditProfileModal() {
    if (!currentUserData) return;
    
    var username = currentUserData.username || '';
    
    document.getElementById('edit-username').value = username;
    document.getElementById('edit-phone').value = currentUserData.phone || '';
    
    var err = document.getElementById('edit-profile-error');
    if (err) err.style.display = 'none';
    
    openModal('edit-profile-modal');
}

function saveProfile(event) {
    event.preventDefault();
    
    var username = document.getElementById('edit-username').value.trim().toLowerCase();
    var phone = document.getElementById('edit-phone').value.trim();
    var err = document.getElementById('edit-profile-error');
    if (err) err.style.display = 'none';
    
    if (!username || username.length < 3) {
        if (err) { err.textContent = 'Jina la mtumiaji linahitajika (angalau herufi 3)'; err.style.display = 'block'; }
        return;
    }
    
    // Check if username changed and is unique
    if (username !== currentUserData.username) {
        db.collection('users').where('username', '==', username).get()
        .then(function(snap) {
            if (!snap.empty) {
                if (err) { err.textContent = 'Jina hili tayari linatumika'; err.style.display = 'block'; }
                return Promise.reject('username_taken');
            }
            return updateProfile(username, phone, err);
        })
        .catch(function(e) {
            if (e !== 'username_taken') console.error(e);
        });
    } else {
        updateProfile(username, phone, err);
    }
}

function updateProfile(username, phone, err) {
    db.collection('users').doc(currentUser.uid).update({
        username: username,
        phone: phone,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function() {
        currentUserData.username = username;
        currentUserData.phone = phone;
        
        closeModal('edit-profile-modal');
        showToast('Wasifu umesasishwa!', 'success');
        refreshProfile();
        updateUIForLoggedIn();
    })
    .catch(function(e) {
        if (err) { err.textContent = 'Imeshindwa: ' + e.message; err.style.display = 'block'; }
    });
} 

// ===== REFERRAL FUNCTIONS =====

function refreshReferral() {
    if (!currentUserData) return;
    updateReferralInfo();
    loadReferralList();
}

function updateReferralInfo() {
    if (!currentUserData) return;
    
    var username = currentUserData.username || 'mtumiaji';
    
    var baseUrl = window.location.origin + window.location.pathname;
    var referralLink = baseUrl + '?ref=' + currentUserData.referralCode;
    
    var codeDisplay = document.getElementById('referral-code-display');
    if (codeDisplay) codeDisplay.textContent = currentUserData.referralCode || '---';
    
    var linkDisplay = document.getElementById('referral-link');
    if (linkDisplay) linkDisplay.textContent = referralLink;
    
    var detailCode = document.getElementById('detail-referral');
    if (detailCode) detailCode.textContent = currentUserData.referralCode || '-';
    
    checkReferralEarnings();
}

function loadReferralList() {
    if (!currentUser || !currentUserData) return;
    
    var historyList = document.getElementById('referral-history-list');
    if (!historyList) return;
    
    historyList.innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:1rem;">' +
        '<i class="fas fa-spinner fa-spin"></i> Inapakia orodha ya washirika...</p>';
    
    // Get all users who used this user's referral code
    db.collection('users')
        .where('referredBy', '==', currentUserData.referralCode)
        .get()
        .then(function(snap) {
            if (snap.empty) {
                historyList.innerHTML = '<div style="text-align:center;padding:2rem;">' +
                    '<p style="font-size:3rem;"><i class="fas fa-users-slash"></i></p>' +
                    '<p style="color:var(--text-secondary);margin-bottom:0.5rem;">Hakuna washirika bado</p>' +
                    '<p style="color:var(--text-secondary);font-size:0.85rem;">Shiriki kiungo chako ili kupata bonuses!</p>' +
                    '<button class="btn btn-primary btn-sm" onclick="copyReferralLink()" style="margin-top:1rem;">' +
                    '<i class="fas fa-copy"></i> Nakili Kiungo</button>' +
                    '</div>';
                
                document.getElementById('referral-total-count').textContent = '0';
                document.getElementById('referral-earnings-display').textContent = formatCurrency(0);
                return;
            }
            
            var referrals = [];
            snap.forEach(function(doc) {
                referrals.push({ id: doc.id, data: doc.data() });
            });
            
            // Update total count
            var totalCountEl = document.getElementById('referral-total-count');
            if (totalCountEl) totalCountEl.textContent = referrals.length;
            
            // For each referral, get their deposit info
            var promises = [];
            for (var i = 0; i < referrals.length; i++) {
                promises.push(getReferralDetails(referrals[i]));
            }
            
            return Promise.all(promises);
        })
        .then(function(referralDetails) {
            if (!referralDetails) return;
            
            // Calculate total earnings
            var totalEarnings = 0;
            for (var i = 0; i < referralDetails.length; i++) {
                totalEarnings += referralDetails[i].bonusEarned || 0;
            }
            
            // Update earnings display
            var earningsEl = document.getElementById('referral-earnings-display');
            if (earningsEl) earningsEl.textContent = formatCurrency(totalEarnings);
            
            // Build table
            var html = '<div style="overflow-x:auto;">' +
                '<table style="width:100%;font-size:0.85rem;min-width:700px;">' +
                '<thead>' +
                '<tr>' +
                '<th>#</th>' +
                '<th><i class="fas fa-user"></i> Jina</th>' +
                '<th><i class="fas fa-phone"></i> Simu</th>' +
                '<th><i class="fas fa-envelope"></i> Barua Pepe</th>' +
                '<th><i class="fas fa-key"></i> Namba</th>' +
                '<th><i class="fas fa-money-bill"></i> Amana ya Kwanza</th>' +
                '<th><i class="fas fa-gift"></i> Bonasi (10%)</th>' +
                '<th><i class="fas fa-calendar"></i> Tarehe</th>' +
                '<th><i class="fas fa-info-circle"></i> Hali</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>';
            
            for (var j = 0; j < referralDetails.length; j++) {
                var ref = referralDetails[j];
                var date = ref.joinedDate ? new Date(ref.joinedDate) : new Date();
                
                // Determine status
                var statusHtml = '';
                var statusColor = '';
                
                if (ref.bonusPaid && ref.firstDeposit > 0) {
                    statusHtml = '<i class="fas fa-check-circle"></i> Imelipwa';
                    statusColor = 'var(--accent-solar)';
                } else if (ref.hasDeposited && ref.firstDeposit > 0) {
                    statusHtml = '<i class="fas fa-clock"></i> Inashughulikiwa';
                    statusColor = 'var(--accent-warning)';
                } else {
                    statusHtml = '<i class="fas fa-hourglass"></i> Anasubiri Amana';
                    statusColor = 'var(--text-secondary)';
                }
                
                html += '<tr>' +
                    '<td>' + (j + 1) + '</td>' +
                    '<td><strong>@' + escapeHtml(ref.username || ref.fullName || 'N/A') + '</strong></td>' +
                    '<td style="color:var(--accent-info);">' + escapeHtml(ref.phone || 'Haijawekwa') + '</td>' +
                    '<td style="font-size:0.8rem;">' + escapeHtml(ref.email || 'N/A') + '</td>' +
                    '<td style="color:var(--accent-solar);font-size:0.8rem;">' + escapeHtml(ref.referralCode || 'N/A') + '</td>' +
                    '<td style="font-weight:600;">' + (ref.firstDeposit > 0 ? formatCurrency(ref.firstDeposit) : '<span style="color:var(--text-secondary);">-</span>') + '</td>' +
                    '<td style="color:#9b59b6;font-weight:700;">' + (ref.bonusEarned > 0 ? formatCurrency(ref.bonusEarned) : '<span style="color:var(--text-secondary);">-</span>') + '</td>' +
                    '<td style="font-size:0.8rem;">' + date.toLocaleDateString('sw-TZ', { year: 'numeric', month: 'short', day: 'numeric' }) + '</td>' +
                    '<td><span style="color:' + statusColor + ';font-weight:600;">' + statusHtml + '</span></td>' +
                    '</tr>';
            }
            
            html += '</tbody></table></div>';
            
            // Summary row
            html += '<div style="margin-top:1rem;padding:0.8rem;background:rgba(0,230,118,0.05);border-radius:8px;border:1px solid var(--accent-solar);">' +
                '<div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;font-size:0.9rem;">' +
                '<span><i class="fas fa-users"></i> <strong>Jumla ya Washirika:</strong> ' + referralDetails.length + '</span>' +
                '<span><i class="fas fa-gift"></i> <strong>Jumla ya Bonasi:</strong> <span style="color:var(--accent-solar);">' + formatCurrency(totalEarnings) + '</span></span>' +
                '</div></div>';
            
            historyList.innerHTML = html;
        })
        .catch(function(e) {
            console.warn('Referral list error:', e.message);
            historyList.innerHTML = '<p style="color:var(--danger);text-align:center;padding:1rem;">' +
                '<i class="fas fa-exclamation-triangle"></i> Imeshindwa kupakia. Tafadhali jaribu tena.</p>';
        });
}

function getReferralDetails(referral) {
    var userId = referral.id;
    var userData = referral.data;
    
    var details = {
        id: userId,
        username: userData.username || 'N/A',
        fullName: userData.fullName || userData.username || 'N/A',
        email: userData.email || 'N/A',
        phone: userData.phone || 'Haijawekwa',
        referralCode: userData.referralCode || 'N/A',
        joinedDate: userData.createdAt ? (userData.createdAt.toDate ? userData.createdAt.toDate() : new Date(userData.createdAt)) : new Date(),
        firstDeposit: 0,
        bonusEarned: 0,
        bonusPaid: userData.referralBonusPaid || false,
        hasDeposited: false
    };
    
    // Check if bonus was already paid (from user data)
    if (userData.referralBonusPaid && userData.referralBonusAmount) {
        details.bonusEarned = userData.referralBonusAmount;
        details.bonusPaid = true;
    }
    
    // Get first approved deposit for this user
    return db.collection('transactions')
        .where('user_id', '==', userId)
        .where('type', '==', 'deposit')
        .where('status', '==', 'approved')
        .orderBy('created_at', 'asc')
        .limit(1)
        .get()
        .then(function(snap) {
            if (!snap.empty) {
                var firstDeposit = snap.docs[0].data();
                details.firstDeposit = firstDeposit.amount || 0;
                details.hasDeposited = true;
                
                // If bonus not already set from user data, calculate it
                if (!details.bonusEarned || details.bonusEarned === 0) {
                    details.bonusEarned = Math.floor(details.firstDeposit * 0.10);
                }
                
                console.log('✅ Referral ' + details.username + ': Deposit=' + formatCurrency(details.firstDeposit) + ', Bonus=' + formatCurrency(details.bonusEarned) + ', Paid=' + details.bonusPaid);
            } else {
                console.log('❌ Referral ' + details.username + ': No approved deposits yet');
            }
            
            return details;
        })
        .catch(function(e) {
            console.warn('Get referral details error for ' + userId + ':', e.message);
            
            // Fallback: check user data directly
            if (userData.referralBonusPaid) {
                details.firstDeposit = userData.referralBonusAmount ? (userData.referralBonusAmount * 10) : 0;
                details.bonusEarned = userData.referralBonusAmount || 0;
                details.hasDeposited = true;
                details.bonusPaid = true;
            }
            
            return details;
        });
}

function getReferralDetails(referral) {
    var userId = referral.id;
    var userData = referral.data;
    
    var details = {
        id: userId,
        username: userData.username || 'N/A',
        fullName: userData.fullName || userData.username || 'N/A',
        email: userData.email || 'N/A',
        phone: userData.phone || 'Haijawekwa',
        referralCode: userData.referralCode || 'N/A',
        joinedDate: userData.createdAt ? (userData.createdAt.toDate ? userData.createdAt.toDate() : new Date(userData.createdAt)) : new Date(),
        firstDeposit: 0,
        bonusEarned: 0,
        bonusPaid: userData.referralBonusPaid || false,
        hasDeposited: false
    };
    
    // First check if bonus was already paid from user data
    if (userData.referralBonusPaid && userData.referralBonusAmount) {
        details.bonusEarned = userData.referralBonusAmount;
        details.bonusPaid = true;
    }
    
    // Get first approved deposit
    var depositPromise = db.collection('transactions')
        .where('user_id', '==', userId)
        .where('type', '==', 'deposit')
        .where('status', '==', 'approved')
        .orderBy('created_at', 'asc')
        .limit(1)
        .get()
    .then(function(snap) {
        if (!snap.empty) {
            var deposit = snap.docs[0].data();
            details.firstDeposit = deposit.amount || 0;
            details.hasDeposited = true;
        }
        return details;
    });
    
    // Also check for referral bonus transaction
    var bonusPromise = db.collection('transactions')
        .where('referred_user_id', '==', userId)
        .where('type', '==', 'referral_bonus')
        .where('status', '==', 'approved')
        .limit(1)
        .get()
    .then(function(snap) {
        if (!snap.empty) {
            var bonus = snap.docs[0].data();
            details.bonusEarned = bonus.amount || details.bonusEarned;
            details.bonusPaid = true;
        }
        return details;
    });
    
    // Wait for both checks
    return Promise.all([depositPromise, bonusPromise])
    .then(function() {
        // If bonus not set but has deposit, calculate 10%
        if (!details.bonusEarned && details.firstDeposit > 0) {
            details.bonusEarned = Math.floor(details.firstDeposit * 0.10);
        }
        
        console.log('📊 Referral:', details.username, 
                    '| Deposit:', formatCurrency(details.firstDeposit),
                    '| Bonus:', formatCurrency(details.bonusEarned),
                    '| Paid:', details.bonusPaid);
        
        return details;
    })
    .catch(function(e) {
        console.warn('Detail fetch error:', e.message);
        return details;
    });
}

// Check referral earnings (for summary)
function checkReferralEarnings() {
    if (!currentUser || !currentUserData) return;
    
    // Get total referral bonuses earned
    db.collection('transactions')
        .where('user_id', '==', currentUser.uid)
        .where('type', '==', 'referral_bonus')
        .where('status', '==', 'approved')
        .get()
    .then(function(snap) {
        var total = 0;
        snap.forEach(function(doc) {
            total += doc.data().amount || 0;
        });
        
        var earningsDisplay = document.getElementById('referral-earnings-display');
        if (earningsDisplay) earningsDisplay.textContent = formatCurrency(total);
    })
    .catch(function(e) {
        console.warn('Earnings check:', e.message);
    });
}

// Copy referral link
function copyReferralLink() {
    if (!currentUserData) return;
    
    var baseUrl = window.location.origin + window.location.pathname;
    var referralLink = baseUrl + '?ref=' + currentUserData.referralCode;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(referralLink)
        .then(function() {
            showToast('✅ Kiungo kimenakiliwa! Sasa unaweza kushiriki na marafiki.', 'success');
        })
        .catch(function() {
            fallbackCopyText(referralLink);
        });
    } else {
        fallbackCopyText(referralLink);
    }
}

// Fallback copy function
function fallbackCopyText(text) {
    var tempInput = document.createElement('textarea');
    tempInput.value = text;
    tempInput.style.position = 'fixed';
    tempInput.style.opacity = '0';
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
        document.execCommand('copy');
        showToast('✅ Kiungo kimenakiliwa!', 'success');
    } catch(e) {
        showToast('Imeshindwa kunakili. Tafadhali nakili mwenyewe.', 'error');
    }
    document.body.removeChild(tempInput);
}

// Share referral link via WhatsApp
function shareReferralLink() {
    if (!currentUserData) return;
    
    var baseUrl = window.location.origin + window.location.pathname;
    var referralLink = baseUrl + '?ref=' + currentUserData.referralCode;
    var shareText = '🌟 Jiunge nami kwenye SunWealth Investment Ltd!\n\n' +
        '☀️ Wekeza kwenye nishati ya jua na upate mapato ya kila siku.\n' +
        '💰 Anza na TZS 7,000 tu!\n\n' +
        '🔗 Jiandikishe hapa: ' + referralLink + '\n\n' +
        'Namba yangu ya ushirika: ' + currentUserData.referralCode;
    
    // Open WhatsApp
    var whatsappUrl = 'https://wa.me/?text=' + encodeURIComponent(shareText);
    window.open(whatsappUrl, '_blank');
}

// Copy referral code
function copyReferralCode() {
    if (!currentUserData || !currentUserData.referralCode) return;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(currentUserData.referralCode)
        .then(function() {
            showToast('✅ Namba ya ushirika imenakiliwa!', 'success');
        })
        .catch(function() {
            fallbackCopyText(currentUserData.referralCode);
        });
    } else {
        fallbackCopyText(currentUserData.referralCode);
    }
}

// Get time ago string
function getTimeAgo(timestamp) {
    if (!timestamp) return '';
    
    var now = new Date();
    var date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    var seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'sasa hivi';
    if (seconds < 3600) return Math.floor(seconds / 60) + 'm iliyopita';
    if (seconds < 86400) return Math.floor(seconds / 3600) + 'h iliyopita';
    if (seconds < 604800) return Math.floor(seconds / 86400) + 'd iliyopita';
    return date.toLocaleDateString();
}

function fallbackCopy(text) {
    var tempInput = document.createElement('input');
    tempInput.value = text;
    tempInput.style.position = 'fixed';
    tempInput.style.opacity = '0';
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
        document.execCommand('copy');
        showToast('✅ Kiungo kimenakiliwa!', 'success');
    } catch(e) {
        showToast('Imeshindwa kunakili. Tafadhali nakili mwenyewe.', 'error');
    }
    document.body.removeChild(tempInput);
}

function shareReferralLink() {
    if (!currentUserData) return;
    
    var baseUrl = window.location.origin + window.location.pathname;
    var referralLink = baseUrl + '?ref=' + currentUserData.referralCode;
    var shareText = 'Jiunge na SunWealth Investment Ltd upate mapato ya kila siku kutoka kwenye nishati ya jua! ☀️\n\nJiandikishe hapa: ' + referralLink;
    
    if (navigator.share) {
        navigator.share({
            title: 'SunWealth Investment Ltd',
            text: shareText
        })
        .then(function() {
            showToast('Imeshirikiwa!', 'success');
        })
        .catch(function() {
            // Open WhatsApp as fallback
            window.open('https://wa.me/?text=' + encodeURIComponent(shareText), '_blank');
        });
    } else {
        // Open WhatsApp
        window.open('https://wa.me/?text=' + encodeURIComponent(shareText), '_blank');
    }
}

function copyReferralCode() {
    if (!currentUserData || !currentUserData.referralCode) return;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(currentUserData.referralCode)
        .then(function() {
            showToast('✅ Namba imenakiliwa!', 'success');
        })
        .catch(function() {
            fallbackCopy(currentUserData.referralCode);
        });
    } else {
        fallbackCopy(currentUserData.referralCode);
    }
}

function checkReferralEarnings() {
    if (!currentUser || !currentUserData) return;
    
    // Get total referral bonuses
    db.collection('transactions')
        .where('user_id', '==', currentUser.uid)
        .where('type', '==', 'referral_bonus')
        .where('status', '==', 'approved')
        .get()
    .then(function(snap) {
        var total = 0;
        snap.forEach(function(doc) {
            total += doc.data().amount || 0;
        });
        
        var earningsDisplay = document.getElementById('referral-earnings-display');
        if (earningsDisplay) earningsDisplay.textContent = formatCurrency(total);
    })
    .catch(function(e) {
        console.warn('Earnings check:', e.message);
        var earningsDisplay = document.getElementById('referral-earnings-display');
        if (earningsDisplay) earningsDisplay.textContent = formatCurrency(0);
    });
    
    // Get referral history
    db.collection('users')
        .where('referredBy', '==', currentUserData.referralCode)
        .get()
    .then(function(snap) {
        var historyList = document.getElementById('referral-history-list');
        if (!historyList) return;
        
        if (snap.empty) {
            historyList.innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:1rem;">' +
                '😔 Hakuna washirika bado.<br>Shiriki kiungo chako ili kuanza kupata bonuses!</p>';
            return;
        }
        
        var html = '<table style="width:100%;font-size:0.85rem;">' +
            '<thead><tr><th>Jina</th><th>Barua Pepe</th><th>Tarehe</th><th>Hali</th></tr></thead><tbody>';
        
        snap.forEach(function(doc) {
            var u = doc.data();
            var date = u.createdAt ? (u.createdAt.toDate ? u.createdAt.toDate() : new Date(u.createdAt)) : new Date();
            var status = u.referralBonusPaid ? '✅ Amelipa' : '⏳ Anasubiri';
            
            html += '<tr>' +
                '<td>' + escapeHtml(u.username || 'N/A') + '</td>' +
                '<td>' + escapeHtml(u.email || 'N/A') + '</td>' +
                '<td>' + date.toLocaleDateString() + '</td>' +
                '<td>' + status + '</td>' +
                '</tr>';
        });
        
        html += '</tbody></table>';
        historyList.innerHTML = html;
    })
    .catch(function(e) {
        console.warn('History error:', e.message);
    });
}

// ===== INIT FUNCTION =====
function init() {
    console.log('☀️ SunWealth starting...');
    
    renderPackages();
    initTicker();
    setupTickerListener();
    
    window.onclick = function(e) {
        if (e.target.classList.contains('modal')) e.target.style.display = 'none';
    };
    
    var overlay = document.getElementById('sidebar-overlay');
    if (overlay) overlay.addEventListener('click', toggleSidebar);
    
    navigateTo('home');
    
    // Load slideshow - wait for Firebase to be ready
    setTimeout(function() {
        loadSolarSlideshow();
    }, 500);
    
    // Check for referral on load
    checkReferralOnLoad();
    
    console.log('✅ SunWealth Ready');
}

document.addEventListener('DOMContentLoaded', init);

function init() {
    renderPackages();
    
    // Initialize ticker
    initTicker();
    
    checkReferralOnLoad();
    
    // Close modals on outside click
    window.onclick = function(e) {
        if (e.target.classList.contains('modal')) e.target.style.display = 'none';
    };
    
    // Close sidebar on overlay click
    var overlay = document.getElementById('sidebar-overlay');
    if (overlay) {
        overlay.addEventListener('click', toggleSidebar);
    }
    
    navigateTo('home');
    console.log('☀️ SunWealth Ready');
    console.log('📡 Activity ticker active');
}

document.addEventListener('DOMContentLoaded', init);

// ===== GLOBAL ACTIVITY TICKER =====
var tickerMessages = [];
var tickerInitialized = false;

// Sample initial ticker messages (shown before Firebase loads)
var defaultTickerMessages = [
    { icon: '📈', message: 'User invested in', package: 'SunWealth C', amount: 30000, time: '2 min ago' },
    { icon: '💰', message: 'Withdrawal of', amount: 15000, status: 'processed', time: '5 min ago' },
    { icon: '🌟', message: 'New member joined SunWealth', time: '8 min ago' },
    { icon: '☀️', message: 'Daily income credited to', username: 'investors', time: '12 min ago' },
    { icon: '🏆', message: 'VIP package purchased:', package: 'SunWealth F', amount: 120000, time: '15 min ago' },
    { icon: '💎', message: 'Large deposit of', amount: 500000, status: 'received', time: '20 min ago' },
    { icon: '🤝', message: 'Referral bonus awarded to', username: 'partner', amount: 3000, time: '25 min ago' },
    { icon: '✅', message: 'Withdrawal approved for', username: 'user', amount: 15000, time: '30 min ago' }
];

// Initialize ticker with default messages
function initTicker() {
    var track = document.getElementById('ticker-track');
    if (!track) return;
    
    // Clear existing
    track.innerHTML = '';
    
    // Use default messages if no real data yet
    var messages = tickerMessages.length > 0 ? tickerMessages : defaultTickerMessages;
    
    // Duplicate messages for seamless scrolling
    var allMessages = messages.concat(messages);
    
    // Build ticker HTML
    var html = '';
    for (var i = 0; i < allMessages.length; i++) {
        var msg = allMessages[i];
        html += buildTickerItem(msg);
        if (i < allMessages.length - 1) {
            html += '<span class="ticker-separator">•</span>';
        }
    }
    
    track.innerHTML = html;
    tickerInitialized = true;
}

function buildTickerItem(msg) {
    var html = '<span class="ticker-item">';
    html += '<span class="ticker-icon">' + (msg.icon || '📌') + '</span>';
    html += '<span class="ticker-message">' + msg.message + ' ';
    
    if (msg.username) {
        html += '<span class="ticker-username">' + escapeHtml(msg.username) + '</span> ';
    }
    if (msg.package) {
        html += '<span class="ticker-amount">' + escapeHtml(msg.package) + '</span> ';
    }
    if (msg.amount) {
        html += '<span class="ticker-amount">' + formatCurrency(msg.amount) + '</span> ';
    }
    if (msg.status) {
        html += '<span style="color:var(--accent-solar);">✓</span> ';
    }
    if (msg.time) {
        html += '<span class="ticker-time">' + escapeHtml(msg.time) + '</span>';
    }
    
    html += '</span></span>';
    return html;
}

function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add new ticker message
function addTickerMessage(msg) {
    var defaultMsg = {
        icon: '📌',
        message: 'Activity:',
        time: 'Just now'
    };
    
    // Merge with defaults
    for (var key in defaultMsg) {
        if (!msg[key]) msg[key] = defaultMsg[key];
    }
    
    tickerMessages.unshift(msg);
    
    // Keep only last 20 messages
    if (tickerMessages.length > 20) {
        tickerMessages = tickerMessages.slice(0, 20);
    }
    
    // Refresh ticker display
    if (tickerInitialized) {
        initTicker();
    }
}



// Parse activity log into ticker message
function parseActivityMessage(data) {
    var message = data.message || '';
    var icon = '📌';
    var tickerMsg = {
        icon: icon,
        message: message,
        time: getTimeAgo(data.created_at)
    };
    
    // Detect activity type and set icon
    if (message.toLowerCase().indexOf('invest') !== -1 || message.toLowerCase().indexOf('purchas') !== -1) {
        tickerMsg.icon = '📈';
        // Extract amount
        var amountMatch = message.match(/TZS\s*[\d,]+/i);
        if (amountMatch) {
            tickerMsg.amount = parseInt(amountMatch[0].replace(/[^0-9]/g, ''));
        }
    } else if (message.toLowerCase().indexOf('deposit') !== -1) {
        tickerMsg.icon = '💎';
        var depMatch = message.match(/TZS\s*[\d,]+/i);
        if (depMatch) tickerMsg.amount = parseInt(depMatch[0].replace(/[^0-9]/g, ''));
    } else if (message.toLowerCase().indexOf('withdraw') !== -1) {
        tickerMsg.icon = '💰';
        var wthMatch = message.match(/TZS\s*[\d,]+/i);
        if (wthMatch) tickerMsg.amount = parseInt(wthMatch[0].replace(/[^0-9]/g, ''));
    } else if (message.toLowerCase().indexOf('approv') !== -1) {
        tickerMsg.icon = '✅';
    } else if (message.toLowerCase().indexOf('refer') !== -1) {
        tickerMsg.icon = '🤝';
    } else if (message.toLowerCase().indexOf('joined') !== -1 || message.toLowerCase().indexOf('creat') !== -1) {
        tickerMsg.icon = '🌟';
    } else if (message.toLowerCase().indexOf('income') !== -1 || message.toLowerCase().indexOf('daily') !== -1) {
        tickerMsg.icon = '☀️';
    } else if (message.toLowerCase().indexOf('reject') !== -1) {
        tickerMsg.icon = '❌';
    }
    
    return tickerMsg;
}

// Get relative time string
function getTimeAgo(timestamp) {
    if (!timestamp) return '';
    
    var now = new Date();
    var date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    var seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
    if (seconds < 604800) return Math.floor(seconds / 86400) + 'd ago';
    return date.toLocaleDateString();
}

// Manual refresh ticker (can be called from console for testing)
function refreshTicker() {
    initTicker();
}

// ===== BANK ACCOUNT MANAGEMENT =====
var bankAccountsList = [];

function showAddBankModal() {
    document.getElementById('bank-modal-title').textContent = '🏦 Add Payment Method';
    document.getElementById('bank-edit-id').value = '';
    document.getElementById('bank-form').reset();
    document.getElementById('bank-is-active').checked = true;
    var err = document.getElementById('bank-error');
    if (err) err.style.display = 'none';
    openModal('bank-modal');
}

function editBankAccount(id) {
    db.collection('bank_accounts').doc(id).get()
    .then(function(doc) {
        if (!doc.exists) { 
            showToast('Payment method not found', 'error'); 
            return; 
        }
        
        var acc = doc.data();
        document.getElementById('bank-modal-title').textContent = '✏️ Edit Payment Method';
        document.getElementById('bank-edit-id').value = id;
        document.getElementById('bank-type').value = acc.type || '';
        document.getElementById('bank-name').value = acc.name || '';
        document.getElementById('bank-account-name').value = acc.accountName || '';
        document.getElementById('bank-account-number').value = acc.accountNumber || '';
        document.getElementById('bank-instructions').value = acc.instructions || '';
        document.getElementById('bank-is-active').checked = acc.isActive !== false;
        var err = document.getElementById('bank-error');
        if (err) err.style.display = 'none';
        openModal('bank-modal');
    })
    .catch(function(e) {
        showToast('Error: ' + e.message, 'error');
    });
}

function saveBankAccount(event) {
    event.preventDefault();
    
    var editId = document.getElementById('bank-edit-id').value;
    var type = document.getElementById('bank-type').value;
    var name = document.getElementById('bank-name').value.trim();
    var accountName = document.getElementById('bank-account-name').value.trim();
    var accountNumber = document.getElementById('bank-account-number').value.trim();
    var instructions = document.getElementById('bank-instructions').value.trim();
    var isActive = document.getElementById('bank-is-active').checked;
    var err = document.getElementById('bank-error');
    if (err) err.style.display = 'none';
    
    if (!type || !name || !accountName || !accountNumber || !instructions) {
        if (err) { err.textContent = 'All fields are required'; err.style.display = 'block'; }
        return;
    }
    
    var bankData = {
        type: type,
        name: name,
        accountName: accountName,
        accountNumber: accountNumber,
        instructions: instructions,
        isActive: isActive,
        updated_at: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    var promise;
    if (editId) {
        promise = db.collection('bank_accounts').doc(editId).update(bankData);
    } else {
        bankData.created_at = firebase.firestore.FieldValue.serverTimestamp();
        promise = db.collection('bank_accounts').add(bankData);
    }
    
    promise.then(function() {
        closeModal('bank-modal');
        showToast(editId ? '✅ Payment method updated!' : '✅ Payment method added!', 'success');
        refreshBankAccountsList();
    })
    .catch(function(e) {
        if (err) { err.textContent = 'Error: ' + e.message; err.style.display = 'block'; }
    });
}

function deleteBankAccount(id) {
    if (!confirm('Delete this payment method? This cannot be undone.')) return;
    
    db.collection('bank_accounts').doc(id).delete()
    .then(function() {
        showToast('🗑️ Payment method deleted', 'warning');
        refreshBankAccountsList();
    })
    .catch(function(e) {
        showToast('Error: ' + e.message, 'error');
    });
}

function toggleBankStatus(id, currentStatus) {
    var newStatus = !currentStatus;
    var action = newStatus ? 'activated' : 'deactivated';
    
    db.collection('bank_accounts').doc(id).update({
        isActive: newStatus,
        updated_at: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function() {
        showToast('Payment method ' + action, 'success');
        refreshBankAccountsList();
    })
    .catch(function(e) {
        showToast('Error: ' + e.message, 'error');
    });
}

function refreshBankAccountsList() {
    var el = document.getElementById('bank-accounts-list');
    if (!el) return;
    
    el.innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:1rem;"><span class="loading-spinner"></span> Loading...</p>';
    
    db.collection('bank_accounts').get()
    .then(function(snap) {
        if (snap.empty) {
            el.innerHTML = '<div style="text-align:center;padding:2rem;">' +
                '<p style="color:var(--text-secondary);margin-bottom:1rem;">No payment methods added yet.</p>' +
                '<button class="btn btn-primary" onclick="showAddBankModal()">➕ Add Payment Method</button>' +
                '</div>';
            return;
        }
        
        bankAccountsList = [];
        var html = '';
        
        snap.forEach(function(doc) {
            var acc = doc.data();
            bankAccountsList.push({ id: doc.id, data: acc });
            
            var icon = '📱';
            if (acc.type === 'bank_transfer') icon = '🏛️';
            else if (acc.type === 'crypto') icon = '₿';
            
            var statusBadge = acc.isActive !== false ? 
                '<span class="badge-active">Active</span>' : 
                '<span class="badge-inactive">Inactive</span>';
            
            html += '<div style="border:1px solid var(--border-subtle);border-radius:8px;padding:1rem;margin-bottom:0.8rem;display:flex;gap:1rem;align-items:flex-start;">' +
                '<div style="font-size:2rem;min-width:50px;text-align:center;">' + icon + '</div>' +
                '<div style="flex:1;">' +
                '<div style="font-weight:600;margin-bottom:0.3rem;">' + escapeHtml(acc.name) + ' ' + statusBadge + '</div>' +
                '<div style="font-size:0.85rem;color:var(--accent-solar);">🔢 ' + escapeHtml(acc.accountNumber) + '</div>' +
                '<div style="font-size:0.8rem;color:var(--text-secondary);">👤 ' + escapeHtml(acc.accountName) + ' • ' + acc.type.replace('_', ' ').toUpperCase() + '</div>' +
                '<div style="font-size:0.8rem;color:var(--text-secondary);margin-top:0.3rem;">📋 ' + escapeHtml(acc.instructions.substring(0, 60)) + '...</div>' +
                '</div>' +
                '<div style="display:flex;flex-direction:column;gap:0.3rem;">' +
                '<button class="btn btn-info btn-sm" onclick="editBankAccount(\'' + doc.id + '\')">✏️</button>' +
                '<button class="btn btn-warning btn-sm" onclick="toggleBankStatus(\'' + doc.id + '\',' + (acc.isActive !== false) + ')">' + (acc.isActive !== false ? '🔒' : '🔓') + '</button>' +
                '<button class="btn btn-danger btn-sm" onclick="deleteBankAccount(\'' + doc.id + '\')">🗑️</button>' +
                '</div></div>';
        });
        
        el.innerHTML = html;
    })
    .catch(function(e) {
        el.innerHTML = '<p style="color:var(--danger);text-align:center;padding:1rem;">Error: ' + e.message + '</p>';
    });
}

// Alias for navigation
function refreshBankAccounts() {
    refreshBankAccountsList();
}

// Update provider name when type changes
function updateProviderOptions() {
    var typeSelect = document.getElementById('bank-type');
    var nameField = document.getElementById('bank-name');
    var instructionsField = document.getElementById('bank-instructions');
    
    if (!typeSelect || !nameField) return;
    
    var type = typeSelect.value;
    
    if (type) {
        var info = getProviderInfo(type);
        
        // Auto-fill name if empty
        if (nameField && !nameField.value) {
            nameField.value = info.name;
        }
        
        // Auto-fill instructions if empty
        if (instructionsField && !instructionsField.value) {
            instructionsField.value = info.defaultInstructions || '';
        }
        
        // Update placeholder
        if (nameField) {
            nameField.placeholder = 'e.g., ' + info.name;
        }
    }
}

// ===== PROVIDER INFO FUNCTION =====
function getProviderInfo(type) {
    var providers = {
        // Mobile Money - Tanzania
        'mpesa': { 
            icon: '📱', 
            name: 'M-Pesa (Vodacom)', 
            color: '#e60000',
            defaultInstructions: '1. Piga *150*00# kwenye simu yako\n2. Chagua "Lipa kwa Simu"\n3. Chagua "Tuma Pesa"\n4. Weka namba: [NUMBER]\n5. Weka kiasi: [AMOUNT] TZS\n6. Weka PIN yako ya siri\n7. Thibitisha na bonyeza OK\n8. Hifadhi namba ya muamala (Transaction ID) kutoka kwenye SMS'
        },
        'tigopesa': { 
            icon: '📱', 
            name: 'Tigo Pesa', 
            color: '#0078d4',
            defaultInstructions: '1. Piga *150*01# kwenye simu yako\n2. Chagua "Tuma Pesa"\n3. Weka namba: [NUMBER]\n4. Weka kiasi: [AMOUNT] TZS\n5. Weka PIN yako ya Tigo Pesa\n6. Thibitisha maelezo yote\n7. Hifadhi namba ya muamala kutoka SMS'
        },
        'airtel_money': { 
            icon: '📱', 
            name: 'Airtel Money', 
            color: '#ff0000',
            defaultInstructions: '1. Piga *150*60# kwenye simu yako\n2. Chagua "Tuma Pesa"\n3. Weka namba: [NUMBER]\n4. Weka kiasi: [AMOUNT] TZS\n5. Weka PIN yako ya Airtel Money\n6. Thibitisha muamala\n7. Hifadhi namba ya kumbukumbu kutoka SMS'
        },
        'halopesa': { 
            icon: '📱', 
            name: 'HaloPesa (Halotel)', 
            color: '#f47920',
            defaultInstructions: '1. Piga *150*66# kwenye simu yako\n2. Chagua "Tuma Pesa"\n3. Weka namba: [NUMBER]\n4. Weka kiasi: [AMOUNT] TZS\n5. Weka PIN yako ya HaloPesa\n6. Thibitisha na tuma\n7. Hifadhi namba ya muamala kutoka SMS'
        },
        'ezypesa': { 
            icon: '📱', 
            name: 'EzyPesa (Zantel)', 
            color: '#00a651',
            defaultInstructions: '1. Piga *150*06# kwenye simu yako\n2. Chagua "Tuma Pesa"\n3. Weka namba: [NUMBER]\n4. Weka kiasi: [AMOUNT] TZS\n5. Weka PIN yako ya EzyPesa\n6. Thibitisha muamala\n7. Hifadhi namba ya kumbukumbu'
        },
        'ttcl_pesa': { 
            icon: '📱', 
            name: 'TTCL Pesa', 
            color: '#003399',
            defaultInstructions: '1. Piga *150*88# kwenye simu yako\n2. Chagua "Tuma Pesa"\n3. Weka namba: [NUMBER]\n4. Weka kiasi: [AMOUNT] TZS\n5. Weka PIN yako ya TTCL Pesa\n6. Thibitisha na tuma\n7. Hifadhi namba ya muamala'
        },
        
        // Banks - Tanzania
        'crdb': { 
            icon: '🏦', 
            name: 'CRDB Bank', 
            color: '#006633',
            defaultInstructions: '1. Ingia kwenye CRDB SimBanking au piga *150*06#\n2. Chagua "Hamisha Pesa"\n3. Weka namba ya akaunti: [NUMBER]\n4. Weka kiasi: [AMOUNT] TZS\n5. Weka kumbukumbu: "SunWealth"\n6. Weka PIN yako kuthibitisha\n7. Hifadhi namba ya muamala'
        },
        'nmb': { 
            icon: '🏦', 
            name: 'NMB Bank', 
            color: '#003366',
            defaultInstructions: '1. Ingia kwenye NMB Mkononi au piga *150*66#\n2. Chagua "Tuma Pesa"\n3. Weka namba ya akaunti: [NUMBER]\n4. Weka kiasi: [AMOUNT] TZS\n5. Weka kumbukumbu: "SunWealth"\n6. Weka PIN kuthibitisha\n7. Hifadhi namba ya muamala'
        },
        'exim': { 
            icon: '🏦', 
            name: 'Exim Bank', 
            color: '#8b0000',
            defaultInstructions: '1. Ingia kwenye Exim Bank App\n2. Chagua "Hamisha Pesa"\n3. Weka namba ya akaunti: [NUMBER]\n4. Weka kiasi: [AMOUNT] TZS\n5. Weka kumbukumbu: "SunWealth"\n6. Thibitisha muamala\n7. Hifadhi namba ya kumbukumbu'
        },
        'stanbic': { 
            icon: '🏦', 
            name: 'Stanbic Bank', 
            color: '#000080',
            defaultInstructions: '1. Ingia kwenye Stanbic Bank App\n2. Chagua "Hamisha"\n3. Weka namba ya akaunti: [NUMBER]\n4. Weka kiasi: [AMOUNT] TZS\n5. Weka kumbukumbu: "SunWealth"\n6. Thibitisha kwa PIN\n7. Hifadhi namba ya muamala'
        },
        'kcb': { 
            icon: '🏦', 
            name: 'KCB Bank', 
            color: '#006400',
            defaultInstructions: '1. Ingia kwenye KCB App\n2. Chagua "Tuma Pesa"\n3. Weka namba ya akaunti: [NUMBER]\n4. Weka kiasi: [AMOUNT] TZS\n5. Weka kumbukumbu: "SunWealth"\n6. Thibitisha kwa OTP\n7. Hifadhi namba ya muamala'
        },
        'absa': { 
            icon: '🏦', 
            name: 'ABSA Bank', 
            color: '#cd0000',
            defaultInstructions: '1. Ingia kwenye ABSA Mobile Banking\n2. Chagua "Hamisha"\n3. Weka namba ya akaunti: [NUMBER]\n4. Weka kiasi: [AMOUNT] TZS\n5. Weka kumbukumbu: "SunWealth"\n6. Thibitisha kwa PIN/OTP\n7. Hifadhi namba ya muamala'
        },
        'dtb': { 
            icon: '🏦', 
            name: 'DTB Bank', 
            color: '#00008b',
            defaultInstructions: '1. Ingia kwenye DTB Online Banking\n2. Chagua "Hamisha Pesa"\n3. Weka namba ya akaunti: [NUMBER]\n4. Weka kiasi: [AMOUNT] TZS\n5. Weka kumbukumbu: "SunWealth"\n6. Thibitisha muamala\n7. Hifadhi namba ya kumbukumbu'
        },
        'equity': { 
            icon: '🏦', 
            name: 'Equity Bank', 
            color: '#8b4513',
            defaultInstructions: '1. Ingia kwenye Equity Mobile App\n2. Chagua "Tuma Pesa"\n3. Weka namba ya akaunti: [NUMBER]\n4. Weka kiasi: [AMOUNT] TZS\n5. Weka kumbukumbu: "SunWealth"\n6. Thibitisha kwa PIN\n7. Hifadhi namba ya muamala'
        },
        'posta': { 
            icon: '🏦', 
            name: 'TPB Bank', 
            color: '#2e8b57',
            defaultInstructions: '1. Ingia kwenye TPB Mobile Banking\n2. Chagua "Hamisha"\n3. Weka namba ya akaunti: [NUMBER]\n4. Weka kiasi: [AMOUNT] TZS\n5. Weka kumbukumbu: "SunWealth"\n6. Thibitisha kwa OTP\n7. Hifadhi namba ya muamala'
        },
        
        // Cryptocurrency
        'usdt_trc20': { 
            icon: '₿', 
            name: 'USDT (TRC-20)', 
            color: '#26a17b',
            defaultInstructions: '1. Fungua crypto wallet yako (Binance, Trust Wallet, n.k.)\n2. Chagua USDT na mtandao wa TRC-20\n3. Weka anwani ya wallet: [NUMBER]\n4. Weka kiasi: [AMOUNT] USDT\n5. Thibitisha muamala\n6. Hifadhi namba ya muamala (TXID) kwa uthibitisho'
        },
        'usdt_erc20': { 
            icon: '₿', 
            name: 'USDT (ERC-20)', 
            color: '#26a17b',
            defaultInstructions: '1. Fungua crypto wallet yako\n2. Chagua USDT na mtandao wa ERC-20\n3. Weka anwani ya wallet: [NUMBER]\n4. Weka kiasi: [AMOUNT] USDT\n5. Weka gas fee inayofaa\n6. Thibitisha na hifadhi namba ya muamala'
        },
        'btc': { 
            icon: '₿', 
            name: 'Bitcoin (BTC)', 
            color: '#f7931a',
            defaultInstructions: '1. Fungua Bitcoin wallet yako\n2. Chagua "Tuma"\n3. Weka anwani ya BTC: [NUMBER]\n4. Weka kiasi: [AMOUNT] BTC\n5. Thibitisha muamala\n6. Hifadhi transaction hash (TXID)'
        }
    };
    
    return providers[type] || { 
        icon: '💳', 
        name: type.replace(/_/g, ' ').toUpperCase(), 
        color: '#888888',
        defaultInstructions: 'Tafadhali tuma malipo kwa namba/akaunti iliyotolewa na uhifadhi namba ya muamala kwa uthibitisho.'
    };
}

// ===== UPDATE PROVIDER OPTIONS =====
function updateProviderOptions() {
    var typeSelect = document.getElementById('bank-type');
    var nameField = document.getElementById('bank-name');
    var instructionsField = document.getElementById('bank-instructions');
    
    if (!typeSelect) return;
    
    var type = typeSelect.value;
    
    if (type) {
        var info = getProviderInfo(type);
        
        // Auto-fill name if empty
        if (nameField && !nameField.value) {
            nameField.value = info.name;
        }
        
        // Auto-fill instructions if empty
        if (instructionsField && !instructionsField.value) {
            instructionsField.value = info.defaultInstructions || '';
        }
        
        // Update placeholder text
        if (nameField) {
            nameField.placeholder = 'Mfano: ' + info.name;
        }
    }
}

// ===== DEPOSIT BANK SELECTION =====
var depositSelectedBank = null;
var depositCurrentStep = 1;

// Show deposit modal
function showDepositModal() {
    if (!currentUser) { 
        showToast('Please login first', 'error'); 
        return; 
    }
    
    // Reset state
    depositSelectedBank = null;
    depositCurrentStep = 1;
    
    // Pre-fill user details
    var usernameField = document.getElementById('deposit-fullname');
    var phoneField = document.getElementById('deposit-phone');
    var amountField = document.getElementById('deposit-amount-new');
    var referenceField = document.getElementById('deposit-reference-code');
    var errorDiv = document.getElementById('deposit-stepper-error');
    
    if (usernameField) usernameField.value = currentUserData ? (currentUserData.username || '') : '';
    if (phoneField) phoneField.value = currentUserData ? (currentUserData.phone || '') : '';
    if (amountField) amountField.value = '';
    if (referenceField) referenceField.value = '';
    if (errorDiv) errorDiv.style.display = 'none';
    
    // Show step 1
    depositShowStep(1);
    
    // Load bank accounts
    loadBankAccountsForDeposit();
    
    openModal('deposit-modal');
}

// Load bank accounts for deposit
function loadBankAccountsForDeposit() {
    var container = document.getElementById('bank-selector-list');
    
    // If container doesn't exist, try alternative IDs
    if (!container) {
        console.warn('bank-selector-list not found, trying alternatives...');
        container = document.getElementById('deposit-bank-list');
    }
    
    if (!container) {
        console.error('Bank selector container not found in DOM');
        return;
    }
    
    // Show loading
    container.innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:1rem;">' +
        '<span class="loading-spinner"></span> Inapakia njia za malipo...</p>';
    
    // Check if db is available
    if (!db) {
        container.innerHTML = '<p style="color:var(--danger);text-align:center;padding:1rem;">' +
            'Huduma haipatikani. Tafadhali jaribu tena baadaye.</p>';
        return;
    }
    
    // Fetch bank accounts
    db.collection('bank_accounts').get()
    .then(function(snap) {
        var accounts = [];
        snap.forEach(function(doc) {
            var data = doc.data();
            if (data.isActive !== false) {
                accounts.push({ id: doc.id, data: data });
            }
        });
        
        if (accounts.length === 0) {
            container.innerHTML = '<div style="text-align:center;padding:2rem;">' +
                '<p style="color:var(--text-secondary);margin-bottom:0.5rem;">😔 Hakuna njia za malipo kwa sasa.</p>' +
                '<p style="color:var(--text-secondary);font-size:0.85rem;">Tafadhali wasiliana na msimamizi.</p>' +
                '</div>';
            
            var nextBtn = document.getElementById('deposit-step1-next');
            if (nextBtn) nextBtn.disabled = true;
            return;
        }
        
        var html = '';
        for (var i = 0; i < accounts.length; i++) {
            var acc = accounts[i].data;
            var providerInfo = getProviderInfo(acc.type);
            var icon = providerInfo.icon;
            var color = providerInfo.color;
            
            html += '<div class="bank-card-select" ' +
                'onclick="selectDepositBank(\'' + accounts[i].id + '\')" ' +
                'id="deposit-bank-' + accounts[i].id + '" ' +
                'style="border:1px solid var(--border-subtle);border-radius:8px;padding:0.8rem;margin-bottom:0.5rem;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:0.8rem;">' +
                '<div style="font-size:1.8rem;width:45px;text-align:center;color:' + color + ';">' + icon + '</div>' +
                '<div style="flex:1;">' +
                '<div style="font-weight:600;">' + escapeHtml(acc.name) + '</div>' +
                '<div style="font-size:0.8rem;color:var(--accent-solar);">' + escapeHtml(acc.accountNumber) + '</div>' +
                '<div style="font-size:0.75rem;color:var(--text-secondary);">' + escapeHtml(acc.accountName) + '</div>' +
                '</div>' +
                '<div style="color:var(--accent-solar);font-size:1.2rem;display:none;" class="bank-check-mark">✓</div>' +
                '</div>';
        }
        
        container.innerHTML = html;
        
        var nextBtn = document.getElementById('deposit-step1-next');
        if (nextBtn) nextBtn.disabled = true;
        
        console.log('✅ Loaded ' + accounts.length + ' payment methods');
    })
    .catch(function(e) {
        console.error('❌ Bank load error:', e.message);
        container.innerHTML = '<p style="color:var(--danger);text-align:center;padding:1rem;">' +
            '⚠️ Imeshindwa kupakia njia za malipo.<br><small>' + e.message + '</small></p>';
    });
}

// Select bank for deposit
function selectDepositBank(id) {
    // Remove selection from all cards
    var cards = document.querySelectorAll('.bank-card-select');
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.borderColor = 'var(--border-subtle)';
        cards[i].style.background = 'transparent';
        var checkMark = cards[i].querySelector('.bank-check-mark');
        if (checkMark) checkMark.style.display = 'none';
    }
    
    // Highlight selected card
    var selectedCard = document.getElementById('deposit-bank-' + id);
    if (selectedCard) {
        selectedCard.style.borderColor = 'var(--accent-solar)';
        selectedCard.style.background = 'rgba(0, 230, 118, 0.08)';
        var check = selectedCard.querySelector('.bank-check-mark');
        if (check) check.style.display = 'block';
    }
    
    // Find the bank account
    db.collection('bank_accounts').doc(id).get()
    .then(function(doc) {
        if (doc.exists) {
            depositSelectedBank = { id: doc.id, data: doc.data() };
            
            // Enable next button
            var nextBtn = document.getElementById('deposit-step1-next');
            if (nextBtn) nextBtn.disabled = false;
            
            console.log('✅ Selected:', depositSelectedBank.data.name);
        }
    })
    .catch(function(e) {
        console.error('❌ Select bank error:', e.message);
        showToast('Imeshindwa kuchagua njia ya malipo', 'error');
    });
}

// Show deposit step
function depositShowStep(step) {
    depositCurrentStep = step;
    
    // Hide all steps
    for (var i = 1; i <= 4; i++) {
        var content = document.getElementById('deposit-step-' + i);
        if (content) content.style.display = 'none';
    }
    
    // Show current step
    var currentContent = document.getElementById('deposit-step-' + step);
    if (currentContent) currentContent.style.display = 'block';
    
    // Update step indicators
    var indicators = document.querySelectorAll('#deposit-modal .step-indicator');
    for (var j = 0; j < indicators.length; j++) {
        var stepNum = parseInt(indicators[j].getAttribute('data-step'));
        indicators[j].classList.remove('active', 'completed');
        if (stepNum === step) {
            indicators[j].classList.add('active');
        } else if (stepNum < step) {
            indicators[j].classList.add('completed');
        }
    }
    
    // Update step 3 with payment instructions
    if (step === 3 && depositSelectedBank) {
        var acc = depositSelectedBank.data;
        var providerInfo = getProviderInfo(acc.type);
        var icon = providerInfo.icon;
        var color = providerInfo.color;
        
        var bankIcon = document.getElementById('deposit-bank-icon');
        var instructionsContent = document.getElementById('deposit-instructions-content');
        
        if (bankIcon) {
            bankIcon.textContent = icon;
            bankIcon.style.color = color;
        }
        
        if (instructionsContent) {
            // Replace placeholders with actual values
            var instructions = (acc.instructions || providerInfo.defaultInstructions || '')
                .replace(/\[NUMBER\]/g, acc.accountNumber)
                .replace(/\[AMOUNT\]/g, document.getElementById('deposit-amount-new').value || '[KIASI]')
                .replace(/\[ACCOUNT_NAME\]/g, acc.accountName);
            
            instructionsContent.innerHTML = 
                '<p style="margin-bottom:0.5rem;"><strong>Tuma malipo kwa:</strong></p>' +
                '<p style="font-size:1.1rem;font-weight:700;">' + escapeHtml(acc.name) + '</p>' +
                '<p>👤 <strong>Jina la Akaunti:</strong> ' + escapeHtml(acc.accountName) + '</p>' +
                '<p>🔢 <strong>Namba:</strong> <span style="color:var(--accent-solar);font-size:1.1rem;font-weight:700;">' + escapeHtml(acc.accountNumber) + '</span></p>' +
                '<hr style="border-color:var(--border-subtle);margin:0.8rem 0;">' +
                '<p style="font-size:0.85rem;white-space:pre-line;"><strong>📋 Maelekezo:</strong><br>' + escapeHtml(instructions) + '</p>';
        }
    }
    
    // Update step 4 with summary
    if (step === 4) {
        var amount = parseInt(document.getElementById('deposit-amount-new').value) || 0;
        
        var confirmName = document.getElementById('confirm-deposit-name');
        var confirmPhone = document.getElementById('confirm-deposit-phone');
        var confirmBank = document.getElementById('confirm-deposit-bank');
        var confirmAmount = document.getElementById('confirm-deposit-amount');
        
        if (confirmName) confirmName.textContent = document.getElementById('deposit-fullname').value || '-';
        if (confirmPhone) confirmPhone.textContent = document.getElementById('deposit-phone').value || '-';
        if (confirmBank) confirmBank.textContent = depositSelectedBank ? depositSelectedBank.data.name : '-';
        if (confirmAmount) confirmAmount.textContent = formatCurrency(amount);
    }
}

// Navigate between steps
function depositGoToStep(step) {
    // Validate before proceeding
    if (step === 2 && !depositSelectedBank) {
        showToast('Tafadhali chagua njia ya malipo kwanza', 'error');
        return;
    }
    
    if (step === 3) {
        var name = document.getElementById('deposit-fullname').value.trim();
        var phone = document.getElementById('deposit-phone').value.trim();
        var amount = parseInt(document.getElementById('deposit-amount-new').value);
        
        if (!name) {
            showToast('Tafadhali jaza jina lako kamili', 'error');
            return;
        }
        if (!phone) {
            showToast('Tafadhali jaza namba yako ya simu', 'error');
            return;
        }
        if (!amount || amount < 7000) {
            showToast('Kiasi cha chini ni TZS 7,000', 'error');
            return;
        }
    }
    
    depositShowStep(step);
}

// Submit deposit from stepper
function submitStepperDeposit(event) {
    event.preventDefault();
    
    var amount = parseInt(document.getElementById('deposit-amount-new').value);
    var reference = document.getElementById('deposit-reference-code').value.trim();
    var username = document.getElementById('deposit-fullname').value.trim();
    var phone = document.getElementById('deposit-phone').value.trim();
    var err = document.getElementById('deposit-stepper-error');
    if (err) err.style.display = 'none';
    
    if (!reference) {
        if (err) { 
            err.textContent = 'Tafadhali weka namba ya muamala (Transaction ID)'; 
            err.style.display = 'block'; 
        }
        return;
    }
    
    if (!depositSelectedBank) {
        if (err) { 
            err.textContent = 'Hakuna njia ya malipo iliyochaguliwa'; 
            err.style.display = 'block'; 
        }
        return;
    }
    
    var bank = depositSelectedBank.data;
    
    // Show loading
    var submitBtn = document.querySelector('#deposit-step-4 button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Inatuma...';
    }
    
    // Create transaction
    db.collection('transactions').add({
        user_id: currentUser.uid,
        type: 'deposit',
        amount: amount,
        payment_method: bank.type,
        bank_name: bank.name,
        bank_account: bank.accountNumber,
        bank_account_name: bank.accountName,
        transaction_reference: reference,
        depositor_name: username,
        depositor_phone: phone,
        status: 'pending',
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        processed_at: null,
        user_email: currentUser.email,
        user_name: currentUserData ? currentUserData.username : currentUser.email
    })
    .then(function() {
        // Log activity
        try {
            db.collection('activity_logs').add({
                message: (currentUserData ? currentUserData.username : 'Mtumiaji') + ' ameweka amana ya ' + formatCurrency(amount) + ' kupitia ' + bank.name,
                type: 'deposit',
                amount: amount,
                created_at: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch(e) {}
        
        // Add to ticker
        if (typeof addTickerMessage === 'function') {
            addTickerMessage({
                icon: '💎',
                message: 'Amana mpya ya',
                amount: amount,
                username: currentUserData ? currentUserData.username : 'Mtumiaji',
                time: 'Sasa hivi'
            });
        }
        
        closeModal('deposit-modal');
        showToast('Amana ya ' + formatCurrency(amount) + ' imetumwa! 🎉\nInasubiri kuidhinishwa.', 'success');
        
        // Refresh wallet
        if (typeof refreshWallet === 'function') refreshWallet();
    })
    .catch(function(error) {
        console.error('Deposit error:', error);
        if (err) { 
            err.textContent = 'Imeshindwa kutuma. Tafadhali jaribu tena.'; 
            err.style.display = 'block'; 
        }
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = '✅ Thibitisha Amana';
        }
    });
}

// Alias for backward compatibility
function updateUIForLoggedIn() {
    updateUIForLoggedInUser();
}

function refreshSocialLinksAdmin() {
    var container = document.getElementById('social-links-admin-list');
    if (!container) return;
    
    container.innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:1rem;">' +
        '<i class="fas fa-spinner fa-spin"></i> Loading social links...</p>';
    
    db.collection('social_links').get()
    .then(function(snap) {
        if (snap.empty) {
            container.innerHTML = '<div style="text-align:center;padding:2rem;">' +
                '<p style="color:var(--text-secondary);margin-bottom:1rem;">No social links added yet.</p>' +
                '<button class="btn btn-primary btn-sm" onclick="showAddSocialLinkModal()">' +
                '<i class="fas fa-plus"></i> Add First Link</button></div>';
            return;
        }
        
        var html = '';
        snap.forEach(function(doc) {
            var data = doc.data();
            var icon = data.icon_class || 'fas fa-link';
            var color = socialColorMap[data.type] || '#888';
            var statusBadge = data.status === 'active' ? 
                '<span class="badge-active">Active</span>' : 
                '<span class="badge-inactive">Inactive</span>';
            
            html += '<div style="border:1px solid var(--border-subtle);border-radius:10px;padding:1rem;margin-bottom:0.8rem;display:flex;align-items:center;gap:1rem;">' +
                '<div style="font-size:2rem;min-width:50px;text-align:center;color:' + color + ';">' +
                    '<i class="' + icon + '"></i>' +
                '</div>' +
                '<div style="flex:1;">' +
                    '<div style="font-weight:600;">' + escapeHtml(data.title) + ' ' + statusBadge + '</div>' +
                    '<div style="font-size:0.8rem;color:var(--text-secondary);">' + escapeHtml(data.url) + '</div>' +
                    '<div style="font-size:0.75rem;color:var(--text-secondary);">Type: ' + data.type + ' | Icon: ' + data.icon_class + '</div>' +
                '</div>' +
                '<div style="display:flex;flex-direction:column;gap:0.3rem;">' +
                    '<button class="btn btn-info btn-sm" onclick="editSocialLink(\'' + doc.id + '\')" title="Edit">' +
                        '<i class="fas fa-edit"></i>' +
                    '</button>' +
                    '<button class="btn btn-warning btn-sm" onclick="toggleSocialLinkStatus(\'' + doc.id + '\', \'' + data.status + '\')" title="Toggle">' +
                        (data.status === 'active' ? '<i class="fas fa-toggle-on"></i>' : '<i class="fas fa-toggle-off"></i>') +
                    '</button>' +
                    '<button class="btn btn-danger btn-sm" onclick="deleteSocialLink(\'' + doc.id + '\')" title="Delete">' +
                        '<i class="fas fa-trash"></i>' +
                    '</button>' +
                '</div>' +
                '</div>';
        });
        
        container.innerHTML = html;
    })
    .catch(function(e) {
        container.innerHTML = '<p style="color:var(--danger);text-align:center;padding:1rem;">Error: ' + e.message + '</p>';
    });
}

// Show add social link modal
function showAddSocialLinkModal() {
    // Reset form
    document.getElementById('social-link-modal-title').innerHTML = '<i class="fas fa-plus-circle"></i> Add Social Link';
    document.getElementById('social-link-edit-id').value = '';
    document.getElementById('social-link-form').reset();
    document.getElementById('social-link-active').checked = true;
    
    // Clear error
    var err = document.getElementById('social-link-error');
    if (err) err.style.display = 'none';
    
    // Reset icon preview
    var preview = document.getElementById('social-icon-preview');
    if (preview) preview.innerHTML = '<i class="fas fa-question-circle"></i>';
    
    openModal('social-link-modal');
}

// Edit social link
function editSocialLink(id) {
    db.collection('social_links').doc(id).get()
    .then(function(doc) {
        if (!doc.exists) {
            showToast('Social link not found', 'error');
            return;
        }
        
        var data = doc.data();
        
        document.getElementById('social-link-modal-title').innerHTML = '<i class="fas fa-edit"></i> Edit Social Link';
        document.getElementById('social-link-edit-id').value = id;
        document.getElementById('social-link-title').value = data.title || '';
        document.getElementById('social-link-description').value = data.description || '';
        document.getElementById('social-link-url').value = data.url || '';
        document.getElementById('social-link-type').value = data.type || '';
        document.getElementById('social-link-icon').value = data.icon_class || '';
        document.getElementById('social-link-active').checked = data.status === 'active';
        
        var err = document.getElementById('social-link-error');
        if (err) err.style.display = 'none';
        
        // Update icon preview
        updateSocialIconPreview(data.icon_class || 'fas fa-link');
        
        openModal('social-link-modal');
    })
    .catch(function(e) {
        showToast('Error loading: ' + e.message, 'error');
    });
}

// Update icon when type changes
function updateSocialIcon() {
    var type = document.getElementById('social-link-type').value;
    var iconField = document.getElementById('social-link-icon');
    
    if (type && socialIconMap[type]) {
        iconField.value = socialIconMap[type];
        updateSocialIconPreview(socialIconMap[type]);
    }
}

// Update icon preview
function updateSocialIconPreview(iconClass) {
    var preview = document.getElementById('social-icon-preview');
    if (preview) {
        preview.innerHTML = '<i class="' + iconClass + '" style="font-size:1.5rem;"></i>';
    }
}

// Save social link
function saveSocialLink(event) {
    event.preventDefault();
    
    var editId = document.getElementById('social-link-edit-id').value;
    var title = document.getElementById('social-link-title').value.trim();
    var description = document.getElementById('social-link-description').value.trim();
    var url = document.getElementById('social-link-url').value.trim();
    var type = document.getElementById('social-link-type').value;
    var iconClass = document.getElementById('social-link-icon').value.trim();
    var isActive = document.getElementById('social-link-active').checked;
    var err = document.getElementById('social-link-error');
    
    if (err) err.style.display = 'none';
    
    // Validation
    if (!title) {
        if (err) { err.textContent = 'Title is required'; err.style.display = 'block'; }
        return;
    }
    if (!url) {
        if (err) { err.textContent = 'URL is required'; err.style.display = 'block'; }
        return;
    }
    if (!type) {
        if (err) { err.textContent = 'Type is required'; err.style.display = 'block'; }
        return;
    }
    if (!iconClass) {
        if (err) { err.textContent = 'Icon class is required'; err.style.display = 'block'; }
        return;
    }
    
    var linkData = {
        title: title,
        description: description,
        url: url,
        type: type,
        icon_class: iconClass,
        status: isActive ? 'active' : 'inactive',
        updated_at: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    var promise;
    if (editId) {
        // Update existing
        promise = db.collection('social_links').doc(editId).update(linkData);
    } else {
        // Add new
        linkData.created_at = firebase.firestore.FieldValue.serverTimestamp();
        promise = db.collection('social_links').add(linkData);
    }
    
    promise.then(function() {
        closeModal('social-link-modal');
        showToast('<i class="fas fa-check-circle"></i> Social link saved!', 'success');
        refreshSocialLinksAdmin();
    })
    .catch(function(e) {
        if (err) { 
            err.textContent = 'Error: ' + e.message; 
            err.style.display = 'block'; 
        }
        console.error('Save social link error:', e);
    });
}

// Delete social link
function deleteSocialLink(id) {
    if (!confirm('Are you sure you want to delete this social link? This cannot be undone.')) return;
    
    db.collection('social_links').doc(id).delete()
    .then(function() {
        showToast('<i class="fas fa-trash"></i> Social link deleted', 'warning');
        refreshSocialLinksAdmin();
    })
    .catch(function(e) {
        showToast('Error: ' + e.message, 'error');
    });
}

// Toggle social link status
function toggleSocialLinkStatus(id, currentStatus) {
    var newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    var action = newStatus === 'active' ? 'activated' : 'deactivated';
    
    db.collection('social_links').doc(id).update({
        status: newStatus,
        updated_at: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function() {
        showToast('Social link ' + action, 'success');
        refreshSocialLinksAdmin();
    })
    .catch(function(e) {
        showToast('Error: ' + e.message, 'error');
    });
}

// Social icon type mapping (must be before these functions)
var socialIconMap = {
    'whatsapp': 'fab fa-whatsapp',
    'telegram': 'fab fa-telegram-plane',
    'facebook': 'fab fa-facebook',
    'instagram': 'fab fa-instagram',
    'twitter': 'fab fa-x-twitter',
    'tiktok': 'fab fa-tiktok',
    'youtube': 'fab fa-youtube',
    'linkedin': 'fab fa-linkedin',
    'phone': 'fas fa-phone',
    'sms': 'fas fa-sms',
    'email': 'fas fa-envelope',
    'website': 'fas fa-globe',
    'discord': 'fab fa-discord',
    'other': 'fas fa-link'
};

var socialColorMap = {
    'whatsapp': '#25D366',
    'telegram': '#0088cc',
    'facebook': '#1877F2',
    'instagram': '#E4405F',
    'twitter': '#000000',
    'tiktok': '#000000',
    'youtube': '#FF0000',
    'linkedin': '#0A66C2',
    'phone': '#4CAF50',
    'sms': '#FF9800',
    'email': '#EA4335',
    'website': '#2196F3',
    'discord': '#5865F2',
    'other': '#9E9E9E'
};

// Refresh social links admin list
function refreshSocialLinksAdmin() {
    var container = document.getElementById('social-links-admin-list');
    if (!container) return;
    
    container.innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:1rem;">' +
        '<i class="fas fa-spinner fa-spin"></i> Loading social links...</p>';
    
    db.collection('social_links').get()
    .then(function(snap) {
        if (snap.empty) {
            container.innerHTML = '<div style="text-align:center;padding:2rem;">' +
                '<p style="font-size:3rem;"><i class="fas fa-share-alt"></i></p>' +
                '<p style="color:var(--text-secondary);margin-bottom:1rem;">No social links added yet.</p>' +
                '<button class="btn btn-primary" onclick="showAddSocialLinkModal()">' +
                '<i class="fas fa-plus"></i> Add Social Link</button></div>';
            return;
        }
        
        var html = '';
        snap.forEach(function(doc) {
            var data = doc.data();
            var icon = data.icon_class || 'fas fa-link';
            var color = socialColorMap[data.type] || '#888';
            var statusBadge = data.status === 'active' ? 
                '<span class="badge-active">Active</span>' : 
                '<span class="badge-inactive">Inactive</span>';
            
            html += '<div style="border:1px solid var(--border-subtle);border-radius:10px;padding:1rem;margin-bottom:0.8rem;display:flex;align-items:center;gap:1rem;">' +
                '<div style="font-size:2rem;min-width:50px;text-align:center;color:' + color + ';">' +
                    '<i class="' + icon + '"></i>' +
                '</div>' +
                '<div style="flex:1;">' +
                    '<div style="font-weight:600;">' + escapeHtml(data.title) + ' ' + statusBadge + '</div>' +
                    '<div style="font-size:0.8rem;color:var(--text-secondary);word-break:break-all;">' + escapeHtml(data.url) + '</div>' +
                    '<div style="font-size:0.75rem;color:var(--text-secondary);">Type: ' + data.type + '</div>' +
                '</div>' +
                '<div style="display:flex;flex-direction:column;gap:0.3rem;">' +
                    '<button class="btn btn-info btn-sm" onclick="editSocialLink(\'' + doc.id + '\')" title="Edit">' +
                        '<i class="fas fa-edit"></i></button>' +
                    '<button class="btn btn-warning btn-sm" onclick="toggleSocialLinkStatus(\'' + doc.id + '\', \'' + data.status + '\')" title="Toggle">' +
                        (data.status === 'active' ? '<i class="fas fa-toggle-on"></i>' : '<i class="fas fa-toggle-off"></i>') + '</button>' +
                    '<button class="btn btn-danger btn-sm" onclick="deleteSocialLink(\'' + doc.id + '\')" title="Delete">' +
                        '<i class="fas fa-trash"></i></button>' +
                '</div>' +
                '</div>';
        });
        
        container.innerHTML = html;
    })
    .catch(function(e) {
        container.innerHTML = '<p style="color:var(--danger);text-align:center;padding:1rem;">' +
            '<i class="fas fa-exclamation-triangle"></i> Error loading: ' + e.message + '</p>';
    });
}

// Escape HTML helper
function escapeHtml(text) {
    if (!text) return '';
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== SOCIAL POPUP STATE =====
var socialPopupInterval = null;
var socialPopupDismissed = false;
var allLinksVerified = false;
var verifiedCount = 0;
var totalLinksCount = 0;
var isSocialPopupVisible = false;

function resetSocialPopupState() {
    stopSocialPopup();
    socialPopupDismissed = false;
    allLinksVerified = false;
    verifiedCount = 0;
    totalLinksCount = 0;
    isSocialPopupVisible = false;
    console.log('🔄 Social popup state reset');
}

function startSocialPopup() {
    if (!currentUser || !currentUserData) return;
    if (currentUserData.role !== 'user') return;
    if (allLinksVerified) return;
    
    console.log('🔔 Social popup started for @' + currentUserData.username);
    
    // Check immediately
    checkAndShowSocialPopup();
    
    // Clear existing interval
    if (socialPopupInterval) clearInterval(socialPopupInterval);
    
    // Set 3-minute interval
    socialPopupInterval = setInterval(function() {
        checkAndShowSocialPopup();
    }, 3 * 60 * 1000);
}

function stopSocialPopup() {
    if (socialPopupInterval) {
        clearInterval(socialPopupInterval);
        socialPopupInterval = null;
        console.log('🛑 Social popup stopped');
    }
}

// Check if user needs to verify social links and show popup
function checkAndShowSocialPopup() {
    // Don't check if conditions aren't met
    if (!currentUser || socialPopupDismissed || allLinksVerified) {
        return;
    }
    if (isSocialPopupVisible) {
        console.log('⏸️ Popup already visible, skipping check');
        return;
    }
    
    console.log('🔍 Checking social links for verification...');
    
    // Get all active social links
    db.collection('social_links')
        .where('status', '==', 'active')
        .get()
        .then(function(linksSnap) {
            // If no active links, stop the popup system
            if (linksSnap.empty) {
                console.log('✅ No active social links found');
                allLinksVerified = true;
                stopSocialPopup();
                return;
            }
            
            totalLinksCount = linksSnap.size;
            var activeLinks = [];
            linksSnap.forEach(function(doc) {
                activeLinks.push({ id: doc.id, data: doc.data() });
            });
            
            // Get all verified follows for this user
            return db.collection('user_follows')
                .where('user_id', '==', currentUser.uid)
                .where('is_verified', '==', true)
                .get()
                .then(function(followSnap) {
                    var verifiedIds = {};
                    followSnap.forEach(function(doc) {
                        verifiedIds[doc.data().social_link_id] = true;
                    });
                    
                    // Find unverified links
                    var unverifiedLinks = [];
                    for (var i = 0; i < activeLinks.length; i++) {
                        if (!verifiedIds[activeLinks[i].id]) {
                            unverifiedLinks.push(activeLinks[i]);
                        }
                    }
                    
                    verifiedCount = totalLinksCount - unverifiedLinks.length;
                    
                    console.log('📊 Social links: ' + verifiedCount + '/' + totalLinksCount + ' verified');
                    
                    // If all verified, stop the popup
                    if (unverifiedLinks.length === 0) {
                        console.log('🎉 All social links verified!');
                        allLinksVerified = true;
                        stopSocialPopup();
                        return;
                    }
                    
                    // Show popup with unverified links
                    console.log('📢 Showing popup with ' + unverifiedLinks.length + ' unverified links');
                    showSocialPopupModal(unverifiedLinks);
                });
        })
        .catch(function(e) {
            console.warn('⚠️ Social check error:', e.message);
            // If permission error, stop trying
            if (e.code === 'permission-denied') {
                console.log('🛑 Stopping social popup due to permission error');
                stopSocialPopup();
            }
        });
}

// Show the social popup modal
function showSocialPopupModal(unverifiedLinks) {
    if (socialPopupDismissed || isSocialPopupVisible) return;
    
    var container = document.getElementById('social-popup-list');
    if (!container) {
        console.warn('⚠️ Social popup container not found in DOM');
        return;
    }
    
    isSocialPopupVisible = true;
    
    var html = '';
    for (var i = 0; i < unverifiedLinks.length; i++) {
        var link = unverifiedLinks[i];
        var data = link.data;
        var icon = data.icon_class || 'fas fa-link';
        var color = (typeof socialColorMap !== 'undefined' && socialColorMap[data.type]) ? socialColorMap[data.type] : '#888';
        
        html += '<div class="social-popup-item" id="social-item-' + link.id + '" ' +
            'style="border:1px solid var(--border-subtle);border-radius:10px;padding:1rem;margin-bottom:0.8rem;' +
            'display:flex;align-items:center;gap:1rem;transition:all 0.3s ease;">' +
            
            // Icon
            '<div style="font-size:2rem;min-width:50px;text-align:center;color:' + color + ';">' +
            '<i class="' + icon + '"></i>' +
            '</div>' +
            
            // Info
            '<div style="flex:1;">' +
            '<div style="font-weight:600;margin-bottom:0.2rem;">' + escapeHtml(data.title) + '</div>' +
            (data.description ? '<div style="font-size:0.8rem;color:var(--text-secondary);">' + escapeHtml(data.description) + '</div>' : '') +
            '</div>' +
            
            // Follow Button
            '<button class="btn btn-primary btn-sm social-follow-btn" ' +
            'onclick="verifySocialLinkNow(\'' + link.id + '\', \'' + encodeURIComponent(data.url || '') + '\', this)" ' +
            'style="background:' + color + ';border-color:' + color + ';white-space:nowrap;min-width:130px;">' +
            '<i class="' + icon + '"></i> Follow & Verify' +
            '</button>' +
            '</div>';
    }
    
    container.innerHTML = html;
    
    // Update progress
    updateSocialProgress(verifiedCount, totalLinksCount);
    
    // Show modal
    openModal('social-verify-modal');
    
    console.log('📢 Social popup modal shown');
}

// Verify a social link
function verifySocialLinkNow(linkId, encodedUrl, buttonElement) {
    console.log('✅ Verifying social link:', linkId);
    
    // Decode and open URL
    var url = decodeURIComponent(encodedUrl);
    if (url && url !== 'undefined' && url !== '') {
        window.open(url, '_blank');
    }
    
    // Save verification to Firestore
    db.collection('user_follows').add({
            user_id: currentUser.uid,
            social_link_id: linkId,
            is_verified: true,
            verified_at: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function() {
            console.log('✅ Link saved to database');
            
            // Update button appearance
            if (buttonElement) {
                buttonElement.innerHTML = '<i class="fas fa-check-circle"></i> Verified!';
                buttonElement.style.background = 'var(--accent-solar)';
                buttonElement.style.borderColor = 'var(--accent-solar)';
                buttonElement.disabled = true;
                buttonElement.style.opacity = '0.8';
                buttonElement.style.cursor = 'default';
            }
            
            // Fade out the item
            var item = document.getElementById('social-item-' + linkId);
            if (item) {
                item.style.opacity = '0.5';
                item.style.transform = 'scale(0.95)';
                setTimeout(function() {
                    if (item) item.style.display = 'none';
                }, 500);
            }
            
            // Update count
            verifiedCount++;
            updateSocialProgress(verifiedCount, totalLinksCount);
            
            // Check if all links are now verified
            setTimeout(function() {
                var remainingItems = document.querySelectorAll('.social-popup-item:not([style*="display: none"])');
                if (remainingItems.length === 0) {
                    allLinksVerified = true;
                    stopSocialPopup();
                    isSocialPopupVisible = false;
                    closeModal('social-verify-modal');
                    showToast('🎉 Hongera! Umeungana nasi kwenye mitandao yote!', 'success');
                }
            }, 600);
        })
        .catch(function(e) {
            console.error('❌ Verification save error:', e);
            // Still update UI even if save fails
            if (buttonElement) {
                buttonElement.innerHTML = '<i class="fas fa-check-circle"></i> Verified!';
                buttonElement.style.background = 'var(--accent-solar)';
                buttonElement.disabled = true;
            }
        });
}

// Update progress display
function updateSocialProgress(verified, total) {
    var progressText = document.getElementById('social-progress-text');
    var progressFill = document.getElementById('social-progress-fill');
    
    if (progressText) {
        progressText.textContent = verified + '/' + total + ' Verified';
    }
    if (progressFill) {
        var percent = total > 0 ? (verified / total) * 100 : 0;
        progressFill.style.width = percent + '%';
    }
}

// Skip social verification
function skipSocialVerification() {
    socialPopupDismissed = true;
    isSocialPopupVisible = false;
    closeModal('social-verify-modal');
    console.log('⏭️ Social verification skipped by user');
}

// Stop social popup interval
function stopSocialPopup() {
    if (socialPopupInterval) {
        clearInterval(socialPopupInterval);
        socialPopupInterval = null;
        console.log('🛑 Social popup interval cleared');
    }
}

// Clean up on page unload
window.addEventListener('beforeunload', function() {
    stopSocialPopup();
});

// Close social verify modal
function closeSocialVerifyModal() {
    closeModal('social-verify-modal');
    isSocialPopupVisible = false;
}

 // ===== SOLAR PROJECTS SLIDESHOW - WITH YOUTUBE AUTO-PLAY =====
var currentSlide = 0;
var slideInterval = null;
var solarProjects = [];
var youtubePlayers = {};

// Load YouTube API
function loadYouTubeAPI() {
    if (document.getElementById('youtube-api')) return;
    
    var tag = document.createElement('script');
    tag.id = 'youtube-api';
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// YouTube API ready callback
function onYouTubeIframeAPIReady() {
    console.log('✅ YouTube API ready');
    // Reload slideshow with YouTube support
    if (solarProjects.length > 0) {
        buildSlideshowHTML();
    }
}

function loadSolarSlideshow() {
    var wrapper = document.getElementById('slides-wrapper');
    var dotsContainer = document.getElementById('slide-dots');
    var loading = document.getElementById('slideshow-loading');
    
    if (!wrapper) return;
    if (!db) { setTimeout(loadSolarSlideshow, 1000); return; }
    
    // Load YouTube API first
    loadYouTubeAPI();
    
    db.collection('solar_projects')
        .where('status', '==', 'active')
        .orderBy('order', 'asc')
        .get()
    .then(function(snap) {
        solarProjects = [];
        snap.forEach(function(doc) {
            solarProjects.push({ id: doc.id, data: doc.data() });
        });
        
        if (loading) loading.style.display = 'none';
        
        if (solarProjects.length === 0) {
            showDefaultSlide(wrapper, dotsContainer);
            return;
        }
        
        buildSlideshowHTML(wrapper, dotsContainer);
    })
    .catch(function(e) {
        console.error('Slideshow error:', e.message);
        if (loading) loading.innerHTML = '<p style="color:var(--danger);padding:2rem;">⚠️ Imeshindwa kupakia</p>';
    });
}

// Extract YouTube video ID from URL
function getYouTubeVideoId(url) {
    if (!url) return null;
    
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    
    if (match && match[2].length === 11) {
        return match[2];
    }
    return null;
}

// Build slideshow HTML
function buildSlideshowHTML(wrapper, dotsContainer) {
    if (!wrapper) wrapper = document.getElementById('slides-wrapper');
    if (!dotsContainer) dotsContainer = document.getElementById('slide-dots');
    
    if (!wrapper) return;
    
    var slidesHtml = '';
    var dotsHtml = '';
    
    for (var i = 0; i < solarProjects.length; i++) {
        var p = solarProjects[i].data;
        var youtubeId = getYouTubeVideoId(p.youtube_url);
        var hasVideo = p.video_url && p.video_url.length > 5;
        
        slidesHtml += '<div class="slide-item" id="slide-' + i + '" style="' + (i === 0 ? '' : 'display:none;') + '">';
        
        // Check if YouTube video
        if (youtubeId) {
            // YouTube iframe
            slidesHtml += 
                '<div id="youtube-player-' + i + '" style="width:100%;height:100%;position:absolute;top:0;left:0;"></div>' +
                '<img src="https://img.youtube.com/vi/' + youtubeId + '/maxresdefault.jpg" ' +
                    'id="youtube-fallback-' + i + '" ' +
                    'style="display:none;width:100%;height:100%;object-fit:cover;" ' +
                    'onerror="this.src=\'https://img.youtube.com/vi/' + youtubeId + '/hqdefault.jpg\'">';
        } else if (hasVideo) {
            // Regular video
            slidesHtml += 
                '<video ' + (i === 0 ? 'autoplay ' : '') + 'muted loop playsinline style="width:100%;height:100%;object-fit:cover;" ' +
                'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\';">' +
                '<source src="' + escapeHtml(p.video_url) + '" type="video/mp4">' +
                '</video>' +
                '<img src="' + escapeHtml(p.image_url) + '" style="display:none;width:100%;height:100%;object-fit:cover;" ' +
                'onerror="this.src=\'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=400&fit=crop\'">';
        } else {
            // Image only
            slidesHtml += 
                '<img src="' + escapeHtml(p.image_url) + '" style="width:100%;height:100%;object-fit:cover;" ' +
                'onerror="this.src=\'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=400&fit=crop\'">';
        }
        
        // Overlay with buttons
        slidesHtml +=
            '<div class="slide-overlay">' +
                '<h3>' + escapeHtml(p.title) + '</h3>' +
                '<p>' + escapeHtml((p.description || '').substring(0, 120)) + '</p>' +
                '<div class="slide-buttons">' +
                    (p.link_url ? '<a href="' + escapeHtml(p.link_url) + '" target="_blank" class="slide-btn"><i class="fas fa-external-link-alt"></i> Tembelea</a> ' : '') +
                    (p.youtube_url ? '<a href="' + escapeHtml(p.youtube_url) + '" target="_blank" class="slide-btn"><i class="fab fa-youtube"></i> YouTube</a> ' : '') +
                    (p.video_url && !youtubeId ? '<a href="' + escapeHtml(p.video_url) + '" target="_blank" class="slide-btn"><i class="fas fa-play"></i> Video</a>' : '') +
                '</div>' +
            '</div></div>';
        
        dotsHtml += '<span class="slide-dot' + (i === 0 ? ' active' : '') + '" onclick="goToSlide(' + i + ')"></span>';
    }
    
    wrapper.innerHTML = slidesHtml;
    if (dotsContainer) dotsContainer.innerHTML = dotsHtml;
    
    currentSlide = 0;
    
    // Initialize YouTube players after DOM is updated
    setTimeout(function() {
        initializeYouTubePlayers();
        startSlideAutoPlay();
    }, 500);
    
    console.log('✅ Slideshow built: ' + solarProjects.length + ' slides');
}

// Initialize YouTube players
function initializeYouTubePlayers() {
    // Destroy existing players
    for (var key in youtubePlayers) {
        if (youtubePlayers[key]) {
            youtubePlayers[key].destroy();
            delete youtubePlayers[key];
        }
    }
    
    // Create players for YouTube slides
    for (var i = 0; i < solarProjects.length; i++) {
        var youtubeId = getYouTubeVideoId(solarProjects[i].data.youtube_url);
        
        if (youtubeId) {
            createYouTubePlayer(i, youtubeId);
        }
    }
}

// Create YouTube player for a slide
function createYouTubePlayer(slideIndex, videoId) {
    var playerId = 'youtube-player-' + slideIndex;
    var container = document.getElementById(playerId);
    
    if (!container) return;
    
    try {
        youtubePlayers[slideIndex] = new YT.Player(playerId, {
            videoId: videoId,
            playerVars: {
                autoplay: slideIndex === 0 ? 1 : 0,
                controls: 0,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                mute: 1,
                loop: 1,
                playlist: videoId,
                enablejsapi: 1
            },
            events: {
                onReady: function(event) {
                    if (slideIndex === currentSlide) {
                        event.target.playVideo();
                    }
                },
                onError: function(event) {
                    // Show fallback image on error
                    var fallback = document.getElementById('youtube-fallback-' + slideIndex);
                    if (fallback) fallback.style.display = 'block';
                }
            }
        });
        
        console.log('✅ YouTube player created for slide ' + slideIndex + ': ' + videoId);
    } catch(e) {
        console.warn('YouTube player error:', e.message);
    }
}

// Show specific slide
function showSlide(index) {
    // Hide all slides
    for (var i = 0; i < solarProjects.length; i++) {
        var slide = document.getElementById('slide-' + i);
        if (slide) slide.style.display = 'none';
        
        // Pause YouTube if exists
        if (youtubePlayers[i] && youtubePlayers[i].pauseVideo) {
            youtubePlayers[i].pauseVideo();
        }
        
        // Pause video elements
        var video = document.querySelector('#slide-' + i + ' video');
        if (video) video.pause();
    }
    
    // Show current slide
    var currentSlideEl = document.getElementById('slide-' + index);
    if (currentSlideEl) {
        currentSlideEl.style.display = 'flex';
    }
    
    // Play YouTube for current slide
    if (youtubePlayers[index] && youtubePlayers[index].playVideo) {
        youtubePlayers[index].playVideo();
    }
    
    // Play video for current slide
    var currentVideo = document.querySelector('#slide-' + index + ' video');
    if (currentVideo) {
        currentVideo.currentTime = 0;
        currentVideo.play().catch(function() {});
    }
    
    // Update dots
    var dots = document.querySelectorAll('.slide-dot');
    for (var j = 0; j < dots.length; j++) {
        dots[j].classList.remove('active');
        if (j === index) dots[j].classList.add('active');
    }
}

// Change slide
function changeSlide(direction) {
    if (!solarProjects || solarProjects.length === 0) return;
    
    currentSlide += direction;
    if (currentSlide >= solarProjects.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = solarProjects.length - 1;
    
    showSlide(currentSlide);
    resetSlideAutoPlay();
}

// Go to specific slide
function goToSlide(index) {
    if (!solarProjects || solarProjects.length === 0) return;
    
    currentSlide = index;
    showSlide(currentSlide);
    resetSlideAutoPlay();
}

// Update slide position
function updateSlidePosition() {
    showSlide(currentSlide);
}

// Auto-play
function startSlideAutoPlay() {
    stopSlideAutoPlay();
    if (solarProjects.length <= 1) return;
    
    slideInterval = setInterval(function() {
        if (solarProjects.length > 0) {
            changeSlide(1);
        }
    }, 8000); // 8 seconds for YouTube slides
}

// Stop auto-play
function stopSlideAutoPlay() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

// Reset auto-play
function resetSlideAutoPlay() {
    stopSlideAutoPlay();
    startSlideAutoPlay();
}

// Show default slide
function showDefaultSlide(wrapper, dotsContainer) {
    wrapper.innerHTML = 
        '<div class="slide-item" style="display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg, #0a2f1f, #0b1c2a);">' +
        '<div style="text-align:center;color:var(--text-secondary);padding:2rem;">' +
        '<i class="fas fa-solar-panel" style="font-size:4rem;color:var(--accent-solar);margin-bottom:1rem;display:block;"></i>' +
        '<h3 style="color:#fff;">SunWealth Investment Ltd</h3>' +
        '<p style="color:var(--accent-solar);">Wekeza kwenye nishati ya jua</p>' +
        '</div></div>';
    if (dotsContainer) dotsContainer.innerHTML = '';
}

// Pause on hover
document.addEventListener('DOMContentLoaded', function() {
    var container = document.getElementById('home-slideshow');
    if (container) {
        container.addEventListener('mouseenter', function() {
            stopSlideAutoPlay();
            // Pause current YouTube
            if (youtubePlayers[currentSlide] && youtubePlayers[currentSlide].pauseVideo) {
                youtubePlayers[currentSlide].pauseVideo();
            }
        });
        container.addEventListener('mouseleave', function() {
            startSlideAutoPlay();
            // Resume current YouTube
            if (youtubePlayers[currentSlide] && youtubePlayers[currentSlide].playVideo) {
                youtubePlayers[currentSlide].playVideo();
            }
        });
    }
});

function refreshSolarProjectsAdmin() {
    var container = document.getElementById('solar-projects-admin-list');
    if (!container) return;
    
    container.innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:2rem;">' +
        '<i class="fas fa-spinner fa-spin"></i> Inapakia miradi...</p>';
    
    db.collection('solar_projects')
        .orderBy('order', 'asc')
        .get()
    .then(function(snap) {
        if (snap.empty) {
            container.innerHTML = 
                '<div style="text-align:center;padding:2rem;">' +
                '<p style="font-size:3rem;"><i class="fas fa-solar-panel"></i></p>' +
                '<p style="color:var(--text-secondary);margin-bottom:1rem;">Hakuna miradi bado.</p>' +
                '<button class="btn btn-primary" onclick="showAddSolarProjectModal()">' +
                '<i class="fas fa-plus"></i> Ongeza Mradi Mpya</button></div>';
            return;
        }
        
        var html = '';
        snap.forEach(function(doc) {
            var data = doc.data();
            var statusBadge = data.status === 'active' ? 
                '<span class="badge badge-approved">Inaonekana</span>' : 
                '<span class="badge badge-rejected">Imefichwa</span>';
            
            html += '<div style="border:1px solid var(--border-subtle);border-radius:10px;padding:1rem;margin-bottom:0.8rem;display:flex;gap:1rem;align-items:flex-start;">' +
                '<div style="width:120px;height:80px;border-radius:8px;overflow:hidden;flex-shrink:0;background:var(--bg-deep);">' +
                    '<img src="' + escapeHtml(data.image_url) + '" alt="" style="width:100%;height:100%;object-fit:cover;" ' +
                        'onerror="this.parentNode.innerHTML=\'<div style=\\\'width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--accent-solar);font-size:2rem;\\\'><i class=\\\'fas fa-solar-panel\\\'></i></div>\'">' +
                '</div>' +
                '<div style="flex:1;">' +
                    '<div style="font-weight:600;">' + escapeHtml(data.title) + ' ' + statusBadge + '</div>' +
                    '<div style="font-size:0.8rem;color:var(--text-secondary);">' + 
                        escapeHtml(data.description ? data.description.substring(0, 80) : '') + '...</div>' +
                    '<div style="font-size:0.75rem;color:var(--text-secondary);margin-top:0.3rem;">' +
                        'Nafasi: ' + (data.order || 0) + ' | Aina: ' + (data.type || 'solar_farm') +
                        (data.video_url ? ' | <i class="fas fa-video" style="color:var(--accent-info);"></i> Video' : '') +
                        (data.youtube_url ? ' | <i class="fab fa-youtube" style="color:red;"></i> YouTube' : '') +
                    '</div>' +
                '</div>' +
                '<div style="display:flex;flex-direction:column;gap:0.3rem;">' +
                    '<button class="btn btn-info btn-sm" onclick="editSolarProject(\'' + doc.id + '\')" title="Hariri">' +
                        '<i class="fas fa-edit"></i></button>' +
                    '<button class="btn btn-warning btn-sm" onclick="toggleSolarProjectStatus(\'' + doc.id + '\', \'' + data.status + '\')" title="Badili Hali">' +
                        (data.status === 'active' ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>') + '</button>' +
                    '<button class="btn btn-danger btn-sm" onclick="deleteSolarProject(\'' + doc.id + '\')" title="Futa">' +
                        '<i class="fas fa-trash"></i></button>' +
                '</div>' +
                '</div>';
        });
        
        container.innerHTML = html;
    })
    .catch(function(e) {
        console.error('Load projects error:', e);
        container.innerHTML = '<p style="color:var(--danger);text-align:center;padding:2rem;">' +
            'Imeshindwa kupakia: ' + e.message + '</p>';
    });
}

// ============================================
// Language System - Swahili ↔ English
// ============================================

// Language translations
const translations = {
    'sw': {
        // Navigation
        'home': 'Nyumbani',
        'packages': 'Vifurushi',
        'investments': 'Uwekezaji',
        'wallet': 'Pochi',
        'profile': 'Wasifu',
        'transactions': 'Historia',
        'referral': 'Ushirika',
        'logout': 'Toka',
        'dashboard': 'Dashibodi',
        'approvals': 'Maombi',
        'users': 'Wateja',
        'settings': 'Mipangilio',
        'overview': 'Muhtasari',
        'history': 'Historia',
        'bank_accounts': 'Akaunti za Benki',
        'social_links': 'Viungo vya Mitandao',
        'solar_projects': 'Miradi ya Jua',
        
        // Header
        'login': 'Ingia',
        'signup': 'Jisajili',
        'logout': 'Toka',
        'language': 'English',
        
        // Hero
        'hero_title': 'Wekeza kwenye Nishati ya Jua na <span>SunWealth</span>',
        'hero_subtitle': 'Pata mapato ya kila siku kutoka kwenye mashamba ya kisasa ya jua. Anza na TZS 7,000 tu.',
        
        // Home
        'investment_packages': 'Vifurushi vya Uwekezaji',
        'live_activity': 'Shughuli za Moja kwa Moja',
        
        // Packages
        'choose_plan': 'Chagua mpango wako wa uwekezaji na anza kupata mapato kila siku',
        'amount': 'Kiasi',
        'daily_income': 'Kila Siku',
        'total_income': 'Jumla',
        'duration': 'Muda',
        'days': 'Siku',
        'buy_now': 'Nunua Sasa',
        'insufficient_balance': 'Salio halitoshi! Tafadhali weka amana kwanza.',
        'confirm_purchase': 'Thibitisha Ununuzi',
        'purchase_success': 'Ununuzi umefanikiwa!',
        
        // Investments
        'active_investments': 'Uwekezaji Hai',
        'total_invested': 'Jumla Imewekezwa',
        'total_earnings': 'Mapato Yote',
        'active_count': 'Inayoendelea',
        'real_time_earnings': 'Mapato Yanayoingia Sasa Hivi',
        'no_investments': 'Hakuna Uwekezaji Hai',
        'start_now': 'Anza sasa upate mapato ya kila siku!',
        'view_packages': 'Angalia Vifurushi',
        'days_remaining': 'Siku Zilizobaki',
        'expected_total': 'Jumla Tarajiwa',
        'current_earnings': 'Mapato Sasa',
        
        // Wallet
        'balance': 'Salio',
        'todays_income': 'Mapato ya Leo',
        'deposit': 'Weka Amana',
        'withdraw': 'Toa Pesa',
        'recent_transactions': 'Muamala wa Hivi Karibuni',
        'no_transactions': 'Hakuna muamala',
        
        // Profile
        'my_profile': 'Wasifu Wangu',
        'edit_profile': 'Hariri Wasifu',
        'full_name': 'Jina Kamili',
        'phone_number': 'Namba ya Simu',
        'email': 'Barua Pepe',
        'referral_code': 'Namba ya Ushirika',
        'join_date': 'Tarehe ya Kujiunga',
        'role': 'Wadhifa',
        'investor': 'Mwekezaji',
        'admin': 'Msimamizi',
        'super_admin': 'Msimamizi Mkuu',
        
        // Referral
        'referral_program': 'Programu ya Ushirika',
        'your_referral_link': 'Kiungo Chako cha Ushirika',
        'your_referral_code': 'Namba Yako ya Ushirika',
        'share_link': 'Shiriki Kiungo',
        'share_whatsapp': 'Shiriki kwa WhatsApp',
        'copy_link': 'Nakili Kiungo',
        'copy_code': 'Nakili Namba',
        'total_bonus': 'Jumla ya Bonasi',
        'total_referrals': 'Jumla ya Washirika',
        'how_it_works': 'Jinsi Inavyofanya Kazi',
        'step_1': 'Shiriki kiungo chako au namba ya ushirika na marafiki',
        'step_2': 'Mshiriki wako ajisajili na kuweka amana ya kwanza',
        'step_3': 'Pata 10% ya amana yao ya kwanza moja kwa moja kwenye salio lako!',
        'referral_list': 'Orodha ya Washirika Wangu',
        'no_referrals': 'Hakuna washirika bado',
        
        // Admin
        'admin_dashboard': 'Dashibodi ya Msimamizi',
        'pending': 'Zinazosubiri',
        'pending_deposits': 'Amana Zinasubiri',
        'pending_withdrawals': 'Utoaji Unasubiri',
        'total_users': 'Jumla ya Wateja',
        'total_investors': 'Wawekezaji',
        'active_investments': 'Uwekezaji Hai',
        'approved_today': 'Imeidhinishwa Leo',
        'total_deposits': 'Jumla ya Amana',
        'total_withdrawals': 'Jumla ya Utoaji',
        'referral_bonuses': 'Bonasi za Ushirika',
        'bonus_count': 'Idadi ya Bonasi',
        'total_invested': 'Jumla Imewekezwa',
        'recent_activities': 'Shughuli za Hivi Karibuni',
        'no_activities': 'Hakuna shughuli za hivi karibuni',
        
        // Super Admin
        'super_dashboard': 'Dashibodi ya Msimamizi Mkuu',
        'platform_overview': 'Muhtasari wa Jukwaa',
        'admins': 'Wasimamizi',
        'manage_admins': 'Usimamizi wa Wasimamizi',
        'add_admin': 'Ongeza Msimamizi',
        
        // User Management
        'user_management': 'Usimamizi wa Wateja',
        'search': 'Tafuta kwa jina, barua pepe, au simu...',
        'all': 'Wote',
        'active': 'Hai',
        'inactive': 'Imezuiliwa',
        'actions': 'Vitendo',
        'view': 'Angalia',
        'edit': 'Hariri',
        'add_balance': 'Ongeza Salio',
        'toggle_status': 'Badili Hali',
        'disable': 'Zima',
        'enable': 'Washa',
        
        // System Config
        'system_settings': 'Mipangilio ya Mfumo',
        'general_settings': 'Mipangilio Mkuu',
        'financial_settings': 'Mipangilio ya Fedha',
        'operating_hours': 'Saa za Kufanya Kazi',
        'package_settings': 'Mipangilio ya Vifurushi',
        'security_settings': 'Mipangilio ya Usalama',
        'notification_settings': 'Mipangilio ya Taarifa',
        'maintenance_mode': 'Hali ya Matengenezo',
        'save_settings': 'Hifadhi Mipangilio Yote',
        'reset_settings': 'Rejesha Mipangilio ya Awali',
        
        // Common
        'confirm': 'Thibitisha',
        'cancel': 'Ghairi',
        'save': 'Hifadhi',
        'success': 'Imefanikiwa!',
        'error': 'Kosa!',
        'loading': 'Inapakia...',
        'please_wait': 'Tafadhali subiri...',
        'back': 'Rudi',
        'next': 'Endelea',
        'close': 'Funga',
        'select': 'Chagua',
        'filter': 'Chuja',
        'status': 'Hali',
        'date': 'Tarehe',
        'time': 'Muda',
        'amount': 'Kiasi',
        'type': 'Aina',
        
        // Toast Messages
        'login_success': 'Karibu tena!',
        'logout_success': 'Umetoka kwenye mfumo. Karibu tena!',
        'profile_updated': 'Wasifu umesasishwa!',
        'deposit_success': 'Amana imetumwa! Inasubiri kuidhinishwa.',
        'withdraw_success': 'Ombi la utoaji limetumwa!',
        'purchase_success_msg': 'Ununuzi umefanikiwa!',
        'referral_copied': 'Namba ya ushirika imenakiliwa!',
        'link_copied': 'Kiungo kimenakiliwa!',
        'insufficient_balance_msg': 'Salio halitoshi. Tafadhali angalia salio lako.',
        'error_occurred': 'Imeshindwa. Tafadhali jaribu tena.',
        
        // Modals
        'login_title': 'Ingia (Login)',
        'signup_title': 'Jisajili (Sign Up)',
        'forgot_password': 'Umesahau Nywila?',
        'remember_me': 'Nikumbuke',
        'password': 'Nywila',
        'confirm_password': 'Thibitisha Nywila',
        'terms_agree': 'Nimekubali Masharti na Vigezo',
        'terms_title': 'Masharti na Vigezo',
        'already_account': 'Tayari una akaunti?',
        'no_account': 'Huna akaunti?',
        
        // Deposit
        'select_bank': 'Chagua Njia ya Malipo',
        'your_details': 'Taarifa Zako',
        'send_payment': 'Tuma Malipo',
        'confirm_deposit': 'Thibitisha Amana',
        'transaction_ref': 'Namba ya Muamala',
        'payment_instructions': 'Maelekezo ya Malipo',
        'important_note': 'Muhimu: Hifadhi namba ya muamala baada ya kutuma malipo.',
        
        // Withdraw
        'withdrawal_method': 'Njia ya Kupokea',
        'account_number': 'Namba ya Simu / Akaunti',
        'account_holder': 'Jina la Mmiliki wa Akaunti',
        'withdraw_amount': 'Kiasi cha Kutoa',
        'fee_info': 'Ada ya utoaji ni 10% ya kiasi unachotoa',
        'operating_hours_info': 'Saa za Utoaji: 04:30 AM - 07:00 PM',
        'net_amount': 'Utakachopokea',
        
        // Investment Purchase
        'confirm_purchase_title': 'Thibitisha Ununuzi',
        'package': 'Kifurushi',
        'invest_amount': 'Kiasi cha Kuwekeza',
        'remaining_balance': 'Salio Baada ya Ununuzi',
        'current_balance': 'Salio Lako Sasa',
        'deposit_now': 'Weka Amana Sasa'
    },
    'en': {
        // Navigation
        'home': 'Home',
        'packages': 'Packages',
        'investments': 'Investments',
        'wallet': 'Wallet',
        'profile': 'Profile',
        'transactions': 'History',
        'referral': 'Referral',
        'logout': 'Logout',
        'dashboard': 'Dashboard',
        'approvals': 'Approvals',
        'users': 'Users',
        'settings': 'Settings',
        'overview': 'Overview',
        'history': 'History',
        'bank_accounts': 'Bank Accounts',
        'social_links': 'Social Links',
        'solar_projects': 'Solar Projects',
        
        // Header
        'login': 'Login',
        'signup': 'Sign Up',
        'logout': 'Logout',
        'language': 'Swahili',
        
        // Hero
        'hero_title': 'Invest in Solar Energy with <span>SunWealth</span>',
        'hero_subtitle': 'Earn daily income from high-tech solar farms. Start with just TZS 7,000.',
        
        // Home
        'investment_packages': 'Investment Packages',
        'live_activity': 'Live Activity',
        
        // Packages
        'choose_plan': 'Choose your investment plan and start earning daily',
        'amount': 'Amount',
        'daily_income': 'Daily Income',
        'total_income': 'Total Income',
        'duration': 'Duration',
        'days': 'Days',
        'buy_now': 'Buy Now',
        'insufficient_balance': 'Insufficient balance! Please deposit first.',
        'confirm_purchase': 'Confirm Purchase',
        'purchase_success': 'Purchase Successful!',
        
        // Investments
        'active_investments': 'Active Investments',
        'total_invested': 'Total Invested',
        'total_earnings': 'Total Earnings',
        'active_count': 'Active Count',
        'real_time_earnings': 'Real-Time Earnings',
        'no_investments': 'No Active Investments',
        'start_now': 'Start now and earn daily income!',
        'view_packages': 'View Packages',
        'days_remaining': 'Days Remaining',
        'expected_total': 'Expected Total',
        'current_earnings': 'Current Earnings',
        
        // Wallet
        'balance': 'Balance',
        'todays_income': 'Today\'s Income',
        'deposit': 'Deposit',
        'withdraw': 'Withdraw',
        'recent_transactions': 'Recent Transactions',
        'no_transactions': 'No transactions',
        
        // Profile
        'my_profile': 'My Profile',
        'edit_profile': 'Edit Profile',
        'full_name': 'Full Name',
        'phone_number': 'Phone Number',
        'email': 'Email',
        'referral_code': 'Referral Code',
        'join_date': 'Join Date',
        'role': 'Role',
        'investor': 'Investor',
        'admin': 'Admin',
        'super_admin': 'Super Admin',
        
        // Referral
        'referral_program': 'Referral Program',
        'your_referral_link': 'Your Referral Link',
        'your_referral_code': 'Your Referral Code',
        'share_link': 'Share Link',
        'share_whatsapp': 'Share via WhatsApp',
        'copy_link': 'Copy Link',
        'copy_code': 'Copy Code',
        'total_bonus': 'Total Bonus',
        'total_referrals': 'Total Referrals',
        'how_it_works': 'How It Works',
        'step_1': 'Share your referral link or code with friends',
        'step_2': 'Your referral signs up and makes their first deposit',
        'step_3': 'Get 10% of their first deposit directly to your balance!',
        'referral_list': 'My Referrals List',
        'no_referrals': 'No referrals yet',
        
        // Admin
        'admin_dashboard': 'Admin Dashboard',
        'pending': 'Pending',
        'pending_deposits': 'Pending Deposits',
        'pending_withdrawals': 'Pending Withdrawals',
        'total_users': 'Total Users',
        'total_investors': 'Total Investors',
        'active_investments': 'Active Investments',
        'approved_today': 'Approved Today',
        'total_deposits': 'Total Deposits',
        'total_withdrawals': 'Total Withdrawals',
        'referral_bonuses': 'Referral Bonuses',
        'bonus_count': 'Bonus Count',
        'total_invested': 'Total Invested',
        'recent_activities': 'Recent Activities',
        'no_activities': 'No recent activities',
        
        // Super Admin
        'super_dashboard': 'Super Admin Dashboard',
        'platform_overview': 'Platform Overview',
        'admins': 'Admins',
        'manage_admins': 'Admin Management',
        'add_admin': 'Add Admin',
        
        // User Management
        'user_management': 'User Management',
        'search': 'Search by name, email, or phone...',
        'all': 'All',
        'active': 'Active',
        'inactive': 'Inactive',
        'actions': 'Actions',
        'view': 'View',
        'edit': 'Edit',
        'add_balance': 'Add Balance',
        'toggle_status': 'Toggle Status',
        'disable': 'Disable',
        'enable': 'Enable',
        
        // System Config
        'system_settings': 'System Settings',
        'general_settings': 'General Settings',
        'financial_settings': 'Financial Settings',
        'operating_hours': 'Operating Hours',
        'package_settings': 'Package Settings',
        'security_settings': 'Security Settings',
        'notification_settings': 'Notification Settings',
        'maintenance_mode': 'Maintenance Mode',
        'save_settings': 'Save All Settings',
        'reset_settings': 'Reset Settings',
        
        // Common
        'confirm': 'Confirm',
        'cancel': 'Cancel',
        'save': 'Save',
        'success': 'Success!',
        'error': 'Error!',
        'loading': 'Loading...',
        'please_wait': 'Please wait...',
        'back': 'Back',
        'next': 'Next',
        'close': 'Close',
        'select': 'Select',
        'filter': 'Filter',
        'status': 'Status',
        'date': 'Date',
        'time': 'Time',
        'amount': 'Amount',
        'type': 'Type',
        
        // Toast Messages
        'login_success': 'Welcome back!',
        'logout_success': 'Logged out. Come back soon!',
        'profile_updated': 'Profile updated!',
        'deposit_success': 'Deposit submitted! Pending approval.',
        'withdraw_success': 'Withdrawal request submitted!',
        'purchase_success_msg': 'Purchase successful!',
        'referral_copied': 'Referral code copied!',
        'link_copied': 'Link copied!',
        'insufficient_balance_msg': 'Insufficient balance. Please check your balance.',
        'error_occurred': 'Failed. Please try again.',
        
        // Modals
        'login_title': 'Login',
        'signup_title': 'Sign Up',
        'forgot_password': 'Forgot Password?',
        'remember_me': 'Remember Me',
        'password': 'Password',
        'confirm_password': 'Confirm Password',
        'terms_agree': 'I agree to the Terms and Conditions',
        'terms_title': 'Terms and Conditions',
        'already_account': 'Already have an account?',
        'no_account': 'Don\'t have an account?',
        
        // Deposit
        'select_bank': 'Select Payment Method',
        'your_details': 'Your Details',
        'send_payment': 'Send Payment',
        'confirm_deposit': 'Confirm Deposit',
        'transaction_ref': 'Transaction Reference',
        'payment_instructions': 'Payment Instructions',
        'important_note': 'Important: Save your transaction reference/ID after sending payment.',
        
        // Withdraw
        'withdrawal_method': 'Withdrawal Method',
        'account_number': 'Phone / Account Number',
        'account_holder': 'Account Holder Name',
        'withdraw_amount': 'Withdrawal Amount',
        'fee_info': 'Withdrawal fee is 10% of the amount you withdraw',
        'operating_hours_info': 'Operating Hours: 04:30 AM - 07:00 PM',
        'net_amount': 'Net Amount',
        
        // Investment Purchase
        'confirm_purchase_title': 'Confirm Purchase',
        'package': 'Package',
        'invest_amount': 'Investment Amount',
        'remaining_balance': 'Balance After Purchase',
        'current_balance': 'Your Current Balance',
        'deposit_now': 'Deposit Now'
    }
};

// Current language state
let currentLang = 'en'; // Default to English

// Function to detect user's browser language
function detectLanguage() {
    const browserLang = navigator.language || navigator.languages?.[0] || 'en';
    return browserLang.startsWith('sw') ? 'sw' : 'en';
}

// Initialize language
function initLanguage() {
    // Check localStorage first
    const savedLang = localStorage.getItem('sunwealth_lang');
    if (savedLang && (savedLang === 'sw' || savedLang === 'en')) {
        currentLang = savedLang;
    } else {
        // Detect browser language
        currentLang = detectLanguage();
        localStorage.setItem('sunwealth_lang', currentLang);
    }
    
    applyLanguage(currentLang);
}

// Toggle language
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'sw' : 'en';
    localStorage.setItem('sunwealth_lang', currentLang);
    applyLanguage(currentLang);
    
    // Show toast notification
    const msg = currentLang === 'sw' ? 'Lugha imebadilishwa hadi Kiswahili' : 'Language changed to English';
    if (typeof showToast === 'function') {
        showToast('🌍 ' + msg, 'success');
    }
}

// Apply language to all elements
function applyLanguage(lang) {
    const t = translations[lang];
    if (!t) return;
    
    // Update language labels
    document.getElementById('lang-label').textContent = lang === 'sw' ? 'SW' : 'EN';
    document.getElementById('sidebar-lang-label').textContent = lang === 'sw' ? 'Kiswahili' : 'English';
    document.getElementById('bottom-lang-label').textContent = lang === 'sw' ? 'SW' : 'EN';
    
    // Apply translations to all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = t[key];
            } else {
                el.innerHTML = t[key];
            }
        }
    });
    
    // Update navigation links
    updateNavigation(lang);
    
    // Update hero section
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero .subtitle');
    if (heroTitle) heroTitle.innerHTML = t.hero_title;
    if (heroSubtitle) heroSubtitle.textContent = t.hero_subtitle;
    
    // Update section titles
    updateSectionTitles(lang);
    
    // Update dashboard stats
    updateDashboardStats(lang);
    
    // Update modals
    updateModals(lang);
    
    console.log('🌍 Language applied:', lang);
}

// Update navigation links
function updateNavigation(lang) {
    const t = translations[lang];
    
    // Update sidebar links
    document.querySelectorAll('.sidebar-link[data-page]').forEach(el => {
        const page = el.getAttribute('data-page');
        const keyMap = {
            'home': 'home',
            'packages': 'packages',
            'investments': 'investments',
            'wallet': 'wallet',
            'profile': 'profile',
            'transactions': 'transactions',
            'referral': 'referral',
            'admin-dashboard': 'dashboard',
            'pending-approvals': 'approvals',
            'all-transactions': 'history',
            'user-management': 'users',
            'system-config': 'settings',
            'super-dashboard': 'overview',
            'bank-accounts': 'bank_accounts',
            'social-links': 'social_links',
            'solar-projects': 'solar_projects'
        };
        const key = keyMap[page] || page;
        if (t[key] !== undefined) {
            // Preserve the icon
            const icon = el.querySelector('i');
            if (icon) {
                el.innerHTML = icon.outerHTML + ' ' + t[key];
            } else {
                el.textContent = t[key];
            }
        }
    });
    
    // Update bottom nav items
    document.querySelectorAll('.bottom-nav-item[data-page]').forEach(el => {
        const page = el.getAttribute('data-page');
        const keyMap = {
            'home': 'home',
            'packages': 'packages',
            'wallet': 'wallet',
            'profile': 'profile',
            'transactions': 'history',
            'referral': 'referral',
            'admin-dashboard': 'dashboard',
            'pending-approvals': 'approvals',
            'all-transactions': 'history',
            'user-management': 'users',
            'system-config': 'settings',
            'super-dashboard': 'overview'
        };
        const key = keyMap[page] || page;
        if (t[key] !== undefined) {
            const icon = el.querySelector('i');
            const span = el.querySelector('span');
            if (icon && span) {
                span.textContent = t[key];
            }
        }
    });
}

// Update section titles
function updateSectionTitles(lang) {
    const t = translations[lang];
    const sectionMap = {
        'packages-section h2': 'packages',
        'investments-section h2': 'investments',
        'wallet-section h2': 'wallet',
        'profile-section h2': 'profile',
        'transactions-section h2': 'history',
        'referral-section h2': 'referral',
        'admin-dashboard-section h2': 'dashboard',
        'pending-approvals-section h2': 'approvals',
        'all-transactions-section h2': 'history',
        'user-management-section h2': 'users',
        'system-config-section h2': 'settings',
        'super-dashboard-section h2': 'overview',
        'bank-accounts-section h2': 'bank_accounts',
        'social-links-section h2': 'social_links',
        'solar-projects-section h2': 'solar_projects'
    };
    
    for (const [selector, key] of Object.entries(sectionMap)) {
        const el = document.querySelector(selector);
        if (el && t[key] !== undefined) {
            // Preserve any icon in the h2
            const icon = el.querySelector('i');
            if (icon) {
                el.innerHTML = icon.outerHTML + ' ' + t[key];
            } else {
                el.textContent = t[key];
            }
        }
    }
}

// Update dashboard stats
function updateDashboardStats(lang) {
    const t = translations[lang];
    
    // Admin dashboard labels
    document.querySelectorAll('.metric-label').forEach(el => {
        const text = el.textContent.trim();
        const keyMap = {
            '⏳ Zinazosubiri': 'pending',
            '📥 Amana Zinasubiri': 'pending_deposits',
            '📤 Utoaji Unasubiri': 'pending_withdrawals',
            '👥 Jumla ya Wateja': 'total_users',
            '💼 Wawekezaji': 'total_investors',
            '📊 Uwekezaji Hai': 'active_investments',
            '✅ Imeidhinishwa Leo': 'approved_today',
            '💰 Jumla ya Amana': 'total_deposits',
            '💸 Jumla ya Utoaji': 'total_withdrawals',
            '🤝 Bonasi za Ushirika': 'referral_bonuses',
            '🔢 Idadi ya Bonasi': 'bonus_count',
            '💵 Jumla Imewekezwa': 'total_invested'
        };
        const key = keyMap[text] || text;
        if (t[key] !== undefined) {
            el.textContent = t[key];
        }
    });
}

// Update modals
function updateModals(lang) {
    const t = translations[lang];
    
    // Login modal
    const loginTitle = document.querySelector('#login-modal h2');
    if (loginTitle) loginTitle.textContent = t.login_title;
    
    // Signup modal
    const signupTitle = document.querySelector('#signup-modal h2');
    if (signupTitle) signupTitle.textContent = t.signup_title;
    
    // Deposit modal
    const depositTitle = document.querySelector('#deposit-modal h2');
    if (depositTitle) depositTitle.textContent = t.deposit;
    
    // Withdraw modal
    const withdrawTitle = document.querySelector('#withdraw-modal h2');
    if (withdrawTitle) withdrawTitle.textContent = t.withdraw;
}

// Helper function to translate a single text
function translate(text, lang) {
    const t = translations[lang || currentLang];
    return t[text] || text;
}

// Set up data-i18n attributes for static text
function setupI18nAttributes() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const lang = currentLang;
        const t = translations[lang];
        if (t[key] !== undefined) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = t[key];
            } else {
                el.textContent = t[key];
            }
        }
    });
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    initLanguage();
});

// Export for use in main.js
window.translations = translations;
window.currentLang = currentLang;
window.toggleLanguage = toggleLanguage;
window.translate = translate;

// ===== SOLAR PROJECTS ADMIN FUNCTIONS =====

// Show add solar project modal
function showAddSolarProjectModal() {
    document.getElementById('solar-project-modal-title').innerHTML = '<i class="fas fa-plus-circle"></i> Ongeza Mradi wa Jua';
    document.getElementById('solar-project-edit-id').value = '';
    document.getElementById('solar-project-form').reset();
    document.getElementById('solar-project-active').checked = true;
    document.getElementById('solar-project-error').style.display = 'none';
    openModal('solar-project-modal');
}

// Edit solar project
function editSolarProject(id) {
    db.collection('solar_projects').doc(id).get()
    .then(function(doc) {
        if (!doc.exists) {
            showToast('Mradi haujapatikana', 'error');
            return;
        }
        
        var data = doc.data();
        
        document.getElementById('solar-project-modal-title').innerHTML = '<i class="fas fa-edit"></i> Hariri Mradi';
        document.getElementById('solar-project-edit-id').value = id;
        document.getElementById('solar-project-title').value = data.title || '';
        document.getElementById('solar-project-description').value = data.description || '';
        document.getElementById('solar-project-image').value = data.image_url || '';
        document.getElementById('solar-project-link').value = data.link_url || '';
        document.getElementById('solar-project-youtube').value = data.youtube_url || '';
        document.getElementById('solar-project-video').value = data.video_url || '';
        document.getElementById('solar-project-type').value = data.type || 'solar_farm';
        document.getElementById('solar-project-order').value = data.order || 0;
        document.getElementById('solar-project-active').checked = data.status === 'active';
        document.getElementById('solar-project-error').style.display = 'none';
        
        openModal('solar-project-modal');
    })
    .catch(function(e) {
        showToast('Error: ' + e.message, 'error');
    });
}

// Save solar project (add or edit)
function saveSolarProject(event) {
    event.preventDefault();
    
    var editId = document.getElementById('solar-project-edit-id').value;
    var title = document.getElementById('solar-project-title').value.trim();
    var description = document.getElementById('solar-project-description').value.trim();
    var imageUrl = document.getElementById('solar-project-image').value.trim();
    var linkUrl = document.getElementById('solar-project-link').value.trim();
    var youtubeUrl = document.getElementById('solar-project-youtube').value.trim();
    var videoUrl = document.getElementById('solar-project-video').value.trim();
    var type = document.getElementById('solar-project-type').value;
    var order = parseInt(document.getElementById('solar-project-order').value) || 0;
    var isActive = document.getElementById('solar-project-active').checked;
    var err = document.getElementById('solar-project-error');
    
    if (err) err.style.display = 'none';
    
    // Validation
    if (!title) {
        if (err) { err.textContent = 'Kichwa cha mradi kinahitajika'; err.style.display = 'block'; }
        return;
    }
    if (!description) {
        if (err) { err.textContent = 'Maelezo ya mradi yanahitajika'; err.style.display = 'block'; }
        return;
    }
    if (!imageUrl) {
        if (err) { err.textContent = 'Kiungo cha picha kinahitajika'; err.style.display = 'block'; }
        return;
    }
    
    var projectData = {
        title: title,
        description: description,
        image_url: imageUrl,
        link_url: linkUrl,
        youtube_url: youtubeUrl,
        video_url: videoUrl,
        type: type,
        order: order,
        status: isActive ? 'active' : 'inactive',
        updated_at: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    var promise;
    if (editId) {
        // Update existing
        promise = db.collection('solar_projects').doc(editId).update(projectData);
    } else {
        // Add new
        projectData.created_at = firebase.firestore.FieldValue.serverTimestamp();
        promise = db.collection('solar_projects').add(projectData);
    }
    
    promise.then(function() {
        closeModal('solar-project-modal');
        showToast(editId ? 'Mradi umesasishwa!' : 'Mradi umeongezwa!', 'success');
        refreshSolarProjectsAdmin();
        loadSolarSlideshow(); // Refresh homepage slideshow
    })
    .catch(function(e) {
        if (err) { err.textContent = 'Error: ' + e.message; err.style.display = 'block'; }
        console.error('Save project error:', e);
    });
}

// Delete solar project
function deleteSolarProject(id) {
    if (!confirm('Unahakika unataka kufuta mradi huu? Hii haiwezi kutenduliwa.')) return;
    
    db.collection('solar_projects').doc(id).delete()
    .then(function() {
        showToast('Mradi umefutwa!', 'warning');
        refreshSolarProjectsAdmin();
        loadSolarSlideshow(); // Refresh homepage slideshow
    })
    .catch(function(e) {
        showToast('Error: ' + e.message, 'error');
        console.error('Delete project error:', e);
    });
}

// Toggle solar project status (activate/deactivate)
function toggleSolarProjectStatus(id, currentStatus) {
    var newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    var action = newStatus === 'active' ? 'kuwashwa' : 'kuzimwa';
    
    db.collection('solar_projects').doc(id).update({
        status: newStatus,
        updated_at: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function() {
        showToast('Mradi ume' + action + '!', 'success');
        refreshSolarProjectsAdmin();
        loadSolarSlideshow(); // Refresh homepage slideshow
    })
    .catch(function(e) {
        showToast('Error: ' + e.message, 'error');
        console.error('Toggle status error:', e);
    });
}

// Refresh solar projects admin list
function refreshSolarProjectsAdmin() {
    var container = document.getElementById('solar-projects-admin-list');
    if (!container) return;
    
    container.innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:2rem;">' +
        '<i class="fas fa-spinner fa-spin"></i> Inapakia miradi...</p>';
    
    db.collection('solar_projects')
        .orderBy('order', 'asc')
        .get()
    .then(function(snap) {
        if (snap.empty) {
            container.innerHTML = 
                '<div style="text-align:center;padding:3rem;">' +
                '<p style="font-size:3rem;"><i class="fas fa-solar-panel"></i></p>' +
                '<p style="color:var(--text-secondary);margin-bottom:1rem;">Hakuna miradi bado.</p>' +
                '<button class="btn btn-primary" onclick="showAddSolarProjectModal()">' +
                '<i class="fas fa-plus"></i> Ongeza Mradi Mpya</button></div>';
            return;
        }
        
        var html = '';
        snap.forEach(function(doc) {
            var data = doc.data();
            var statusBadge = data.status === 'active' ? 
                '<span class="badge badge-approved">Inaonekana</span>' : 
                '<span class="badge badge-rejected">Imefichwa</span>';
            
            var hasVideo = data.video_url && data.video_url.length > 5;
            var hasYoutube = data.youtube_url && data.youtube_url.length > 5;
            
            html += '<div style="border:1px solid var(--border-subtle);border-radius:10px;padding:1rem;margin-bottom:0.8rem;display:flex;gap:1rem;align-items:flex-start;">' +
                // Image preview
                '<div style="width:120px;height:80px;border-radius:8px;overflow:hidden;flex-shrink:0;background:var(--bg-deep);">' +
                    '<img src="' + escapeHtml(data.image_url) + '" alt="" style="width:100%;height:100%;object-fit:cover;" ' +
                        'onerror="this.parentNode.innerHTML=\'<div style=\\\'width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--accent-solar);font-size:2rem;background:#0d1117;\\\'><i class=\\\'fas fa-solar-panel\\\'></i></div>\'">' +
                '</div>' +
                // Info
                '<div style="flex:1;min-width:0;">' +
                    '<div style="font-weight:600;margin-bottom:0.2rem;">' + escapeHtml(data.title) + ' ' + statusBadge + '</div>' +
                    '<div style="font-size:0.8rem;color:var(--text-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + 
                        escapeHtml(data.description || '') + '</div>' +
                    '<div style="font-size:0.75rem;color:var(--text-secondary);margin-top:0.3rem;">' +
                        'Nafasi: ' + (data.order || 0) + ' | Aina: ' + (data.type || 'solar_farm') +
                        (hasVideo ? ' | <i class="fas fa-video" style="color:var(--accent-info);"></i> Video' : '') +
                        (hasYoutube ? ' | <i class="fab fa-youtube" style="color:red;"></i> YouTube' : '') +
                        (data.link_url ? ' | <i class="fas fa-link" style="color:var(--accent-solar);"></i> Link' : '') +
                    '</div>' +
                '</div>' +
                // Actions
                '<div style="display:flex;flex-direction:column;gap:0.3rem;flex-shrink:0;">' +
                    '<button class="btn btn-info btn-sm" onclick="editSolarProject(\'' + doc.id + '\')" title="Hariri">' +
                        '<i class="fas fa-edit"></i></button>' +
                    '<button class="btn btn-warning btn-sm" onclick="toggleSolarProjectStatus(\'' + doc.id + '\', \'' + data.status + '\')" title="Badili Hali">' +
                        (data.status === 'active' ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>') + '</button>' +
                    '<button class="btn btn-danger btn-sm" onclick="deleteSolarProject(\'' + doc.id + '\')" title="Futa">' +
                        '<i class="fas fa-trash"></i></button>' +
                '</div>' +
                '</div>';
        });
        
        container.innerHTML = html;
        console.log('✅ Solar projects loaded:', snap.size);
    })
    .catch(function(e) {
        console.error('Load projects error:', e);
        container.innerHTML = '<p style="color:var(--danger);text-align:center;padding:2rem;">' +
            'Imeshindwa kupakia: ' + e.message + '</p>';
    });
}
