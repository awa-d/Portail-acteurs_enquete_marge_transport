# 🚀 Portail Shiny - Documentation d'installation

## 📋 Vue d'ensemble

Ce portail web sert de plateforme d'accès centralisée pour deux applications R Shiny :
- **Dashboard Enquêteur** : Suivi personnel des statistiques
- **Dashboard Superviseur** : Contrôle qualité et gestion d'équipe

## 📁 Structure du projet

```
portail-shiny/
│
├── index.html                 # Page d'accueil
├── enqueteur.html            # Espace Enquêteur
├── superviseur.html          # Espace Superviseur
├── notes.html                # Notes Techniques
├── aide.html                 # Aide & Documentation
│
├── css/
│   └── style.css             # Styles (thèmes clair/sombre)
│
├── js/
│   ├── app.js                # Logique principale
│   ├── auth.js               # Authentification
│   └── faq.js                # FAQ accordéon
│
├── assets/                   # À CRÉER
│   ├── documents/            # Documents à télécharger
│   │   ├── manuel-enqueteur.pdf
│   │   ├── manuel-superviseur.pdf
│   │   └── questionnaire.xlsx
│   └── videos/               # Vidéos tutorielles (optionnel)
│       └── tutoriel.mp4
│
└── README.md                 # Ce fichier
```

---

## ⚙️ Configuration des applications Shiny

### 🔧 ÉTAPE IMPORTANTE : Remplacer les URLs des applications

Vous devez remplacer les URLs des applications Shiny dans les fichiers suivants :

#### 1️⃣ **enqueteur.html** (ligne ~130)

```html
<!-- AVANT -->
<a href="https://votre-app-shiny-enqueteur.com" target="_blank" ...>

<!-- APRÈS -->
<a href="https://shiny.votredomaine.com/enqueteur" target="_blank" ...>
```

Si vous voulez afficher l'app dans un iframe (ligne ~171) :
```html
<iframe id="shinyIframe" src="https://shiny.votredomaine.com/enqueteur" ...>
```

#### 2️⃣ **superviseur.html** (ligne ~130)

```html
<!-- AVANT -->
<a href="https://votre-app-shiny-superviseur.com" target="_blank" ...>

<!-- APRÈS -->
<a href="https://shiny.votredomaine.com/superviseur" target="_blank" ...>
```

#### 3️⃣ **js/auth.js** (ligne ~309 - optionnel pour iframe)

```javascript
// AVANT
shinyIframe.src = 'https://votre-app-shiny-enqueteur.com';

// APRÈS
shinyIframe.src = 'https://shiny.votredomaine.com/enqueteur';
```

---

## 📄 Configuration des documents

### Ajouter vos documents PDF et Excel

1. **Créez le dossier assets** :
```bash
mkdir -p assets/documents
```

2. **Placez vos fichiers** :
```
assets/
└── documents/
    ├── manuel-enqueteur.pdf
    ├── manuel-superviseur.pdf
    └── questionnaire.xlsx
```

3. **Les liens sont déjà configurés** dans les fichiers HTML avec ces chemins :
   - `assets/documents/manuel-enqueteur.pdf`
   - `assets/documents/manuel-superviseur.pdf`
   - `assets/documents/questionnaire.xlsx`

---

## 🎥 Ajouter des vidéos tutorielles (optionnel)

### Option 1 : Vidéos locales

```bash
mkdir -p assets/videos
# Placez vos vidéos .mp4 dans ce dossier
```

### Option 2 : Vidéos YouTube/Vimeo

Dans **aide.html** (ligne ~127), remplacez :
```html
<iframe 
    src="https://www.youtube.com/embed/VOTRE_VIDEO_ID"
    ...>
</iframe>
```

---

## 🚀 Déploiement

### Option 1 : Serveur Web (Apache/Nginx)

1. **Uploadez tous les fichiers** sur votre serveur via FTP/SFTP

2. **Configuration Apache** (`.htaccess` optionnel) :
```apache
# Activer la compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>

# Cache des ressources
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/svg+xml "access plus 1 month"
</IfModule>
```

3. **Accès** : `https://votredomaine.com/portail-shiny/`

### Option 2 : GitHub Pages (gratuit)

1. Créez un dépôt GitHub
2. Uploadez tous les fichiers
3. Activez GitHub Pages dans Settings
4. Accès : `https://votre-username.github.io/portail-shiny/`

### Option 3 : Serveur local (test)

```bash
# Avec Python 3
cd portail-shiny
python -m http.server 8000

# Accès : http://localhost:8000
```

---

## 🎨 Personnalisation

### Modifier les couleurs principales

Dans **css/style.css** (lignes 7-15) :

```css
:root {
    --primary-color: #4F46E5;      /* Couleur principale */
    --secondary-color: #10B981;    /* Couleur secondaire */
    --enqueteur-color: #4F46E5;    /* Couleur enquêteur */
    --superviseur-color: #10B981;  /* Couleur superviseur */
}
```

### Modifier les textes

- **Titre du site** : Ligne 14-16 de chaque fichier HTML
- **Nom dans la navigation** : `.nav-logo` dans chaque HTML
- **Footer** : Tout en bas de chaque fichier HTML

---

## 🔐 Authentification

### Fonctionnement actuel

L'authentification est **simulée côté client** pour la démo. Les identifiants sont stockés dans `localStorage`.

### Format des IDs

- **Enquêteurs** : `ENQ001`, `ENQ002`, etc.
- **Superviseurs** : `SUP001`, `SUP002`, etc.

Format requis : 3 lettres majuscules + 3 chiffres

### Pour une vraie authentification

Vous devrez :

1. **Créer une API backend** (Node.js, PHP, Python...)
2. **Modifier auth.js** pour appeler votre API :

```javascript
async function handleEnqueteurLogin() {
    const response = await fetch('https://api.votredomaine.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, prenom, id })
    });
    
    if (response.ok) {
        const data = await response.json();
        // Gérer la réponse...
    }
}
```

3. **Sécuriser avec des tokens JWT**

---

## 🌙 Thème sombre/clair

Le thème est automatiquement sauvegardé dans `localStorage` et persiste entre les sessions.

**Personnalisation** dans `css/style.css` :
```css
[data-theme="dark"] {
    --bg-primary: #111827;
    --text-primary: #F9FAFB;
    /* ... autres couleurs ... */
}
```

---

## 📱 Responsive Design

Le portail est **100% responsive** et testé sur :
- 📱 Smartphones (iOS, Android)
- 📱 Tablettes
- 💻 Ordinateurs (tous navigateurs modernes)

---

## ✅ Checklist avant mise en ligne

- [ ] Remplacer les URLs des applications Shiny
- [ ] Ajouter les documents PDF et Excel dans `assets/documents/`
- [ ] Tester l'authentification (enquêteur et superviseur)
- [ ] Vérifier tous les liens de téléchargement
- [ ] Tester sur mobile et desktop
- [ ] Vérifier le thème sombre
- [ ] Mettre à jour les informations de contact (email, téléphone, WhatsApp)
- [ ] Personnaliser les textes et logos
- [ ] Tester les vidéos tutorielles (si ajoutées)

---

## 🐛 Dépannage

### Problème : Les styles ne s'appliquent pas

- Vérifiez que le chemin vers `css/style.css` est correct
- Videz le cache du navigateur (Ctrl+F5)

### Problème : Le menu mobile ne fonctionne pas

- Vérifiez que `js/app.js` est bien chargé
- Ouvrez la console (F12) pour voir les erreurs

### Problème : L'authentification ne marche pas

- Vérifiez que `js/auth.js` est bien chargé
- Vérifiez le format de l'ID (ex: ENQ001, SUP001)

### Problème : Les fichiers ne se téléchargent pas

- Vérifiez que les fichiers existent dans `assets/documents/`
- Vérifiez les chemins dans les liens HTML

---

## 📞 Support

Pour toute question technique, contactez :
- **Email** : support@votredomaine.com
- **WhatsApp** : +221 XX XXX XX XX

---

## 📝 Notes de version

### Version 1.0.0 (Février 2025)
- ✅ Interface complète HTML/CSS/JS
- ✅ Authentification simulée (enquêteur/superviseur)
- ✅ Thème clair/sombre
- ✅ Design responsive
- ✅ Système de téléchargement
- ✅ FAQ interactive
- ✅ Historique des versions

---

## 📜 Licence

© 2025 Portail Shiny - Tous droits réservés

---

## 🎯 Prochaines améliorations suggérées

1. **Authentification réelle** avec backend
2. **Statistiques en temps réel** depuis l'API Shiny
3. **Notifications push** pour les nouveaux questionnaires
4. **Mode hors ligne** (PWA)
5. **Multi-langues** (français, anglais, wolof, etc.)
6. **Système de chat** support intégré

---

**Bonne utilisation ! 🚀**