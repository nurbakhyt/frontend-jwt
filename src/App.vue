<template>
  <div id="app">
    <app-header></app-header>


    <md-layout md-align="center">
      <md-layout md-flex-small="90" md-flex="80" md-flex-xlarge="60">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'app',
  data () {
    return {
      isAuth: false
    }
  },
  components: {
    'app-header': Header
  },
  updated () {
    this.isAuth = this.$auth.isAuthenticated()
    const user = this.$auth.getAuthenticatedUser()
    if (!user && this.isAuth)
      this.setAuthenticatedUser()
  },
  mounted () {
    this.isAuth = this.$auth.isAuthenticated()
  },
  methods: {
    setAuthenticatedUser () {
      this.$http.get("api/profile", {
        headers: {
          "Authorization": "Bearer " + this.$auth.getToken()
        }
      })
        .then(response => {
          this.$auth.setAuthenticatedUser(response.body)
          this.isAuth = true
        })
        .catch(error => console.log('error', error.body))
    }
  }
}
</script>

<style>

</style>
