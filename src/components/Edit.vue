<template>
  <md-layout md-align="center">
    <md-layout md-flex-small="100" md-flex="50">
      <form @submit.stop.prevent="submit" md-align="center">
        <md-input-container>
          <label>Имя</label>
          <md-input v-model="profile.name" type="string" required></md-input>
        </md-input-container>
        <md-input-container>
          <label>Email</label>
          <md-input v-model="profile.email" type="string"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Телефон</label>
          <md-input v-model="profile.phone" type="string"></md-input>
        </md-input-container>
        <md-input-container md-has-password>
          <label>Пароль</label>
          <md-input v-model="profile.password" type="password"></md-input>
        </md-input-container>
        <md-layout md-align="center">
          <md-progress md-indeterminate v-if="isLoading"></md-progress>
        </md-layout>
        <p v-if="message">{{ message }}</p>
        <p class="error-message" v-if="error">{{ error }}</p>
        <md-layout>
          <md-button type="submit" class="md-raised md-primary login-btn">Редактировать</md-button>
        </md-layout>
      </form>
    </md-layout>
  </md-layout>
  
</template>

<script>
export default {
  data () {
    return {
      profile: {
        password: ''
      },
      isLoading: false,
      message: '',
      error: ''
    }
  },
  mounted () {
    const user = this.$auth.getAuthenticatedUser()
    this.profile = user
  },
  methods: {
    submit () {
      this.isLoading = true
      this.error = ''
      this.message = ''
      const { name, email, phone, password } = this.profile
      this.$http.put(`api/profile/${this.profile.id}`, {
          name,
          email,
          phone,
          password
        }, {
        headers: {
          "Authorization": "Bearer " + this.$auth.getToken()
        }
      })
        .then(response => {
          this.$auth.setAuthenticatedUser(response.body.profile)
          console.log('edited', response.body)
          this.isLoading = false
          this.message = 'Данные вашего профиля успешно сохранены'
        })
        .catch(error => {
          this.isLoading = false
          this.error = error.body.error
        })
    }
  }
}
</script>