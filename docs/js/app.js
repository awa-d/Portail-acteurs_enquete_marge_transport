/**
 * ============================================
 * PORTAIL SHINY - SCRIPT PRINCIPAL
 * ============================================
 * Gestion du thème, menu mobile et interactions
 */


// ============================================
// GESTION DU THÈME CLAIR / SOMBRE
// ============================================

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Charger le thème sauvegardé ou utiliser le thème système
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else {
        // Détecter la préférence système
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
}

// Basculer le thème
function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Animation du bouton
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
}

// Initialiser le thème au chargement
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});


// ============================================
// MENU MOBILE (HAMBURGER)
// ============================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animation du burger
        const spans = menuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Fermer le menu en cliquant sur un lien
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Fermer le menu en cliquant à l'extérieur
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}


// ============================================
// ANIMATION AU SCROLL (OPTIONNEL)
// ============================================

// Observer pour animer les éléments au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Appliquer l'animation aux cartes
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.access-card, .document-card, .download-card, .tutorial-card');
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});


// ============================================
// SMOOTH SCROLL POUR LES ANCRES
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignorer les liens vides
        if (href === '#' || href === '#!') {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // 80px pour la navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});


// ============================================
// DÉTECTION DE CONNEXION INTERNET (OPTIONNEL)
// ============================================

window.addEventListener('online', () => {
    console.log('Connexion internet rétablie');
    // Vous pouvez afficher un message de succès ici
});

window.addEventListener('offline', () => {
    console.log('Connexion internet perdue');
    // Vous pouvez afficher un message d'avertissement ici
});


// ============================================
// UTILITAIRES
// ============================================

/**
 * Formate une date en français
 */
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(date).toLocaleDateString('fr-FR', options);
}

/**
 * Affiche un message toast (notification)
 */
function showToast(message, type = 'info') {
    // À implémenter si nécessaire
    console.log(`[${type}] ${message}`);
}

/**
 * Valide un format d'ID (3 lettres + 3 chiffres)
 */
function validateID(id) {
    const regex = /^[A-Z]{3}[0-9]{3}$/;
    return regex.test(id);
}


// ============================================
// EXPORT DES FONCTIONS UTILES
// ============================================

window.PortailUtils = {
    formatDate,
    showToast,
    validateID
};