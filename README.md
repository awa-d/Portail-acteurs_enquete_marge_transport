# 🚀 Portail-acteurs_enquete_marge_transport

**Portail Web Shiny – Documentation d’installation & d’utilisation**

## 🔗 Accès au portail

* 🌐 **Portail web** : [https://lien-vers-le-portail](https://lien-vers-le-portail)
* 📊 **Application Shiny – Enquêteur** : [ICI](https://pqwcxi-jean-batabati.shinyapps.io/Enqueteur/)

  * 👤 Compte de test :

    * Nom : Diatta
    * Prénom : Awa
    * ID : AG013
* 🧑‍💼 **Application Shiny – Superviseur** : [ICI](https://pqwcxi-jean-batabati.shinyapps.io/Superviseur/)

  * 👤 Compte de test :

    * Nom : Diop
    * Prénom : Serigne
    * ID : SUP03

---

## 📋 Vue d’ensemble

Ce portail web est une plateforme d’accès centralisée vers deux applications **RStudio Shiny** destinées au suivi des enquêtes sur la marge de transport :

* **Dashboard Enquêteur** :
  Suivi personnel des performances et statistiques individuelles.
* **Dashboard Superviseur** :
  Contrôle qualité, supervision des équipes et pilotage global des enquêtes.

---

## 🧰 Stack technique

* **Backend / Data** : R (Shiny)
* **Frontend** : JavaScript, HTML, CSS

---

## 📁 Structure du projet

```bash
portail-shiny/
│
├── index.html                 # Page d'accueil
├── enqueteur.html             # Espace Enquêteur
├── superviseur.html           # Espace Superviseur
├── notes.html                 # Notes techniques
├── aide.html                  # Aide & Documentation
│
├── css/
│   └── style.css              # Styles (thèmes clair/sombre)
│
├── js/
│   ├── app.js                 # Logique principale
│   ├── auth.js                # Authentification
│   └── faq.js                 # FAQ accordéon
│
├── assets/                    # À créer
│   ├── documents/
│   │   ├── manuel-enqueteur.pdf
│   │   ├── manuel-superviseur.pdf
│   │   └── questionnaire.xlsx
│   └── videos/                # Vidéos tutorielles (optionnel)
│       ├── tutoriel_dashboard_enq.mp4
│       ├── tutoriel_dashboard_sup.mp4
│       └── tutoriel_portailWEB.mp4
│
└── README.md                  # Documentation du projet
```

---

## ⚙️ Installation & Déploiement

### 1️⃣ Prérequis

* Navigateur web moderne (Chrome, Firefox, Edge)
* Environnement **R** avec Shiny installé
* Serveur web (Apache, Nginx ou équivalent) pour héberger le portail

### 2️⃣ Déploiement du portail web

```bash
git clone https://github.com/votre-organisation/portail-acteurs_enquete_marge_transport.git
cd portail-acteurs_enquete_marge_transport
```

* Déployer les fichiers HTML/CSS/JS sur votre serveur web
* Mettre à jour les liens vers les applications Shiny dans `index.html`, `enqueteur.html` et `superviseur.html`

### 3️⃣ Lancement des applications Shiny

* Déployer les apps Shiny sur un serveur Shiny (Shiny Server / Posit Connect)
* Vérifier que les URLs sont accessibles depuis le portail

---

## 📞 Support & Contacts

Pour toute question technique ou demande d’évolution :

* 👩🏽‍💻 GitHub : [Awa Diaw](https://github.com/awa-d)
* 👨🏾‍💻 GitHub : [Ameth Faye](https://github.com/ameth08faye)
* 👨🏽‍💻 GitHub : [Jean-Luc Batabati](https://github.com/Luck-John)

---

## 📝 Notes de version

### Version 1.0.0 – Février 2025

* ✅ Interface complète HTML/CSS/JS
* ✅ Authentification simulée (enquêteur / superviseur)
* ✅ Thème clair / sombre
* ✅ Design responsive
* ✅ Système de téléchargement de documents
* ✅ FAQ interactive
* ✅ Historique des versions

---

## 📜 Licence

© 2025 – **Portail Shiny – Tous droits réservés**

---

## 🎯 Prochaines améliorations suggérées

* 🔔 Notifications push pour les nouveaux questionnaires
* 📡 Mode hors ligne (PWA)
* 🌍 Multi-langues (français, anglais, wolof, etc.)
* 💬 Système de chat de support intégré

---
