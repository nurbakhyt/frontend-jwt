export default function (Vue) {
  let authenticatedUser = {}
  Vue.auth = {
    setToken (token, expiration) {
      localStorage.setItem('token', token)
      localStorage.setItem('expiration', expiration)
    },
    getToken () {
      const token = localStorage.getItem('token')
      const expiration = localStorage.getItem('expiration')

      if (!token || !expiration)
        return null
      
      if(Date.now() > parseInt(expiration)) {
        this.destroyToken()
        return null
      } else
        return token
    },
    destroyToken () {
      localStorage.clear()
    },
    isAuthenticated () {
      if (this.getToken())
        return true
      else
        return false
    },
    setAuthenticatedUser (data) {
      localStorage.setItem('user', JSON.stringify(data))
      authenticatedUser = data
    },
    getAuthenticatedUser () {
      const user = JSON.parse(localStorage.getItem('user'))
      return user
    }
  }

  Object.defineProperties(Vue.prototype, {
    $auth: {
      get: () => Vue.auth
    }
  })
}