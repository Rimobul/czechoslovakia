import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'

const navTree = [
  {
    key: 'item1',
    children: [
      { key: 'subitem11', link: '#' },
      { key: 'subitem12', link: '#' },
    ],
  },
  {
    key: 'item2',
    children: [],
  },
  {
    key: 'item3',
    children: [
      { key: 'subitem31', link: '#' },
      { key: 'subitem32', link: '#' },
      { key: 'subitem33', link: '#' },
    ],
  },
  {
    key: 'item4',
    children: [],
  },
  {
    key: 'item5',
    children: [],
  },
]

function TreeMenu({ items }: { items: typeof navTree }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState<string | null>(null)
  
  return (
    <ul className="tree-menu">
      {items.map((item) => (
        <li key={item.key}>
          <button
            className="tree-menu-label"
            aria-expanded={open === item.key}
            onClick={() => setOpen(open === item.key ? null : item.key)}
          >
            {t(`menu.${item.key}`)}
          </button>
          {item.children.length > 0 && open === item.key && (
            <ul className="submenu">
              {item.children.map((child) => (
                <li key={child.key}>
                  <a href={child.link}>{t(`menu.${child.key}`)}</a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}

function App() {
  const { t, i18n } = useTranslation()
  const [dark, setDark] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  // Toggle theme and update body class
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
  if (dark) document.body.classList.add('dark')
  else document.body.classList.remove('dark')

  return (
    <div className="page-container">
      {/* Header */}
      <header className="header">
        <div className="flag-icon">
          <div className="flag-stripe blue"></div>
          <div className="flag-stripe red"></div>
        </div>
        <h1 className="title">{t('title')}</h1>
        <div className="header-controls">
          <div className="language-switcher">
            <button 
              className={i18n.language === 'cs' ? 'active' : ''}
              onClick={() => changeLanguage('cs')}
            >
              CS
            </button>
            <button 
              className={i18n.language === 'sk' ? 'active' : ''}
              onClick={() => changeLanguage('sk')}
            >
              SK
            </button>
            <button 
              className={i18n.language === 'en' ? 'active' : ''}
              onClick={() => changeLanguage('en')}
            >
              EN
            </button>
          </div>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <span className="toggle-dot" />
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="nav-bar">
        <a href="#" className="nav-link">{t('nav.vision')}</a>
        <span className="nav-separator">–</span>
        <a href="#" className="nav-link">{t('nav.news')}</a>
        <span className="nav-separator">–</span>
        <a href="#" className="nav-link">{t('nav.blog')}</a>
        <span className="nav-separator">–</span>
        <a href="#" className="nav-link">{t('nav.atlas')}</a>
        <span className="nav-separator">-</span>
        <a href="#" className="nav-link">{t('nav.maps')}</a>
      </nav>

      {/* Main Content */}
      <div className="main-layout">
        {/* Sidebar Menu */}
        <aside className="sidebar">
          <TreeMenu items={navTree} />
        </aside>

        {/* Content Area */}
        <main className="content-area">
          <p className="content-text">
            {t('content.lorem')}
          </p>
          <div className="content-image">
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80" 
              alt="Architecture"
              loading="lazy"
            />
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
