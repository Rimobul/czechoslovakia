import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  cs: {
    translation: {
      title: "Nové Československo",
      nav: {
        vision: "Vize",
        news: "Novinky", 
        blog: "Blog",
        atlas: "Atlas hudby",
        maps: "Mapy"
      },
      menu: {
        item1: "Menu item 1",
        subitem11: "Menu sub item 11",
        subitem12: "Menu sub item 12",
        item2: "Menu item 2",
        item3: "Menu item 3",
        subitem31: "Menu sub item 31",
        subitem32: "Menu sub item 32", 
        subitem33: "Menu sub item 33",
        item4: "Menu item 4",
        item5: "Menu item 5"
      },
      content: {
        lorem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }
    }
  },
  sk: {
    translation: {
      title: "Nové Československo",
      nav: {
        vision: "Vízia",
        news: "Novinky",
        blog: "Blog", 
        atlas: "Atlas hudby",
        maps: "Mapy"
      },
      menu: {
        item1: "Menu položka 1",
        subitem11: "Menu podpoložka 11",
        subitem12: "Menu podpoložka 12",
        item2: "Menu položka 2",
        item3: "Menu položka 3",
        subitem31: "Menu podpoložka 31",
        subitem32: "Menu podpoložka 32",
        subitem33: "Menu podpoložka 33", 
        item4: "Menu položka 4",
        item5: "Menu položka 5"
      },
      content: {
        lorem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }
    }
  },
  en: {
    translation: {
      title: "New Czechoslovakia", 
      nav: {
        vision: "Vision",
        news: "News",
        blog: "Blog",
        atlas: "Music Atlas", 
        maps: "Maps"
      },
      menu: {
        item1: "Menu item 1",
        subitem11: "Menu sub item 11",
        subitem12: "Menu sub item 12",
        item2: "Menu item 2",
        item3: "Menu item 3",
        subitem31: "Menu sub item 31",
        subitem32: "Menu sub item 32",
        subitem33: "Menu sub item 33",
        item4: "Menu item 4", 
        item5: "Menu item 5"
      },
      content: {
        lorem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
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
