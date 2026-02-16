/**
 * ============================================
 * GESTION DE LA FAQ (ACCORDÉON)
 * ============================================
 */

document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fermer les autres items (comportement optionnel)
            // Décommentez les lignes suivantes si vous voulez qu'un seul item soit ouvert à la fois
            /*
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            */
            
            // Basculer l'item actuel
            item.classList.toggle('active');
            
            // Animation de l'icône
            const icon = question.querySelector('.faq-icon');
            if (item.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // Ouvrir automatiquement la première question (optionnel)
    // Décommentez si vous voulez que la première question soit ouverte par défaut
    /*
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
    */
    
    // Permettre l'ouverture via URL (#faq-1, #faq-2, etc.)
    const hash = window.location.hash;
    if (hash && hash.startsWith('#faq-')) {
        const index = parseInt(hash.replace('#faq-', '')) - 1;
        if (faqItems[index]) {
            faqItems[index].classList.add('active');
            faqItems[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});


/**
 * Fonction pour rechercher dans la FAQ (optionnel)
 * Vous pouvez ajouter un champ de recherche dans aide.html
 */
function searchFAQ(searchTerm) {
    const faqItems = document.querySelectorAll('.faq-item');
    const term = searchTerm.toLowerCase().trim();
    
    if (term === '') {
        // Afficher tous les items si la recherche est vide
        faqItems.forEach(item => {
            item.style.display = 'block';
        });
        return;
    }
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question span').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
        
        if (question.includes(term) || answer.includes(term)) {
            item.style.display = 'block';
            // Optionnellement ouvrir l'item trouvé
            item.classList.add('active');
        } else {
            item.style.display = 'none';
        }
    });
}


// Export de la fonction de recherche
window.FAQUtils = {
    search: searchFAQ
};