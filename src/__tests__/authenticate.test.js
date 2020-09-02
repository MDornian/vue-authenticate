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

test('Store to default location', () => {
  const auth = new VueAuthenticate(axios, options)

  auth.setToken(response)
  const answer = $window.localStorage.getItem("Hope.Bobs_YourUncle")
  expect(answer).toBe(jwtToken)
})