/**
 * ============================================
 * GESTION DE L'AUTHENTIFICATION
 * ============================================
 * Formulaires enquêteur et superviseur avec validation stricte
 */


// ============================================
// CONSTANTES ET LISTES D'UTILISATEURS AUTORISÉS
// ============================================

const AUTH_STORAGE_KEY = 'portail_shiny_user';

// Liste des superviseurs autorisés
const SUPERVISEURS_AUTORISES = {
    'SUP01': { nom: 'Badji', prenom: 'Ousmane' },
    'SUP02': { nom: 'Fall', prenom: 'Aminata' },
    'SUP03': { nom: 'Diop', prenom: 'Serigne' },
    'SUP04': { nom: 'Wane', prenom: 'Halimatou' },
    'SUP05': { nom: 'Toure', prenom: 'Modou' },
    'SUP06': { nom: 'Balde', prenom: 'Ibrahima' },
    'SUP07': { nom: 'Diatta', prenom: 'Binta' },
    'SUP08': { nom: 'Kouyate', prenom: 'Mamadou' },
    'SUP09': { nom: 'Ndiaye', prenom: 'Fatou' },
    'SUP10': { nom: 'Camara', prenom: 'Seydou' },
    'SUP11': { nom: 'Diaw', prenom: 'Rokhaya' },
    'SUP12': { nom: 'Diouf', prenom: 'Pape' },
    'SUP13': { nom: 'Faye', prenom: 'Mariama' },
    'SUP14': { nom: 'Mbaye', prenom: 'Cheikh' }
};

// Liste des enquêteurs autorisés
const ENQUETEURS_AUTORISES = {
    'AG001': { nom: 'Fall', prenom: 'Astou' },
    'AG002': { nom: 'Ndao', prenom: 'Mamadou' },
    'AG003': { nom: 'Diop', prenom: 'Abdou' },
    'AG004': { nom: 'Mbaye', prenom: 'Moussa' },
    'AG005': { nom: 'Fall', prenom: 'Binta' },
    'AG006': { nom: 'Ndao', prenom: 'Khady' },
    'AG007': { nom: 'Ndiaye', prenom: 'Aissatou' },
    'AG008': { nom: 'Badji', prenom: 'Coumba' },
    'AG009': { nom: 'Diallo', prenom: 'Ibrahima' },
    'AG010': { nom: 'Sarr', prenom: 'Oumar' },
    'AG011': { nom: 'Sow', prenom: 'Moussa' },
    'AG012': { nom: 'Diallo', prenom: 'Adja' },
    'AG013': { nom: 'Sarr', prenom: 'Aissatou' },
    'AG014': { nom: 'Diatta', prenom: 'Awa' },
    'AG015': { nom: 'Wane', prenom: 'Awa' },
    'AG016': { nom: 'Diop', prenom: 'Aminata' },
    'AG017': { nom: 'Balde', prenom: 'Mariama' },
    'AG018': { nom: 'Deme', prenom: 'Abdou' },
    'AG019': { nom: 'Thiam', prenom: 'Mamadou' },
    'AG020': { nom: 'Cisse', prenom: 'Pape' },
    'AG021': { nom: 'Diouf', prenom: 'Aminata' },
    'AG022': { nom: 'Mbaye', prenom: 'Abdou' },
    'AG023': { nom: 'Thiam', prenom: 'Samba' },
    'AG024': { nom: 'Fall', prenom: 'Babacar' },
    'AG025': { nom: 'Sylla', prenom: 'Oumar' },
    'AG026': { nom: 'Toure', prenom: 'Cheikh' },
    'AG027': { nom: 'Camara', prenom: 'Lamine' },
    'AG028': { nom: 'Deme', prenom: 'Abdou' },
    'AG029': { nom: 'Ndao', prenom: 'Ibrahima' },
    'AG030': { nom: 'Wane', prenom: 'Mariama' },
    'AG031': { nom: 'Sylla', prenom: 'Cheikh' },
    'AG032': { nom: 'Wane', prenom: 'Oumar' },
    'AG033': { nom: 'Sane', prenom: 'Alioune' },
    'AG034': { nom: 'Camara', prenom: 'Astou' },
    'AG035': { nom: 'Balde', prenom: 'Lamine' },
    'AG036': { nom: 'Cisse', prenom: 'Samba' },
    'AG037': { nom: 'Seck', prenom: 'Oumar' },
    'AG038': { nom: 'Diop', prenom: 'Khady' },
    'AG039': { nom: 'Ndiaye', prenom: 'Alioune' },
    'AG040': { nom: 'Mendy', prenom: 'Moussa' },
    'AG041': { nom: 'Sylla', prenom: 'Cheikh' },
    'AG042': { nom: 'Faye', prenom: 'Abdou' }
};



// ============================================
// AUTHENTIFICATION ENQUÊTEUR
// ============================================

const enqueteurForm = document.getElementById('enqueteurForm');
const authSection = document.getElementById('authSection');
const dashboardSection = document.getElementById('dashboardSection');
const formError = document.getElementById('formError');
const userDisplayName = document.getElementById('userDisplayName');
const logoutBtn = document.getElementById('logoutBtn');

if (enqueteurForm) {
    // Vérifier si l'utilisateur est déjà connecté
    checkEnqueteurAuth();
    
    // Gérer la soumission du formulaire
    enqueteurForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleEnqueteurLogin();
    });
    
    // Gérer la déconnexion
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}


/**
 * Vérifier si l'enquêteur est déjà authentifié
 */
function checkEnqueteurAuth() {
    const userData = localStorage.getItem(AUTH_STORAGE_KEY);
    
    if (userData) {
        const user = JSON.parse(userData);
        
        // Vérifier que c'est bien un enquêteur
        if (user.type === 'enqueteur') {
            showEnqueteurDashboard(user);
        }
    }
}


/**
 * Gérer la connexion de l'enquêteur
 */
function handleEnqueteurLogin() {
    const nom = document.getElementById('nom').value.trim();
    const prenom = document.getElementById('prenom').value.trim();
    const idEnqueteur = document.getElementById('idEnqueteur').value.trim().toUpperCase();
    
    // Validation des champs vides
    if (!nom || !prenom || !idEnqueteur) {
        showError('Veuillez remplir tous les champs');
        return;
    }
    
    // Vérifier si l'ID existe dans la liste des enquêteurs autorisés
    if (!ENQUETEURS_AUTORISES[idEnqueteur]) {
        showError('❌ Accès refusé : ID enquêteur non autorisé. Veuillez contacter votre superviseur.');
        return;
    }
    
    // Récupérer les informations de l'enquêteur autorisé
    const enqueteurAutorise = ENQUETEURS_AUTORISES[idEnqueteur];
    
    // Normaliser les noms pour la comparaison (sans accents, minuscules)
    const nomSaisi = normalizeString(nom);
    const prenomSaisi = normalizeString(prenom);
    const nomAutorise = normalizeString(enqueteurAutorise.nom);
    const prenomAutorise = normalizeString(enqueteurAutorise.prenom);
    
    // Vérifier la correspondance nom/prénom
    if (nomSaisi !== nomAutorise || prenomSaisi !== prenomAutorise) {
        showError('❌ Accès refusé : Le nom et/ou le prénom ne correspondent pas à l\'ID fourni.');
        return;
    }
    
    // Créer l'objet utilisateur avec les données validées
    const userData = {
        type: 'enqueteur',
        nom: enqueteurAutorise.nom,
        prenom: enqueteurAutorise.prenom,
        id: idEnqueteur,
        loginTime: new Date().toISOString()
    };
    
    // Sauvegarder dans localStorage
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
    
    // Afficher le dashboard
    showEnqueteurDashboard(userData);
    
    // Message de succès dans la console
    console.log(`✅ Connexion réussie : ${userData.prenom} ${userData.nom} (${userData.id})`);
}


/**
 * Afficher le dashboard enquêteur
 */
function showEnqueteurDashboard(userData) {
    if (authSection && dashboardSection && userDisplayName) {
        // Masquer le formulaire
        authSection.style.display = 'none';
        
        // Afficher le dashboard
        dashboardSection.style.display = 'block';
        
        // Afficher le nom de l'utilisateur
        userDisplayName.textContent = `${userData.prenom} ${userData.nom}`;
        
        // Animer l'apparition
        dashboardSection.style.opacity = '0';
        setTimeout(() => {
            dashboardSection.style.transition = 'opacity 0.5s ease';
            dashboardSection.style.opacity = '1';
        }, 50);
        
        // Message de bienvenue dans la console
        console.log(`✅ Connexion réussie : ${userData.prenom} ${userData.nom} (${userData.id})`);
    }
}


/**
 * Afficher un message d'erreur
 */
function showError(message) {
    if (formError) {
        formError.textContent = message;
        formError.classList.add('show');
        
        // Masquer automatiquement après 5 secondes
        setTimeout(() => {
            formError.classList.remove('show');
        }, 5000);
    }
}


/**
 * Gérer la déconnexion
 */
function handleLogout() {
    // Confirmer la déconnexion
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        // Supprimer les données de localStorage
        localStorage.removeItem(AUTH_STORAGE_KEY);
        
        // Recharger la page
        window.location.reload();
    }
}


// ============================================
// AUTHENTIFICATION SUPERVISEUR
// ============================================

const superviseurForm = document.getElementById('superviseurForm');
const authSectionSup = document.getElementById('authSectionSup');
const dashboardSectionSup = document.getElementById('dashboardSectionSup');
const formErrorSup = document.getElementById('formErrorSup');
const userDisplayNameSup = document.getElementById('userDisplayNameSup');
const logoutBtnSup = document.getElementById('logoutBtnSup');

if (superviseurForm) {
    // Vérifier si l'utilisateur est déjà connecté
    checkSuperviseurAuth();
    
    // Gérer la soumission du formulaire
    superviseurForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSuperviseurLogin();
    });
    
    // Gérer la déconnexion
    if (logoutBtnSup) {
        logoutBtnSup.addEventListener('click', handleLogout);
    }
}


/**
 * Vérifier si le superviseur est déjà authentifié
 */
function checkSuperviseurAuth() {
    const userData = localStorage.getItem(AUTH_STORAGE_KEY);
    
    if (userData) {
        const user = JSON.parse(userData);
        
        // Vérifier que c'est bien un superviseur
        if (user.type === 'superviseur') {
            showSuperviseurDashboard(user);
        }
    }
}


/**
 * Gérer la connexion du superviseur
 */
function handleSuperviseurLogin() {
    const nom = document.getElementById('nomSup').value.trim();
    const prenom = document.getElementById('prenomSup').value.trim();
    const idSuperviseur = document.getElementById('idSuperviseur').value.trim().toUpperCase();
    
    // Validation des champs vides
    if (!nom || !prenom || !idSuperviseur) {
        showErrorSup('Veuillez remplir tous les champs');
        return;
    }
    
    // Vérifier si l'ID existe dans la liste des superviseurs autorisés
    if (!SUPERVISEURS_AUTORISES[idSuperviseur]) {
        showErrorSup('❌ Accès refusé : ID superviseur non autorisé. Veuillez contacter l\'administrateur.');
        return;
    }
    
    // Récupérer les informations du superviseur autorisé
    const superviseurAutorise = SUPERVISEURS_AUTORISES[idSuperviseur];
    
    // Normaliser les noms pour la comparaison (sans accents, minuscules)
    const nomSaisi = normalizeString(nom);
    const prenomSaisi = normalizeString(prenom);
    const nomAutorise = normalizeString(superviseurAutorise.nom);
    const prenomAutorise = normalizeString(superviseurAutorise.prenom);
    
    // Vérifier la correspondance nom/prénom
    if (nomSaisi !== nomAutorise || prenomSaisi !== prenomAutorise) {
        showErrorSup('❌ Accès refusé : Le nom et/ou le prénom ne correspondent pas à l\'ID fourni.');
        return;
    }
    
    // Créer l'objet utilisateur avec les données validées
    const userData = {
        type: 'superviseur',
        nom: superviseurAutorise.nom,
        prenom: superviseurAutorise.prenom,
        id: idSuperviseur,
        loginTime: new Date().toISOString()
    };
    
    // Sauvegarder dans localStorage
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
    
    // Afficher le dashboard
    showSuperviseurDashboard(userData);
    
    // Message de succès dans la console
    console.log(`✅ Connexion réussie : ${userData.prenom} ${userData.nom} (${userData.id})`);
}


/**
 * Afficher le dashboard superviseur
 */
function showSuperviseurDashboard(userData) {
    if (authSectionSup && dashboardSectionSup && userDisplayNameSup) {
        // Masquer le formulaire
        authSectionSup.style.display = 'none';
        
        // Afficher le dashboard
        dashboardSectionSup.style.display = 'block';
        
        // Afficher le nom de l'utilisateur
        userDisplayNameSup.textContent = `${userData.prenom} ${userData.nom}`;
        
        // Animer l'apparition
        dashboardSectionSup.style.opacity = '0';
        setTimeout(() => {
            dashboardSectionSup.style.transition = 'opacity 0.5s ease';
            dashboardSectionSup.style.opacity = '1';
        }, 50);
        
        // Message de bienvenue dans la console
        console.log(`✅ Connexion réussie : ${userData.prenom} ${userData.nom} (${userData.id})`);
    }
}


/**
 * Afficher un message d'erreur (superviseur)
 */
function showErrorSup(message) {
    if (formErrorSup) {
        formErrorSup.textContent = message;
        formErrorSup.classList.add('show');
        
        // Masquer automatiquement après 5 secondes
        setTimeout(() => {
            formErrorSup.classList.remove('show');
        }, 5000);
    }
}


// ============================================
// GESTION DES IFRAMES (OPTIONNEL)
// ============================================

const toggleIframeBtn = document.getElementById('toggleIframe');
const closeIframeBtn = document.getElementById('closeIframe');
const iframeContainer = document.getElementById('iframeContainer');
const shinyIframe = document.getElementById('shinyIframe');

if (toggleIframeBtn && iframeContainer && shinyIframe) {
    toggleIframeBtn.addEventListener('click', () => {
        iframeContainer.style.display = 'block';
        
        // Charger l'iframe seulement au clic (économise la bande passante)
        if (!shinyIframe.src) {
            // REMPLACEZ cette URL par celle de votre application Shiny
            shinyIframe.src = 'https://votre-app-shiny-enqueteur.com';
        }
        
        // Scroller vers l'iframe
        iframeContainer.scrollIntoView({ behavior: 'smooth' });
    });
    
    if (closeIframeBtn) {
        closeIframeBtn.addEventListener('click', () => {
            iframeContainer.style.display = 'none';
        });
    }
}


// ============================================
// INFORMATIONS UTILISATEUR (API)
// ============================================

/**
 * Récupère les informations de l'utilisateur connecté
 */
function getCurrentUser() {
    const userData = localStorage.getItem(AUTH_STORAGE_KEY);
    return userData ? JSON.parse(userData) : null;
}


/**
 * Vérifie si un utilisateur est connecté
 */
function isAuthenticated() {
    return getCurrentUser() !== null;
}


/**
 * Normalise une chaîne pour la comparaison (enlève accents, met en minuscules, trim)
 */
function normalizeString(str) {
    return str
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, ''); // Enlève les accents
}


// Export des fonctions utiles
window.AuthUtils = {
    getCurrentUser,
    isAuthenticated,
    logout: handleLogout,
    enqueteursAutorises: ENQUETEURS_AUTORISES,
    superviseursAutorises: SUPERVISEURS_AUTORISES
};