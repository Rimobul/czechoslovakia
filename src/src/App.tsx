import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'

function App() {
  const { t, i18n } = useTranslation()
  const [dark, setDark] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll for header shrinking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Toggle theme
  const toggleTheme = () => {
    setDark((d) => {
      document.body.classList.toggle('dark', !d)
      return !d
    })
  }

  // Language switcher
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  // Ensure correct theme on mount
  useEffect(() => {
    if (dark) document.body.classList.add('dark')
    else document.body.classList.remove('dark')
  }, [dark])

  return (
    <div className="app">
      {/* Top Navigation */}
      <nav className={`top-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-left">
            <div className="logo">
              <div className="logo-icon"></div>
              <span className={`logo-text ${scrolled ? 'small' : ''}`}>
                {scrolled ? 'NČ' : t('title')}
              </span>
            </div>
          </div>
          <div className="nav-center">
            <a href="#about" className="nav-link">{t('nav.about')}</a>
            <span className="nav-separator">|</span>
            <a href="#history" className="nav-link">{t('nav.history')}</a>
            <span className="nav-separator">|</span>
            <a href="#vision" className="nav-link">{t('nav.vision')}</a>
            <span className="nav-separator">|</span>
            <a href="#join" className="nav-link">{t('nav.join')}</a>
            <span className="nav-separator">|</span>
            <a href="#contact" className="nav-link">{t('nav.contact')}</a>
          </div>
          <div className="nav-right">
            <div className="language-switcher">
              <button 
                className={i18n.language === 'cs' ? 'active' : ''}
                onClick={() => changeLanguage('cs')}
              >
                CZ
              </button>
              <span>|</span>
              <button 
                className={i18n.language === 'sk' ? 'active' : ''}
                onClick={() => changeLanguage('sk')}
              >
                Q
              </button>
              <span>|</span>
              <button className="theme-toggle" onClick={toggleTheme}>
                ☀
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            {t('hero.title')}
          </h1>
          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-container">
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-section">
              <h3>{t('sidebar.about')}</h3>
              <ul>
                <li><a href="#who">{t('sidebar.who')}</a></li>
                <li><a href="#what">{t('sidebar.what')}</a></li>
                <li><a href="#why">{t('sidebar.why')}</a></li>
                <li><a href="#goals">{t('sidebar.goals')}</a></li>
                <li><a href="#mission">{t('sidebar.mission')}</a></li>
              </ul>
            </div>
          </aside>

          {/* Content Area */}
          <div className="content-area">
            <section className="content-section">
              <h2>{t('content.whoWeAre.title')}</h2>
              <p>{t('content.whoWeAre.text')}</p>
              
              <div className="content-image">
                <img 
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80" 
                  alt="Mountain landscape"
                />
              </div>

              <h2>{t('content.whatWeWant.title')}</h2>
              <p>{t('content.whatWeWant.text')}</p>
            </section>
          </div>

          {/* News Feed */}
          <aside className="news-feed">
            <h3>{t('news.title')}</h3>
            <div className="news-item">
              <p>{t('news.item1')}</p>
            </div>
            <div className="news-item">
              <p>{t('news.item2')}</p>
            </div>
            <div className="news-item">
              <p>{t('news.item3')}</p>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>{t('footer.findUs')}</h4>
            <div className="footer-map">
              {/* Placeholder for map */}
              <svg width="200" height="120" viewBox="0 0 200 120">
                <path d="M20,20 L180,20 L180,100 L20,100 Z" fill="var(--accent)" opacity="0.3"/>
                <text x="100" y="65" textAnchor="middle" fill="var(--text)" fontSize="12">
                  {t('footer.mapPlaceholder')}
                </text>
              </svg>
            </div>
          </div>
          <div className="footer-section">
            <h4>{t('footer.social')}</h4>
            <div className="social-links">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">Blog</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
