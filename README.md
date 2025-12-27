# 🚀 Portfolio Personal - Mihnea Catuneanu

Portfolio modern și animat, optimizat pentru GitHub Pages.

## ✨ Features

- 🎨 **Design Modern** - Dark theme cu animații smooth
- 📱 **Responsive** - Funcționează perfect pe mobile, tablet și desktop
- ⚡ **Performant** - Încărcare rapidă, fără dependințe heavy
- 🔄 **Typing Effect** - Animație de text în hero section
- 📊 **GitHub Integration** - Afișează automat repository-urile tale
- 🎯 **Smooth Scrolling** - Navigare fluidă între secțiuni
- 💫 **Intersection Observer** - Animații pe scroll
- 📬 **Contact Form** - Formular funcțional de contact

## 🛠️ Personalizare Rapidă

### 1️⃣ Informații Personale

**În `index.html`:**

```html
<!-- Linia 33: Schimbă numele -->
<h1 class="hero-title">
    Bună, sunt <span class="gradient-text">NUMELE TĂU</span>
</h1>

<!-- Linia 65-66: Actualizează linkurile sociale -->
<a href="https://github.com/USERNAME-TĂU" target="_blank">
<a href="https://linkedin.com/in/USERNAME-TĂU" target="_blank">
<a href="mailto:EMAILUL-TĂU@example.com">
```

**În `script.js`:**

```javascript
// Linia 2-8: Personalizează typing effect
const typingTexts = [
    'Titlul tău 1',
    'Titlul tău 2',
    'Titlul tău 3',
    // Adaugă mai multe...
];

// Linia 95: Schimbă username-ul GitHub
const username = 'USERNAME-TĂU-GITHUB';
```

### 2️⃣ Proiecte

Editează secțiunea de proiecte în `index.html` (începând de la linia 160):

```html
<div class="project-card">
    <div class="project-content">
        <div class="project-tags">
            <span class="tag">Tehnologie1</span>
            <span class="tag">Tehnologie2</span>
        </div>
        <h3 class="project-title">Numele Proiectului</h3>
        <p class="project-description">
            Descrierea proiectului tău...
        </p>
        <div class="project-links">
            <a href="LINK-GITHUB" class="project-link">
                <i class="fab fa-github"></i> Cod Sursă
            </a>
            <a href="LINK-DEMO" class="project-link">
                <i class="fas fa-external-link-alt"></i> Demo
            </a>
        </div>
    </div>
</div>
```

### 3️⃣ Skills & Tehnologii

Modifică skill-urile în `index.html` (linia 280+):

```html
<div class="skill-item">
    <span class="skill-name">Numele Skill-ului</span>
    <div class="skill-bar">
        <div class="skill-progress" data-progress="85"></div>
    </div>
</div>
```

Valoarea `data-progress` reprezintă procentul (0-100).

### 4️⃣ Culori & Tema

Schimbă culorile în `styles.css` (linia 2-12):

```css
:root {
    --primary-color: #64ffda;      /* Culoare accent (verde-cyan) */
    --bg-color: #0a192f;           /* Background principal (albastru închis) */
    --bg-light: #112240;           /* Background secundar */
    --text-color: #ccd6f6;         /* Culoare text */
    --accent-color: #64ffda;       /* Accent highlights */
}
```

**Teme Predefinite:**

**🟦 Blue Theme (default):**
```css
--primary-color: #64ffda;
--bg-color: #0a192f;
```

**🟣 Purple Theme:**
```css
--primary-color: #a78bfa;
--bg-color: #1a0b2e;
```

**🟢 Green Theme:**
```css
--primary-color: #10b981;
--bg-color: #0f1419;
```

**🟠 Orange Theme:**
```css
--primary-color: #f97316;
--bg-color: #1a1110;
```

### 5️⃣ Contact & Social Media

Actualizează linkurile în secțiunea Contact (linia 370+ în `index.html`):

```html
<a href="mailto:EMAILUL-TĂU" class="contact-item">
    <span>EMAILUL-TĂU@example.com</span>
</a>
<a href="https://github.com/USERNAME" class="contact-item">
    <span>github.com/USERNAME</span>
</a>
<a href="https://linkedin.com/in/USERNAME" class="contact-item">
    <span>linkedin.com/in/USERNAME</span>
</a>
```

## 📤 Deployment pe GitHub Pages

### Metoda 1: Direct Upload

1. Urcă fișierele în repository-ul `USERNAME.github.io`
2. Mergi la Settings → Pages
3. Selectează branch: `main` și folder: `/ (root)`
4. Click Save
5. Site-ul va fi live la `https://USERNAME.github.io`

### Metoda 2: Git Command Line

```bash
# Clonează repo-ul
git clone https://github.com/USERNAME/USERNAME.github.io
cd USERNAME.github.io

# Adaugă fișierele
git add .
git commit -m "Initial portfolio commit"
git push origin main
```

## 🎨 Customizări Avansate

### Adaugă Imagine de Profil

În `index.html`, înlocuiește `hero-image` div cu:

```html
<div class="hero-image">
    <img src="path/to/your/image.jpg" alt="Profile" class="profile-img">
</div>
```

Adaugă în `styles.css`:

```css
.profile-img {
    width: 400px;
    height: 400px;
    border-radius: 50%;
    object-fit: cover;
    border: 5px solid var(--primary-color);
    box-shadow: 0 0 50px rgba(100, 255, 218, 0.3);
}
```

### Activează Particle Effect

În `script.js`, decomentează linia 302:

```javascript
createParticles(); // Uncomment this line
```

### Integrează EmailJS pentru Contact Form

1. Creează cont pe [EmailJS](https://www.emailjs.com/)
2. Obține Service ID și Template ID
3. Adaugă în `index.html` înainte de `</body>`:

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
    emailjs.init("YOUR_PUBLIC_KEY");
</script>
```

4. Decomentează codul EmailJS în `script.js` (linia 140+)

## 🐛 Troubleshooting

**Repository-urile GitHub nu se încarcă?**
- Verifică username-ul în `script.js` linia 95
- Verifică dacă ai repository-uri publice
- Deschide Console (F12) pentru erori

**Animațiile nu funcționează?**
- Verifică dacă JavaScript-ul e activat
- Clear cache și reîncarcă pagina (Ctrl+F5)

**Site-ul nu se vede pe GitHub Pages?**
- Așteaptă 5-10 minute după primul push
- Verifică Settings → Pages dacă e activat
- Asigură-te că fișierul se numește `index.html`

## 📁 Structura Fișierelor

```
USERNAME.github.io/
├── index.html          # Pagina principală
├── styles.css          # Stiluri și animații
├── script.js           # JavaScript & animații
└── README.md           # Acest fișier
```

## 💡 Tips & Tricks

- **Optimizează imaginile** - Folosește format WebP pentru încărcare rapidă
- **SEO** - Adaugă meta tags în `<head>` pentru social media
- **Analytics** - Adaugă Google Analytics pentru tracking vizitatori
- **Custom Domain** - Poți configura un domeniu custom în GitHub Pages Settings
- **Dark/Light Mode** - Poți adăuga un toggle pentru tema clară

## 🎯 Next Steps

1. ✅ Customizează toate informațiile personale
2. ✅ Adaugă proiectele tale reale
3. ✅ Actualizează skills-urile
4. ✅ Testează pe mobile
5. ✅ Deploy pe GitHub Pages
6. 📱 Distribuie link-ul pe LinkedIn/CV

## 📞 Contact & Suport

Dacă ai întrebări sau probleme:
- 🐛 Deschide un Issue pe GitHub
- 📧 Trimite-mi un email
- 💬 Lasă un comentariu

## 📝 License

Free to use - Personalizează și folosește cum vrei! 🚀

---

**Creat cu ❤️ și multă cafea ☕**
