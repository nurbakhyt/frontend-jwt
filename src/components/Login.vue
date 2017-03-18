<template>
  <md-layout md-align="center">
    <md-layout md-flex-small="100" md-flex="50">
      <form @submit.stop.prevent="submit" md-align="center">
        <md-input-container>
          <label>Email</label>
          <md-input v-model="email" type="string" required></md-input>
        </md-input-container>
        <md-input-container md-has-password>
          <label>Пароль</label>
          <md-input v-model="password" type="password" required></md-input>
        </md-input-container>
        <md-layout md-align="center">
          <md-progress md-indeterminate v-if="isLoading"></md-progress>
        </md-layout>
        <p class="error-message" v-if="message">{{ message }}</p>
        <md-layout>
          <md-button type="submit" class="md-raised md-primary login-btn">Вход</md-button>
        </md-layout>
      </form>
    </md-layout>
  </md-layout>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      isLoading: false,
      message: ''
    }
  },
  methods: {
    submit () {
      const data = {
        client_id: 2,
        client_secret: 'nGlHtW85hPQZlgGuOEmIBJeTTMbH5Or1E5zytzGv',
        grant_type: 'password',
        username: this.email,
        password: this.password
      }
      if (this.email && this.password) {
        this.isLoading = true
        this.message = ''
        this.$http.post("oauth/token", data)
          .then(response => {
            this.isLoading = false
            this.$auth.setToken(response.body.access_token, response.body.expires_in + Date.now())            
            this.$router.push('/profile')
          })
          .catch(error => {
            this.isLoading = false
            this.message = error.body.error + '! ' + error.body.message
          })
      } else {
        console.log('Введите логин и пароль')
      }
    }
  }
}
</script>

<style >
form {
  width: 100%
}
.login-btn,
.register-btn {
  width: 100%
}
.error-message {
  color: red
}
</style>