// Adapted main script for Astro environment (no include loader needed)
class SiteController {
  constructor(){
    this.currentLanguage = 'cs';
    this.currentTheme = 'light';
    this.animationObserved = false;
    this.initTheme();
    this.initLanguage();
    this.bindEvents();
    this.highlightNav();
    this.updateContent();
    this.initScrollEffects();
    this.animateOnScroll();
  }
  initTheme(){
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.currentTheme = saved || (prefersDark ? 'dark' : 'light');
    this.applyTheme();
  }
  applyTheme(){
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
    const icon = document.querySelector('.theme-icon');
    if (icon) icon.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
  }
  toggleTheme(){
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme();
  }
  initLanguage(){
    const saved = localStorage.getItem('language');
    const browser = navigator.language.slice(0,2);
    if (saved && translations[saved]) this.currentLanguage = saved; else if (translations[browser]) this.currentLanguage = browser;
    this.updateLanguageButtons();
  }
  setLanguage(lang){
    if(!translations[lang]) return;
    this.currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    this.updateContent();
    this.updateLanguageButtons();
  }
  updateLanguageButtons(){
    document.querySelectorAll('.lang-btn').forEach(b=>{
      b.classList.toggle('active', b.dataset.lang === this.currentLanguage);
    });
  }
  getNested(obj, path){
    return path.split('.').reduce((o,k)=>o && o[k], obj);
  }
  updateContent(){
    const t = translations[this.currentLanguage];
    document.querySelectorAll('[data-translate]').forEach(el=>{
      const key = el.dataset.translate;
      const val = this.getNested(t, key);
      if(!val) return;
      if (el.tagName === 'INPUT' && el.type === 'email') el.placeholder = val; else el.textContent = val;
    });
    document.title = t.title;
    const newsletterInput = document.querySelector('.newsletter-input');
    if (newsletterInput) {
      const placeholders = { cs: 'váš@email.cz', sk: 'váš@email.sk', en: 'your@email.com' };
      newsletterInput.placeholder = placeholders[this.currentLanguage];
    }
  }
  highlightNav(){
    const path = window.location.pathname.replace(/\/index\.html?$/,'/');
    document.querySelectorAll('.nav-link').forEach(a=>{
      const href = a.getAttribute('href');
      const normalized = href === '/' ? '/' : '/' + href.replace(/^\//,'');
      a.classList.toggle('active', normalized === path);
    });
  }
  bindEvents(){
    document.addEventListener('click', e => {
      const themeBtn = e.target.closest('.theme-toggle');
      if(themeBtn){ this.toggleTheme(); return; }
      const langBtn = e.target.closest('.lang-btn');
      if(langBtn){ this.setLanguage(langBtn.dataset.lang); return; }
      const mobileToggle = e.target.closest('.mobile-menu-toggle');
      if(mobileToggle){
        const menu = document.querySelector('.nav-menu');
        menu?.classList.toggle('mobile-active');
        mobileToggle.classList.toggle('active');
      }
    });
    document.addEventListener('submit', e => {
      if(e.target.matches('.newsletter-form')){
        e.preventDefault();
        this.handleNewsletterSubmit(e.target);
      }
    });
    document.addEventListener('keydown', e => {
      if(e.altKey && e.key === 't'){
        e.preventDefault();
        this.toggleTheme();
      }
    });
    window.addEventListener('scroll', () => {
      this.onScroll();
      this.animateOnScroll();
    });
  }
  onScroll(){
    const navbar = document.querySelector('.navbar');
    if(!navbar) return;
    if(window.scrollY > 100){
      navbar.style.background = this.currentTheme === 'dark'? 'rgba(15,23,42,0.95)': 'rgba(255,255,255,0.95)';
      navbar.style.backdropFilter = 'blur(20px)';
    } else {
      navbar.style.background = this.currentTheme === 'dark'? 'rgba(15,23,42,0.25)': 'rgba(255,255,255,0.25)';
    }
  }
  initScrollEffects(){
    // placeholder for potential future throttling or intersection observers
  }
  animateOnScroll(){
    const cards = document.querySelectorAll('.feature-card, .event-card, .business-card, .news-card');
    cards.forEach(card => {
      if(card.classList.contains('animated')) return;
      const rect = card.getBoundingClientRect();
      if(rect.top < window.innerHeight * 0.85){
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        requestAnimationFrame(()=>{
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
          card.classList.add('animated');
        });
      }
    });
  }
  handleNewsletterSubmit(form){
    const input = form.querySelector('.newsletter-input');
    const button = form.querySelector('button');
    if(!input || !button) return;
    const email = input.value.trim();
    if(!this.validateEmail(email)){
      this.showNotification(this.currentLanguage === 'cs' ? 'Zadejte platný email' : this.currentLanguage === 'sk' ? 'Zadajte platný email' : 'Please enter a valid email', 'error');
      return;
    }
    button.disabled = true;
    button.textContent = this.currentLanguage === 'cs' ? 'Odesíláno...' : this.currentLanguage === 'sk' ? 'Odosielam...' : 'Sending...';
    setTimeout(()=>{
      button.textContent = this.currentLanguage === 'cs' ? 'Úspěch!' : this.currentLanguage === 'sk' ? 'Úspech!' : 'Success!';
      input.value='';
      setTimeout(()=>{
        button.textContent = translations[this.currentLanguage]?.contact?.newsletter?.button || 'Subscribe';
        button.disabled = false;
      }, 1600);
    }, 1400);
  }
  validateEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  showNotification(message, type='info'){
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `position:fixed;top:100px;right:20px;background:${type==='error'?'var(--accent-red)':'var(--accent-blue)'};color:#fff;padding:1rem 1.25rem;box-shadow:0 10px 25px rgba(0,0,0,0.2);z-index:10000;transform:translateX(120%);transition:all .35s ease;font-family:var(--font-body);font-weight:500;`;
    notification.textContent = message;
    document.body.appendChild(notification);
    requestAnimationFrame(()=>{ notification.style.transform='translateX(0)'; });
    setTimeout(()=>{
      notification.style.transform='translateX(120%)';
      setTimeout(()=> notification.remove(), 350);
    }, 4000);
  }
}

if(document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ()=> window.site = new SiteController());
} else {
  window.site = new SiteController();
}
