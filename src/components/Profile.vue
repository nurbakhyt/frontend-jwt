<template>
  <div>
    <h1>Profile</h1>
    <md-layout md-align="center">
      <md-spinner :md-size="30" md-indeterminate v-if="isLoading"></md-spinner>
    </md-layout>
    <p class="error-message" v-if="error">{{ error }}</p>
    <pre>{{ profile }}</pre>
    <router-link to="/profile/edit" tag="a" class="md-button md-raised md-primary md-theme-default">Редактировать</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      profile: {},
      isLoading: false,
      error: ''
    }
  },
  mounted () {
    this.isLoading = true
    this.error = ''
    this.$http.get("api/profile", {
        headers: {
          "Authorization": "Bearer " + this.$auth.getToken()
        }
      })
        .then(response => {
          this.$auth.setAuthenticatedUser(response.body)
          this.profile = this.$auth.getAuthenticatedUser()
          this.isLoading = false
        })
        .catch(error => {
          this.isLoading = false
          console.log('error', error.body)
          this.error = error.body
          this.$auth.destroyToken()
          this.$router.push('/login')
        })
  }
}
</script>