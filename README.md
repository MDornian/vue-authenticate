# vue-authenticate

This is a fork of the vue-authenticate package version 1.4.1  Please refer to [npm vue-authenticate](https://www.npmjs.com/package/@bsarvari/vue-authenticate) for more documentation.  The differences are listed below.

## Installation
```bash
npm install @mdornian/vue-authenticate
```

## Support For Dynamic Storage
The user might decide that they want to stay logged in or log out automatically when the browser is closed.  For example, this could translate into storing the token in either LocalStorage or Session.  On startup, the application will look in all storage locations for an existing token and dynamically set the storage type to that location.  On login, you have the option of overriding the storage type to a different location. 

```javascript
new Vue({
  methods: {
    login: function () {
      this.$auth.login({ email, password },,'localStorage').then(function () {
        // Execute application logic after successful login
      })
    }
  }
})
```

## Decode JWT
If you need to decode the JWT token

```javascript
const jwt = this.$auth.decode()
```