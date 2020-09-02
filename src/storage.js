import { $window } from './globals';
import CookieStorage from './storage/cookie-storage.js';
import LocalStorage from './storage/local-storage.js'
import MemoryStorage from './storage/memory-storage.js'
import SessionStorage from './storage/session-storage.js'

export default class Storage {
  constructor(options) {
    // Set the initial storage type
    let storageType = options.defaultStorageType || 'memoryStorage'
    let storageLocations = {}

    Object.defineProperties(this, {
      storageType: {
        get() {
          return storageType
        },
        set(newValue) {
          storageType = newValue
        }
      },

      storageLocations: {
        get() {
          return storageLocations
        }
      }
    })

    this.loadStorageLocations(options)

    // Determine if the token is already in storage.  If so, override the storageType to that location
    const tokenName = options.getTokenName

    for (const property in this.storageLocations) {
      if (this.storageLocations[property].getItem(tokenName)) {
        this.storageType = property
        break
      }
    }
  }

  loadStorageLocations(options) {
    try {
      $window.localStorage.setItem('testKey', 'test')
      $window.localStorage.removeItem('testKey')
      this.storageLocations['localStorage'] = new LocalStorage(options.storageNamespace)
    } catch(e) {}

    try {
      $window.sessionStorage.setItem('testKey', 'test')
      $window.sessionStorage.removeItem('testKey')
      this.storageLocations['sessionStorage'] = new SessionStorage(options.storageNamespace)
    } catch (e) {}

    this.storageLocations['cookieStorage'] = new CookieStorage(options.cookieStorage)
    this.storageLocations['memoryStorage'] = new MemoryStorage(options.storageNamespace)
  }

  // Set the storage type.  This is generally a user level change.  For example, the user logs in and decides whether to remain logged in (home, cell phone) or log out automatically when they leave (library, internet cafe)
  setStorageType(storageType, key) {
    for (const property in this.storageLocations) {
      if (property === storageType) {
        this.storageType = storageType
      } else {
        if (key) {
          this.storageLocations[property].removeItem(key)
        }
      }
    }
  }

  setItem(key, value) {
    this.storageLocations[this.storageType].setItem(key, value)
  }

  getItem(key) {
    return this.storageLocations[this.storageType].getItem(key)
  }

  removeItem(key) {
    this.storageLocations[this.storageType].removeItem(key)
  }
}