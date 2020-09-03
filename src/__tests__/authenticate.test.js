import axios from 'axios'
import VueAuthenticate from  '../authenticate.js'
import { $window } from '../globals.js';

const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIwYTliMjQyYy03ODg4LTQ1ZWQtOWFmNy02MmNlY2IxMmQ1OGUiLCJ1bmlxdWVfbmFtZSI6ImFAYi5jYSIsImlkcHgiOiJBU1AuTkVUIElkZW50aXR5IiwiaXNzeCI6IjcxYTc2YzkwLTYzZjQtNGIyNS04MjdhLTc4MDVhN2FjYzg3NCIsImVtYWlsX3ZlcmlmaWVkIjoiZmFsc2UiLCJuYmYiOjE1OTg5OTc4OTcsImV4cCI6MTYwMDIwNzQ5NywiaWF0IjoxNTk4OTk3ODk3LCJpc3MiOiJ3ZWIiLCJhdWQiOiJwdWJsaWMifQ.EHfFu-ee9tdePF7L5RlGEc9yw1CMhnpClzTJ5mN5QBo"

const options = {
  defaultStorageType: 'localStorage',
  storageNamespace: "Hope",
  tokenPath: "access_token",
  tokenPrefix: "Bobs",
  tokenName: "YourUncle",
}

const response = {
  data: { 
    access_token: jwtToken
  }
}

const testKey = "Hope.Bobs_YourUncle"

const cleanup = function () {
  $window.sessionStorage.removeItem(testKey)
  $window.localStorage.removeItem(testKey)
}

test('Store to default location', () => {
  cleanup()
  const auth = new VueAuthenticate(axios, options)
  auth.setToken(response)
  const answer = $window.localStorage.getItem(testKey)
  expect(answer).toBe(jwtToken)
})

test('Test a JWT Value', () => {
  cleanup()
  const auth = new VueAuthenticate(axios, options)
  auth.setToken(response)
  const jwt = auth.getPayload()
  expect(jwt["unique_name"]).toBe("a@b.ca")
  const answer = $window.localStorage.removeItem(testKey)  // Cleanup
})

test('Preload into session.  Properly default storage type', () => {
  cleanup()
  $window.sessionStorage.setItem(testKey, jwtToken)
  const auth = new VueAuthenticate(axios, options)
  const token = auth.getToken()
  expect(token).toBe(jwtToken)
  expect(auth.storage.storageType).toBe('sessionStorage')
})