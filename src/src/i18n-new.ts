import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  cs: {
    translation: {
      title: "Nové Československo",
      hero: {
        title: "NOVÉ\nČESKOSLOVENSKO",
        subtitle: "Občanské sdružení pro sjednocení"
      },
      nav: {
        about: "O NÁS",
        history: "HISTORIE", 
        vision: "VIZE",
        join: "ZAPOJTE SE",
        contact: "KONTAKT"
      },
      sidebar: {
        about: "O nás",
        who: "Kdo jsme?",
        what: "Co chceme?",
        why: "Proč teď?",
        goals: "Koho se snažíme?",
        mission: "Jaké jsou naše cíle?"
      },
      content: {
        whoWeAre: {
          title: "Kto jsme?",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        whatWeWant: {
          title: "Co chceme?",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
      },
      news: {
        title: "Novinky",
        item1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        item2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.",
        item3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua."
      },
      footer: {
        findUs: "Kde nás najdete",
        mapPlaceholder: "Mapa ČR a SR",
        social: "Facebook\nInstagram\nBlog"
      }
    }
  },
  sk: {
    translation: {
      title: "Nové Československo",
      hero: {
        title: "NOVÉ\nČESKOSLOVENSKO",
        subtitle: "Občianske združenie pre zjednotenie"
      },
      nav: {
        about: "O NÁS",
        history: "HISTÓRIA",
        vision: "VÍZIA", 
        join: "ZAPOJTE SA",
        contact: "KONTAKT"
      },
      sidebar: {
        about: "O nás",
        who: "Kto sme?",
        what: "Čo chceme?",
        why: "Prečo teraz?",
        goals: "Koho sa snažíme?",
        mission: "Aké jsou naše ciele?"
      },
      content: {
        whoWeAre: {
          title: "Kto sme?",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        whatWeWant: {
          title: "Čo chceme?",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
      },
      news: {
        title: "Novinky",
        item1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        item2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.",
        item3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua."
      },
      footer: {
        findUs: "Kde nás nájdete",
        mapPlaceholder: "Mapa ČR a SR",
        social: "Facebook\nInstagram\nBlog"
      }
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'cs',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
